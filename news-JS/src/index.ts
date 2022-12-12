import App from './components/app/app';
import './global.css';

const app = new App();
app.start();

const searchBox = document.querySelector('.search-item') as HTMLInputElement;

const search = () => {
    const source = document.querySelector('.sources');

    if (!(source && source instanceof HTMLDivElement)) {
        throw new Error('Something has gone very, very wrong.');
    }

    const sourceItems = document.querySelectorAll<HTMLElement>('.source__item');
    const sourceItemName = source.querySelector('.source__item-name');

    if (!(sourceItemName && sourceItemName instanceof HTMLSpanElement)) {
        throw new Error('Something has gone very, very wrong.');
    }

    const searchBoxValue: string = searchBox.value.toUpperCase();

    for (let i = 0; i < sourceItems.length; i++) {
        const match = sourceItems[i].querySelector('.source__item-name');
        console.log(match);
        if (match) {
            const textValue = match.innerHTML;

            if (textValue.toUpperCase().indexOf(searchBoxValue) > -1) {
                sourceItems[i].style.display = '';
            } else {
                sourceItems[i].style.display = 'none';
            }
        }
    }
};

searchBox.addEventListener('input', search);
