import Page from "../templates/page";
import data from "../../defaultData/data";
import {SortWinners} from "../../../types/enum";
import CreateTrack from "../garage/track/createCartTrack";


export default class Winners extends Page {
  constructor(id: string) {
    super(id);
  }

  private renderWinnersTable() {
    return `
    <table class="table" cellspacing="0" cellpadding="0">
      <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="table__button sort-wins ${data.sort === SortWinners.WINS ? data.order : ''}" id="sort-wins">Wins</th>
        <th class="table__button sort-times ${data.sort === SortWinners.TIMES ? data.order : ''}" id="sort-times">Best Time(sec)</th>
      </thead>
      <tbody>
        ${data.winners.map((winner, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${CreateTrack.getCarImage(winner.car.color)}</td>
            <td>${winner.car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>`
  }

  public render() {
    const content = `
      <h1>Winners (${data.winnersCount})</h1>
      <h2>Page #${data.winnersPage}</h2>
      ${this.renderWinnersTable()}
      <div class="pagination">
        <button class="button" id="prev" disabled>Previous</button>
        <button class="button" id="next" disabled>Next</button>
      </div>`
    this.container.innerHTML = content;
    return this.container;
  }
}