const enum Requests {
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

const enum PageIds {
  GARAGE = 'garage',
  WINNERS = 'winners',
}

const enum Sort {
  TIME = 'time',
  WINS = 'wins',
}

const enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export { Requests, PageIds, Sort, Order };
