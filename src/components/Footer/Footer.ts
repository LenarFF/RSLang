import { developers } from '../../data/developers';
import { Control } from '../Control';
import './Footer.scss';

class Footer extends Control {
  logo = new Control(this.node, 'a', 'footer__logo');

  year = new Control(this.node, 'span', 'footer__year', '2022');

  githubs = new Control(this.node, 'ul', 'footer__githubs');

  constructor(parent: HTMLElement) {
    super(parent, 'footer', 'footer');
    this.logo.node.setAttribute('title', 'RSSchool');
    this.logo.node.setAttribute('href', 'https://rs.school/js/');
    this.logo.node.setAttribute('target', '_blank');
    developers.map((dev) => {
      const li = new Control(this.githubs.node, 'li', 'footer__githubs-li');
      const a = new Control(li.node, 'a', 'footer__githubs-link', dev.github).node;
      a.setAttribute('href', dev.githubHref);
      a.setAttribute('target', '_blank');
      return li;
    });
  }
}

export { Footer };
