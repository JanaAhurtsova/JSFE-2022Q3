import { Endpoints } from './enum'

export type DataSources = {
    //[key: string]: string
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type DataNews = {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export interface SourcesInt {
    draw: (data: DataSources[]) => void;
}

export interface NewsInt {
    draw: (data: DataNews[]) => void;
}

export type DataNewsDraw = {
    status: string;
    totalResults: number;
    articles: DataNews[];
};

export type DataSourcesDraw = {
    status: string;
    sources: DataSources[];
};

export interface ApplicationView {
    readonly news: NewsInt;
    readonly sources: SourcesInt;

    drawNews(data: DataNewsDraw | undefined): void;
    drawSources(data: DataSourcesDraw | undefined): void;
}

export interface Controller {
    getSources(callback: Callback<DataSourcesDraw>): void;
    getNews(e: Event, callback: Callback<DataNewsDraw>): void;
}

export type Option = {
    apiKey: string;
    sources: string;
};

export interface Callback<T> {
    (data?: T): void;
}

export interface Application {
    controller: Controller;
    view: ApplicationView;
    start(): void;
}

// export interface ILoader {
//     baseLink: string;
//     private _options: Option;

//     getResp(
//       { endpoint, options }: { endpoint: Endpoints; options?: Option },
//       callback: () => void
//     ): void;

//     errorHandler(res: Response): Response;
//     makeUrl(options: Option, endpoint: Endpoints): string;
//     load(
//       method: string,
//       endpoint: Endpoints,
//       callback: Callback<DataSourcesDraw | DataNewsDraw>,
//       options: Option
//   ): void;
// }