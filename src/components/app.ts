import Header from './view/header/header';
import Navigation from './navigation/navigation';
import EditGarage from './controller/editGarage';
import UpdateStates from './controller/updateStates';
import ControllerWinners from './controller/controllerWinners';

export default class App {
  private readonly header: Header;

  private navigation: Navigation;

  private editGarage: EditGarage;

  private controllerWinners: ControllerWinners;

  constructor() {
    this.header = new Header();
    this.navigation = new Navigation();
    this.editGarage = new EditGarage();
    this.controllerWinners = new ControllerWinners();
  }

  public start() {
    document.body.append(this.header.header);
    this.navigation.enableRoutChange();
    UpdateStates.updateStateGarage();
    UpdateStates.updateStateWinners();
    this.events();
  }

  private events() {
    window.addEventListener('hashchange', this.navigation.enableRoutChange);
    document.querySelector('.pagination')?.addEventListener('click', async (event: Event) => {
      event.preventDefault();
      await this.navigation.clickToNextPage(event);
      await this.navigation.clickToPrevPage(event);
    })
    this.listenGarage();
    this.listenWinners();
  }

  private listenGarage() {
    document.querySelector('.garage__wrapper')?.addEventListener('click', async (event: Event) => {
      await this.editGarage.deleteCar(event);
      await this.editGarage.selectCar(event);
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
    })
  }

  private listenWinners() {
    document.querySelector('.table')?.addEventListener('click', async (event: Event) => {
      await this.controllerWinners.sortByTime(event);
      await this.controllerWinners.sortByWins(event);
    })
  }
}
