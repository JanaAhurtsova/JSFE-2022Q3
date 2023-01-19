import { TResponseGetCars, TCar, TGetCar, TWinner, TItem, TWinners, TMoveCar } from '../../types/types';

const base = `http://localhost:3000`;

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export default class Api {
  public static async GetCars(page: number, limit = 7): Promise<TResponseGetCars> {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
      items: (await response.json()) as TGetCar[],
      count: response.headers.get(`X-Total-Count`),
    };
  }

  public static async GetCar(id: number) {
    const response = await fetch(`${garage}/${id}`);
    return response.json() as Promise<TGetCar>;
  }

  public static async CreateCar(body: TCar) {
    const response = await fetch(`${garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TGetCar>;
  }

  public static async DeleteCar(id: number) {
    const response = await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    });
    return response.json() as Promise<object>;
  }

  public static async UpdateCar(id: number, body: TCar) {
    const response = await fetch(`${garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TGetCar>;
  }

  public static async StopEngine(id: number) {
    const response = await fetch(`${engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    return response.json() as Promise<TMoveCar>;
  }

  public static async StartEngine(id: number) {
    const response = await fetch(`${engine}?id=${id}&status=started`, {
      method: 'PATCH',
    });
    return response.json() as Promise<TMoveCar>;
  }

  public static async DriveCar(id: number): Promise<Response> {
    const response = await fetch(`${engine}?id=${id}&status=drive`, {
      method: 'PATCH',
    }).catch();

    return response;
  }

  public static async GetWinners(
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
        items.map(async (winner: TWinner) => ({ ...winner, car: await Api.GetCar(winner.id) }))
      ),
      count: response.headers.get(`X-Total-Count`),
    };
  }

  public static async GetWinner(id: number) {
    const response = await fetch(`${winners}/${id}`);
    return response.json() as Promise<TWinner>;
  }

  public static async CreateWinner(body: TWinner) {
    const response = await fetch(`${winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TWinner>;
  }

  public static async DeleteWinner(id: number) {
    const response = await fetch(`${winners}/${id}`, {
      method: 'DELETE',
    });
    return response.json() as Promise<object>;
  }

  public static async UpdateWinner(id: number, body: Omit<TWinner, 'id'>) {
    const response = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json() as Promise<TWinner>;
  }

  public static async SaveWinner(id: number, time: number) {
    const { status } = await fetch(`${winners}/${id}`);
    if (status === 404) {
      await Api.CreateWinner({ id, wins: 1, time });
    } else {
      const winner = await Api.GetWinner(id);
      await Api.UpdateWinner(id, {
        wins: winner.wins + 1,
        time: time > winner.time ? winner.time : time,
      });
    }
  }
}
