import { setDifficult } from '../../api/textbook';
import { baseURL } from '../../constants/api';
import { IWord } from '../../types/interface';
import { AudioBtn } from '../AudioBtn/AudioBtn';
import { Control } from '../Control';
import './WordCard.scss';

class WordCard extends Control {
  imgWrap = new Control(this.node, 'div', 'word-card__img-wrap');

  text = new Control(this.node, 'div', 'word-card__text');

  top = new Control(this.text.node, 'div', 'word-card__top');

  wordWrap = new Control(this.top.node, 'div', 'word-card__word-wrap');

  controls = new Control(this.top.node, 'div', 'word-card__controls');

  difficultBtn = new Control(this.controls.node, 'button', 'word-card__difficult-btn');

  studiedBtn = new Control(this.controls.node, 'button', 'word-card__studied-btn');

  img: Control;

  word: Control;

  audioButton: AudioBtn;

  translate: Control;

  meaning: Control;

  meaningTranslate: Control;

  example: Control;

  exampleTranslate: Control;

  constructor(parent: HTMLElement, wordInfo: IWord, group: number) {
    super(parent, 'div', `word-card word-card_${group + 1}`);
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

    this.difficultBtn.node.setAttribute('title', 'Сложное слово');
    this.studiedBtn.node.setAttribute('title', 'Изученное слово');

    this.word = new Control(
      this.wordWrap.node,
      'h3',
      'word-card__word',
      `${word} ${transcription}`,
    );
    this.audioButton = new AudioBtn(this.wordWrap.node, [audio, audioMeaning, audioExample]);

    this.translate = new Control(
      this.text.node,
      'p',
      'word-card__translate',
      `Перевод: ${wordTranslate}`,
    );

    this.meaning = new Control(this.text.node, 'p', 'word-card__text-en');
    this.meaning.node.innerHTML = `Meaning: ${textMeaning}`;
    this.meaningTranslate = new Control(
      this.text.node,
      'p',
      'word-card__text-ru',
      `Значение: ${textMeaningTranslate}`,
    );
    this.example = new Control(this.text.node, 'p', 'word-card__text-en');
    this.example.node.innerHTML = `Example: ${textExample}`;
    this.exampleTranslate = new Control(
      this.text.node,
      'p',
      'word-card__text-ru',
      `Пример: ${textExampleTranslate}`,
    );

    this.difficultBtn.node.addEventListener('click', () => this.handleDifficult(word));
    this.studiedBtn.node.addEventListener('click', () => this.handleStudied(word));
  }

  handleDifficult(word: string): void {
    this.node.classList.remove('word-card_studied');
    this.node.classList.toggle('word-card_difficult');
    setDifficult('userID', word, 'hard');
  }

  handleStudied(word: string): void {
    this.node.classList.remove('word-card_difficult');
    this.node.classList.toggle('word-card_studied');
    setDifficult('userID', word, 'easy');
  }
}

export { WordCard };
