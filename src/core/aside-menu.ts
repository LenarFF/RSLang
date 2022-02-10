import { Control } from '../components/Control';

const asideContent = `
<nav class="nav">
      <ul>
        <li class="menu-item item-main"><a href="#main-page">ГЛАВНАЯ</a></li>
        <li class="menu-item item-textbook"><a href="#electronic-textbook">УЧЕБНИК</a></li>
        <li class="menu-item item-game"><a href="#mini-game">ИГРЫ</a></li>
        <li class="menu-item item-statistics" ><a href="#statistics">СТАТИСТИКА</a></li>
      </ul>
</nav>
`;

export class Aside extends Control {
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string) {
    super(parentNode, tagName, className, content);

    this.node.insertAdjacentHTML('afterbegin', asideContent);
  }
}
