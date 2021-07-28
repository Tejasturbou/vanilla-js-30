window.addEventListener('keydown', playAudio);

function playAudio(event) {
    const audioElement = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if (!audioElement) return;
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    key.classList.add('playing');
    audioElement.currentTime = 0;
    audioElement.play();
}

const keysArray = document.querySelectorAll('.key');
keysArray.forEach(key => key.addEventListener('transitionend', removeClass));

function removeClass(event) {
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('playing')
}