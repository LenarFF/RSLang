import { routing, defaultRoute } from './router';
import { Aside } from './AsideMenu/aside-menu';
import { AuthorizationButton } from '../components/AuthorizationButton/AuthorizationButton';
import { AuthorizationForm } from '../components/AuthorizationForm/AuthorizationForm';
import { BurgerMenu } from '../components/BurgerMenu/BurgerMenu';

export class App {
  aside = new Aside(document.body, 'aside', 'aside hidden', '');

  authorizationForm = new AuthorizationForm(document.body);

  burgerMenu = new BurgerMenu(document.body);

  authorizationButton = new AuthorizationButton(document.body);

  changeMenuLinkColor = (currentRouteName: string): void => {
    const menuLinks = [...document.querySelectorAll('.menu-name a')];
    menuLinks.map((a) => a.classList.remove('current-item'));
    const currentLink = menuLinks.filter(
      (a) => (a.getAttribute('href') as string).slice(1) === currentRouteName.split('/')[0],
    )[0];
    currentLink.classList.add('current-item');
  };

  enableRouteChange = (): void => {
    window.onpopstate = () => {
      const currentRouteName = window.location.hash.slice(1);
      this.changeMenuLinkColor(currentRouteName);
      const currentRoute = routing.find((p) => p.name === currentRouteName);
      if (document.body.children.length > 1) {
        for (let i = document.body.children.length; i > 4; i--) {
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
