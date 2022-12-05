import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'bc9479a8ae8c4a65936f4154126c64e4', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
