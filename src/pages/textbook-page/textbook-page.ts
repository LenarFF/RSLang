import { getWords } from '../../api/textbook';
import { Control } from '../../components/Control';
import { WordCard } from '../../components/WordCard/WordCard';
import './textbookPage.scss'

export class TextbookPage extends Control {
  title = new Control(this.node, 'h2', 'textbook-page__title', 'Электронный учебник');
  cardField = new Control(this.node, 'div', 'textbook-page__cardfield');
  constructor(parent: HTMLElement) {
    super(parent, 'main', 'textbook-page');
    this.renderCards();
  }

  async renderCards() {
    const words = await getWords();
    words.map((word) => new WordCard(this.cardField.node, word));
  }
}
