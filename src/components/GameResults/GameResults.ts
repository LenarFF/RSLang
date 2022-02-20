import { IWord } from '../../types/interface';
import { Control } from '../Control';
import { ResultAnswers } from '../ResultAnswers/ResultAnswers';
import './GameResults.scss';

class GameResults extends Control {
  right: ResultAnswers | null;

  wrong: ResultAnswers | null;

  container = new Control(this.node, 'div', 'game-results');

  closeBtn = new Control(this.container.node, 'button', 'game-results__close');

  title = new Control(this.container.node, 'h2', 'game-results__title', 'Результаты');

  constructor(
    parent: Control,
    rightAnswers: IWord[],
    wrongAnswers: IWord[],
    selectWindow: HTMLElement,
  ) {
    super(parent.node, 'div', 'game-results__modal');
    this.right = rightAnswers.length
      ? new ResultAnswers(this.container.node, 'Верно', rightAnswers, true)
      : null;
    this.wrong = wrongAnswers.length
      ? new ResultAnswers(this.container.node, 'Неверно', wrongAnswers, false)
      : null;
    this.node.addEventListener('click', (e) => this.removeResults(e, parent, selectWindow));
  }

  removeResults = (e: MouseEvent, game: Control, selectWindow: HTMLElement): void => {
    if (
      !(e.target as HTMLElement).classList.contains('game-results__modal')
      && !(e.target as HTMLElement).classList.contains('game-results__close')
    ) {
      return;
    }
    game.destroy();
    selectWindow.classList.remove('hidden');
  };
}

export { GameResults };
