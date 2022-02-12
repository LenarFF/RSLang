import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';
import { Control } from '../Control';
import './AnswerCard.scss';

class AnswerCard extends Control {
  img: Control;
  wordWrap = new Control(this.node, 'div', 'answer-card__word-wrap');
  playBtn = new Control(this.wordWrap.node, 'button', 'answer-card__play');
  wordText: Control;
  constructor(parent: HTMLElement, word: IWord) {
    super(parent, 'div', 'answer-card');
    this.img = new Control(this.node, 'img', 'answer-card__img');
    this.img.node.setAttribute('src', `${baseURL}/${word.image}`);
    this.img.node.setAttribute('alt', word.word)
    this.wordText = new Control(this.wordWrap.node, 'p', 'answer-card__word', word.word);
  }

  playAudio = (audioSrc: string): void => {
    const audio = new Audio(`${baseURL}/${audioSrc}`);
    audio.play();
  }
}

export { AnswerCard };