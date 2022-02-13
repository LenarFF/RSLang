import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';
import { Control } from '../Control';
import './AnswerCard.scss';

class AnswerCard extends Control {
  img: Control;
  wordWrap: Control;
  playBtn: Control;
  wordText: Control;
  constructor(parent: HTMLElement, word: IWord) {
    super(parent, 'div', 'answer-card');
    this.img = new Control(this.node, 'img', 'answer-card__img');
    this.img.node.setAttribute('src', `${baseURL}/${word.image}`);
    this.img.node.setAttribute('alt', word.word);
    this.wordWrap = new Control(this.node, 'div', 'answer-card__word-wrap');
    this.playBtn = new Control(this.wordWrap.node, 'button', 'answer-card__play');
    this.wordText = new Control(this.wordWrap.node, 'p', 'answer-card__word', word.word);

    this.playBtn.node.addEventListener('click', () => this.playAudio(word.audio));
  }

  playAudio = (audioSrc: string): void => {
    const audio = new Audio(`${baseURL}/${audioSrc}`);
    audio.play();
  };
}

export { AnswerCard };