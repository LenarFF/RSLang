import { Control } from '../../components/Control';
import { Href } from '../../constants/router-refs';
import './aside-menu.scss';

const asideContent = `
  <div class="nav">        
        <ul class="menu-container">
          <li class="menu-item">
            <div class="rank">
              <span class="menu-ico__main"></span>
            </div>
            <div class="menu-name">
              <a href="${Href.MAIN}">ГЛАВНАЯ</a>
            </div>
          </li>
          <li class="menu-item">
            <div class="rank">
              <span class="menu-ico__textbook"></span>
            </div>
            <div class="menu-name">
              <a href="${Href.BOOK}">УЧЕБНИК</a>
            </div>
          </li>
          <li class="menu-item">
            <div class="rank">
              <span class="menu-ico__games"></span>
            </div>
            <div class="menu-name">
              <a href="${Href.GAMES}">ИГРЫ</a>
            </div>
          </li>
          <li class="menu-item">
            <div class="rank">
              <span class="menu-ico__stat"></span>
            </div>
            <div class="menu-name">
              <a href="${Href.STAT}">СТАТИСТИКА</a>
            </div>
          </li>
        </ul>
  </div>
`;

export class Aside extends Control {
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string) {
    super(parentNode, tagName, className, content);

    this.node.insertAdjacentHTML('afterbegin', asideContent);
  }
}
