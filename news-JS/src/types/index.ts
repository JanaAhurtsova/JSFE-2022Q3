import { Endpoints } from './enum';

export type DataSources = {
    [key: string]: string;
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
    drawNews(data: DataNewsDraw | undefined): void;
    drawSources(data: DataSourcesDraw | undefined): void;
}

export type Option = {
    apiKey: string;
    sources: string;
};

export interface Callback<T> {
    (data?: T): void;
}

export interface Application {
    start(): void;
}

export interface LoaderInt {
    getResp({ endpoint, options }: { endpoint: Endpoints; options?: Partial<Option> }, callback: () => void): void;

    errorHandler(res: Response): Response;

    makeUrl(options: Partial<Option>, endpoint: Endpoints): string;

    load(
        method: string,
        endpoint: Endpoints,
        callback: Callback<DataSourcesDraw | DataNewsDraw>,
        options: Partial<Option>
    ): void;
}
