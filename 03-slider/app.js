const downButton = document.querySelector('.down-button');
const upButton = document.querySelector('.up-button');
const container = document.querySelector('.container');
const sidebar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');

const countSlides = mainSlide.querySelectorAll('div').length;
sidebar.style.top = `-${(countSlides - 1) * 100}vh`;

let activeSlideNumber = 0;

upButton.addEventListener('click', () => {
    changeSlide('up');
});

downButton.addEventListener('click', () => {
    changeSlide('down');
})

function changeSlide(direction) {
    if (direction === 'up') {
        activeSlideNumber++;
        if (activeSlideNumber === countSlides) {
            activeSlideNumber = 0;
        }
    } else if (direction === 'down') {
        activeSlideNumber--;
        if (activeSlideNumber < 0) {
            activeSlideNumber = countSlides - 1;
        }
    }

    const height = container.clientHeight;
    mainSlide.style.transform = `translateY(-${activeSlideNumber * height}px)`;
    sidebar.style.transform = `translateY(${activeSlideNumber * height}px)`;
}