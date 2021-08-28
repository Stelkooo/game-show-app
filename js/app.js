const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btns = document.querySelectorAll('.keyrow button');
const hearts = document.querySelectorAll('.tries img');
const startOverlay = document.getElementById('overlay');
let letterFound = '';
let missed = 0;

const resetButton = document.getElementsByClassName('btn__reset')[0];

resetButton.addEventListener('click', (e) => {
    startOverlay.style.display = 'none';
    missed = 0;
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
})

const phrases = [
    "Down To Earth",
    "Shot In The Dark",
    "Go For Broke",
    "A Piece of Cake",
    "Jumping The Gun",
];

function getRandomPhraseAsArray (arr) {
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
        const phraseUl = document.querySelector("#phrase ul");
        if (character !== ' ') {
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
            hearts[missed - 1].src = 'images/lostHeart.png'
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
        startOverlay.style.display = 'flex';
        console.log("Win");
    } else if (missed === 4) {
        startOverlay.style.display = 'flex';
        console.log("Lost");
    }
}