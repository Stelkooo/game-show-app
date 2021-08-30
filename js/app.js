const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startOverlay = document.getElementById('overlay');
const btns = document.querySelectorAll('.keyrow button');
const hearts = document.querySelectorAll('.tries img');
const phraseUl = document.querySelector("#phrase ul");
let missed = 0;

const phrases = [
    "Down To Earth",
    "Shot In The Dark",
    "Go For Broke",
    "A Piece of Cake",
    "Jumping The Gun",
];

let randomPhrase = getRandomPhraseAsArray(phrases);

const startBtn = document.getElementsByClassName('btn__reset')[0];

startBtn.addEventListener('click', (e) => {
    const startBtnText = startBtn.innerHTML;
    if (startBtnText === 'Start Game') {
        addPhraseToDisplay(randomPhrase);
        setOverlayDisplay('none');
        p.style.display = 'inline';
    } else if (startBtnText === 'Try Again' || startBtnText === 'Play Again') {
        resetGame();
        setOverlayDisplay('none');
    }   
})

function getRandomPhraseAsArray(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    let characters = [];
    for (let i = 0; i < randomPhrase.length; i++) {
        characters.push(randomPhrase[i]);
    }
    return characters
}

function resetGame() {
    missed = 0; // Sets missed to 0
    // Removes the random phrase list items
    while (phraseUl.firstChild) {
        phraseUl.removeChild(phraseUl.firstChild);
    }
    // Removes the chosen class and disabled style from the keyboard btns
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].className === 'chosen' && btns[i].disabled === true) {
            btns[i].className = '';
            btns[i].disabled = false;
        }
    }
    // Sets all the hearts back to the liveHeart.png image
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].src = 'images/liveHeart.png';
    }
    randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);
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

/**
 * Checks of the letter of the btn which was selected,
 * and sees if matches with one of the letters in the phrase.
 * If it is, then it returns the letter and if not it returns null
 * @param {EventTarget} btn Btn which was pressed
 * @returns letter which was selector or null
 */
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

/**
 * Event Listensers
 */

/**
 * Takes in btn and sets two HTML properties
 * @param {EventTarget} btn 
 */
function btnChosen(btn) {
    btn.className = 'chosen';
    btn.disabled = 'true';
}

function isLetterNull(letter) {
    if (letter === null) {
        missed++;
        hearts[missed - 1].src = 'images/lostHeart.png';
    }
}

/**
 * Detects 
 */
keyboard.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.tagName === 'BUTTON') {
        btnChosen(btn);
        isLetterNull(checkLetter(btn));
    }
    checkWin();
})

document.addEventListener('keyup', (e) => {
    const keyPressed = e.key;
    for (let i = 0; i < btns.length; i++) {
        const btn = btns[i];
        if (btn.innerHTML === keyPressed) {
            btnChosen(btn);
            isLetterNull(checkLetter(btn));
        }
    }
    checkWin();
})

/**
 * Has player won?
 */

const title = document.querySelector(".title");
const p = document.createElement('p');
p.style.display = 'none';
title.insertAdjacentElement('afterend', p);
/**
 * Checks to see if the player has won or lost
 * If the player won/lost it changes the btn text, adds a class, and changes p text
 * Calls the resetGame function
 */
function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    function changeHTML(result) {
        setOverlayDisplay('flex');
        if (result === 'win') {
            startBtn.innerHTML = 'Play Again';
            startOverlay.className = 'win';
            p.innerHTML = "Well done, you guessed the phrase correctly";
        } else if (result === 'lose') {
            startBtn.innerHTML = 'Try Again';
            startOverlay.className = 'lose';
            p.innerHTML = "Unlucky, you did not guess the phrase";
        }
    }
    if (letter.length === show.length) {
        changeHTML('win');
        resetGame();
    } else if (missed === 5) {
        changeHTML('lose');
        resetGame();
    }
}
/**
 * Sets the CSS display property of the #overlay <div> to value given
 * @param {string} value Value of the CSS display property
 */
function setOverlayDisplay(value) {
    const startOverlayStyle = startOverlay.style;
    startOverlayStyle.display = value;
}