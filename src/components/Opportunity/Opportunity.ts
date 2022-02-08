import { Control } from '../Control';
import './Opportunity.scss';

class Opportunity extends Control {
  title: Control;

  image: Control;

  description: Control;

  constructor(parent: HTMLElement, titleName: string, imageName: string, description: string) {
    super(parent, 'div', 'opportunity');
    this.title = new Control(this.node, 'h3', 'opportunity__title', titleName);
    this.image = new Control(this.node, 'img', 'opportunity__img');
    this.image.node.setAttribute('src', `./img/${imageName}.png`);
    this.description = new Control(this.node, 'p', 'opportunity__description', description);
  }
}

export { Opportunity };
