const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const resetButton = document.getElementsByClassName('btn__reset')[0];

resetButton.addEventListener('click', (e) => {
    const startOverlay = document.getElementById('overlay');
    startOverlay.style.display = 'none';
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