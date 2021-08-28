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