import Api from '../api/api';
import GaragePage from '../view/garage/garage';
import GenerateCars from './generateCars';
import { TGetCar } from '../../types/types';
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
    await Api.createCar({name, color});
    await UpdateStates.updateStateGarage();
    this.updateGarage();
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
      await Api.deleteCar(id);
      await Api.deleteWinner(id);
      await UpdateStates.updateStateGarage();
      this.updateGarage();
    }
  }

  public async selectCar(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.select__button')) {
      const id = target.id.replace(/select-car-/, '');
      this.selectedCar = await Api.getCar(+id);
      const name = document.querySelector('.edit-name') as HTMLInputElement;
      const color = document.querySelector('.edit-color') as HTMLInputElement;
      const submit = document.querySelector('.edit-submit') as HTMLInputElement;
      name.value = this.selectedCar.name;
      color.value = this.selectedCar.color;
      name.disabled = false;
      color.disabled = false;
      submit.disabled = false;
    }
  }

  public async editCar() {
    let name = (document.querySelector(`.edit-name`) as HTMLInputElement).value;
    let color = (document.querySelector(`.edit-color`) as HTMLInputElement).value;
    await Api.updateCar(this.selectedCar!.id, {name, color});
    await UpdateStates.updateStateGarage();
    this.updateGarage();
    name = '';
    (document.querySelector('.edit-name') as HTMLInputElement).disabled = true;
    (document.querySelector('.edit-color') as HTMLInputElement).disabled = true;
    (document.querySelector('.edit-submit') as HTMLInputElement).disabled = true;
    this.selectedCar = null;
  }

  public async generateRandomCars(event: Event) {
    if ((event.target as HTMLButtonElement).closest('.generate')) {
      const cars = GenerateCars.generateRandomCars(100);
      await Promise.all(cars.map(async car => await Api.createCar(car)));
      await UpdateStates.updateStateGarage();
      this.updateGarage();
    }
  }
}
