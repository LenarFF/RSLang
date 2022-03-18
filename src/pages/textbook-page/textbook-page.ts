import { getAggregatedWords, getWords } from '../../api/textbook';
import { Control } from '../../components/Control';
import { WordCard } from '../../components/WordCard/WordCard';
import {
  Filter,
  MAX_GROUP,
  MAX_PAGES,
  TEXTBOOK_INFO,
  USER_DATA,
  WORDS_ON_PAGE,
} from '../../constants/api';
import { state } from '../../state';
import { Href } from '../../constants/router-refs';
import './textbookPage.scss';
import { Difficulty } from '../../constants/textbook';
import { IWord } from '../../types/interface';

export class TextbookPage extends Control {
  title = new Control(this.node, 'h2', 'textbook-page__title', 'Электронный учебник');

  group = 0;

  page = 0;

  words: IWord[] | [];

  pages = new Control(this.node, 'div', 'textbook-page__pages');

  leftBtn = new Control(this.pages.node, 'div', 'textbook-page__left-btn');

  pagesTitle = new Control(this.pages.node, 'p', 'textbook-page__pages-title', 'Страница ');

  counter: Control;

  rightBtn = new Control(this.pages.node, 'div', 'textbook-page__right-btn');

  cardField = new Control(this.node, 'div', 'textbook-page__cardfield');

  groupField = new Control(this.node, 'div', 'textbook-page__groupfield');

  games = new Control(this.node, 'div', 'textbook-page__games');

  sprintBtn = new Control(this.games.node, 'button', 'textbook-page__games-btn');

  sprintSpan = new Control(this.sprintBtn.node, 'span', 'textbook-page__games-span', 'Спринт');

  challengeBtn = new Control(this.games.node, 'button', 'textbook-page__games-btn');

  challengeSpan = new Control(
    this.challengeBtn.node,
    'span',
    'textbook-page__games-span',
    'Аудиовызов',
  );

  constructor(parent: HTMLElement) {
    super(parent, 'main', 'textbook-page');
    this.loadTextbookInfo();
    this.renderCards();
    this.renderGroup();

    this.words = [];

    this.counter = new Control(
      this.pagesTitle.node,
      'span',
      'textbook-page__pages-counter',
      `${this.page + 1}`,
    );

    this.leftBtn.node.addEventListener('click', () => this.handleLeft());
    this.rightBtn.node.addEventListener('click', () => this.handleRight());
    this.groupField.node.addEventListener('click', (e) => this.selectGroup(e.target as HTMLElement));
    this.challengeBtn.node.addEventListener('click', () => this.addWordInfo(Href.AUDIO));
    this.sprintBtn.node.addEventListener('click', () => this.addWordInfo(Href.SPRINT));

    window.addEventListener('beforeunload', () => this.saveTextbookInfo());
    window.addEventListener('click', () => this.addLearnedStylePage());
  }

  addLearnedStylePage(): void {
    const cards = [...this.cardField.node.children];
    const markedCards = cards.filter(
      (card) => card.classList.contains('word-card_difficult')
        || card.classList.contains('word-card_studied'),
    );
    if (markedCards.length >= WORDS_ON_PAGE) {
      this.pages.node.classList.add('textbook-page__marked');
      this.challengeBtn.node.setAttribute('disabled', 'true');
      this.sprintBtn.node.setAttribute('disabled', 'true');
    } else {
      this.pages.node.classList.remove('textbook-page__marked');
      this.challengeBtn.node.removeAttribute('disabled');
      this.sprintBtn.node.removeAttribute('disabled');
    }
  }

  loadTextbookInfo(): void {
    const localStorageInfo = localStorage.getItem(TEXTBOOK_INFO);
    if (localStorageInfo) {
      const info = JSON.parse(localStorageInfo);
      this.group = info.group;
      this.page = info.page;
    }
  }

  saveTextbookInfo(): void {
    localStorage.setItem(TEXTBOOK_INFO, JSON.stringify({ group: this.group, page: this.page }));
  }

  renderStatistics = (parent: HTMLElement, right: number, wrong: number): void => {
    const stat = new Control(parent, 'div', 'word-card__statistics');
    const title = new Control(null, 'h4', 'word-card__statistics-title', 'Ответы в играх');
    const answers = new Control(
      null,
      'p',
      'word-card__statistics-count',
      `Верно: ${right} Неверно: ${wrong}`,
    );
    stat.node.append(title.node, answers.node);
  };

