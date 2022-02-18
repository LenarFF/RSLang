import { getWords } from '../../api/textbook';
import { Control } from '../../components/Control';
import { WordCard } from '../../components/WordCard/WordCard';
import { MAX_GROUP, MAX_PAGES } from '../../constants/api';
import { state } from '../../state';
import { Href } from '../../constants/router-refs';
import './textbookPage.scss';

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
    this.groupField.node.addEventListener('click', (e) => this.selectGroup(e.target as HTMLElement));
    this.challengeBtn.node.addEventListener('click', () => this.addWordInfo());
    this.sprintBtn.node.addEventListener('click', () => this.addWordInfo());
    this.sprintBtn.node.setAttribute('href', Href.SPRINT);
    this.challengeBtn.node.setAttribute('href', Href.AUDIO);
  }

  async renderCards(): Promise<void> {
    const words = await getWords(this.group, this.page);
    this.cardField.node.innerHTML = '';
    words.map((word) => new WordCard(this.cardField.node, word, this.group));
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
    window.location.hash = '#mini-game';
  }
}
