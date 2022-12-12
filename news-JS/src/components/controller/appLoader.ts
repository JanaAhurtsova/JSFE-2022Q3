import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', {
            apiKey: '2959afa0c4be401c8a5353dcffd22e70', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
