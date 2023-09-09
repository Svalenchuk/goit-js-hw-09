import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const rest = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let timeData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onOpen() {
    clearInterval(timerId) 
      rest.days.textContent = '00';
      rest.hours.textContent = '00';
      rest.minutes.textContent = '00';
      rest.seconds.textContent = '00';
  },
    
    onClose(selectedDates) {
        timeData = selectedDates[0].getTime();     
    if (timeData < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        rest.btnStart.setAttribute('disabled', true);
        return;
    };
        rest.btnStart.removeAttribute('disabled');
    },
};

const dataInput = flatpickr(rest.inputEl, options);

rest.btnStart.addEventListener('click', startButton);
rest.btnStart.setAttribute('disabled', true);

function startButton() {
  timerId = setInterval(() => {
    const deltaTime = timeData - new Date().getTime();
    if (deltaTime <= 0) {
      clearInterval(timerId);
      return;
    };
    const time = convertMs(deltaTime);
    updateClockInfo(time);
  }, 1000);
    
  rest.btnStart.setAttribute('disabled', true);
};

function updateClockInfo({ days, hours, minutes, seconds }) {
  rest.days.textContent = `${days}`;
  rest.hours.textContent = `${hours}`;
  rest.minutes.textContent = `${minutes}`;
  rest.seconds.textContent = `${seconds}`;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};