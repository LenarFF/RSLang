import { Control } from '../Control';
import './DeveloperCard.scss';

class DeveloperCard extends Control {
  figure = new Control(this.node, 'figure', 'developer-card__figure');

  imgWrap = new Control(this.figure.node, 'div', 'developer-card__img-wrap');

  figcaption = new Control(this.figure.node, 'figcaption', 'developer-card__figcaption');

  photo = new Control(this.imgWrap.node, 'img', 'developer-card__image');

  devName: Control;

  github = new Control(this.figcaption.node, 'a', 'developer-card__github');

  description = new Control(this.node, 'ul', 'developer-card__description');

  constructor(
    parent: HTMLElement,
    photo: string,
    name: string,
    description: string[],
    githubHref: string,
  ) {
    super(parent, 'div', 'developer-card');

    this.devName = new Control(this.github.node, 'p', 'developer-card__name', name);

    this.photo.node.setAttribute('src', `./img/${photo}.jpg`);
    this.github.node.setAttribute('href', githubHref);
    this.github.node.setAttribute('target', '_blank');

    description.map(
      (item) => new Control(this.description.node, 'li', 'developer-card__description-li', item),
    );
  }
}

export { DeveloperCard };
