import Api from '../api/api';
import Animation from './animation';

export default class CarActions {
  public async startEngine(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.start-engine__button')) {
      const id = +target.id.replace(/start-engine-car-/, '');
      await this.startDriving(id);
    }
  }

  private async startDriving(id: number) {
    const start = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
    start.disabled = true;

    const {velocity, distance} = await Api.startEngine(id);
    const time = Math.round(distance/velocity);

    const stop = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
    stop.disabled = false;

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    car.style.transform = `translateX(0)`;
    //add animation
    Animation.animationCar(car, distance, time);
    console.log(time)

  }

  public async stopEngine(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.stop-engine__button')) {
      const id = +target.id.replace(/stop-engine-car-/, '');
      await this.stopDriving(id);
    }
  }

  private async stopDriving(id: number) {
    const stop = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
    stop.disabled = true;

    const start = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
    start.disabled = false;
  }
}