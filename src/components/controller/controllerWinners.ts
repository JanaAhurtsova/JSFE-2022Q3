import data from "../defaultData/data";
import Api from "../api/api";
import { Order, Sort } from "../../types/enum";
import UpdateStates from "./updateStates";
import UpdateWrappers from "./updatePages";

export default class ControllerWinners {
  private updateWrappers: UpdateWrappers;

  constructor() {
    this.updateWrappers = new UpdateWrappers();
  }

  private async setSortOrder(sort: string) {
    data.sort = data.order === Order.ASC ? Order.DESC : Order.ASC;
    data.sort = sort;
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