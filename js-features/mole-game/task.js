'use strict'

const gameContainer = document.querySelector('.hole-game');
const killMoleElement = document.getElementById('dead');
const missElement = document.getElementById('lost');
const winCount = 10;
const loseCount = 5;
let counterKill = '0';
let counterMiss = '0';
gameContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('hole_has-mole')) {
    successKillMole();
  } else {
    missTheMole();
  }
  checkWinOrLose();
});

function successKillMole() {
  counterKill++;
  killMoleElement.textContent = counterKill;
}

function missTheMole() {
  counterMiss++;
  missElement.textContent = counterMiss;
}

function checkWinOrLose() {
  if (counterKill === winCount) {
    alert(`Вы выиграли!`);
    clearStatistics()
  }
  if (counterMiss === loseCount) {
    alert(`Вы проиграли!`);
    clearStatistics()
  }
}

function clearStatistics() {
  counterKill = '0';
  counterMiss = '0';
  killMoleElement.textContent = counterKill;
  missElement.textContent = counterMiss;
}