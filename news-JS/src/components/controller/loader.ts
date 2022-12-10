import { Option, Callback, DataSourcesDraw, DataNewsDraw, LoaderInt } from '../../types/index';
import { Endpoints } from '../../types/enum';

class Loader implements LoaderInt {
    private _baseLink: string;
    private _options: Partial<Option>;

    constructor(baseLink: string, options: Partial<Option>) {
        this._baseLink = baseLink;
        this._options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: Endpoints; options?: Partial<Option> },
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: Partial<Option>, endpoint: Endpoints): string {
        const urlOptions = { ...this._options, ...options };
        let url = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    public load(
        method: string,
        endpoint: Endpoints,
        callback: Callback<DataSourcesDraw | DataNewsDraw>,
        options: Partial<Option> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: DataSourcesDraw | DataNewsDraw) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
