'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.form-input-delay');
const inputFullfilled = document.querySelector('.form-input-fullfilled');
const inputRejected = document.querySelector('.form-input-rejected');
const button = document.querySelector('.form-btn');

form.addEventListener('submit', createPromise);

function createPromise(evt, delay) {
  evt.preventDefault();
  delay = inputDelay.value;

  const options = {
    messageColor: '#FFFFFF',
    position: 'topRight',
    timeout: 3000,
    animateInside: false,
    progressBar: false,
    close: false,
  }

  setTimeout(() => {
    return new Promise((resolve, reject) => {
      if (inputFullfilled.checked) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    })
      .then(value =>
        iziToast.show({
          ...options,
          message: value,
          backgroundColor: '#00FF00',
        })
      )
      .catch(error =>
        iziToast.show({
          ...options,
          message: error,
          backgroundColor: '#FF3200',
        })
      );
  }, delay);
}
