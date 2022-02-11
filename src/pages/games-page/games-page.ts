import { Control } from '../../components/Control';
import './gamesPage.scss';

export class GamesPage extends Control {
  sprint = new Control(this.node, 'div', 'games-btn');

  audio = new Control(this.node, 'div', 'games-btn', 'AUDIO');

  constructor(parent: HTMLElement) {
    super(parent, 'main', 'main mini-game');
    this.sprint.node.innerHTML = '<a href="#mini-game/sprint">SPRINT</a>';
    this.audio.node.innerHTML = '<a href="#mini-game/audio">AUDIO</a>';
  }
}
