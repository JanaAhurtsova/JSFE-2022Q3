import { TGetCar } from "../../types/types";

export default class Animation {
  public static animationCar(car: HTMLElement, distance: number, animationTime: number) {
    let start: number;

    function step(timestamp: number) {
      if (!start) {
        start = timestamp;
      }
  
      const currentTime = timestamp - start;
      const currentShift = Math.round(currentTime * (distance / animationTime));

      car.style.transform = `translateX(${Math.min(currentShift, distance)}px)`;
    }
  }

}