import GaragePage from '../view/garage/garage';
import Winners from '../view/winners/winners';

export default class UpdateWrappers {
  private garage: GaragePage;

  private winners: Winners;

  constructor() {
    this.garage = new GaragePage('garage');
    this.winners = new Winners('winners');
  }

  public updateGarage() {
    const garageWrapper = document.querySelector(`.garage__wrapper`) as HTMLElement;
    if (garageWrapper) {
      garageWrapper.innerHTML = '';
      garageWrapper.innerHTML = this.garage.renderGarage();
    }
  }

  public updateWinners() {
    const winnersWrapper = document.querySelector(`.winners__wrapper`) as HTMLElement;
    if (winnersWrapper) {
      winnersWrapper.innerHTML = '';
      winnersWrapper.innerHTML = this.winners.renderWinnersTable();
    }
  }
}
