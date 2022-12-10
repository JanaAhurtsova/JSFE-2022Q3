import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataSourcesDraw, DataNewsDraw } from '../../types/index';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
      const source = document.querySelector('.sources');
      
      if(!(source && source instanceof HTMLDivElement)) {
        throw new Error('Something has gone very, very wrong.');
      }
      source.addEventListener('click', (e) => this.controller.getNews(e, (data: DataNewsDraw | undefined) => this.view.drawNews(data)));
      this.controller.getSources((data: DataSourcesDraw | undefined) => this.view.drawSources(data));
    }
}

export default App;
