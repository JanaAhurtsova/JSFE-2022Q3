import Page from "../view/templates/page";
import { PageIds } from "../../types/enum";
import GaragePage from "../view/garage/garage";
import Winners from "../view/winners/winners";

export default class Routing {
  private static defaultPageId = 'current-page';

  static renderNewPage(idPage: string) {
    const currentPage = document.querySelector(`#${this.defaultPageId}`);
    if(currentPage) {
      currentPage.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.GARAGE) {
      page = new GaragePage(idPage);
    } else if (idPage === PageIds.WINNERS) {
      page = new Winners(idPage);
    }

    if(page) {
      const pageHTML = page.render();
      pageHTML.id = Routing.defaultPageId;
      document.body.append(pageHTML);
    }
  }

  public enableRoutChange() {
    const hash = window.location.hash.slice(1);
    Routing.renderNewPage(hash);
  }
}