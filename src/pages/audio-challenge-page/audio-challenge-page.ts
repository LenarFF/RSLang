import { getWords } from '../../api/textbook';
import { AnswerCard } from '../../components/AnswerCard/AnswerCard';
import { Control } from '../../components/Control';
import { baseURL, MAX_PAGES, WORDS_ON_PAGE } from '../../constants/api';
import { IWord } from '../../types/interface';
import './audio-challenge-page.scss';

class AudioChallengePage extends Control {
  words: IWord[];
  answers: IWord[];
  answerBtns: HTMLElement[];
  rightAnswers: IWord[];
  wrongAnswers: IWord[];
  currentQuestion = 0;
  answersQuantity = 5;
  answerCard: AnswerCard | null;
  container = new Control(this.node, 'div', 'challenge-page__container');
  top = new Control(this.container.node, 'div', 'challenge-page__top');
  audioImg = new Control(this.top.node, 'div', 'challenge-page__audio-img');
  variants = new Control(this.container.node, 'div', 'challenge-page__variants');
  controlBtn = new Control(this.container.node, 'button', 'challenge-page__control-btn', 'не знаю');

  constructor(parent: HTMLElement, group: number) {
    super(parent, 'main', 'challenge-page');
    this.words = [];
    this.answers = [];
    this.answerBtns = [];
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.answerCard = null;
    this.getAllWords(group);

    this.controlBtn.node.setAttribute('data-next', 'false');

    this.controlBtn.node.addEventListener('click', () => this.handleControl());
    this.variants.node.addEventListener('click', (e) => this.handleAnswer(e));
  }

  showNextQuestion(): void {
    if (this.currentQuestion >= WORDS_ON_PAGE - 1) return;
    this.currentQuestion++;
    this.variants.node.innerHTML = '';
    this.answers = [];
    this.answerBtns = [];
    this.getAnswers();
    this.top.node.innerHTML = '';
    this.audioImg = new Control(this.top.node, 'div', 'challenge-page__audio-img');
    this.enableBtn(this.answerBtns);
    this.controlBtn.node.innerText = 'не знаю';
    this.controlBtn.node.setAttribute('data-next', 'false');
  }

  handleControl() {
    if (this.controlBtn.node.dataset.next === 'true') {
      this.showNextQuestion();
    } else {
      this.showRightAnswer(this.words[this.currentQuestion]);
    }
  }

  async getAllWords(group: number, page = this.getRandomNum(MAX_PAGES)) {
    this.words = await getWords(group, page);
    this.getAnswers();
  }

  shuffleArray = (arr: IWord[]) => arr.sort(() => Math.random() - 0.5);

  getAnswers() {
    this.answers.push(this.words[this.currentQuestion]);
    while (this.answers.length < this.answersQuantity) {
      const answer = this.words[this.getRandomNum(WORDS_ON_PAGE)];
      if (!this.answers.includes(answer)) this.answers.push(answer);
    }
    this.shuffleArray(this.answers);
    this.renderAnswers();
  }

  renderAnswers() {
    this.answers.map((word) => {
      const answerBtn = new Control(
        this.variants.node,
        'button',
        'challenge-page__variant-btn',
        word.wordTranslate,
      );
      answerBtn.node.setAttribute('data-word', word.word);
      this.answerBtns.push(answerBtn.node);
      return answerBtn;
    });
    this.playAudio(this.words[this.currentQuestion].audio);
  }

  playAudio(audioSrc: string) {
    const audio = new Control(this.variants.node, 'audio');
    audio.node.setAttribute('src', `${baseURL}/${audioSrc}`);
    audio.node.setAttribute('autoplay', 'true');
    audio.node.setAttribute('muted', `true`);
  }

  getRandomNum = (max: number): number => Math.floor(Math.random() * max);

  showRightAnswer(rightAnswer: IWord) {
    const rightBtns = this.answerBtns.filter(
      (btn) => (btn as HTMLElement).dataset.word === rightAnswer.word,
    );
    rightBtns[0].classList.add('challenge-page__variant-btn_right');
    this.controlBtn.node.innerText = 'следующий';
    this.controlBtn.node.setAttribute('data-next', 'true');
    this.audioImg.destroy();
    this.answerCard = new AnswerCard(this.top.node, rightAnswer);
    this.disableBtn(this.answerBtns);
  }

  handleAnswer = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const answer = target.dataset.word;
    const rightAnswer = this.words[this.currentQuestion];
    if (!answer) return;
    if (answer !== rightAnswer.word) {
      target.classList.add('challenge-page__variant-btn_wrong');
      this.wrongAnswers.push(rightAnswer);
    } else {
      this.rightAnswers.push(rightAnswer);
    }
    this.showRightAnswer(rightAnswer);
  };

  disableBtn = (btns: HTMLElement[]) => btns.forEach((btn) => btn.setAttribute('disabled', 'true'));

  enableBtn = (btns: HTMLElement[]) => btns.forEach((btn) => btn.removeAttribute('disabled'));
}
export { AudioChallengePage };
