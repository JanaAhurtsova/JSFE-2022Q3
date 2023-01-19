import { TResponseGetCars, TCar, TGetCar, TWinner, TItem, TWinners, TMoveCar, TDrive } from '../../types/types';

const base = `http://localhost:3000`;

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export default class Api {
  public static async getCars(page: number, limit = 7): Promise<TResponseGetCars> {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
      items: (await response.json()) as TGetCar[],
      count: response.headers.get(`X-Total-Count`),
    };
  }

  public static async getCar(id: number) {
    const response = await fetch(`${garage}/${id}`);
    return response.json() as Promise<TGetCar>;
  }

  public static async createCar(body: TCar) {
    const response = await fetch(`${garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TGetCar>;
  }

  public static async deleteCar(id: number) {
    const response = await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    });
    return response.json() as Promise<object>;
  }

  public static async updateCar(id: number, body: TCar) {
    const response = await fetch(`${garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TGetCar>;
  }

  public static async stopEngine(id: number) {
    const response = await fetch(`${engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    return response.json() as Promise<TMoveCar>;
  }

  public static async startEngine(id: number) {
    const response = await fetch(`${engine}?id=${id}&status=started`, {
      method: 'PATCH',
    });
    return response.json() as Promise<TMoveCar>;
  }

  public static async driveCar(id: number): Promise<Response> {
    const response = await fetch(`${engine}?id=${id}&status=drive`, {
      method: 'PATCH',
    }).catch();

    return response;
  }

  public static async getWinners(
    page: number,
    limit = 10,
    sort?: string | null,
    order?: string | null
  ): Promise<TWinners> {
    let sortOrder = '';
    if (sort && order) {
      sortOrder = `&_sort=${sort}&_order=${order}`;
    }

    const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${sortOrder}`);
    const items = (await response.json()) as TItem[];

    return {
      items: await Promise.all(
        items.map(async (winner: TWinner) => ({ ...winner, car: await this.getCar(winner.id) }))
      ),
      count: response.headers.get(`X-Total-Count`),
    };
  }

  public static async getWinner(id: number) {
    const response = await fetch(`${winners}/${id}`);
    return response.json() as Promise<TWinner>;
  }

  public static async createWinner(body: TWinner) {
    const response = await fetch(`${winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TWinner>;
  }

  public static async deleteWinner(id: number) {
    const response = await fetch(`${winners}/${id}`, {
      method: 'DELETE',
    });
    return response.json() as Promise<object>;
  }

  public static async updateWinner(id: number, body: Omit<TWinner, 'id'>) {
    const response = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TWinner>;
  }

  public static async saveWinner(id: number, time: number) {
    const { status } = await fetch(`${winners}/${id}`);
    if (status === 404) {
      await Api.createWinner({ id, wins: 1, time });
    } else {
      const winner = await Api.getWinner(id);
      await Api.updateWinner(id, {
        wins: winner.wins + 1,
        time: time > winner.time ? winner.time : time,
      });
    }
  }
}
