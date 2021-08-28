const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const resetButton = document.getElementsByClassName('btn__reset')[0];

resetButton.addEventListener('click', (e) => {
    const startOverlay = document.getElementById('overlay');
    startOverlay.style.display = 'none';
})