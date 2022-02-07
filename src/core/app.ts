import { routing } from './router';
import { Aside } from './AsideMenu';

export class App {
  aside = new Aside(document.body, 'aside', 'aside', '');

  enableRouteChange = () : void => {
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
