export class Modal {
    constructor(classes, {id, urlToIcon, name, location, time, feedback}) {
        this.id = id;
        this.urlToIcon = urlToIcon;
        this.name = name;
        this.location = location;
        this.time = time;
        this.feedback = feedback;
    }

    // Modal generator
    generateContent() {
        let template = '';
        let article = document.createElement('div');
        article.className = 'testimonial__modal';
      
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
            (template += `<div class="feedback__text__modal">${this.feedback}</div>`)

        article.innerHTML = template;
        return article;
    }

    buildModal() {
        let content = this.generateContent();

        //Overlay
        this.overlay = this.createDomNode(this.overlay, 'div', 'overlay__modal');

        //Modal
        this.modal = this.createDomNode(this.modal, 'div', 'modal');

        //Modal content
        this.modalContent = this.createDomNode(this.modalContent, 'div', 'modal__content');

        //Close Button
        this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'span', 'modal__close-icon');
        this.modalCloseBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 14C0.744141 14 0.488281 13.9023 0.292969 13.707C-0.0976562 13.3164 -0.0976562 12.6836 0.292969 12.293L12.293 0.292969C12.6836 -0.0976562 13.3164 -0.0976562 13.707 0.292969C14.0977 0.683594 14.0977 1.31641 13.707 1.70703L1.70703 13.707C1.51172 13.9023 1.25586 14 1 14Z" fill="url(#paint0_linear_166_1069)"/>
        <path d="M1 14C0.744141 14 0.488281 13.9023 0.292969 13.707C-0.0976562 13.3164 -0.0976562 12.6836 0.292969 12.293L12.293 0.292969C12.6836 -0.0976562 13.3164 -0.0976562 13.707 0.292969C14.0977 0.683594 14.0977 1.31641 13.707 1.70703L1.70703 13.707C1.51172 13.9023 1.25586 14 1 14Z" fill="url(#paint1_linear_166_1069)"/>
        <path d="M1 14C0.744141 14 0.488281 13.9023 0.292969 13.707C-0.0976562 13.3164 -0.0976562 12.6836 0.292969 12.293L12.293 0.292969C12.6836 -0.0976562 13.3164 -0.0976562 13.707 0.292969C14.0977 0.683594 14.0977 1.31641 13.707 1.70703L1.70703 13.707C1.51172 13.9023 1.25586 14 1 14Z" fill="url(#paint2_linear_166_1069)"/>
        <path d="M13 14C12.7441 14 12.4883 13.9023 12.293 13.707L0.292969 1.70703C-0.0976562 1.31641 -0.0976562 0.683594 0.292969 0.292969C0.683594 -0.0976562 1.31641 -0.0976562 1.70703 0.292969L13.707 12.293C14.0977 12.6836 14.0977 13.3164 13.707 13.707C13.5117 13.9023 13.2559 14 13 14Z" fill="url(#paint3_linear_166_1069)"/>
        <path d="M13 14C12.7441 14 12.4883 13.9023 12.293 13.707L0.292969 1.70703C-0.0976562 1.31641 -0.0976562 0.683594 0.292969 0.292969C0.683594 -0.0976562 1.31641 -0.0976562 1.70703 0.292969L13.707 12.293C14.0977 12.6836 14.0977 13.3164 13.707 13.707C13.5117 13.9023 13.2559 14 13 14Z" fill="url(#paint4_linear_166_1069)"/>
        <path d="M13 14C12.7441 14 12.4883 13.9023 12.293 13.707L0.292969 1.70703C-0.0976562 1.31641 -0.0976562 0.683594 0.292969 0.292969C0.683594 -0.0976562 1.31641 -0.0976562 1.70703 0.292969L13.707 12.293C14.0977 12.6836 14.0977 13.3164 13.707 13.707C13.5117 13.9023 13.2559 14 13 14Z" fill="url(#paint5_linear_166_1069)"/>
        <defs>
        <linearGradient id="paint0_linear_166_1069" x1="6.4575" y1="15.3497" x2="-11.3639" y2="-2.94275" gradientUnits="userSpaceOnUse">
        <stop offset="0.0647506" stop-color="#FEBDAB" stop-opacity="0.74"/>
        <stop offset="0.225114" stop-color="#F3A9F8" stop-opacity="0.66"/>
        <stop offset="0.45571" stop-color="#E0D8F0"/>
        <stop offset="0.823271" stop-color="#EAF7FE"/>
        <stop offset="0.991019" stop-color="#EAF7FE"/>
        </linearGradient>
        <linearGradient id="paint1_linear_166_1069" x1="6.4575" y1="15.3497" x2="-11.3639" y2="-2.94275" gradientUnits="userSpaceOnUse">
        <stop offset="0.0647506" stop-color="#FEBDAB" stop-opacity="0.74"/>
        <stop offset="0.225114" stop-color="#F3A9F8" stop-opacity="0.66"/>
        <stop offset="0.45571" stop-color="#E0D8F0"/>
        <stop offset="0.823271" stop-color="#EAF7FE"/>
        <stop offset="0.991019" stop-color="#EAF7FE"/>
        </linearGradient>
        <linearGradient id="paint2_linear_166_1069" x1="6.4575" y1="15.3497" x2="-11.3639" y2="-2.94275" gradientUnits="userSpaceOnUse">
        <stop offset="0.0647506" stop-color="#FED290" stop-opacity="0.7"/>
        <stop offset="0.614306" stop-color="#FEBDAB"/>
        <stop offset="0.65625" stop-color="#FED290" stop-opacity="0.7"/>
        </linearGradient>
        <linearGradient id="paint3_linear_166_1069" x1="6.4575" y1="15.3497" x2="-11.3639" y2="-2.94275" gradientUnits="userSpaceOnUse">
        <stop offset="0.0647506" stop-color="#FEBDAB" stop-opacity="0.74"/>
        <stop offset="0.225114" stop-color="#F3A9F8" stop-opacity="0.66"/>
        <stop offset="0.45571" stop-color="#E0D8F0"/>
        <stop offset="0.823271" stop-color="#EAF7FE"/>
        <stop offset="0.991019" stop-color="#EAF7FE"/>
        </linearGradient>
        <linearGradient id="paint4_linear_166_1069" x1="6.4575" y1="15.3497" x2="-11.3639" y2="-2.94275" gradientUnits="userSpaceOnUse">
        <stop offset="0.0647506" stop-color="#FEBDAB" stop-opacity="0.74"/>
        <stop offset="0.225114" stop-color="#F3A9F8" stop-opacity="0.66"/>
        <stop offset="0.45571" stop-color="#E0D8F0"/>
        <stop offset="0.823271" stop-color="#EAF7FE"/>
        <stop offset="0.991019" stop-color="#EAF7FE"/>
        </linearGradient>
        <linearGradient id="paint5_linear_166_1069" x1="6.4575" y1="15.3497" x2="-11.3639" y2="-2.94275" gradientUnits="userSpaceOnUse">
        <stop offset="0.0647506" stop-color="#FED290" stop-opacity="0.7"/>
        <stop offset="0.614306" stop-color="#FEBDAB"/>
        <stop offset="0.65625" stop-color="#FED290" stop-opacity="0.7"/>
        </linearGradient>
        </defs>
        </svg>`

        this.setContent(content);

        this.appendModalElements();

        // Bind Events
        this.bindEvents();

        // Open Modal
        this.openModal();
    }

    createDomNode (node, element, ...classes){
        node = document.createElement(element);
        node.classList.add(...classes);
        return node
    };

    setContent(content) {
        if(typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else {
            this.modalContent.innerHTML = '';
            this.modalContent.appendChild(content);
        }
    }

    appendModalElements() {
        this.modal.append(this.modalCloseBtn);
        this.modal.append(this.modalContent);
        this.overlay.append(this.modal);
    }

    bindEvents() {
        this.modalCloseBtn.addEventListener('click', this.closeModal);
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.overlay);
    }

    closeModal(e) {
        let classes = e.target.classList;
        if(classes.contains('overlay__modal') || classes.contains('modal__close-icon')) {
            document.querySelector('.overlay__modal').remove();
        }
    }
}