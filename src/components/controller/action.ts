import { TGetWinCar } from '../../types/types';
import Api from '../api/api';
import data from '../defaultData/data';
import Message from '../view/message/message';
import Animation from './animation';

export default class CarActions {
  private message: Message;

  constructor() {
    this.message = new Message();
  }

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

    const { velocity, distance } = await Api.StartEngine(id);
    const time = Math.round(distance / velocity);

    const stop = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
    stop.disabled = false;

    (document.querySelector('.reset') as HTMLButtonElement).disabled = false;

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    car.style.transform = `translateX(0)`;

    const road = document.querySelector('.road__wrapper') as HTMLElement;
    const distanceOfAnimation = road.clientWidth - car.getBoundingClientRect().right;
    data.animation[id] = Animation.AnimationCar(car, distanceOfAnimation, time);

    const { success } = await Api.DriveCar(id)
      .then((response) => {
        if (response.status !== 200) {
          window.cancelAnimationFrame(data.animation[id].id);
        }
        return response.json();
      })
      .catch((error) => {
        if (error) {
          console.log('Your car broke down');
        }
      });

    return { success, id, time };
  }

  public async stopEngine(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.stop-engine__button')) {
      const id = +target.id.replace(/stop-engine-car-/, '');
      await this.stopDriving(id);
    }
  }

  private async stopDriving(id: number) {
    (document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement).disabled = true;

    await Api.StopEngine(id);

    (document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement).disabled = false;
    (document.querySelector('.reset') as HTMLButtonElement).disabled = true;

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    car.style.transform = `translateX(0)`;

    if (data.animation[id]) {
      window.cancelAnimationFrame(data.animation[id].id);
    }
  }

  public async resetDriving(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.reset')) {
      (<HTMLButtonElement>document.querySelector('.race')).disabled = false;
      target.disabled = true;
      this.setDisabled(false);
      data.cars.map(async ({ id }) => this.stopDriving(id));
    }
  }

  public async startRace(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.race')) {
      target.disabled = true;
      this.setDisabled(true);
      (<HTMLButtonElement>document.querySelector('.reset')).disabled = false;

      const successRace = data.cars.map(async ({ id }) => this.startDriving(id));
      const winnerCar = await Promise.any(successRace);

      const winner = {
        ...data.cars.find((car) => car.id === winnerCar.id),
        time: winnerCar.time / 1000,
      } as Required<TGetWinCar>;
      console.log(winner)

      await Api.SaveWinner(winner.id, winner.time);

      this.message.showMessage();
      const message = document.querySelector('.message') as HTMLHeadingElement;
      if (message) {
        message.innerText = `${winner.name} went first (${winner.time}sec)!`;
      }
    }
  }

  private setDisabled(disabled: boolean) {
    (<HTMLButtonElement>document.querySelector('.create-submit')).disabled = disabled;
    (<HTMLButtonElement>document.querySelector('.generate')).disabled = disabled;
    const selectButtons = document.querySelectorAll('.select__button');
    const removeButtons = document.querySelectorAll('.remove__button');
    (selectButtons as NodeListOf<HTMLButtonElement>).forEach((button) => {
      button.disabled = disabled;
    });
    (removeButtons as NodeListOf<HTMLButtonElement>).forEach((button) => {
      button.disabled = disabled;
    });
  }
}
