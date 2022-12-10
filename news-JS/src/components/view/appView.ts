import News from './news/news';
import Sources from './sources/sources';
import {DataSourcesDraw, DataNewsDraw, Callback} from '../../types/index';

export class AppView {
    news: News;
    sources: Sources;
    
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: DataNewsDraw) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: DataSourcesDraw) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
