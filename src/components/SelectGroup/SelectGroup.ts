import { MAX_GROUP } from '../../constants/api';
import { AudioChallengeGame } from '../../pages/audio-challenge-game/audio-challenge-game';
import { SprintGame } from '../../pages/sprint-game/sprint-game';
import { Control } from '../Control';
import './SelectGroup.scss';

class SelectGroup extends Control {
  title: Control;

  text: Control;

  levels: Control;

  constructor(parent: HTMLElement | null, gameName: string) {
    super(parent, 'div', 'select-window');
    this.title = new Control(this.node, 'h2', 'select-window__title', gameName);
    this.text = new Control(this.node, 'p', 'select-window__text', 'Выберите уровень сложности');
    this.levels = new Control(this.node, 'ul', 'select-window__levels');
    this.renderLevels();
    this.node.addEventListener('click', (e) => this.renderGame(e.target as HTMLElement, gameName));
  }

  renderLevels(): void {
    [...new Array(MAX_GROUP)].map((group, index) => {
      const level = new Control(this.levels.node, 'li', 'select-window__level', String(index + 1));
      level.node.setAttribute('data-group', String(index));
      level.node.classList.add(`select-window__level_${index + 1}`);
      return level;
    });
  }

  renderGame(target: HTMLElement, gameName: string): void {
    const { group } = target.dataset;
    if (!group) return;
    const game = (gameName === 'Аудиовызов')
      ? new AudioChallengeGame(Number(group), this.node)
      : new SprintGame(Number(group), this.node);
    const gamePage = this.node.parentElement;
    this.node.classList.add('hidden');
    if (gamePage) gamePage.append(game.node);
  }
}

export { SelectGroup };
