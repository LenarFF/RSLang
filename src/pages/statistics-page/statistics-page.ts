import { Control } from '../../components/Control';
import { DayStatistics } from '../../components/DayStatistics/DayStatistics';
import { Statistics } from '../../core/statistics';
import './statisticsPage.scss';

class StatisticsPage extends Control {
  title = new Control(this.node, 'h2', 'statistics-page__title', 'Статистика');

  constructor(parent: HTMLElement) {
    super(parent, 'main', 'statistics-page');
    Object.keys(Statistics.data.optional).map(
      (date) => new DayStatistics(this.node, Statistics.data.optional[date], date),
    );

    console.log(Statistics.data.optional);
  }
}

export { StatisticsPage };
