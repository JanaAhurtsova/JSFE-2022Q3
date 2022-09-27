const dots = document.querySelectorAll('.big-dot');
const smallDots = document.querySelectorAll('.count__dot');
const labels = document.querySelectorAll('.sum');


dots.forEach(dot => {
    dot.addEventListener('click', () => {
        dots.forEach(item => item.classList.remove('active'));
        dot.classList.add('active');
        for (let i =0; i< dots.length; i++) {
            if(dots[i].classList.contains('active')) {
                smallDots[i].setAttribute('checked', 'checked');
                labels[i].classList.add('active');
                labels[i].firstElementChild.classList.add('active');
            } else {
                smallDots[i].removeAttribute('checked')
                labels[i].classList.remove('active');
                labels[i].firstElementChild.classList.remove('active');
            }
        }
    });
})