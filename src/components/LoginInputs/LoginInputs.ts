import { Control } from '../Control';
import { loginInputs } from '../../data/authorization';

export class LoginInput extends Control {
  constructor(parent: HTMLElement, logDataNum: number) {
    super(parent, 'div', 'input-container');

    const inputBox = new Control(this.node, 'div', 'input-box');
    inputBox.node.innerHTML = `<span>${loginInputs[logDataNum].span}</span>`;
    const box = new Control(inputBox.node, 'div', 'box');
    const icon = new Control(box.node, 'div', 'icon');
    const iconSVG = new Control(icon.node, 'svg', 'authorization-svg');
    iconSVG.node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    iconSVG.node.setAttribute('viewBox', '0 0 512 512');
    const iconPath = new Control(iconSVG.node, 'path', '');
    iconPath.node.setAttribute('d', loginInputs[logDataNum].path);
    iconPath.node.setAttribute('fill', '#fff');
    const input = new Control(box.node, 'input', '');
    input.node.setAttribute('type', loginInputs[logDataNum].type);
    input.node.setAttribute('name', loginInputs[logDataNum].name);
    input.node.setAttribute('placeholder', loginInputs[logDataNum].placeholder);
  }
}
