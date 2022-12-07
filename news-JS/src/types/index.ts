export interface DataSources { //[key: string]: string
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string
}

interface DataNews {
  status: string,
  totalResults: number,
  articles: {
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
}

export interface SourcesInt {
  draw: (data: DataSources[]) => void;
}

export interface NewsInt {
  draw: (data: DataNews[]) => void;
}