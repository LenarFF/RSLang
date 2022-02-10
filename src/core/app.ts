import { routing, defaultRoute } from './router';
import { Aside } from './aside-menu';
import {AuthorizationButton} from '../components/AuthorizationButton/AuthorizationButton'

export class App {
  aside = new Aside(document.body, 'aside', 'aside', '');
  authorizationButton = new AuthorizationButton(document.body);

  enableRouteChange = (): void => {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      if (document.body.children.length > 1) {
        for (let i = document.body.children.length; i > 2; i--) {
          document.body.children[document.body.children.length - 1].remove();
        }
      }

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
