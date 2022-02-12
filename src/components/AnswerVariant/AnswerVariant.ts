import { Control } from '../Control';
import './AnswerVariant.scss';

class AnswerVariant extends Control {
  constructor(parent: HTMLElement, word: string) {
    super(parent, 'button', 'variant', word)
  }
}