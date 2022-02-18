import { getAggregatedWords, getWords } from '../../api/textbook';
import { Control } from '../../components/Control';
import { WordCard } from '../../components/WordCard/WordCard';
import { Filter, MAX_GROUP, MAX_PAGES } from '../../constants/api';
import { state } from '../../state';
import { Href } from '../../constants/router-refs';
import './textbookPage.scss';
import { IWord } from '../../types/interface';
import { Difficulty } from '../../constants/textbook';

export class TextbookPage extends Control {
  title = new Control(this.node, 'h2', 'textbook-page__title', 'Электронный учебник');

  group = 0;

  page = 0;

  pages = new Control(this.node, 'div', 'textbook-page__pages');

  leftBtn = new Control(this.pages.node, 'div', 'textbook-page__left-btn');

  pagesTitle = new Control(this.pages.node, 'p', 'textbook-page__pages-title', 'Страница ');

  counter = new Control(
    this.pagesTitle.node,
    'span',
    'textbook-page__pages-counter',
    `${this.page + 1}`,
  );

  rightBtn = new Control(this.pages.node, 'div', 'textbook-page__right-btn');

  cardField = new Control(this.node, 'div', 'textbook-page__cardfield');

  groupField = new Control(this.node, 'div', 'textbook-page__groupfield');

  games = new Control(this.node, 'div', 'textbook-page__games');

  sprintBtn = new Control(this.games.node, 'a', 'textbook-page__games-btn', 'Спринт');

  challengeBtn = new Control(this.games.node, 'a', 'textbook-page__games-btn', 'Аудиовызов');

  constructor(parent: HTMLElement) {
    super(parent, 'main', 'textbook-page');

    this.renderCards();
    this.renderGroup();

    this.leftBtn.node.addEventListener('click', () => this.handleLeft());
    this.rightBtn.node.addEventListener('click', () => this.handleRight());
    this.groupField.node.addEventListener('click', (e) =>
      this.selectGroup(e.target as HTMLElement),
    );
    this.challengeBtn.node.addEventListener('click', () => this.addWordInfo());
    this.sprintBtn.node.addEventListener('click', () => this.addWordInfo());
    this.sprintBtn.node.setAttribute('href', Href.SPRINT);
    this.challengeBtn.node.setAttribute('href', Href.AUDIO);
  }

  renderStatistics(parent: HTMLElement, right: number, wrong: number) {
    const stat = new Control(parent, 'div', 'word-card__statistics');
    new Control(stat.node, 'h4', 'word-card__statistics-title', 'Ответы в играх');
    new Control(stat.node, 'p', 'word-card__statistics-count', `Верно: ${right} Неверно: ${wrong}`);
  }

  async renderCards(): Promise<void> {
    const [words, userWords] = await Promise.all([
      getWords(String(this.group), String(this.page)),
      getAggregatedWords(Filter.all, String(this.group), String(this.page)),
    ]);
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
  }

  async renderDifficultCards() {
    const words = await getAggregatedWords(Filter.difficult);
    this.cardField.node.innerHTML = '';
    if (words) {
      words.map((word) => new WordCard(this.cardField.node, word, MAX_GROUP));
    }
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
    const difficultGroup = new Control(
      this.groupField.node,
      'button',
      `textbook-page__groupfield-btn textbook-page__groupfield-btn_${MAX_GROUP + 1}`,
      '!',
    );
    difficultGroup.node.addEventListener('click', () => this.renderDifficultCards());
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
    this.group = Number(target.dataset.num) - 1;
    this.renderCards();
  }

  addWordInfo(): void {
    state.group = this.group;
    state.page = this.page;
    window.location.hash = Href.GAMES;
  }
}
