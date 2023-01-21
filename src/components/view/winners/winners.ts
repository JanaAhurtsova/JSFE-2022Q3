import { Sort } from '../../../types/enum';
import data from '../../defaultData/data';
import CreateTrack from '../garage/track/createCartTrack';

export default class Winners {
  public container: HTMLElement;

  private createTrack: CreateTrack;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('wrapper', 'winners');
    this.createTrack = new CreateTrack();
  }

  public renderWinnersTable() {
    return `
    <h1>Winners (${<string>data.winnersCount})</h1>
    <h2>Page #${data.winnersPage}</h2>
    <table class="table" cellspacing="0" cellpadding="0">
      <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="table__button sort-wins ${data.sort === Sort.WINS ? data.order : ''}">Wins</th>
        <th class="table__button sort-time ${data.sort === Sort.TIME ? data.order : ''}">Best Time(sec)</th>
      </thead>
      <tbody>
        ${data.winners
          .map(
            (winner, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${this.createTrack.getCarImage(winner.car.color)}</td>
            <td>${winner.car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>`;
  }

  public render() {
    const content = `
      <div class="winners__wrapper">
        ${this.renderWinnersTable()}
      </div>
      <div class="pagination">
        <button class="button prev" id="prev__winners" disabled>Previous</button>
        <button class="button next" id="next__winners" disabled>Next</button>
      </div>`;
    this.container.innerHTML = content;
    return this.container;
  }
}
