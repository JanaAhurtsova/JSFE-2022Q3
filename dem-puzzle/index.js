const body = document.querySelector('body')

const overlay = document.createElement('div');
overlay.classList.add('overlay');

const header = document.createElement('div');
header.classList.add('header');

const headerWrapper = document.createElement('div');
headerWrapper.classList.add('header__wrapper');
header.append(headerWrapper);

const hamburger = document.createElement('span');
hamburger.classList.add('hamburger');

const hamburgerLine = document.createElement('span');
hamburgerLine.classList.add('hamburger__line');
hamburger.append(hamburgerLine);

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(header, wrapper, overlay);

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttons__container');
headerWrapper.append(buttonsContainer, hamburger);

const shuffleBtn = document.createElement('button');
shuffleBtn.classList.add('button');
shuffleBtn.textContent = 'Shuffle and Start';

const pauseBtn = document.createElement('button');
pauseBtn.classList.add('button');
pauseBtn.textContent = 'Pause';

const saveBtn = document.createElement('button');
saveBtn.classList.add('button');
saveBtn.textContent = 'Save';

const resultBtn = document.createElement('button');
resultBtn.classList.add('button');
resultBtn.textContent = 'Result';
buttonsContainer.append(shuffleBtn, pauseBtn, saveBtn, resultBtn);

const gameProcess = document.createElement('div');
gameProcess.classList.add('game__process');

const move = document.createElement('span');
move.classList.add('text');
move.textContent = 'Move: 0';

const volume = document.createElement('div');
volume.classList.add('volume');

const time = document.createElement('span');
time.classList.add('text');
time.textContent = 'Time: 00:00';
gameProcess.append(move, volume, time);

const audio = document.createElement('audio');
audio.setAttribute('src', 'assets/drop_sound.mp3')

const frame = document.createElement('div');
frame.classList.add('frame')

const audioShuffle = document.createElement('audio');
audioShuffle.setAttribute('src', 'assets/waterfall.mp3')

const frameSize = document.createElement('span');
frameSize.classList.add('frame__size');

const sizeBlock = document.createElement('div');
sizeBlock.classList.add('choose__size');

const otherSizes = document.createElement('span');
otherSizes.classList.add('sizes');
otherSizes.textContent = 'Other sizes:';
wrapper.append(gameProcess, audio, frame, frameSize, otherSizes, sizeBlock);

const size3 = document.createElement('span');
const size4 = document.createElement('span');
const size5 = document.createElement('span');
const size6 = document.createElement('span');
const size7 = document.createElement('span');
const size8 = document.createElement('span');
sizeBlock.append(size3, size4, size5, size6, size7, size8);

const sizes = [size3, size4, size5, size6, size7, size8];

for(let i = 0; i < sizes.length; i++) {
    sizes[i].dataset.id = i + 3;
    sizes[i].className = 'size';
    sizes[i].textContent = `${i + 3}x${i + 3}`
}
size4.className += ' active';

let selected;
let selectedSize;

function changeSize() {
    for(let i = 0; i < sizes.length; i++) {
        if(sizes[i].classList.contains('active')) {
            selectedSize = Number(sizes[i].dataset.id);
        }
    }
}
changeSize();

frameSize.textContent = `Frame size: ${selectedSize}x${selectedSize}`;
let count = 0;
let seconds = 0;
let minutes = 0;
let interval = null;
const emptyNumber = 0;
let blockedCoords = null;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    hamburgerLine.classList.toggle('active');
    buttonsContainer.classList.toggle('active');
    overlay.classList.toggle('active');
})

overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    hamburgerLine.classList.remove('active');
    buttonsContainer.classList.remove('active');
    overlay.classList.remove('active');
})

volume.addEventListener('click', () => {
    audio.muted = !audio.muted;
    audioShuffle.muted = !audioShuffle.muted
    if(audio.muted && audioShuffle.muted) {
        volume.classList.add('mute');
    } else {
        volume.classList.remove('mute');
    }
})

let cells = [];

function createTiles() {
    for (let i = 0; i < selectedSize * selectedSize; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.dataset.id = i;
        frame.append(cell)

        const num = document.createElement('span');
        cell.textContent = i;
        cell.append(num);

        if(cell.textContent === `0`) {
            cell.style.display = 'none'
        }
        cell.style.width = `${frame.offsetWidth * 100 / frame.offsetWidth / selectedSize}%`;
        cell.style.height = `${frame.offsetWidth * 100 / frame.offsetWidth / selectedSize - 0.2}% `;

        cells.push(cell)
    }
}

createTiles()

const countTile = selectedSize * selectedSize;
let cellsArr = cells.map(cell => Number(cell.dataset.id));
let matrix = getMatrix(cellsArr);
let cellsMatrix = []
for(let i = 0; i < cells.length; i++) {
    cellsMatrix = matrix.map(el => el.map(item => cells[i]));
}
setPositionCells(matrix);

