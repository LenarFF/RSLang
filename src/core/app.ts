import { routing } from './router';
import { Aside } from './asideMenu';
import { MainPage } from '../pages/mainPage';

export class App {
  constructor() {
    const aside = new Aside(document.body, 'aside', 'aside', '');
    const mainPage = new MainPage(document.body, 'main', 'main', 'MAIN-PAGE');
  }

  static enableRouteChange(): void {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      const defaultRoute = routing.find((p) => p.name === 'main-page');
      if (currentRoute) {
        currentRoute.component();
      } else if (defaultRoute) {
        defaultRoute.component();
      }
    };
  }
}
