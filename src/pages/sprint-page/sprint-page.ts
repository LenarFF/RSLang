import { Control } from '../../components/Control';
import { SelectGroup } from '../../components/SelectGroup/SelectGroup';
import { state } from '../../state';
import { SprintGame } from '../sprint-game/sprint-game';
import './sprintPage.scss';

class SprintPage extends Control {
  select = new SelectGroup(this.node, 'Спринт');

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'sprint-page__wrap');
    if (state.group !== null && state.page !== null) {
      this.select.node.classList.add('hidden');
      const game = new SprintGame(state.group, this.select.node, state.page);
      this.node.append(game.node);
      state.group = null;
    }
  }
}

export { SprintPage };
