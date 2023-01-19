import Api from '../api/api';
import data from '../defaultData/data';

export default class UpdateStates {
  public static async updateStateGarage() {
    const limitCarsOnPage = 7;
    const { items, count } = await Api.getCars(data.carsPage, limitCarsOnPage);
    data.cars = items;
    data.carsCount = count;
    const prev = document.getElementById('prev__garage') as HTMLButtonElement;
    const next = document.getElementById('next__garage') as HTMLButtonElement;

    if (prev) {
      if (data.carsPage > 1) {
        prev.disabled = false;
      } else {
        prev.disabled = true;
      }
    }

    if (next) {
      if (data.carsPage * limitCarsOnPage < +(<string>data.carsCount)) {
        next.disabled = false;
      } else {
        next.disabled = true;
      }
    }
  }

  public static async updateStateWinners() {
    const limitWinnersOnPage = 10;
    const { items, count } = await Api.getWinners(data.winnersPage, limitWinnersOnPage, data.sort, data.order);
    data.winners = items;
    data.winnersCount = count;
    const prev = document.getElementById('prev__winners') as HTMLButtonElement;
    const next = document.getElementById('next__winners') as HTMLButtonElement;

    if (prev) {
      if (data.winnersPage > 1) {
        prev.disabled = false;
      } else {
        prev.disabled = true;
      }
    }

    if (next) {
      if (data.winnersPage * limitWinnersOnPage < +(<string>data.winnersCount)) {
        next.disabled = false;
      } else {
        next.disabled = true;
      }
    }
  }
}
