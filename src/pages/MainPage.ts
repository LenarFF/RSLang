import './MainPage.scss';
import { Control } from '../components/Control';
import { developers } from '../data/developers';
import { DeveloperCard } from '../components/DeveloperCard/DeveloperCard';

class MainPage extends Control {
  title = new Control(this.node, 'h1', 'start-page__title', 'RS Lang');

  description = new Control(
    this.node,
    'p',
    'start-page__description',
    'Это приложение поможет вам пополнить свой запас английских слов',
  );

  team = new Control(this.node, 'div', 'start-page__team');

  teamTitle = new Control(this.team.node, 'h2', 'start-page__team-title', 'Наша команда');

  cards = new Control(this.team.node, 'div', 'start-page__team-cards');

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'start-page');
    developers.map(
      (dev) => new DeveloperCard(this.cards.node, dev.photo, dev.name, dev.description, dev.githubHref),
    );
  }
}

export { MainPage };
