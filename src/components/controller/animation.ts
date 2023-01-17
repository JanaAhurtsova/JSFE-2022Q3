import { TState } from '../../types/types';

export default class Animation {
  public static animationCar(car: HTMLElement, distance: number, animationTime: number) {
    let start: number;
    const state = {} as TState;

    state.id = window.requestAnimationFrame(function step(timestamp: number) {
      if (!start) {
        start = timestamp;
      }

      const currentTime = timestamp - start;
      const currentShift = Math.round(currentTime * (distance / animationTime));

      car.style.transform = `translateX(${currentShift}px)`;

      if (currentShift < distance) {
        state.id = window.requestAnimationFrame(step);
      }
    });

    return state;
  }
}
