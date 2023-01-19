import CarActions from './controller/action';
import ControllerWinners from './controller/controllerWinners';
import EditGarage from './controller/editGarage';
import UpdateStates from './controller/updateStates';
import Navigation from './navigation/navigation';
import Header from './view/header/header';
import Message from './view/message/message';

export default class App {
  private readonly header: Header;

  private navigation: Navigation;

  private editGarage: EditGarage;

  private controllerWinners: ControllerWinners;

  private carAction: CarActions;

  private message: Message;

  constructor() {
    this.header = new Header();
    this.navigation = new Navigation();
    this.editGarage = new EditGarage();
    this.controllerWinners = new ControllerWinners();
    this.carAction = new CarActions();
    this.message = new Message();
  }

  public async start() {
    document.body.append(this.header.header);
    await this.navigation.enableRoutChange();
    await UpdateStates.UpdateStateGarage();
    await UpdateStates.UpdateStateWinners();
    this.changeView();
    this.listenGarage();
    this.listenWinners();
    this.changePage();
  }

  private changeView() {
    window.addEventListener('hashchange', async () => {
      await this.navigation.enableRoutChange();
      this.listenGarage();
      this.listenWinners();
      this.changePage();
      await UpdateStates.UpdateStateGarage();
      await UpdateStates.UpdateStateWinners();
    });
  }

  private changePage() {
    (<HTMLElement>document.querySelector('.pagination')).addEventListener('click', async (event: Event) => {
      await this.navigation.clickToNextPage(event);
      await this.navigation.clickToPrevPage(event);
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
    this.message.overlay.addEventListener('click', (event: Event) => {
      this.message.closeMessage(event);
    });
  }

  private listenWinners() {
    document.querySelector('.table')?.addEventListener('click', async (event: Event) => {
      await this.controllerWinners.sortByTime(event);
      await this.controllerWinners.sortByWins(event);
    });
  }
}
