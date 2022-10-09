export class Cards {
    constructor({id, urlToImg, name, location, urlToIcon}) {
        this.id = id;
        this.urlToImg = urlToImg;
        this.name = name;
        this.location = location;
        this.urlToIcon = urlToIcon;
    }

    generateCard() {
        let template = '';
        let card = document.createElement('article');
        card.className = 'pets__block';
        card.setAttribute('data-id', this.id);

        this.urlToImg &&
        (template += `<img src=${this.urlToImg} alt=${this.name} class="pet__img">`)

        template += `<div class="pets__content">`
        
            template += `<div class="pets__description"`
                this.name &&
                (template += `<h5 class="pets__name">${this.name}</h5>`);

                this.location &&
                (template += `<p class="pets__country">${this.location}</p>`);
            template += `</div>`

            this.urlToIcon &&
            (template += `<img src=${this.urlToIcon} class="pets__icon">`)

        template += `</div>`

        card.innerHTML = template;
        return card;
    }
}