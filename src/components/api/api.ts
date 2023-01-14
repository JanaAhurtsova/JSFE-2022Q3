import { TResponseGetCars, TCar, TGetCar, TSort, TOrder, TWinner, TWinners, TMoveCar } from '../../types/types';

const base = `http://localhost:3000`;

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export default class Api {
  public static async getCars(page: number, limit = 7): Promise<TResponseGetCars> {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    return {
      items: await response.json(),
      count: response.headers.get(`X-Total-Count`),
    };
  }

  public static async getCar(id: number): Promise<TGetCar> {
    const response = await fetch(`${garage}/${id}`);
    return await response.json();
  }

  public static async createCar(data: TCar): Promise<TGetCar> {
    const response = await fetch(`${garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  public static async deleteCar(id: number): Promise<object> {
    const response = await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    });

    return await response.json();
  }

  public static async updateCar(id: number, data: TCar): Promise<TGetCar> {
    const response = await fetch(`${garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  public static async stopEngine(id: number): Promise<TMoveCar> {
    const response = await fetch(`${engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });

    return await response.json();
  }

  public static async startEngine(id: number): Promise<TMoveCar> {
    const response = await fetch(`${engine}?id=${id}&status=started`, {
      method: 'PATCH',
    });

    return await response.json();
  }

  public static async driveCar(id: number) {
    const response = await fetch(`${engine}?id=${id}&status=drive`, {
      method: 'PATCH'
    })

    return response.status === 200 ? await response.json() : {'success': false};
  };

  public static async getWinners(
    page: number,
    limit = 10,
    sort?: ReadonlyArray<TSort>,
    order?: TOrder
  ): Promise<TWinners> {
    let sortOrder = '';
    if (sort && order) {
      sortOrder = `&_sort=${sort}&_order=${order}`;
    }

    const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${sortOrder}`);
    const items = await response.json();

    return {
      items: await Promise.all(items.map(async (winner: TWinner) => ({...winner, car: await this.getCar(winner.id)}))),
      count: response.headers.get(`X-Total-Count`),
    };
  }

  public static async getWinner(id: number): Promise<TWinner> {
    const response = await fetch(`${winners}/${id}`);

    return await response.json();
  }

  public static async createWinner(data: TWinner): Promise<TWinner> {
    const response = await fetch(`${winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await response.json();
  }

  public static async deleteWinner(id: number): Promise<object> {
    const response = await fetch(`${winners}/${id}`, {
      method: 'DELETE'
    })

    return await response.json();
  }

  public static async updateWinner(id: number, data: Omit<TWinner, 'id'>): Promise<TWinner> {
    const response = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await response.json();
  }
}
