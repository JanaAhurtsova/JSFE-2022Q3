import { Order, Sort } from '../../types/enum';
import { TSort } from '../../types/types';
import data from '../defaultData/data';
import UpdateWrappers from './updatePages';
import UpdateStates from './updateStates';

export default class ControllerWinners {
  private updateWrappers: UpdateWrappers;

  constructor() {
    this.updateWrappers = new UpdateWrappers();
  }

  private async setSortOrder(sort: TSort) {
    data.sort = sort;
    data.order = data.order === Order.ASC ? Order.DESC : Order.ASC;
    console.log(data.sort);
    await UpdateStates.updateStateWinners();
    this.updateWrappers.updateWinners();
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
}
