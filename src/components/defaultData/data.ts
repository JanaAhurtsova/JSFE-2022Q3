import Api from "../api/api";
const {items: cars, count: carsCount} = await Api.getCars(1);
const {items: winners, count: winnersCount} = await Api.getWinners(1);

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  sort: null,
  order: null
}