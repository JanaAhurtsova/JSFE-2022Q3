import { TGetCar } from '../../types/types';
import Api from '../api/api';
import GaragePage from '../view/garage/garage';
import GenerateCars from './generateCars';
import UpdateStates from './updateStates';

export default class EditGarage {
  private garage: GaragePage;

  private selectedCar: null | TGetCar;

  constructor() {
    this.garage = new GaragePage('garage');
    this.selectedCar = null;
  }

  public async createCar() {
    const name = (document.querySelector(`.create-name`) as HTMLInputElement).value;
    const color = (document.querySelector(`.create-color`) as HTMLInputElement).value;
    await Api.CreateCar({ name, color });
    await UpdateStates.UpdateStateGarage();
    this.updateGarage();
    (document.querySelector(`.create-name`) as HTMLInputElement).value = '';
    (document.querySelector(`.create-color`) as HTMLInputElement).value = '#000000';
  }

  private updateGarage() {
    const garageWrapper = document.querySelector(`.garage__wrapper`) as HTMLElement;
    if (garageWrapper) {
      garageWrapper.innerHTML = '';
      garageWrapper.innerHTML = this.garage.renderGarage();
    }
  }

  public async deleteCar(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.remove__button')) {
      const id = Number(target.id.replace(/remove-car-/, ''));
      await Api.DeleteCar(id);
      await Api.DeleteWinner(id);
      await UpdateStates.UpdateStateGarage();
      this.updateGarage();
    }
  }

  public async selectCar(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.select__button')) {
      const id = target.id.replace(/select-car-/, '');
      this.selectedCar = await Api.GetCar(+id);
      this.editElement(this.selectedCar.name, this.selectedCar.color, false);
    }
  }

  public async editCar() {
    const name = (document.querySelector(`.edit-name`) as HTMLInputElement).value;
    const color = (document.querySelector(`.edit-color`) as HTMLInputElement).value;
    await Api.UpdateCar((<TGetCar>this.selectedCar).id, { name, color });
    await UpdateStates.UpdateStateGarage();
    this.updateGarage();
    this.editElement('', '#000000', true);
    this.selectedCar = null;
  }

  public async generateRandomCars(event: Event) {
    if ((event.target as HTMLButtonElement).closest('.generate')) {
      const cars = GenerateCars.generateRandomCars(100);
      await Promise.all(cars.map(async (car) => Api.CreateCar(car)));
      await UpdateStates.UpdateStateGarage();
      this.updateGarage();
    }
  }

  private editElement(name: string, color: string, disabled: boolean) {
    (document.querySelector(`.edit-name`) as HTMLInputElement).value = name;
    (document.querySelector(`.edit-color`) as HTMLInputElement).value = color;
    (document.querySelector('.edit-name') as HTMLInputElement).disabled = disabled;
    (document.querySelector('.edit-color') as HTMLInputElement).disabled = disabled;
    (document.querySelector('.edit-submit') as HTMLInputElement).disabled = disabled;
  }
}
