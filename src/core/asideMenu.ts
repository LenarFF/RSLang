import { Control } from './controls';

const asideContent = `
<nav class="nav">
      <ul>
        <li class="menu-item item-main"><a href="#main-page">MAIN-PAGE</a></li>
        <li class="menu-item item-textbook"><a href="#electronic-textbook">ELECTRONIC-TEXTBOOK</a></li>
        <li class="menu-item item-authorization"><a href="#authorization">AUTHORIZATION</a></li>
        <li class="menu-item item-game"><a href="#mini-game">MINI-GAME</a></li>
        <li class="menu-item item-statistics" ><a href="#statistics">STATISTICS</a></li>
      </ul>
</nav>
`;

export class Aside extends Control {
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string) {
    super(parentNode, tagName, className, content);
    this.node.insertAdjacentHTML('afterbegin', asideContent);
  }
}
