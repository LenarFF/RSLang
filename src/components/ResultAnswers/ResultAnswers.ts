import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';
import { Control } from '../Control';
import './ResultAnswers.scss';

class ResultAnswers extends Control {
  title: Control;
  answersList: Control;

  constructor(parent: HTMLElement, title: string, answers: IWord[], correctness: boolean) {
    super(parent, 'div', 'results-answers' );
    this.title = new Control(
      this.node,
      'h3',
      `results-answers__title results-answers__title_${correctness ? 'right' : 'wrong'}`,
      title,
    );
    this.answersList = new Control(this.node, 'ul', 'results-answers__list');

    this.render(answers);    
  }

  render(answers: IWord[]) {
    answers.map((answer) => {
      const li = new Control(this.answersList.node, 'li', 'results-answers__li');
      const play = new Control(null, 'button', 'results-answers__play');
      const word = new Control(
        null,
        'p',
        'results-answers__word',
        `${answer.word} - ${answer.wordTranslate}`,
      );
      li.node.append(play.node, word.node);
      li.node.addEventListener('click', () => this.playAudio(answer.audio));
      return li;
    });
  }

  playAudio(src: string) {
    const audio = new Audio(`${baseURL}/${src}`);
    audio.play();
  }
}


export {ResultAnswers}