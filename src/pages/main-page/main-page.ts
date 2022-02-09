import { Control } from '../../components/Control';
import { developers } from '../../data/developers';
import { DeveloperCard } from '../../components/DeveloperCard/DeveloperCard';
import { Opportunity } from '../../components/Opportunity/Opportunity';
import './MainPage.scss';
import { opportunities } from '../../data/opportunities';

class MainPage extends Control {
  title = new Control(this.node, 'h1', 'main-page__title', 'RS Lang');

  description = new Control(
    this.node,
    'p',
    'main-page__description',
    'Это приложение поможет вам пополнить свой запас английских слов',
  );

  opportunities = new Control(this.node, 'div', 'main-page__opportunities');

  team = new Control(this.node, 'div', 'main-page__team');

  teamTitle = new Control(this.team.node, 'h2', 'main-page__team-title', 'Наша команда');

  cards = new Control(this.team.node, 'div', 'main-page__team-cards');

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'main-page');
    developers.map(
      (dev) =>
        new DeveloperCard(this.cards.node, dev.photo, dev.name, dev.description, dev.githubHref),
    );
    opportunities.map(
      (item) =>
        new Opportunity(this.opportunities.node, item.titleName, item.imageName, item.description),
    );
  }
}

export { MainPage };
