import { TGetCar } from './types';

export interface ICreateTrack {
  getCarTrack({ name, color, id }: TGetCar): string;
}
