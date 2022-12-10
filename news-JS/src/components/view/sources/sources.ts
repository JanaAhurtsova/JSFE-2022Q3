import './sources.css';
import { DataSources, SourcesInt } from '../../../types/index';

class Sources implements SourcesInt {
    public draw(data: DataSources[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!(sourceItemTemp && sourceItemTemp instanceof HTMLTemplateElement)) {
          throw new Error('Something has gone very, very wrong.');
        }

        data.forEach((item: DataSources) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if(!(sourceClone && sourceClone instanceof DocumentFragment)) {
              throw new Error('Something has gone very, very wrong.');
            }
            
            const sourceItemName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');
            
            if(!(sourceItemName && sourceItemName instanceof HTMLSpanElement)) {
              throw new Error('Something has gone very, very wrong.');
            }
            if(!(sourceItem && sourceItem instanceof HTMLDivElement)) {
              throw new Error('Something has gone very, very wrong.');
            }

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const source = document.querySelector('.sources');

        if(!(source && source instanceof HTMLDivElement)) {
          throw new Error('Something has gone very, very wrong.');
        }
        
        source.append(fragment);
    }
}

export default Sources;
