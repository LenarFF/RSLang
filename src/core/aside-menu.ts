import { Control } from '../components/Control';
import { Href } from '../constants/router-refs';

const asideContent = `
<nav class="nav">
      <ul>
        <li class="menu-item item-main"><a href="${Href.MAIN}">ГЛАВНАЯ</a></li>
        <li class="menu-item item-textbook"><a href="${Href.BOOK}">УЧЕБНИК</a></li>
        <li class="menu-item item-game"><a href="${Href.GAMES}">ИГРЫ</a></li>
        <li class="menu-item item-statistics" ><a href="${Href.STAT}">СТАТИСТИКА</a></li>
      </ul>
</nav>
`;

export class Aside extends Control {
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string) {
    super(parentNode, tagName, className, content);

    this.node.insertAdjacentHTML('afterbegin', asideContent);
  }
}
