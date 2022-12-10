import './news.css';
import { DataNews, NewsInt } from '../../../types/index';


class News implements NewsInt {
    public draw(data: DataNews[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp && newsItemTemp instanceof HTMLTemplateElement)) {
          throw new Error('Something has gone very, very wrong.');
        }

        news.forEach((item: DataNews, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true);
            
            if (!(newsClone && newsClone instanceof DocumentFragment)) {
              throw new Error('Something has gone very, very wrong.');
            }

            const newsItem = newsClone.querySelector('.news__item');
            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
            const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
            const newsMetaDate = newsClone.querySelector('.news__meta-date');

            if(!(newsItem && newsItem instanceof HTMLDivElement)) {
              throw new Error('Something has gone very, very wrong.');
            }
            if(!(newsMetaPhoto && newsMetaPhoto instanceof HTMLDivElement)) {
              throw new Error('Something has gone very, very wrong.');
            }
            if(!(newsMetaAuthor && newsMetaAuthor instanceof HTMLDivElement)) {
              throw new Error('Something has gone very, very wrong.');
            }
            if(!(newsMetaDate && newsMetaDate instanceof HTMLLIElement)) {
              throw new Error('Something has gone very, very wrong.');
            }

            if (idx % 2) newsItem.classList.add('alt');

            newsMetaPhoto.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
            const newsDescriptionSource = newsClone.querySelector('.news__description-source');
            const newsDescriptionContent = newsClone.querySelector('.news__description-content');
            const newsDescriptionRedMore = newsClone.querySelector('.news__description-read-more a');

            if(!(newsDescriptionTitle && newsDescriptionTitle instanceof HTMLHeadingElement)) {
              throw new Error('Something has gone very, very wrong.');
            }
            if(!(newsDescriptionSource && newsDescriptionSource instanceof HTMLHeadingElement)) {
              throw new Error('Something has gone very, very wrong.');
            }
            if(!( newsDescriptionContent && newsDescriptionContent instanceof HTMLParagraphElement)) {
              throw new Error('Something has gone very, very wrong.');
            }
            if(!( newsDescriptionRedMore && newsDescriptionRedMore instanceof HTMLLinkElement)) {
              throw new Error('Something has gone very, very wrong.');
            }

            newsDescriptionTitle.textContent = item.title;
            newsDescriptionSource.textContent = item.source.name;
            newsDescriptionContent.textContent = item.description;
            newsDescriptionRedMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsBlock = document.querySelector('.news');
        
        if(!(newsBlock && newsBlock instanceof HTMLDivElement)) {
          throw new Error('Something has gone very, very wrong.');
        }

        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;
