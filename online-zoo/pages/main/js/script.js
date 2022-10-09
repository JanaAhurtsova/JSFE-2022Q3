//burger-menu

const hamburger = document.querySelector('.hamburger');
const hamburgerLine = document.querySelector('.hamburger__line');
const burgerMenu = document.querySelector('.wrapper__header');
const overlayBurger = document.querySelector('.overlay__burger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    hamburgerLine.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    overlayBurger.classList.toggle('active');
})

overlayBurger.addEventListener('click', () => {
    hamburger.classList.remove('active');
    hamburgerLine.classList.remove('active');
    burgerMenu.classList.remove('active');
    overlayBurger.classList.remove('active');
})

// carousel with pets 
import { pets } from './pets.js';
import { Cards} from './cards.js';
const carousel = document.querySelector('.carousel');
const itemLeft = document.querySelector('.item-left');
const itemRight = document.querySelector('.item-right');
const item = document.querySelector('.item');
const prev = document.querySelector('.arrow__left');
const next = document.querySelector('.arrow__right');


const generateCards = () => {
    let cards = [];
    pets.forEach(card => {
        cards.push(new Cards(card))
    });
  return cards;
}

const renderCardsToDomLeft = () => {
    generateCards().sort(() => Math.random() - 0.5).splice(0, 6).forEach(card => {
        itemLeft.append(card.generateCard());
    })
}
renderCardsToDomLeft();

const renderCardsToDomRight = () => {
    generateCards().sort(() => Math.random() - 0.5).splice(0, 6).forEach(card => {
        itemRight.append(card.generateCard());
    })
}
renderCardsToDomRight()

const toLeft = () => {
    carousel.classList.add('to_left');
    prev.removeEventListener('click', toLeft);
    next.removeEventListener('click', toRight);
}

const toRight = () => {
    carousel.classList.add('to_right');
    prev.removeEventListener('click', toLeft);
    next.removeEventListener('click', toRight);
}

prev.addEventListener('click', toLeft);
next.addEventListener('click', toRight);

carousel.addEventListener('animationend', (animationEvent) => {
    let changeItem;
    if (animationEvent.animationName === 'left') {
        changeItem = itemLeft;
        carousel.classList.remove('to_left');
        const leftItems = itemLeft.innerHTML;
        item.innerHTML = leftItems;
    } else {
        changeItem = itemRight;
        carousel.classList.remove('to_right');
        const rightItems = itemRight.innerHTML;
        item.innerHTML = rightItems;
    }

    changeItem.innerHTML = '';
    generateCards().sort(() => Math.random() - 0.5).splice(0, 6).forEach(card => {
        changeItem.append(card.generateCard());
    })

    prev.addEventListener('click', toLeft);
    next.addEventListener('click', toRight);
})

//Testimonials
import { Article } from './articles.js';
import { Modal } from './modal.js';
import { data } from './feedbacks.js';
const range = document.querySelector('.testimonial__scroll');
const feedbackCarousel = document.querySelector('.feedback-wrapper');
let mqlBig = window.matchMedia('(max-width: 1600px)');
let mqlSmall = window.matchMedia('(max-width: 900px)');
let mqlTablet = window.matchMedia('(max-width: 640px)');
let width;

const generateArticles = (data) => {
    let articles = [];
    data.forEach(article => {
        articles.push(new Article(article))
    });
    return articles;
}

window.onload = function() {
    // Render Articles
    if(data) {
        renderArticlesToDom();
    }
}

const getFeedbackWrapper = () => {
    feedbackCarousel.innerHTML = '';
    return feedbackCarousel;
}

const renderArticlesToDom = () => {
    let feedbackWrapper = getFeedbackWrapper();
    generateArticles(data).reverse().forEach(article => {
        feedbackWrapper.append(article.generateArticle());
    })
    width = feedbackWrapper.firstElementChild.offsetWidth;

    addArticleClickHandler();
}

const feedbacksMove = () => {
    let value;
    let gap;
    if(mqlBig.matches) {
        gap = 30;
        value = (width + gap) * range.value;
    }
    if(mqlSmall.matches) {
        gap = 19;
        value = (width + gap) * range.value;
    }
    feedbackCarousel.style.left = `-${value}px`;
}
feedbacksMove()

range.addEventListener('input', feedbacksMove)
window.addEventListener("resize", renderArticlesToDom);

const addArticleClickHandler = () => {
    if( mqlTablet.matches) {
        feedbackCarousel.addEventListener('click', (e) => {
            if(e.target.closest('.testimonial')) {
                let clickedArticleId = e.target.closest('.testimonial').getAttribute('data-id');
                let clickedArticleData = getClickedData(clickedArticleId);

                renderArticleModalWindow(clickedArticleData);
            }
        })
    }
}

const getClickedData = (id) => {
    return data.find(article => article.id == id)
}

const renderArticleModalWindow = (article) => {
    let modal =  new Modal ('modal', article);
    modal.buildModal();
}