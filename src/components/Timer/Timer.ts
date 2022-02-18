import { Control } from '../Control';

export class Timer extends Control {
  timer = 0;

  initialTime = 0;

  start(time: number):void {
    this.initialTime = time;
    if (this.timer) {
      this.stop();
    }
    let currentTime = time;
    this.timer = window.setInterval(() => {
      currentTime--;
      this.node.textContent = `${currentTime}`;
      if (currentTime <= 0) {
        this.onTimeout();
      }
    }, 1000);
  }

  onTimeout():void {
    this.stop();
  }

  stop():void {
    window.clearInterval(this.timer);
  }
}
