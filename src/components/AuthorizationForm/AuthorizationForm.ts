import { Control } from '../Control';
import { loginInputs, submitInputs } from '../../data/authorization'
import './AuthorizationForm.scss'

export class AuthorizationForm extends Control {
  form = new Control(this.node, 'form', '');
  formTitle = new Control(this.form.node, 'h3', '');

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'form-container');
    this.formTitle.node.innerText = 'ВХОД';

    loginInputs.forEach(elem => {
      const inputBox = new Control(this.form.node, 'div', 'input-box');
      new Control(inputBox.node, 'span', '', elem.span);
      const box = new Control(inputBox.node, 'div', 'box');
      const icon = new Control(box.node, 'div', 'icon');
      const iconSVG = new Control(icon.node, 'svg', 'authorization-svg');
      iconSVG.node.setAttribute('xmlns','http://www.w3.org/2000/svg');
      iconSVG.node.setAttribute('viewBox','0 0 512 512');
      const iconPath = new Control(iconSVG.node, 'path', '');
      iconPath.node.setAttribute('d', elem.path);
      iconPath.node.setAttribute('fill','#fff');
      const input = new Control(box.node, 'input', '');
      input.node.setAttribute('type', elem.type);
      input.node.setAttribute('name', elem.name);
      new Control(inputBox.node, 'div', 'error');
    });
    submitInputs.forEach(elem => {
      const inputBox = new Control(this.form.node, 'div', 'input-box');
      const box = new Control(inputBox.node, 'div', 'box');
      const input = new Control(box.node, 'input', '');
      input.node.setAttribute('type', 'submit');
      input.node.setAttribute('value', elem.value);
    });
      const passwordReminder = new Control(this.form.node, 'a', 'forget', 'Забыли пароль?');
  }
}