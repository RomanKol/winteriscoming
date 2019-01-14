import './countdown';
import './scene';

const infoboxEl = document.querySelector('.info-box');

document
  .querySelector('.info-box-button.open')
  .addEventListener('click', () => infoboxEl.classList.toggle('hidden'));

document
  .querySelector('.info-box-button.close')
  .addEventListener('click', () => infoboxEl.classList.toggle('hidden'));
