import { TMoveCar, TDrive } from '../../types/types';
import Api from '../api/api';
import data from '../defaultData/data';
import Message from '../view/message/message';
import Animation from './animation';

export default class CarActions {
  private message: Message;

  private flag: boolean;

  constructor() {
    this.message = new Message();
    this.flag = true;
  }

  public async startEngine(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.start-engine__button')) {
      const id = +target.id.replace(/start-engine-car-/, '');
      await this.startDriving(id);
    }
  }

  private async startDriving(id: number) {
    (document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement).disabled = true;
    (document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement).disabled = false;
    (document.querySelector('.reset') as HTMLButtonElement).disabled = false;

    const { velocity, distance } = await Api.StartEngine(id);
    const time = Math.round(distance / velocity);

    this.setAnimation(id, time);

    try {
      (await (await Api.DriveCar(id)).json()) as Promise<TDrive>;
    } catch (err) {
      window.cancelAnimationFrame(data.animation[id].id);
    }

    return { id, time };
  }

  private setAnimation(id: number, time: number) {
    const car = document.getElementById(`car-${id}`) as HTMLElement;

    const road = document.querySelector('.road__wrapper') as HTMLElement;
    const distanceOfAnimation = road.clientWidth - car.getBoundingClientRect().right;
    data.animation[id] = Animation.AnimationCar(car, distanceOfAnimation, time);
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
      this.flag = true;
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

      const startAllEngines = data.cars.map(async ({ id }) => Api.StartEngine(id));
      await Promise.all(startAllEngines).then((motionParameters: TMoveCar[]) => {
        motionParameters.forEach(async (parameter, ind) => {
          const carInfo = data.cars[ind];
          const time = Math.round(parameter.distance / parameter.velocity);

          this.setAnimation(carInfo.id, time);

          try {
            const { success } = (await (await Api.DriveCar(carInfo.id)).json()) as TDrive;
            if (success) {
              if (this.flag) {
                this.flag = false;
                await Api.SaveWinner(carInfo.id, +(time / 1000).toFixed(2));

                this.message.showMessage();
                const message = document.querySelector('.message') as HTMLHeadingElement;
                if (message) {
                  message.innerText = `${carInfo.name} went first (${+(time / 1000).toFixed(2)}sec)!`;
                }
              }
            }
          } catch (err) {
            window.cancelAnimationFrame(data.animation[carInfo.id].id);
          }
        });
      });
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
