import CarActions from './controller/action';
import EditGarage from './controller/editGarage';
import UpdateStates from './controller/updateStates';
import View from './view/view';

export default class App {
  private view: View;

  private editGarage: EditGarage;

  private carAction: CarActions;

  constructor() {
    this.view = new View();
    this.editGarage = new EditGarage();
    this.carAction = new CarActions();
  }

  public async start() {
    this.view.buildView();
    await UpdateStates.UpdateStateGarage();
    await UpdateStates.UpdateStateWinners();
    this.listenGarage();
    this.changePage();
  }

  private changePage() {
    this.view.header.header.addEventListener('click', async (event) => {
      await this.view.changeView(event);
    });
    document.body.addEventListener('click', async (event: Event) => {
      await this.view.clickToNextPage(event);
      await this.view.clickToPrevPage(event);
      await this.view.sortByWins(event);
      await this.view.sortByTime(event);
    });
  }

  private listenGarage() {
    document.querySelector('.garage__wrapper')?.addEventListener('click', async (event: Event) => {
      await this.editGarage.deleteCar(event);
      await this.editGarage.selectCar(event);
      await this.carAction.startEngine(event);
      await this.carAction.stopEngine(event);
    });
    document.querySelector('.create-submit')?.addEventListener('click', async (event: Event) => {
      event.preventDefault();
      await this.editGarage.createCar();
    });
    document.querySelector('.edit-submit')?.addEventListener('click', async (event: Event) => {
      event.preventDefault();
      await this.editGarage.editCar();
    });
    document.querySelector('.controls')?.addEventListener('click', async (event: Event) => {
      await this.editGarage.generateRandomCars(event);
      await this.carAction.resetDriving(event);
      await this.carAction.startRace(event);
    });
  }
}
