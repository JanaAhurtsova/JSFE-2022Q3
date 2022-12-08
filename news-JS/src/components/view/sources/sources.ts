import './sources.css';
import { DataSources, SourcesInt } from '../../../types/index';

class Sources implements SourcesInt {
    public draw(data: DataSources[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = (document.querySelector('#sourceItemTemp') as HTMLTemplateElement);

        data.forEach((item: DataSources) => {
            const sourceClone = (sourceItemTemp.content.cloneNode(true) as DocumentFragment);
            
            (sourceClone.querySelector('.source__item-name') as HTMLSpanElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLDivElement).append(fragment);
    }
}

export default Sources;
