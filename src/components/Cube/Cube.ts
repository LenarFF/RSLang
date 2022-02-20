import { Control } from '../Control';
import { sideName } from '../../data/cube';
import './Cube.scss';

export class Cube extends Control {
  top = new Control(this.node, 'div', 'cube-top', 'RS LANG');

  side = new Control(this.node, 'div', 'cube-side');

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'cube');

    [...Array(4)]
      .map((elem, index) => [
        new Control(null, 'h2', '', sideName[index]).node,
        new Control(null, 'h2', '', sideName[index]).node,
      ])
      .forEach((elem, index) => {
        const cubeSide = new Control(this.side.node, 'span', 'cube-side');
        cubeSide.node.setAttribute('style', `--i:${index}`);
        cubeSide.node.append(...elem.flat());
      });
  }
}
