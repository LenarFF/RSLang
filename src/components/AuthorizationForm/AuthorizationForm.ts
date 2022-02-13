import { Control } from '../Control';
import { loginInputs, submitInputs } from '../../data/authorization';
import { baseURL } from '../../constants/api';
import './AuthorizationForm.scss';

interface IValue {
  email: string;
  password: string;
}

export class AuthorizationForm extends Control {
  form = new Control(this.node, 'form', 'form');

  formTitle = new Control(this.form.node, 'h3', '');

  emailError: Control;

  passwordError: Control;

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'form-container');

    this.formTitle.node.innerText = 'RS LANG';

    [this.emailError, this.passwordError] = loginInputs.map((elem) => {
      const inputBox = new Control(this.form.node, 'div', 'input-box');
      inputBox.node.innerHTML = `<span>${elem.span}</span>`;
      const box = new Control(inputBox.node, 'div', 'box');
      const icon = new Control(box.node, 'div', 'icon');
      const iconSVG = new Control(icon.node, 'svg', 'authorization-svg');
      iconSVG.node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      iconSVG.node.setAttribute('viewBox', '0 0 512 512');
      const iconPath = new Control(iconSVG.node, 'path', '');
      iconPath.node.setAttribute('d', elem.path);
      iconPath.node.setAttribute('fill', '#fff');
      const input = new Control(box.node, 'input', '');
      input.node.setAttribute('type', elem.type);
      input.node.setAttribute('name', elem.name);
      return new Control(inputBox.node, 'div', 'error');
    });

    submitInputs.forEach((elem) => {
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

  onFormSubmit(target: HTMLElement | null): void {
    const { email, password } = (document.forms as HTMLCollectionOf<HTMLFormElement>)[0];

    const values: IValue = {
      email: email.value,
      password: password.value,
    };

    if (target?.getAttribute('value') === 'выход') {
      this.passwordError.node.innerText = '';
      this.emailError.node.innerText = '';
      localStorage.setItem('token', '');
      if (document.querySelector('.authorization-button')?.className.includes('authorization-button__active')) {
        document.querySelector('.authorization-button')?.classList.remove('authorization-button__active');
      }
      this.node.classList.toggle('form-container__active');
    } else {
      Object.entries(values).forEach((elem) => {
        if (elem[0] === 'password') {
          if (elem[1] === '') {
            this.passwordError.node.innerText = 'не заполнено поле';
          } else if (elem[1].length < 8) {
            this.passwordError.node.innerText = 'минимальная длина пароля 8 символов';
          } else {
            this.passwordError.node.innerText = '';
          }
        }
        if (elem[0] === 'email') {
          if (elem[1] === '') {
            this.emailError.node.innerText = 'не заполнено поле';
          } else {
            this.emailError.node.innerText = '';
          }
        }
      });

      if (localStorage.getItem('token') === '' && target?.getAttribute('value') === 'регистрация') {
        if (this.emailError.node.innerText === '' && this.passwordError.node.innerText === '') {
          this.createUser(values)
            .then((res) => {
              if (typeof res === 'string') {
                this.passwordError.node.innerText = res || '';
                setTimeout(() => {
                  this.passwordError.node.innerText = '';
                }, 2000);
              } else {
                (this.form.node as HTMLFormElement).reset();
                this.passwordError.node.innerText = 'регистрация успешна';
                setTimeout(() => {
                  this.passwordError.node.innerText = '';
                }, 2000);
                // console.log(res);
              }
            })
            .catch((err) => new Error(err));
        }
      } else if (localStorage.getItem('token') !== '') {
        this.passwordError.node.innerText = 'необходимо разлогиниться';
        this.passwordError.node.innerText = 'необходимо разлогиниться';
      }

      if (target?.getAttribute('value') === 'вход'
          && this.emailError.node.innerText === ''
          && this.passwordError.node.innerText === '') {
        this.loginUser(values)
          .then((res) => {
            if (typeof res === 'string') {
              this.passwordError.node.innerText = res || '';
              setTimeout(() => {
                this.passwordError.node.innerText = '';
              }, 2000);
            } else {
              localStorage.setItem('token', Object.values(res)[1]);
              this.node.classList.toggle('form-container__active');
              (this.form.node as HTMLFormElement).reset();
              document.querySelector('.authorization-button')?.classList.add('authorization-button__active');
            }
          })
          .catch((err) => new Error(err));
      }
    }
  }

  createUser = async (user: IValue): Promise<void | string> => {
    try {
      const rawResponse = await fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const content = await rawResponse;
      if (content.status === 417) {
        return 'пользователь уже существует';
      }
      return await content.json();
    // console.log(content);
    } catch (error) {
    // console.log(error);
      return Promise.reject(error);
    }
  };

  loginUser = async (user: IValue): Promise<JSON | string> => {
    try {
      const rawResponse = await fetch(`${baseURL}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const content = await rawResponse;
      if (content.status === 403) {
        return 'неправильный пользователь или пароль';
      }
      if (content.status === 404) {
        return 'пожалуйста зарегистрируйтесь';
      }
      return await content.json();
    } catch (error) {
      return Promise.reject(error);
    }
  };
}