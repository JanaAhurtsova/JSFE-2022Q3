export class Article {
    constructor({ id, urlToIcon, name, location, time, feedback }) {
        this.id = id;
        this.urlToIcon = urlToIcon;
        this.name = name;
        this.location = location;
        this.time = time;
        this.feedback = feedback;
    }

    // Article generator
    generateArticle() {
        let template = '';
        let article = document.createElement('article');
        article.className = 'testimonial';
        article.setAttribute('data-id', this.id);
      
        template += ` <div class="user"> `
        this.urlToIcon &&
        (template += `<img src=${this.urlToIcon} class="testimonial__icon" alt="user">`);
            
            template += `<div class="user-name">`
                this.name &&
                (template += `<h5 class="name">${this.name}</h5>`)

                this.location &&
                (template += `<p class="location">${this.location} 
                <span> • </span> ${this.time}</p>`)
            template += `</div>`
        template += `</div>`

        this.feedback &&
        (template += `<div class="feedback__text">${this.feedback}</div>`)

        article.innerHTML = template;
        return article;
    }
}