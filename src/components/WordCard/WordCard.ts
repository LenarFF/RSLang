import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';
import { Control } from '../Control';
import './WordCard.scss';

class WordCard extends Control {
  imgWrap = new Control(this.node, 'div', 'word-card__img-wrap');
  text = new Control(this.node, 'div', 'word-card__text');
  top = new Control(this.text.node, 'div', 'word-card__top');
  audioButton = new Control(this.top.node, 'button', 'word-card__audio');
  img: Control;
  word: Control;
  translate: Control;
  meaning: Control;
  meaningTranslate: Control;
  example: Control;
  exampleTranslate: Control;
  constructor(parent: HTMLElement, wordInfo: IWord) {
    super(parent, 'div', 'word-card');
    const {
      word,
      image,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      wordTranslate,
      textMeaningTranslate,
      textExampleTranslate,
    } = wordInfo;
    this.img = new Control(this.imgWrap.node, 'img', 'word-card__img');
    this.img.node.setAttribute('src', `${baseURL}/${image}`);
    this.img.node.setAttribute('alt', word);

    this.word = new Control(this.top.node, 'h3', 'word-card__word', `${word} ${transcription}`);

    this.translate = new Control(
      this.text.node,
      'p',
      'word-card__translate',
      `Translate: ${wordTranslate}`,
    );

    this.meaning = new Control(this.text.node, 'p', 'word-card__meaning');
    this.meaning.node.innerHTML = textMeaning;
    this.meaningTranslate = new Control(
      this.text.node,
      'p',
      'word-card__meaning',
      textMeaningTranslate,
    );
    this.example = new Control(this.text.node, 'p', 'word-card__meaning');
    this.example.node.innerHTML = textExample;
    this.exampleTranslate = new Control(
      this.text.node,
      'p',
      'word-card__meaning',
      textExampleTranslate,
    );

    this.audioButton.node.addEventListener('click', () =>
      this.playAudio([audio, audioMeaning, audioExample]),
    );
  }

  playAudio = (audioSrc: string[]) => {
    let index = 0;
    const audio = new Audio(`${baseURL}/${audioSrc[index]}`);
    audio.play();
    audio.onended = () => {
      index++;
      if (index < audioSrc.length) {
        audio.src = `${baseURL}/${audioSrc[index]}`;
        audio.play();
      }
    };
  };
}

export { WordCard };
