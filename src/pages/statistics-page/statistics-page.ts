import { Control } from '../../components/Control';
import { DayStatistics } from '../../components/DayStatistics/DayStatistics';
import { statistics } from '../../data/statistics';
import './statisticsPage.scss';

class StatisticsPage extends Control {
  title = new Control(this.node, 'h2', 'statistics-page__title', 'Статистика');
  constructor(parent: HTMLElement) {
    super(parent, 'main', 'statistics-page');
    Object.keys(statistics).map((date) => new DayStatistics(this.node, statistics[date], date));
  }
}

export { StatisticsPage };
