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

