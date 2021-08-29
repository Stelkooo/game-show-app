const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btns = document.querySelectorAll('.keyrow button');
const hearts = document.querySelectorAll('.tries img');
const startOverlay = document.getElementById('overlay');
const phraseUl = document.querySelector("#phrase ul");
const title = document.querySelector(".title");
const p = document.createElement('p');
title.insertAdjacentElement('afterend', p);
let letterFound = '';
let missed = 0;

const startBtn = document.getElementsByClassName('btn__reset')[0];

const phrases = [
    "Down To Earth",
    "Shot In The Dark",
    "Go For Broke",
    "A Piece of Cake",
    "Jumping The Gun",
];

let randomPhrase = getRandomPhraseAsArray(phrases);

startBtn.addEventListener('click', (e) => {
    startOverlay.style.display = 'none';
    addPhraseToDisplay(randomPhrase);   
})

function resetGame() {
    missed = 0;
    randomPhrase = getRandomPhraseAsArray(phrases);
    while (phraseUl.firstChild) {
        phraseUl.removeChild(phraseUl.firstChild);
    }
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].className === 'chosen' && btns[i].disabled === true) {
            btns[i].className = '';
            btns[i].disabled = 'false';
        }
    }
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].src = 'images/liveHeart.png';
    }
}

function getRandomPhraseAsArray(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    let characters = [];
    const randomPhrase = arr[randomNumber];
    for (let i = 0; i < randomPhrase.length; i++) {
        characters.push(randomPhrase[i]);
    }
    return characters
}

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const character = arr[i];
        const listItem = document.createElement("li");
        if (character === ' ') {
            listItem.className = "space";
        } else {
            listItem.className = "letter";
        }
        listItem.innerHTML = character;
        phraseUl.appendChild(listItem);
    }
}

function checkLetter(btn) {
    let letter = '';
    const letterClass = document.getElementsByClassName('letter');
    for (let i = 0; i < letterClass.length; i++) {
        const letterElement = letterClass[i];
        if (letterElement.innerHTML.toLowerCase() === btn.innerHTML) {
            letterElement.className += ' show';
            if (letter === '') {
                letter += letterElement.innerHTML;
            }
        }
    }
    return (letter.length === 1 ? letter : null);
}

keyboard.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.tagName === 'BUTTON') {
        btn.className = 'chosen';
        btn.disabled = 'true';
        letterFound = checkLetter(btn);
        if (letterFound === null) {
            missed++;
            console.log(missed);
            hearts[missed - 1].src = 'images/lostHeart.png';
        }
    }
    checkWin();
})

document.addEventListener('keyup', (e) => {
    const keyPressed = e.key;
    for (let i = 0; i < btns.length; i++) {
        const btn = btns[i];
        if (btn.innerHTML === keyPressed) {
            btn.className = 'chosen';
            btn.disabled = 'true';
            letterFound = checkLetter(btn);
            if (letterFound === null) {
                missed++;
                hearts[missed - 1].src = 'images/lostHeart.png'
            }
        }
    }
    checkWin();
})

function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    if (letter.length === show.length) {
        startBtn.innerHTML = 'Play Again';
        startOverlay.style.display = 'flex';
        startOverlay.className = 'win';
        p.innerHTML = "Well done, you guessed the phrase correctly";
        resetGame();
    } else if (missed === 5) {
        startBtn.innerHTML = 'Try Again';
        startOverlay.style.display = 'flex';
        startOverlay.className = 'lose';
        p.innerHTML = "Unlucky, you did not guess the phrase";
        resetGame();
    }
}