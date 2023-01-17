export type TRoutes = {
  [route: string]: string;
};

export type TGetCar = {
  color: string;
  id: number;
  isEngineStarted?: boolean;
  name: string;
};

export type TResponseGetCars = {
  count: string | null;
  items: TGetCar[];
};

export type TCar = Pick<TGetCar, 'name' | 'color'>;

export type TMoveCar = {
  distance: number;
  velocity: number;
};

export type TWinner = {
  id: number;
  time: number;
  wins: number;
};

export type TWinners = {
  count: string | null;
  items: TItem[];
};

export type TItem = {
  car: TCar;
  id: number;
  time: number;
  wins: number;
};

export type TSort = 'wins' | 'time';

export type TState = {
  id: number;
};

export type TDrive = {
  success: boolean;
};
