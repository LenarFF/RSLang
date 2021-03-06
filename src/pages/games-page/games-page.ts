import { Control } from '../../components/Control';
import { Cube } from '../../components/Cube/Cube';
import { Href } from '../../constants/router-refs';
import './gamesPage.scss';

export class GamesPage extends Control {
  sprint = new Control(this.node, 'div', 'games-btn');

  cube = new Cube(this.node);

  audio = new Control(this.node, 'div', 'games-btn', 'AUDIO');

  constructor(parent: HTMLElement) {
    super(parent, 'main', 'main mini-game');
    this.sprint.node.innerHTML = `<a href="${Href.SPRINT}">SPRINT</a>`;
    this.audio.node.innerHTML = `<a href="${Href.AUDIO}">AUDIO</a>`;
  }
}
