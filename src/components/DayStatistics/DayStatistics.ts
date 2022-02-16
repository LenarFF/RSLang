import { IDate } from '../../data/statistics';
import { Control } from '../Control';
import { StatisticsCard } from '../StatisticsCard/StatisticsCard';
import './DayStatistics.scss';

class DayStatistics extends Control {
  title: Control;
  dayStatCard: StatisticsCard;
  constructor(parent: HTMLElement, games: IDate, date: string) {
    super(parent, 'div', 'statistics-day');
    this.title = new Control(this.node, 'h3', 'statistics-day__title', date);
    

    const dayStats = Object.keys(games).reduce(
      (prev, key) => {
        prev.learnedWords += games[key].learnedWords;
        prev.rightAnswers += games[key].rightAnswers;       
        return prev;
      },
      { learnedWords: 0, rightAnswers: 0, series: null },
    );

    this.dayStatCard = new StatisticsCard(this.node, 'Общая статистика', dayStats);
    Object.keys(games).map((game) => new StatisticsCard(this.node, game, games[game]));
  }  
}

export { DayStatistics };
