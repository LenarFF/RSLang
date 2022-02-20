import { setDifficult, updateDifficult } from '../../api/textbook';
import { baseURL } from '../../constants/api';
import { Difficulty } from '../../constants/textbook';
import { Statistics } from '../../core/statistics';
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
      id,
      _id,
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
    if (_id) {
      this.setControlBtnDifficult(_id);
    } else if (id) {
      this.setControlBtns(id);
    }
  }

  removeDifficult(wordID: string): void {
    updateDifficult(wordID, Difficulty.normal);
    this.destroy();
  }

  setControlBtnDifficult(wordID: string): void {
    const notDifficultBtn = new Control(
      this.controls.node,
      'button',
      'word-card__not-difficult-btn',
    );
    notDifficultBtn.node.setAttribute('title', 'больше не сложное');
    notDifficultBtn.node.addEventListener('click', () => this.removeDifficult(wordID));
  }

  setControlBtns(wordID: string): void {
    const difficultBtn = new Control(this.controls.node, 'button', 'word-card__difficult-btn');
    const studiedBtn = new Control(this.controls.node, 'button', 'word-card__studied-btn');
    difficultBtn.node.setAttribute('title', 'Сложное слово');
    studiedBtn.node.setAttribute('title', 'Изученное слово');
    difficultBtn.node.addEventListener('click',
      () => this.handleDifficult(wordID, [difficultBtn.node, studiedBtn.node]));
    studiedBtn.node.addEventListener('click', () => this.handleStudied(wordID, [difficultBtn.node, studiedBtn.node]));
  }

  disableButtons = (btns: Element[]): void => btns.forEach((btn) => btn.setAttribute('disabled', 'true'));

  handleDifficult(wordID: string, btns: Element[]): void {
    this.node.classList.remove('word-card_studied');
    this.node.classList.toggle('word-card_difficult');
    this.disableButtons(btns);
    setDifficult(wordID, Difficulty.hard);
  }

  handleStudied(wordID: string, btns: Element[]): void {
    this.node.classList.remove('word-card_difficult');
    this.node.classList.toggle('word-card_studied');
    this.disableButtons(btns);
    setDifficult(wordID, Difficulty.easy);
    Statistics.addLearned();
  }
}

export { WordCard };
