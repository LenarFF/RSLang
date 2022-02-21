import { Control } from '../../components/Control';
import { DayStatistics } from '../../components/DayStatistics/DayStatistics';
import { Statistics } from '../../core/statistics';
import './statisticsPage.scss';

class StatisticsPage extends Control {
  title = new Control(this.node, 'h2', 'statistics-page__title', 'Статистика');
  cardField = new Control(this.node, 'div', 'statistics-page__cardfield')

  constructor(parent: HTMLElement) {
    super(parent, 'main', 'statistics-page');
    Object.keys(Statistics.data.optional).map(
      (date) => new DayStatistics(this.cardField.node, Statistics.data.optional[date], date),
    );
  }
}

export { StatisticsPage };
