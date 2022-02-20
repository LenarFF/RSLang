
import { setUserAnswer } from '../../api/games';
import { getWords } from '../../api/textbook';
import { AnswerCard } from '../../components/AnswerCard/AnswerCard';
import { Control } from '../../components/Control';
import { GameResults } from '../../components/GameResults/GameResults';
import { baseURL, MAX_PAGES, WORDS_ON_PAGE } from '../../constants/api';
import { Statistics } from '../../core/statistics';
import { IWord } from '../../types/interface';
import { Games } from '../../types/statistics';
import './audio-challenge-game.scss';

class AudioChallengeGame extends Control {
  words: IWord[];

  answers: IWord[];

  answerBtns: HTMLElement[];

  rightAnswers: IWord[];

  wrongAnswers: IWord[];

  selectWindow: HTMLElement;

  currentQuestion = 0;

  answersQuantity = 5;

  answerCard: AnswerCard | null;

  gameResults: GameResults | null;

  container = new Control(this.node, 'div', 'challenge-page__container');

  top = new Control(this.container.node, 'div', 'challenge-page__top');

  audioImg = new Control(this.top.node, 'div', 'challenge-page__audio-img');

  variants = new Control(this.container.node, 'div', 'challenge-page__variants');

  controlBtn = new Control(this.container.node, 'button', 'challenge-page__control-btn', 'не знаю');

  constructor(group: number, selectWindow: HTMLElement, page?: number) {
    super(null, 'main', 'challenge-page');
    this.words = [];
    this.answers = [];
    this.answerBtns = [];
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.answerCard = null;
    this.gameResults = null;
    this.getAllWords(group, page);
    this.selectWindow = selectWindow;

    this.controlBtn.node.setAttribute('data-next', 'false');

    this.controlBtn.node.addEventListener('click', () => this.handleControl());
    this.variants.node.addEventListener('click', (e) => this.handleAnswer(e));
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  showNextQuestion(): void {
    if (this.currentQuestion >= WORDS_ON_PAGE - 1) {
      this.gameResults = new GameResults(
        this,
        this.rightAnswers,
        this.wrongAnswers,
        this.selectWindow,
      );
      return;
    }
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

  handleControl(): void {
    if (this.controlBtn.node.dataset.next === 'true') {
      this.showNextQuestion();      
    } else {
      setUserAnswer(this.words[this.currentQuestion].id as string, false);
      Statistics.handleAnswer(this.words[this.currentQuestion].id as string, Games.audio, false);
      this.showRightAnswer(this.words[this.currentQuestion]);
      this.wrongAnswers.push(this.words[this.currentQuestion]);
    }
  }

  checkAnswer = async (answerBtn: HTMLElement, rightAnswer: IWord): Promise<void> => {
    if (rightAnswer.id) {
      if (answerBtn.dataset.wordid !== rightAnswer.id) {
        answerBtn.classList.add('challenge-page__variant-btn_wrong');
        this.wrongAnswers.push(rightAnswer);
        setUserAnswer(rightAnswer.id, false);
        Statistics.handleAnswer(rightAnswer.id, Games.audio, false);
      } else {
        this.rightAnswers.push(rightAnswer);
        setUserAnswer(rightAnswer.id, true);
        Statistics.handleAnswer(rightAnswer.id, Games.audio, true);
      }
    }
  };

  handleKeyboard(e: KeyboardEvent): void {
    if (e.code === 'Enter') {
      this.handleControl();
    } else if (Number(e.key) >= 1 && Number(e.key) <= 5) {
      const answerBtn = this.answerBtns.filter((btn) => btn.dataset.num === e.key)[0];
      const event = new Event('click', { bubbles: true });
      answerBtn.dispatchEvent(event);
    }
  }

  async getAllWords(group: number, page = this.getRandomNum(MAX_PAGES)): Promise<void> {
    this.words = await getWords(String(group), String(page));
    this.getAnswers();
  }

  shuffleArray = (arr: IWord[]): IWord[] => arr.sort(() => Math.random() - 0.5);

  getAnswers(): void {
    this.answers.push(this.words[this.currentQuestion]);
    while (this.answers.length < this.answersQuantity) {
      const answer = this.words[this.getRandomNum(WORDS_ON_PAGE)];
      if (!this.answers.includes(answer)) this.answers.push(answer);
    }
    this.shuffleArray(this.answers);
    this.renderAnswers();
  }

  renderAnswers(): void {
    this.answers.map((word, index) => {
      const answerBtn = new Control(
        this.variants.node,
        'button',
        'challenge-page__variant-btn',
        `${index + 1} ${word.wordTranslate}`,
      );
      if (word.id) answerBtn.node.setAttribute('data-wordid', word.id);
      answerBtn.node.setAttribute('data-num', String(index + 1));
      this.answerBtns.push(answerBtn.node);
      return answerBtn;
    });
    this.playAudio(this.words[this.currentQuestion].audio);
  }

  playAudio(audioSrc: string): void {
    const audio = new Control(this.variants.node, 'audio');
    audio.node.setAttribute('src', `${baseURL}/${audioSrc}`);
    audio.node.setAttribute('autoplay', 'true');
    audio.node.setAttribute('muted', 'true');
  }

  getRandomNum = (max: number): number => Math.floor(Math.random() * max);

  showRightAnswer(rightAnswer: IWord): void {
    const rightBtns = this.answerBtns.filter(
      (btn) => (btn as HTMLElement).dataset.wordid === rightAnswer.id,
    );
    rightBtns[0].classList.add('challenge-page__variant-btn_right');
    this.controlBtn.node.innerText = 'следующий';
    this.controlBtn.node.setAttribute('data-next', 'true');
    this.audioImg.destroy();
    this.answerCard = new AnswerCard(this.top.node, rightAnswer);
    this.disableBtn(this.answerBtns);
  }

  handleAnswer = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const answer = target.dataset.wordid;
    const rightAnswer = this.words[this.currentQuestion];
    if (!answer || !!target.getAttribute('disabled')) return;
    this.checkAnswer(target, rightAnswer);
    this.showRightAnswer(rightAnswer);
  };

  disableBtn = (btns: HTMLElement[]): void => btns.forEach((btn) => btn.setAttribute('disabled', 'true'));

  enableBtn = (btns: HTMLElement[]): void => btns.forEach((btn) => btn.removeAttribute('disabled'));
}
export { AudioChallengeGame };
