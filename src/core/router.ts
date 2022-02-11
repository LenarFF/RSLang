import { MainPage } from '../pages/main-page/main-page';
import { TextbookPage } from '../pages/textbook-page/textbook-page';
import { AuthorizationPage } from '../pages/authorization-page/authorization-page';
import { StatisticsPage } from '../pages/statistics-page/statistics-page';
import { GamesPage } from '../pages/games-page/games-page';
import { SprintPage } from '../pages/sprint-page/sprint-page';
import { AudioPage } from '../pages/audio-page/audio-page';
import { Control } from '../components/Control';
import { Footer } from '../components/Footer/Footer';

interface IRoute {
  name: string;
  component: () => void;
}
export const routingPagesElements: Control[] = [];

export const routing: IRoute[] = [
  {
    name: 'electronic-textbook',
    component: (): void => {
      const electronicTextbook = new TextbookPage(document.body);
      const footer = new Footer(document.body);

      routingPagesElements.push(electronicTextbook);
      routingPagesElements.push(footer);
    },
  },
  {
    name: 'authorization',
    component: (): void => {
      const authorization = new AuthorizationPage(
        document.body,
        'main',
        'main authorization-page',
        'AUTHORIZATION-PAGE',
      );
      const footer = new Footer(document.body);
      routingPagesElements.push(authorization);
      routingPagesElements.push(footer);
    },
  },
  {
    name: 'mini-game',
    component: (): void => {
      const miniGame = new GamesPage(document.body);
      routingPagesElements.push(miniGame);
    },
  },
  {
    name: 'mini-game/sprint',
    component: (): void => {
      const sprintGame = new SprintPage(document.body);
      routingPagesElements.push(sprintGame);
    },
  },
  {
    name: 'mini-game/audio',
    component: (): void => {
      const audioGame = new AudioPage(document.body);
      routingPagesElements.push(audioGame);
    },
  },
  {
    name: 'statistics',
    component: (): void => {
      const statistics = new StatisticsPage(
        document.body,
        'main',
        'main statistics-page',
        'STATISTICS',
      );
      const footer = new Footer(document.body);
      routingPagesElements.push(statistics);
      routingPagesElements.push(footer);
    },
  },
];

export const defaultRoute = {
  name: 'main-page',
  component: (): void => {
    const mainPage = new MainPage(document.body);
    const footer = new Footer(document.body);

    window.location.hash = '#main-page';
    routingPagesElements.push(mainPage);
    routingPagesElements.push(footer);
  },
};
