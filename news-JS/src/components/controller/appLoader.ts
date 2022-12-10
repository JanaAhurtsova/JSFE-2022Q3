import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', {
            apiKey: 'bc9479a8ae8c4a65936f4154126c64e4', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
