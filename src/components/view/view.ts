import { Order, Sort } from '../../types/enum';
import { TSort } from '../../types/types';
import UpdateStates from '../controller/updateStates';
import data from '../defaultData/data';
import GaragePage from './garage/garage';
import Header from './header/header';
import Winners from './winners/winners';

export default class View {
  public winners: Winners;

  public garage: GaragePage;

  public header: Header;

  constructor() {
    this.winners = new Winners();
    this.garage = new GaragePage();
    this.header = new Header();
  }

  public buildView() {
    document.body.append(this.header.header, this.garage.render(), this.winners.render());
  }

  public async changeView(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.button__garage')) {
      this.garage.container.style.display = 'flex';
      this.winners.container.style.display = 'none';
      data.defaultPage = 'garage';
    } else if (target.closest('.button__winners')) {
      this.winners.container.style.display = 'block';
      data.defaultPage = 'winners';
      this.garage.container.style.display = 'none';
      await UpdateStates.UpdateStateWinners();
      this.updateWinners();
    }
  }

  public async clickToNextPage(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.next')) {
      if (data.defaultPage === 'garage') {
        data.carsPage += 1;
        await UpdateStates.UpdateStateGarage();
        this.updateGarage();
      } else if (data.defaultPage === 'winners') {
        data.winnersPage += 1;
        await UpdateStates.UpdateStateWinners();
        this.updateWinners();
      }
    }
  }

  private async setSortOrder(sort: TSort) {
    data.sort = sort;
    data.order = data.order === Order.ASC ? Order.DESC : Order.ASC;

    await UpdateStates.UpdateStateWinners();
    this.updateWinners();
  }

  public async sortByWins(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.sort-wins')) {
      await this.setSortOrder(Sort.WINS);
    }
  }

  public async sortByTime(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.sort-time')) {
      await this.setSortOrder(Sort.TIME);
    }
  }

  public async clickToPrevPage(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.prev')) {
      if (data.defaultPage === 'garage') {
        data.carsPage -= 1;
        await UpdateStates.UpdateStateGarage();
        this.updateGarage();
      } else if (data.defaultPage === 'winners') {
        data.winnersPage -= 1;
        await UpdateStates.UpdateStateWinners();
        this.updateWinners();
      }
    }
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
