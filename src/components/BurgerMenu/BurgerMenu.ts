import './BurgerMenu.scss';
import { Control } from '../Control';

class BurgerMenu extends Control {
  menu: HTMLElement | null;

  constructor(parent: HTMLElement) {
    super(parent, 'button', 'burger-menu');
    this.menu = document.querySelector('.aside');
    this.node.addEventListener('click', () => this.showMenu());
    this.menu?.addEventListener('click', () => this.showMenu());
  }

  showMenu(): void {
    this.menu?.classList.toggle('hidden');
    this.node.classList.toggle('burger-menu_close');
  }
}

export { BurgerMenu };
