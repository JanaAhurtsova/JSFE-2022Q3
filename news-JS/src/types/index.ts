export interface DataSources { //[key: string]: string
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string
}

export interface DataNews {
  source: {
    id: string | null,
    name: string
  },
  author: string | null,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string
}

export interface SourcesInt {
  draw: (data: DataSources[]) => void;
}

export interface NewsInt {
  draw: (data: DataNews[]) => void;
}

export type DataNewsDraw = {
  status: string,
  totalResults: number,
  articles: DataNews[]
}

export type DataSourcesDraw = {
  status: string,
  sources: DataSources[]
}