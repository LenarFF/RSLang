import { Control } from '../../components/Control';
import { getWords } from '../../api/textbook';
import { GameResults } from '../../components/GameResults/GameResults';
import { Timer } from '../../components/Timer/Timer';
import { MAX_PAGES, WORDS_ON_PAGE } from '../../constants/api';
import { SPRINT_TIMER } from '../../constants/sprint';
import { IWord } from '../../types/interface';
import { audioSrc } from '../../data/sprint';
import './sprint-game.scss';
import { setUserAnswer } from '../../api/games';
import { Statistics } from '../../core/statistics';
import { Games } from '../../types/statistics';
import { state } from '../../state';

export class SprintGame extends Control {
  words: IWord[];

  answers: IWord[];

  container = new Control(this.node, 'div', 'sprint-page__container');

  score = new Control(this.container.node, 'div', 'sprint-page__score');

  currScore = 0;

  gameResults: GameResults | null;

  increment = new Control(
    this.container.node,
    'div',
    'sprint-page__increment',
    '+10 очков за слово',
  );

  incrementFactor = 1;

  triplets = new Control(this.container.node, 'div', 'sprint-page__triplets');

  tripletsCount = -1;

  tripletArr: string[];

  wordBox = new Control(this.container.node, 'div', 'sprint-page__word-box');

  newWord = new Control(this.container.node, 'div', 'sprint-page__word');

  wordTranslate = new Control(this.container.node, 'div', 'sprint-page__word-translate');

  answersBox = new Control(this.container.node, 'div', 'sprint-page__answers');

  rightAnswers: IWord[];

  wrongAnswers: IWord[];

  currentQuestion = 0;

  answersQuantity = 20;

  wrongBtn = new Control(this.answersBox.node, 'button', 'sprint-page__control-btn', 'не верно');

  rightBtn = new Control(this.answersBox.node, 'button', 'sprint-page__control-btn', 'верно');

  audioWrong = new Control(this.container.node, 'audio');

  audioRight = new Control(this.container.node, 'audio');

  selectWindow: HTMLElement;

  timerPic = new Control(this.container.node, 'div', 'sprint-page__timer');

  timer = new Timer(this.timerPic.node);

  constructor(group: number, selectWindow: HTMLElement, page?: number) {
    super(null, 'main', 'sprint-page');
    this.words = [];
    this.tripletArr = [];
    this.gameResults = null;
    this.selectWindow = selectWindow;

    [...new Array(3)].forEach((elem, index) => {
      const triplet = new Control(this.triplets.node, 'span', 'sprint-page__triplet', '');
      triplet.node.setAttribute('data-triplet', `${index + 1}`);
      triplet.node.setAttribute('style', `--i:${index}`);
      this.tripletArr.push(triplet.node.innerText);
    });
    this.wrongBtn.node.setAttribute('data-answer', 'false');
    this.rightBtn.node.setAttribute('data-answer', 'true');
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.answers = [];
    this.getAllWords(group, page);
    this.audioRight.node.setAttribute('src', audioSrc.right);
    this.audioWrong.node.setAttribute('src', audioSrc.wrong);
    (this.audioRight.node as HTMLAudioElement).volume = 0.5;
    (this.audioWrong.node as HTMLAudioElement).volume = 0.5;
    this.answersBox.node.addEventListener('click', (e) => this.handleControl(e));
    this.timer.start(SPRINT_TIMER);
    this.timer.onTimeout = () => {
      this.timer.stop();
      this.gameResults = new GameResults(
        this,
        this.rightAnswers,
        this.wrongAnswers,
        this.selectWindow,
      );
    };
  }

  handleControl(e: MouseEvent): void {
    if ((e.target as HTMLElement).dataset.answer !== undefined) {
      this.checkAnswer((e.target as HTMLElement).dataset.answer);
      this.showNextQuestion();
    }
  }

  checkAnswer(value: string | undefined): void {
    const word = this.words[this.currentQuestion].wordTranslate;
    const answer = this.answers[this.currentQuestion].wordTranslate;
    const wordID = this.words[this.currentQuestion].id as string;
    if ((value === 'true' && word === answer) || (value === 'false' && word !== answer)) {
      this.rightAnswers.push(this.words[this.currentQuestion]);
      this.indicateAnswer('true');
      this.playAudio('true');
      setUserAnswer(this.words[this.currentQuestion].id as string, true);
      Statistics.handleAnswer(wordID, Games.sprint, true);
    } else {
      setUserAnswer(this.words[this.currentQuestion].id as string, false);
      this.wrongAnswers.push(this.words[this.currentQuestion]);
      this.indicateAnswer('false');
      this.playAudio('false');
      Statistics.handleAnswer(wordID, Games.sprint, false);
    }
  }

  indicateAnswer(value: string | undefined): void {
    // console.log(this.tripletsCount);
    if (value === 'true') {
      this.tripletsCount++;
      // console.log(this.tripletsCount);
      this.currScore += 10 * this.incrementFactor;
      if (this.tripletsCount <= 3) {
        if (this.tripletsCount !== 3) {
          // console.log('add triplet-active');
          this.triplets.node.children[this.tripletsCount].classList.add('triplet-active');
        } else {
          // console.log('clear1');
          this.clearTriplets();
          this.incrementFactor++;
          this.tripletsCount = -1;
        }
      } else {
        // console.log('clear2');
        this.tripletsCount = -1;
        this.clearTriplets();
      }
    } else {
      // console.log('clear3');
      this.incrementFactor = 1;
      this.tripletsCount = -1;
      this.clearTriplets();
    }
  }

  renderGameFields(nextNum: number): void {
    if (this.currentQuestion > this.words.length - 1) {
      this.timer.stop();
      this.gameResults = new GameResults(
        this,
        this.rightAnswers,
        this.wrongAnswers,
        this.selectWindow,
      );
      return;
    }
    this.newWord.node.innerText = this.words[nextNum].word;
    this.wordTranslate.node.innerText = this.answers[nextNum].wordTranslate;
    this.score.node.innerText = String(this.currScore);
    this.increment.node.innerText = `+${10 * this.incrementFactor} очков за слово`;
  }

  clearTriplets(): void {
    const test = Array.from(this.triplets.node.children);
    test.forEach((elem) => (elem as HTMLElement).classList.remove('triplet-active'));
  }

  showNextQuestion(): void {
    this.currentQuestion++;
    this.renderGameFields(this.currentQuestion);
  }

  async getAllWords(group: number, page = this.getRandomNum(MAX_PAGES)): Promise<void> {
    this.words = state.words ? state.words: await getWords(String(group), String(page));
    this.getAnswers();
    console.log(this.words);
    
  }

  getRandomNum = (max: number): number => Math.floor(Math.random() * max);

  getAnswers(): void {
    this.answers = [...this.words];
    let count = 0;
    const newArray = [...Array(10)]
      .map((elem, index) => {
        const temp = this.answers.slice(count, 2 + 2 * index);
        count = 2 + 2 * index;
        return [...this.shuffleArray(temp)];
      })
      .flat();
    this.answers.length = 0;
    this.answers = [...newArray];
    this.renderGameFields(this.currentQuestion);
  }

  shuffleArray = (arr: IWord[]): IWord[] => arr.sort(() => Math.random() - 0.5);

  playAudio(isCorrect: string): void {
    const audioRight = this.audioRight.node as HTMLAudioElement;
    const audioWrong = this.audioWrong.node as HTMLAudioElement;
    if (isCorrect === 'true') {
      audioRight.play();
      audioRight.currentTime = 0;
    } else {
      audioWrong.play();
      audioWrong.currentTime = 0;
    }
  }
}
