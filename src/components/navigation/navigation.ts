import Page from '../view/templates/page';
import { PageIds } from '../../types/enum';
import GaragePage from '../view/garage/garage';
import Winners from '../view/winners/winners';
import data from '../defaultData/data';
import UpdateStates from '../controller/updateStates';
import UpdateWrappers from '../controller/updatePages';

export default class Navigation {
  private updateWrappers: UpdateWrappers;

  constructor() {
    this.updateWrappers = new UpdateWrappers();
  }

  public static renderNewPage(idPage: string) {
    const currentPage = document.querySelector(`#${data.defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.GARAGE) {
      data.defaultPageId = idPage;
      page = new GaragePage(data.defaultPageId);
    } else if (idPage === PageIds.WINNERS) {
      data.defaultPageId = idPage;
      page = new Winners(data.defaultPageId = idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = data.defaultPageId;
      document.body.append(pageHTML);
    }
  }

  public enableRoutChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      Navigation.renderNewPage(hash);
    } else {
      Navigation.renderNewPage(data.defaultPageId);
    }
  }

  public async clickToNextPage(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.next')) {
      if (data.defaultPageId === 'garage') {
        data.carsPage = data.carsPage + 1;
        await UpdateStates.updateStateGarage();
        console.log(data.carsPage);
      } else if (data.defaultPageId === 'winners') {
        data.winnersPage = data.winnersPage + 1;
        await UpdateStates.updateStateWinners();
        this.updateWrappers.updateWinners();
      }
    }
  }

  public async clickToPrevPage(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.next')) {
      if (data.defaultPageId === 'garage') {
        data.carsPage = data.carsPage - 1;
        await UpdateStates.updateStateGarage();
        this.updateWrappers.updateGarage();
      } else if (data.defaultPageId === 'winners') {
        data.winnersPage = data.winnersPage - 1;
        await UpdateStates.updateStateWinners();
        this.updateWrappers.updateWinners();
      }
    }
  }
}
