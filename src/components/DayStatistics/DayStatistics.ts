import { IGeneralStat } from '../../types/statistics';
import { Control } from '../Control';
import { StatisticsCard } from '../StatisticsCard/StatisticsCard';
import { WordStatisticsCard } from '../WordStatisticsCard/WordStatisticsCard';
import './DayStatistics.scss';

class DayStatistics extends Control {
  title: Control;

  dayStatCard: StatisticsCard;

  constructor(parent: HTMLElement, general: IGeneralStat, date: string) {
    super(parent, 'div', 'statistics-day');
    const newDate = date === new Date().toISOString().slice(0, 10) ? 'Сегодня' : date;
    this.title = new Control(this.node, 'h3', 'statistics-day__title', newDate);

    const dayStats = Object.keys(general.games).reduce(
      (prev, game) => {
        prev.answers += general.games[game].answers;
        prev.right += general.games[game].right;
        prev.newWord += general.games[game].newWord;
        prev.learned = general.learnedWords;
        return prev;
      },
      {
        answers: 0,
        right: 0,
        newWord: 0,
        learned: 0,
      },
    );

    this.dayStatCard = new WordStatisticsCard(this.node, 'Общая статистика', dayStats);
    Object.keys(general.games).map(
      (game) => new StatisticsCard(this.node, game, general.games[game]),
    );
  }
}

export { DayStatistics };