if(cells.length != countTile) {
    throw new Error(`Must be ${countItem} cells`);
}

function getMatrix(arr) {
    let matrix = Array.from(Array(selectedSize), () => new Array(selectedSize));
    let x = 0;
    let y = 0;

    for(let i = 0; i < arr.length; i++) {
        if(x >= selectedSize) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;
    }
    return matrix
}

function setPositionCells(matrix) {
    for(let y = 0; y < selectedSize; y++) {
        for(let x = 0; x < selectedSize; x++) {
            const value = matrix[y][x];
            const cell = cells[value];
            const shiftPos = 100;
            cell.style.transform = `translate(${x * shiftPos}%, ${y * shiftPos}%)`;
        }
    }
}

const maxShuffle = 70;
let duration;
let shuffled = false;

shuffleBtn.addEventListener('click', shuffledField);

function shuffledField() {
    resetTimer();

    if(shuffled) {
        return
    }

    move.textContent = 'Move: 0';

    audioShuffle.play();
    shuffled = true;
    
    randomSwap(matrix);
    setPositionCells(matrix);

    clearInterval(duration);
    let shuffleCount = 0;

    if(shuffleCount === 0) {
        duration = setInterval(() => {
            randomSwap(matrix);
            setPositionCells(matrix);

            shuffleCount += 1;

            if(shuffleCount >= maxShuffle) {
                clearInterval(duration);
                shuffled = false;
                audioShuffle.pause();
                startTimer();
            }
        }, 25)
    }
}
shuffledField();

function randomSwap(matrix) {
    const blankCoords = findCoordinatesByNum(emptyNumber, matrix);
    const validCoords = findValidCoordinates({
        blankCoords,
        matrix,
        blockedCoords
    })

    blockedCoords = blankCoords;

    const swapCoords = validCoords[
        Math.floor(Math.random() * validCoords.length)
    ];

    swap(blankCoords, swapCoords, matrix)
}

function findValidCoordinates({ blankCoords, matrix, blockedCoords }) {
    let validCoords = [];

    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(isValidForSwap({x, y}, blankCoords)) {
                if(!blockedCoords || !(blockedCoords.x === x && blockedCoords.y === y)) {
                    validCoords.push({x, y})
                }
            } 
        }
    }
    return validCoords
}

frame.addEventListener('click', game)

function game(event) {
    if(shuffled) {
        return
    }

    const cell = event.target.closest('button');
    if(!cell) {
        return;
    }
   
    audio.play();

    const cellNum = Number(cell.dataset.id);
    const cellCoords = findCoordinatesByNum(cellNum, matrix);
    const blankCoords = findCoordinatesByNum(emptyNumber, matrix);
    const isValid = isValidForSwap(cellCoords, blankCoords);
    console.log(isValid)

    if(isValid) {
        swap(cellCoords, blankCoords, matrix);
        setPositionCells(matrix)
        count++
        move.textContent = `Move: ${count}`;
    }
}

function findCoordinatesByNum(num, matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] === num) {
                return {x, y}
            }
        }
    }
}

function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x);
    const diffY = Math.abs(coords1.y - coords2.y);

    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

function swap(coords1, coords2, matrix) {
    const coords1Num = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Num;
}

let isGame = false;

pauseBtn.addEventListener('click', () => {
    if(!isGame) {
        frame.removeEventListener('click', game);
        isGame = true;
        pauseBtn.classList.add('active');
        pauseBtn.textContent = 'Continue';
        stopTimer();
    } else {
        frame.addEventListener('click', game);
        isGame = false;
        pauseBtn.classList.remove('active');
        pauseBtn.textContent = 'Pause';
        startTimer();
    }
})

function timer() {
    seconds++;

    let secs = seconds % 60;
    let mins = Math.floor(seconds / 60);
    if(secs < 10) secs = '0' + secs;
    if(mins < 10) mins = '0' + mins;
    
    time.innerText = `Time: ${mins}:${secs}`;
}

function startTimer() {
    if(interval) {
        return;
    }
    interval = setInterval(timer, 1000)
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    time.textContent = 'Time: 00:00'
}

sizeBlock.addEventListener('click', (event) => {
    sizes.forEach(size => size.classList.remove('active'));
    let size = event.target.closest('span');
    if (!size) return;
    activeSize(size);
    frame.innerHTML = '';
    cells = [];
    changeSize();
    createTiles();
    cellsArr = cells.map(cell => Number(cell.dataset.id));
    matrix = getMatrix(cellsArr);
    setPositionCells(matrix);
    shuffledField();
    frameSize.textContent = `Frame size: ${selectedSize}x${selectedSize}`;
})

function activeSize(size) {
    if(selected) {
        selected.classList.remove('active');
    }
    selected = size;
    selected.classList.add('active');
}
