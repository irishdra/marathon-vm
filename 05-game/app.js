const colors = ['#ff6b6b', '#ff6be9', '#c860fb', '#716bff', '#6bffc2', '#fbb360'];

const screens = document.querySelectorAll('.screen');
const startButton = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function endGame() {
    timeElement.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function decreaseTime() {
    if (time <= 0) {
        endGame();
    } else {
        let current = --time;
        setTime(current);
    }
}

function setTime(value) {
    if (value < 10) {
        value = `0${value}`;
    }

    timeElement.innerHTML = `00:${value}`;
} 

function createRandomCircle() {
    const {width, height} = board.getBoundingClientRect();

    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor();

    board.append(circle);
}

function getRandomColor() {
    const index = getRandomNumber(0, colors.length);
    return colors[index];
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}