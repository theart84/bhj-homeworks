'use strict'

const cookieElement = document.getElementById('cookie');
const counterElement = document.getElementById('clicker__counter');
const clickerStatusElement = document.querySelector('.clicker__status');
clickerStatusElement.insertAdjacentHTML('afterend', `<div>Скорость клика: <span id="velocityClick" style="font-weight: bold">0</span> клик/секунда</div>`);
const velocityClick = document.getElementById('velocityClick');

let counter = '0';
let dateStamp= Date.now();

cookieElement.addEventListener('click', () => {
  clickerCookieCounter();
  clickVelocity(dateStamp);
})

function clickerCookieCounter() {
  counter++
  counterElement.textContent = counter;
  cookieElement.width === 200 ? cookieElement.width = 250 : cookieElement.width = 200;
}
function clickVelocity(date) {
  const calculateVelocity = Date.now() - date;
  dateStamp = Date.now();
  velocityClick.textContent = (1 / (calculateVelocity / 1000)).toFixed(2);
}

