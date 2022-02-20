import { App } from './core/app';
import { Statistics } from './core/statistics';
import './style.scss';

const stat = new Statistics();
stat.setStat();
const app = new App();
app.enableRouteChange();
