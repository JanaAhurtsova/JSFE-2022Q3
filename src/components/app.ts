import Header from './view/header/header';
import Routing from './routing/routing';
import Controller from './controller/controller';

export default class App {
  private container: HTMLElement;

  private readonly header: Header;

  private routing: Routing;

  private controller: Controller;

  constructor() {
    this.container = document.body;
    this.header = new Header();
    this.routing = new Routing();
    this.controller = new Controller();
  }

  start(): void {
    this.container.append(this.header.header);
    Routing.renderNewPage('garage');
    this.events();
  }

  events() {
    window.addEventListener('hashchange', this.routing.enableRoutChange);
    this.container.addEventListener('click', async (event: Event) => {
      event.preventDefault();
      await this.controller.deleteCar(event);
      await this.controller.selectCar(event);
    })
  }
}
