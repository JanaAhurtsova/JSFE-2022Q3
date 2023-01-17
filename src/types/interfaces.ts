import { TGetCar } from './types';

export interface ICreateTrack {
  getCarTrack({ name, color, id, isEngineStarted }: TGetCar): string;
}

export interface IDefault {
  cars: number;
  carsCount: number;
  carsPage: number;
}
