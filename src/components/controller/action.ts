import Api from '../api/api';

export default class CarActions {
  public startEngine(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.start-engine__button')) {
      const id = +target.id.replace(/start-engine-car-/, '');
      this.startDriving(id);
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

  }

  public stopEngine(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.stop-engine__button')) {
      const id = +target.id.replace(/stop-engine-car-/, '');
      this.stopDriving(id);
    }
  }

  private stopDriving(id: number) {
    const stop = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
    stop.disabled = true;

    const start = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
    start.disabled = false;
  }
}