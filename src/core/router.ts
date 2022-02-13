import { MainPage } from '../pages/main-page/main-page';
import { TextbookPage } from '../pages/textbook-page/textbook-page';
import { AuthorizationPage } from '../pages/authorization-page/authorization-page';
import { StatisticsPage } from '../pages/statistics-page/statistics-page';
import { GamesPage } from '../pages/games-page/games-page';
import { SprintPage } from '../pages/sprint-page/sprint-page';
import { AudioPage } from '../pages/audio-page/audio-page';
import { Control } from '../components/Control';
import { Footer } from '../components/Footer/Footer';
import { Href } from '../constants/router-refs';

interface IRoute {
  name: string;
  component: () => void;
}
export const routingPagesElements: Control[] = [];

export const routing: IRoute[] = [
  {
    name: Href.BOOK.slice(1),
    component: (): void => {
      const electronicTextbook = new TextbookPage(document.body);
      const footer = new Footer(document.body);

      routingPagesElements.push(electronicTextbook);
      routingPagesElements.push(footer);
    },
  },
  {
    name: Href.GAMES.slice(1),
    component: (): void => {
      const miniGame = new GamesPage(document.body);
      routingPagesElements.push(miniGame);
    },
  },
  {
    name: Href.SPRINT.slice(1),
    component: (): void => {
      const sprintGame = new SprintPage(document.body);
      routingPagesElements.push(sprintGame);
    },
  },
  {
    name: Href.AUDIO.slice(1),
    component: (): void => {
      const audioGame = new AudioPage(document.body);
      routingPagesElements.push(audioGame);
    },
  },
  {
    name: Href.STAT.slice(1),
    component: (): void => {
      const statistics = new StatisticsPage(
        document.body,
        'main',
        'main statistics-page',
      );
      const footer = new Footer(document.body);
      routingPagesElements.push(statistics);
      routingPagesElements.push(footer);
    },
  },
];

export const defaultRoute = {
  name: Href.MAIN.slice(1),
  component: (): void => {
    const mainPage = new MainPage(document.body);
    const footer = new Footer(document.body);

    routingPagesElements.push(mainPage);
    routingPagesElements.push(footer);
  },
};
