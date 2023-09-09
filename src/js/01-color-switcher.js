
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

document.querySelector('button[data-stop]').disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = 0;

btnStart.addEventListener("click", () => {
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 1000,
    document.querySelector('button[data-start]').disabled = true,
    document.querySelector('button[data-stop]').disabled = false)
});

btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    document.querySelector('button[data-start]').disabled = false;
    document.querySelector('button[data-stop]').disabled = true;
}); 