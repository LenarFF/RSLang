import { baseURL } from '../../constants/api';
import { Control } from '../Control';
import './AudioBtn.scss';

class AudioBtn extends Control {
  isPlay = false;
  audio: HTMLAudioElement | undefined;

  constructor(parent: HTMLElement, audioSrc: string[]) {
    super(parent, 'button', 'audio');

    this.node.addEventListener('click', () => this.handleAudio(audioSrc));
  }

  playAudio(audioSrc: string[]) {
    this.node.classList.add('audio_pause');
    let index = 0;
    this.audio = new Audio(`${baseURL}/${audioSrc[index]}`);
    this.audio.play();
    this.audio.onended = () => {
      index++;
      if (index < audioSrc.length) {
        if (!this.audio) return;
        this.audio.src = `${baseURL}/${audioSrc[index]}`;
        this.audio.play();
      }
    };
    this.isPlay = true;
  }

  stopAudio() {
    if (!this.audio) return;
    this.node.classList.remove('audio_pause');
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlay = false;
  }

  handleAudio(audioSrc: string[]) {
    if (this.isPlay) {
      this.stopAudio();
    } else {
      this.playAudio(audioSrc);
    }
  }
}

export { AudioBtn };
