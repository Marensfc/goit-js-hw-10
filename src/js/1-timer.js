'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconClose from '../img/modal-close-btn.png';

const inputTime = document.querySelector('input#datetime-picker');
const button = document.querySelector('.btn-start');
const timeIndicators = document.querySelectorAll('span.value');
button.setAttribute('disabled', 'disabled');

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

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeDifference = userSelectedDate - new Date();
    checkUserDate();
  },
});

function checkUserDate() {
  const isDateFuture = Math.sign(timeDifference);

  if (isDateFuture !== -1) {
    button.removeAttribute('disabled', 'disabled');
    button.addEventListener('click', startTimer);
  } else {
    iziToast.show(izitoastOptions);
    button.setAttribute('disabled', 'disabled');
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

    if (timeDifference < 1000) {
      clearInterval(intervalID);
    }
  }, 1000);

  button.setAttribute('disabled', 'disabled');
  inputTime.setAttribute('disabled', 'disabled');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

