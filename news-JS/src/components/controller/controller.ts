import AppLoader from './appLoader';
import { Endpoints } from '../../types/enum';
import { Callback, DataSourcesDraw, DataNewsDraw } from '../../types/index';

class AppController extends AppLoader {
    getSources(callback: Callback<DataSourcesDraw>) {
        super.getResp(
            {
                endpoint: Endpoints.SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<DataNewsDraw>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget;

        if (!(target && newsContainer && newsContainer instanceof HTMLElement)) {
          throw new Error('Something has gone very, very wrong.');
        }

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if(!sourceId) {
                  throw new Error('Something has gone very, very wrong.');
                }

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoints.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
