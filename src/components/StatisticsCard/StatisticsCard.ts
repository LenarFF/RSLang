import { IGameStat } from '../../data/statistics';
import { Control } from '../Control';
import './StatisticsCard.scss';

class StatisticsCard extends Control {
  title: Control
  learnedWords: Control;
  rightAnswers: Control;
  series: Control | null;
  constructor(parent: HTMLElement, title: string, gameStat: IGameStat) {
    super(parent, 'div', 'statistics-card');
    const { learnedWords, rightAnswers, series } = gameStat;
    this.title = new Control(this.node, 'h3', 'statistics-card__title', title);

    this.learnedWords = new Control(
      this.node,
      'p',
      'statistics-card__text',
      `Количество изученных слов: ${learnedWords}`,
    );
    this.rightAnswers = new Control(
      this.node,
      'p',
      'statistics-card__text',
      `Процент правильных ответов: ${Math.round((rightAnswers / learnedWords) * 100)}%`,
    );
    this.series = series
      ? new Control(this.node, 'p', 'statistics-card__text', `Самая длинная серия: ${series}`)
      : null;
  }
}

export { StatisticsCard };