import { GamesName } from '../../constants/textbook';
import { IGameStat } from '../../types/statistics';
import { Control } from '../Control';
import './StatisticsCard.scss';

class StatisticsCard extends Control {
  title: Control;

  learnedWords: Control;

  rightAnswers: Control;

  series: Control | null;

  constructor(parent: HTMLElement, title: string, gameStat: IGameStat) {
    super(parent, 'div', 'statistics-card');
    const { answers, right, newWord, maxSeries } = gameStat;
    const titleName = title === GamesName.audio ? 'Аудиовызов' : 'Спринт'; 
    this.title = new Control(this.node, 'h3', 'statistics-card__title', titleName);

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
      `Самая длинная серия: ${maxSeries}`,
    );
  }
}

export { StatisticsCard };
