'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputFullfilled = document.querySelector('[value="fulfilled"]');
const inputRejected = document.querySelector('[value="rejected"]');

form.addEventListener('submit', createPromise);

function createPromise(evt) {
  evt.preventDefault();
  const delay = inputDelay.value;

  const options = {
    messageColor: '#FFFFFF',
    position: 'topRight',
    timeout: 3000,
    animateInside: false,
    progressBar: false,
    close: false,
  };

  const notificationPromise = new Promise((resolve, reject) => {
    inputFullfilled.setAttribute('disabled', 'disabled');
    inputRejected.setAttribute('disabled', 'disabled');

    setTimeout(() => {
      if (inputFullfilled.checked) {
        resolve(delay);
      } else {
        reject(delay);
      }

      inputFullfilled.removeAttribute('disabled', 'disabled');
      inputRejected.removeAttribute('disabled', 'disabled');
    }, delay);
  });

  notificationPromise
    .then(delay => {
      iziToast.show({
        ...options,
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#00FF00',
      });
    })
    .catch(delay => {
      iziToast.show({
        ...options,
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#FF3200',
      });
    });
}
