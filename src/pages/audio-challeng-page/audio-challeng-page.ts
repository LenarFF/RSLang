import { Control } from '../../components/Control';
import { SelectGroup } from '../../components/SelectGroup/SelectGroup';
import { state } from '../../state';
import { AudioChallengeGame } from '../audio-challenge-game/audio-challenge-game';

class AudioChallengePage extends Control {
  select = new SelectGroup(this.node, 'Аудиовызов');

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'challenge-page__wrap');
    if (state.group !== null && state.page !== null) {
      this.select.node.classList.add('hidden');
      const game = new AudioChallengeGame(state.group, this.select.node, state.page);
      this.node.append(game.node);
      state.group = null;
    }
  }
}

export { AudioChallengePage };
