import Api from "../api/api";
import data from "../defaultData/data";
import GaragePage from "../view/garage/garage";

export default class Controller {
  private garage: GaragePage;

  constructor() {
    this.garage = new GaragePage('garage');
  }

  public async deleteCar(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('remove__button')) {
      const id = Number(target.id.replace(/remove-car-/, ''));
      const garageWrapper = document.getElementById(`garage__wrapper`);
      await Api.deleteCar(id);
      await Api.deleteWinner(id);
      await this.updateStateGarage();
      if (garageWrapper) {
        garageWrapper.innerHTML = '';
        garageWrapper.innerHTML = this.garage.renderGarage();
      }
    }
  }

  private async updateStateGarage() {
    const { items, count } = await Api.getCars(data.carsPage);
    data.cars = items;
    data.carsCount = count;
    const prev = document.querySelector('.prev') as HTMLButtonElement;
    const next = document.querySelector('.next') as HTMLButtonElement;

    if(prev) {
      if (data.carsPage > 1) {
        prev.disabled = false;
      } else {
        prev.disabled = true;
      }
    }

    if(next) {
      if (data.carsPage * 7 < +(data.carsCount !== null)) {
        next.disabled = false;
      } else {
        next.disabled = true;
      }
    }
  }

  public async selectCar(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('select__button')) {
      const id = target.id.replace(/select-car-/, '');
      const selected = await Api.getCar(+id);
      const name = document.querySelector('.edit-name') as HTMLInputElement;
      const color = document.querySelector('.edit-color') as HTMLInputElement;
      const submit = document.getElementById('edit-submit') as HTMLInputElement;
      name.value = selected.name;
      color.value = selected.color;
      name.disabled = false;
      color.disabled = false;
      submit.disabled = false;
    }
  }
}