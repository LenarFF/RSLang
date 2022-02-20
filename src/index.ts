import { setStatistic } from './api/statistics';
import { App } from './core/app';
import { Statistics } from './core/statistics';
import './style.scss';

const stat = new Statistics();
stat.setStat();
console.log(Statistics.data);
const app = new App();
app.enableRouteChange();
