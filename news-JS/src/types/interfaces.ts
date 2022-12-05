type dataSources = {
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string
}

type dataNews = {
  status: string,
  source: dataSources[]
}

export interface ISources {
  draw: (data: dataSources) => void;
}

export interface INews {
  draw: (data: dataNews) => void;
}