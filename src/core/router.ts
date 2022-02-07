import { MainPage } from '../pages/main-page/main-page';
import { ElectronicTextbook } from '../pages/textbook-page';
import { AuthorizationPage } from '../pages/authorization-page';
import { StatisticsPage } from '../pages/statistics-page';
import { GamesPage } from '../pages/games-page';
import { Control } from './controls';

interface IRoute {
  name: string;
  component: () => void;
}
export const routingPagesElements: Control[] = [];

export const routing: IRoute[] = [
  {
    name: 'electronic-textbook',
    component: ():void => {
      if (document.body.children[1]) {
        document.body.children[1].remove();
      }
      const electronicTextbook = new
      ElectronicTextbook(document.body, 'main', 'main electronic-textbook', 'ELECTRONIC-TEXTBOOK');
      routingPagesElements.push(electronicTextbook);
    },
  },
  {
    name: 'authorization',
    component: ():void => {
      if (document.body.children[1]) {
        document.body.children[1].remove();
      }
      const authorization = new
      AuthorizationPage(document.body, 'main', 'main authorization-page', 'AUTHORIZATION-PAGE');
      routingPagesElements.push(authorization);
    },
  },
  {
    name: 'mini-game',
    component: ():void => {
      if (document.body.children[1]) {
        document.body.children[1].remove();
      }
      const miniGame = new GamesPage(document.body, 'main', 'main mini-game', 'MINI-GAME');
      routingPagesElements.push(miniGame);
    },
  },
  {
    name: 'statistics',
    component: ():void => {
      if (document.body.children[1]) {
        document.body.children[1].remove();
      }
      const statistics = new StatisticsPage(document.body, 'main', 'main statistics-page', 'STATISTICS');
      routingPagesElements.push(statistics);
    },
  },
  {
    name: 'main-page',
    component: ():void => {
      if (document.body.children[1]) {
        document.body.children[1].remove();
      }
      const mainPage = new MainPage(document.body);
      window.location.hash = '#main-page';
      routingPagesElements.push(mainPage);
    },
  },
];
