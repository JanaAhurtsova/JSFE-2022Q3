const dots = document.querySelectorAll('.big-dot');
const smallDots = document.querySelectorAll('.count__dot');
const labels = document.querySelectorAll('.sum');
const amount = document.querySelector('.another-amount');
let mql = window.matchMedia('(max-width: 640px)');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        dots.forEach(item => item.classList.remove('active'));
        dot.classList.add('active');
        for (let i = 0; i < dots.length; i++) {
            if(dots[i].classList.contains('active')) {
                smallDots[i].checked = true;
                labels[i].classList.add('active');
                labels[i].firstElementChild.classList.add('active');
                amount.value = smallDots[i].value;
            } else {
                smallDots[i].checked = false;
                labels[i].classList.remove('active');
                labels[i].firstElementChild.classList.remove('active');
            }
        }
    });
})

function inputAmount() {
    for (let i = 0; i < smallDots.length; i++) {
        if(amount.value === smallDots[i].value) {
            dots[i].classList.add('active');
            smallDots[i].checked = true;
            labels[i].classList.add('active');
            labels[i].firstElementChild.classList.add('active');
        } else {
            dots[i].classList.remove('active');
            smallDots[i].checked = false;
            labels[i].classList.remove('active');
            labels[i].firstElementChild.classList.remove('active');
        }
    }
}

function max() {
    if(amount.value.length > 4) {
        amount.value = amount.value.slice(0, 4);
    }
}

amount.addEventListener('input', inputAmount);
amount.addEventListener('input', max);


// function activeMedia() {
//     if(mql.matches) {
//         dots[2].classList.remove('active');
//         smallDots[2].removeAttribute('checked');
//         labels[2].classList.remove('active');
//         labels[2].firstElementChild.classList.remove('active');
//         dots[4].classList.add('active');
//         smallDots[4].setAttribute('checked', true);
//         labels[4].classList.add('active');
//         labels[4].firstElementChild.classList.add('active');
//     } else {
//         dots[4].classList.remove('active');
//         smallDots[4].removeAttribute('checked');
//         labels[4].classList.remove('active');
//         labels[4].firstElementChild.classList.remove('active');
//         dots[2].classList.add('active');
//         smallDots[2].setAttribute('checked', true);
//         labels[2].classList.add('active');
//         labels[2].firstElementChild.classList.add('active');
//     }
// }
// window.addEventListener('resize', activeMedia);
// window.addEventListener('load', activeMedia);


//burger-menu
const hamburger = document.querySelector('.hamburger');
const hamburgerLine = document.querySelector('.hamburger__line');
const burgerMenu = document.querySelector('.wrapper__header');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    hamburgerLine.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    overlay.classList.toggle('active');
})

overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    hamburgerLine.classList.remove('active');
    burgerMenu.classList.remove('active');
    overlay.classList.remove('active');
})

