import Page from "../templates/page";
import data from "../../defaultData/data";
import CreateTrack from "./track/createCartTrack";

export default class GaragePage extends Page {
  createTrack: CreateTrack;

  constructor(id: string) {
    super(id);
    this.createTrack = new CreateTrack();
  }

  private createButtons() {
    return `<div>
        <form class="form" id="create">
          <input class="input create-name" name="name" />
          <input type="color" class="input create-color" name="color" value="#000000" />
          <input type="submit" class="submit" id="create-submit" value="Create"/>
        </form>
        <form class="form" id="edit">
          <input class="input edit-name" name="name" disabled />
          <input type="color" class="input edit-color" name="color" value="#000000" disabled/>
          <input type="submit" class="submit" id="edit-submit" value="Edit" disabled/>
        </form>
      </div>
      <div class="controls">
        <button class="button" id="race">Race</button>
        <button class="button" id="reset">Reset</button>
        <button class="button" id="generate">Generate cars</button>
      </div>`
  }

  public renderGarage() {
    return `
    <h1>Garage (${data.carsCount})</h1>
    <h2>Page #${data.carsPage}</h2>
    <ul class="garage">
      ${data.cars.map((car) =>
        `<li class="track" id="track-${car.id}">${this.createTrack.getCarTrack(car)}</li>`
      ).join('')}
    </ul>`
  }

  public render() {
    let content: string = '';
    content += `<div class="buttons">
        ${this.createButtons()}
      </div>
      <div class="garage__wrapper">${this.renderGarage()}</div>
      <div class="pagination">
        <button class="button" id="prev" disabled>Previous</button>
        <button class="button" id="next" disabled>Next</button>
      </div>`;
    this.container.innerHTML = content;
    return this.container;
  }
}
