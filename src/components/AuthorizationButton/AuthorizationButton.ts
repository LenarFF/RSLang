import { Control } from '../Control';
import { loginInputs } from '../../data/authorization';
import { USER_DATA } from '../../constants/api';
import './AuthorizationButton.scss';

export class AuthorizationButton extends Control {
  authorizationButton = new Control(this.node, 'div', 'authorization-button');

  formContainer: HTMLElement | null;

  authorizationButtonSVG = new Control(this.authorizationButton.node, 'svg', 'authorization-svg');

  authorizationButtonPath = new Control(this.authorizationButtonSVG.node, 'path');

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'authorization');
    if (localStorage.getItem(USER_DATA)) {
      this.authorizationButton.node.classList.add('authorization-button__active');
    }
    this.authorizationButtonPath.node.setAttribute('d', loginInputs[0].path);
    this.authorizationButtonPath.node.setAttribute('fill', '#fff');
    this.authorizationButtonSVG.node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.authorizationButtonSVG.node.setAttribute('viewBox', '0 0 512 512');
    this.formContainer = document.querySelector('.form-container');

    this.authorizationButton.node.onclick = () => {
      this.OnClickAuthorizationBtn();
    };
  }

  OnClickAuthorizationBtn(): void {
    this.formContainer?.classList.toggle('form-container__active');
    if (this.formContainer?.classList.contains('form-container__active')) {
      (this.formContainer.children[0] as HTMLFormElement).reset();
    }
    for (const item of document.querySelectorAll('.error')) {
      item.innerHTML = '';
    }
  }
}
