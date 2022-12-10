import News from './news/news';
import Sources from './sources/sources';
import { DataSourcesDraw, DataNewsDraw, Application } from '../../types/index';

export class AppView implements Application {
    readonly news: News;
    readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: DataNewsDraw | undefined): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: DataSourcesDraw | undefined): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
