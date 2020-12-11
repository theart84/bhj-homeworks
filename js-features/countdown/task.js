'use strict'
//1
const timerElement = document.getElementById('timer');
let count = +timerElement.textContent;
let timerId = setInterval(countDown,1000);

function countDown() {
  count -= 1;
  timerElement.textContent = count;
  if (!+timerElement.textContent) {
    clearInterval(timerId);
    alert(`Вы победили в конкурсе!`);
  }
}
// 1,2*
const inputElement = `<div style="margin-top: 20px">
  <label>Введите время в формате hh:mm:ss
    <input type="text" id="inputTime" style="width: 100px" placeholder="00:00:00">
  </label>
  <input type="button" id="timerStart" value="Go">
  <div class="timerOut"></div>
  </div>`;
const divStatus = document.getElementById('status');
divStatus.insertAdjacentHTML('afterend', inputElement);
const goButton = document.getElementById('timerStart');
const inputField = document.getElementById('inputTime');
const timerOut = document.querySelector('.timerOut');
let timerId2 = null;
goButton.addEventListener('click', (e) => {
  if (!inputField.value) {
    timerOut.textContent = `Введите значение таймера в поле`;
    return;
  }
  const time = getCountDownTime(inputField.value);
  timerId2 = setInterval(startCountdown, 1000, time)
});

function getCountDownTime(endtime) {
  endtime = endtime.slice(0, 8);
  let seconds = +endtime.slice(6, 8)* 1000;
  let minutes = +endtime.slice(3, 5) * 1000 * 60;
  let hours = +endtime.slice(0, 2) * 1000 * 60 * 60;
  return Date.now() + seconds + minutes + hours;

}

function startCountdown(time) {
  const timer = (Math.ceil((time - Date.now()) /1000)) * 1000;
  const timerString = new Date(timer).toISOString().slice(11,19);
  if (!timer) {
    clearInterval(timerId2);
    timerOut.textContent = 'Время вышло!';
    location.href = 'https://soundslibmp3.ru/sounds/1585738589_dzyn-13.mp3';
    return;
  }
  timerOut.textContent = timerString;
}