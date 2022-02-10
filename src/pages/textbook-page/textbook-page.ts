import { getWords } from '../../api/textbook';
import { Control } from '../../components/Control';
import { WordCard } from '../../components/WordCard/WordCard';
import { MAX_PAGES } from '../../constants/api';
import './textbookPage.scss';

export class TextbookPage extends Control {
  title = new Control(this.node, 'h2', 'textbook-page__title', 'Электронный учебник');
  group = 0;
  page = 0;
  pages = new Control(this.node, 'div', 'textbook-page__pages');
  leftBtn = new Control(this.pages.node, 'div', 'textbook-page__left-btn');
  pagesTitle = new Control(this.pages.node, 'p', 'textbook-page__pages-title', `Страница `);
  counter = new Control(
    this.pagesTitle.node,
    'span',
    'textbook-page__pages-counter',
    `${this.page + 1}`,
  );
  rightBtn = new Control(this.pages.node, 'div', 'textbook-page__right-btn');

  cardField = new Control(this.node, 'div', 'textbook-page__cardfield');
  constructor(parent: HTMLElement) {
    super(parent, 'main', 'textbook-page');

    this.renderCards();
    this.leftBtn.node.addEventListener('click', () => this.handleLeft());
    this.rightBtn.node.addEventListener('click', () => this.handleRight());
  }

  async renderCards(): Promise<void> {
    const words = await getWords(this.group, this.page);
    this.cardField.node.innerHTML = '';
    console.log(this.page);

    words.map((word) => new WordCard(this.cardField.node, word));
  }

  handleLeft(): void {
    if (this.page <= 0) return;
    this.page--;
    this.counter.node.innerText = String(this.page + 1);

    this.renderCards();
  }

  handleRight(): void {
    if (this.page >= MAX_PAGES) return;
    this.page++;
    this.counter.node.innerText = String(this.page + 1);
    this.renderCards();
  }
  
}
