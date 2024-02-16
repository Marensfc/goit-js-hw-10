'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconClose from '../img/modal-close-btn.png';

const inputTime = document.querySelector('#datetime-picker');
const startButton = document.querySelector('.btn-start');
const timeIndicators = document.querySelectorAll('span.value');
startButton.setAttribute('disabled', 'disabled');

let userSelectedDate;
let timeDifference;

const izitoastOptions = {
  message: 'Please choose a date in the future',
  messageColor: 'white',
  backgroundColor: 'red',
  close: false,
  iconUrl: iconClose,
  position: 'topRight',
  progressBar: false,
  animateInside: false,
  timeout: 3000,
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeDifference = userSelectedDate - new Date();
    console.log(timeDifference);
    checkUserDate();
  },
});

function checkUserDate() {
  if (userSelectedDate > new Date()) {
    startButton.removeAttribute('disabled', 'disabled');
    startButton.addEventListener('click', startTimer);
  } else {
    iziToast.show(izitoastOptions);
    startButton.setAttribute('disabled', 'disabled');
  }
}

function startTimer() {
  const intervalID = setInterval(() => {
    timeDifference -= 1000;

    let remainingTime = convertMs(timeDifference);
    const { days, hours, minutes, seconds } = remainingTime;

    const convertedTime = [days, hours, minutes, seconds].map(partTime => {
      return partTime.toString().padStart(2, '0');
    });

    for (let i = 0; i < timeIndicators.length; i++) {
      timeIndicators[i].textContent = convertedTime[i];
    }

    if (timeDifference <= 0) {
      clearInterval(intervalID);
      for (const indicator of timeIndicators) {
        indicator.textContent = '00';
      }
    }
  }, 1000);

  startButton.setAttribute('disabled', 'disabled');
  inputTime.setAttribute('disabled', 'disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); // Remaining days
  const hours = Math.floor((ms % day) / hour); // Remaining hours
  const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds

  return { days, hours, minutes, seconds };
}
