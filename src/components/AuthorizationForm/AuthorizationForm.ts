import { Control } from '../Control';
import { SubmitInputs, InputErrors } from '../../data/authorization';
import { IValue } from '../../types/interface';
import { createUser, loginUser } from '../../api/authorization';
import { LoginInput } from '../LoginInputs/LoginInputs';
import { USER_DATA } from '../../constants/api';
import './AuthorizationForm.scss';

export class AuthorizationForm extends Control {
  form = new Control(this.node, 'form', 'form');

  formTitle = new Control(this.form.node, 'h3', '', 'RS LANG');

  mailError: Control;

  passError: Control;

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'form-container');
    const loginInputsMail = new LoginInput(this.form.node, 0);
    const loginInputsPass = new LoginInput(this.form.node, 1);
    this.mailError = new Control(null, 'div', 'error');
    this.passError = new Control(null, 'div', 'error');
    loginInputsMail.node.children[0].append(this.mailError.node);
    loginInputsPass.node.children[0].append(this.passError.node);

    SubmitInputs.forEach((elem) => {
      const inputBox = new Control(this.form.node, 'div', 'input-box');
      const box = new Control(inputBox.node, 'div', 'box');
      const input = new Control(box.node, 'input', '');
      input.node.setAttribute('type', 'submit');
      input.node.setAttribute('value', elem.value);
    });

    this.form.node.onsubmit = (event: SubmitEvent) => {
      event.preventDefault();
      this.onFormSubmit(event.submitter);
    };
  }

  changeErrorBox(mailError = '', passError = ''):void {
    this.mailError.node.innerText = mailError;
    this.passError.node.innerText = passError;
  }

  onFormSubmit(target: HTMLElement | null): void {
    const { email, password } = (document.forms as HTMLCollectionOf<HTMLFormElement>)[0];
    const values: IValue = {
      email: email.value,
      password: password.value,
    };

    switch (target?.getAttribute('value')) {
      case 'вход': this.onSignIn(values);
        break;
      case 'выход': this.onSignOut();
        break;
      case 'регистрация': this.onLogIn(values);
        break;
      default:
        break;
    }
  }

  onSignOut():void {
    this.changeErrorBox();
    if (localStorage.getItem(USER_DATA)) {
      document.querySelector('.authorization-button')?.classList.remove('authorization-button__active');
    }
    localStorage.setItem(USER_DATA, '');
    this.node.classList.toggle('form-container__active');
  }

  onSignIn(values: IValue):void {
    this.onInputDataCheck(values);
    if (this.passError.node.innerText === '' && this.mailError.node.innerText === '') {
      loginUser(values)
        .then((res) => {
          if (typeof res === 'string') {
            this.passError.node.innerText = res || '';
          } else {
            localStorage.setItem(USER_DATA, JSON.stringify(res));
            this.node.classList.toggle('form-container__active');
            (this.form.node as HTMLFormElement).reset();
            document.querySelector('.authorization-button')?.classList.add('authorization-button__active');
          }
        })
        .catch((err) => new Error(err));
    }
  }

  onLogIn(values: IValue):void {
    this.onInputDataCheck(values);
    if (this.passError.node.innerText === '' && this.mailError.node.innerText === '') {
      createUser(values)
        .then((res) => {
          if (typeof res === 'string') {
            this.passError.node.innerText = res || '';
          } else {
            (this.form.node as HTMLFormElement).reset();
            this.passError.node.innerText = InputErrors.loginSuccess;
          }
          this.clearNotice();
        })
        .catch((err) => new Error(err));
    }
  }

  onInputDataCheck(values: IValue):void {
    if (values.password === '') {
      this.changeErrorBox(this.mailError.node.innerText, InputErrors.empty);
    } else if (values.password.length < 8) {
      this.changeErrorBox(this.mailError.node.innerText, InputErrors.minLength);
    } else {
      this.changeErrorBox(this.mailError.node.innerText);
    }
    if (values.email === '') {
      this.changeErrorBox(InputErrors.empty, this.passError.node.innerText);
    } else {
      this.changeErrorBox('', this.passError.node.innerText);
    }
  }

  clearNotice():void {
    setTimeout(() => {
      this.passError.node.innerText = '';
    }, 2000);
  }
}
