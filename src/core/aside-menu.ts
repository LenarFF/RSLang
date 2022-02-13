import { Control } from '../components/Control';
import { Href } from '../constants/router-refs';
import './asideMenu.scss'

const asideContent = `
<nav class="nav">
      <ul class="menu-container">
        <div class="menu-item">
          <div class="rank">
            <span>1</span>
          </div>
          <div class="creator">
            <a href="${Href.MAIN}">ГЛАВНАЯ</a>
          </div>
        </div>
        <div class="menu-item">
          <div class="rank">
            <span>2</span>
          </div>
          <div class="creator">
            <a href="${Href.BOOK}">УЧЕБНИК</a>
          </div>
        </div>
        <div class="menu-item">
          <div class="rank">
            <span>3</span>
          </div>
          <div class="creator">
            <a href="${Href.GAMES}">ИГРЫ</a>
          </div>
        </div>
        <div class="menu-item">
          <div class="rank">
            <span>4</span>
          </div>
          <div class="creator">
            <a href="${Href.STAT}">СТАТИСТИКА</a>
          </div>
        </div>
      </ul>
</nav>
`;

export class Aside extends Control {
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string) {
    super(parentNode, tagName, className, content);

    this.node.insertAdjacentHTML('afterbegin', asideContent);
  }
}
