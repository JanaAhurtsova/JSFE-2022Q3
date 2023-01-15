export type TRoutes = {
  [route: string]: string;
};

export type TGetCar = {
  name: string;
  color: string;
  id: number;
  isEngineStarted?: boolean;
};

export type TResponseGetCars = {
  items: TGetCar[];
  count: string | null;
};

export type TCar = Pick<TGetCar, 'name' | 'color'>;

export type TMoveCar = {
  velocity: number;
  distance: number;
};

export type TWinner = {
  id: number;
  wins: number;
  time: number;
};

export type TWinners = {
  items: TItem[];
  count: string | null;
};

type TItem = {
  id: number;
  wins: number;
  time: number;
  car: TCar;
};

export type TSort = 'wins' | 'time';