import { Control } from '../Control';
import './WordStatisticsCard.scss';

interface IStatisticCard {
  answers: number;
  right: number;
  newWord: number;
  learned: number;
}

class WordStatisticsCard extends Control {
  title: Control;

  learnedWords: Control;

  rightAnswers: Control;

  series: Control | null;

  constructor(parent: HTMLElement, title: string, gameStat: IStatisticCard) {
    super(parent, 'div', 'statistics-card');
    const {
      answers, right, newWord, learned,
    } = gameStat;
    this.title = new Control(this.node, 'h3', 'statistics-card__title', title);

    this.learnedWords = new Control(
      this.node,
      'p',
      'statistics-card__text',
      `Количество новых слов: ${newWord}`,
    );
    this.rightAnswers = new Control(
      this.node,
      'p',
      'statistics-card__text',
      `Процент правильных ответов: ${Math.round((right / answers) * 100) || 0}%`,
    );
    this.series = new Control(
      this.node,
      'p',
      'statistics-card__text',
      `Изученные слова: ${learned}`,
    );
  }
}

export { WordStatisticsCard };
