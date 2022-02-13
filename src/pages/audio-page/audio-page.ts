import { Control } from '../../components/Control';
import './audioPage.scss';

export class AudioPage extends Control {
  constructor(parent: HTMLElement) {
    super(parent, 'main', 'main audio-page', 'AUDIO-PAGE');
  }
}
