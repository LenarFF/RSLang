import { routing, defaultRoute } from './router';
import { Aside } from './aside-menu';

export class App {
  aside = new Aside(document.body, 'aside', 'aside', '');

  enableRouteChange = (): void => {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      if (document.body.children.length > 1) {
        for (let i = document.body.children.length; i > 1; i--) {
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
