import News from './news/news';
import Sources from './sources/sources';
import { DataSourcesDraw, DataNewsDraw, ApplicationView } from '../../types/index';

export class AppView implements ApplicationView {
    private _news: News;
    private _sources: Sources;

    constructor() {
        this._news = new News();
        this._sources = new Sources();
    }

    public drawNews(data: DataNewsDraw | undefined): void {
        const values = data?.articles ? data?.articles : [];
        this._news.draw(values);
    }

    public drawSources(data: DataSourcesDraw | undefined): void {
        const values = data?.sources ? data?.sources : [];
        this._sources.draw(values);
    }
}

export default AppView;
