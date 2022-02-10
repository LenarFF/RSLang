import { routing } from './router';
import { Aside } from './aside-menu';
import { Footer } from '../components/Footer/Footer';

export class App {
  aside = new Aside(document.body, 'aside', 'aside', '');

  footer = new Footer(document.body);

  enableRouteChange = (): void => {
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

    const popstateEvent = new Event('popstate');
    window.dispatchEvent(popstateEvent);
  };
}
