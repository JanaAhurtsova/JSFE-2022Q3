export type TGetWinCar = {
  color: string;
  id: number;
  name: string;
  time: number;
};

export type TGetCar = Omit<TGetWinCar, 'time'>;

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

export type TSort = 'wins' | 'times';
export type TOrder = 'ASC' | 'DESC';

export type TState = {
  id: number;
};

export type TAnimation = {
  [key: number]: TState;
};

export type TDrive = {
  success: boolean;
};

export type TRace = {
  id: number;
  success: boolean;
  time: number;
};
