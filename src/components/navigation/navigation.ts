import { PageIds } from '../../types/enum';
import UpdateWrappers from '../controller/updatePages';
import UpdateStates from '../controller/updateStates';
import data from '../defaultData/data';
import GaragePage from '../view/garage/garage';
import Page from '../view/templates/page';
import Winners from '../view/winners/winners';

export default class Navigation {
  private updateWrappers: UpdateWrappers;

  constructor() {
    this.updateWrappers = new UpdateWrappers();
  }

  public static async renderNewPage(idPage: string) {
    const currentPage = document.querySelector(`#${data.defaultPageId}`);
    if (currentPage) {
      currentPage.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.GARAGE) {
      data.defaultPageId = idPage;
      page = new GaragePage(data.defaultPageId);
      // await UpdateStates.updateStateGarage();
    } else if (idPage === PageIds.WINNERS) {
      data.defaultPageId = idPage;
      page = new Winners((data.defaultPageId = idPage));
      // await UpdateStates.updateStateWinners();
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = data.defaultPageId;
      document.body.append(pageHTML);
    }
  }

  public async enableRoutChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      await Navigation.renderNewPage(hash);
    } else {
      await Navigation.renderNewPage(data.defaultPageId);
      // await UpdateStates.updateStateGarage();
      // await UpdateStates.updateStateWinners();
    }
  }

  public async clickToNextPage(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.next')) {
      if (data.defaultPageId === 'garage') {
        data.carsPage += 1;
        await UpdateStates.updateStateGarage();
        this.updateWrappers.updateGarage();
      } else if (data.defaultPageId === 'winners') {
        data.winnersPage += 1;
        await UpdateStates.updateStateWinners();
        this.updateWrappers.updateWinners();
      }
    }
  }

  public async clickToPrevPage(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.closest('.prev')) {
      if (data.defaultPageId === 'garage') {
        data.carsPage -= 1;
        await UpdateStates.updateStateGarage();
        this.updateWrappers.updateGarage();
      } else if (data.defaultPageId === 'winners') {
        data.winnersPage -= 1;
        await UpdateStates.updateStateWinners();
        this.updateWrappers.updateWinners();
      }
    }
  }
}