  async renderCards(): Promise<void> {
    const [words, userWords] = await Promise.all([
      getWords(String(this.group), String(this.page)),
      getAggregatedWords(Filter.all),
    ]);

    this.words = words;
    this.cardField.node.innerHTML = '';
    words.map((word) => {
      const userWordData = userWords.filter((userWord) => userWord._id === word.id)[0];

      const wordCard = new WordCard(this.cardField.node, word, this.group);
      if (userWordData && userWordData.userWord?.difficulty === Difficulty.hard) {
        wordCard.node.classList.add('word-card_difficult');
        wordCard.disableButtons([...wordCard.controls.node.children]);
      } else if (userWordData && userWordData.userWord?.difficulty === Difficulty.easy) {
        wordCard.node.classList.add('word-card_studied');
        wordCard.disableButtons([...wordCard.controls.node.children]);
      }
      if (userWordData && userWordData.userWord && userWordData.userWord.optional) {
        this.renderStatistics(
          wordCard.text.node,
          userWordData.userWord.optional?.right,
          userWordData.userWord?.optional?.wrong,
        );
      } else {
        this.renderStatistics(wordCard.text.node, 0, 0);
      }
      return wordCard;
    });
    this.addLearnedStylePage();
    this.pages.node.classList.remove('hidden');
  }

  async renderDifficultCards(): Promise<void> {
    const words = await getAggregatedWords(Filter.difficult);
    this.cardField.node.innerHTML = '';
    if (words) {
      words.map((word) => new WordCard(this.cardField.node, word, MAX_GROUP));
    }
    this.pages.node.classList.add('hidden');
  }

  renderGroup(): void {
    [...new Array(MAX_GROUP)].map((group, index) => {
      const groupBtn = new Control(
        this.groupField.node,
        'button',
        `textbook-page__groupfield-btn textbook-page__groupfield-btn_${index + 1}`,
        `${index + 1}`,
      );
      groupBtn.node.setAttribute('data-num', `${index + 1}`);
      groupBtn.node.setAttribute('title', 'Выберите раздел');

      return groupBtn;
    });
    if (localStorage.getItem(USER_DATA)) {
      const difficultGroup = new Control(
        this.groupField.node,
        'button',
        `textbook-page__groupfield-btn textbook-page__groupfield-btn_${MAX_GROUP + 1}`,
        '!',
      );
      difficultGroup.node.addEventListener('click', () => this.renderDifficultCards());
    }
  }

  handleLeft(): void {
    if (this.page <= 0) return;
    this.page--;
    this.counter.node.innerText = String(this.page + 1);
    this.renderCards();
  }

  handleRight(): void {
    if (this.page >= MAX_PAGES - 1) return;
    this.page++;
    this.counter.node.innerText = String(this.page + 1);
    this.renderCards();
  }

  selectGroup(target: HTMLElement): void {
    if (!target.dataset.num) return;
    this.page = 0;
    if (this.counter.node) this.counter.node.innerHTML = String(this.page + 1);
    this.group = Number(target.dataset.num) - 1;
    this.renderCards();
  }

  async addWordInfo(href: Href): Promise<void> {
    this.challengeBtn.node.setAttribute('disabled', 'true');
    this.sprintBtn.node.setAttribute('disabled', 'true');
    state.group = this.group;
    state.page = this.page;
    const userWords = await getAggregatedWords(Filter.easy);
    const easyWords = userWords.filter(
      (userWord) => userWord.userWord?.difficulty === Difficulty.easy,
    );
    const easyWordsID = easyWords.map((item) => item._id);
    const notEasyWords = this.words.filter((word) => {
      if (word.id) {
        return !easyWordsID.includes(word.id);
      }
      return undefined;
    });

    if (notEasyWords.length < WORDS_ON_PAGE / 2) {
      this.page = this.page < MAX_PAGES ? this.page + 1 : 0;
      const nextPageWords = await getWords(String(this.group), String(this.page));
      this.words = [...this.words, ...nextPageWords];
      this.addWordInfo(href);
    } else {
      state.words = notEasyWords.slice(0, WORDS_ON_PAGE - 1);
      window.location.hash = href;
    }
  }
}
