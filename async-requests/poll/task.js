const pollContainer = document.querySelector('.poll');
const pollTittleContainer = document.getElementById('poll__title');
const pollAnswersContainer = document.getElementById('poll__answers');

document.addEventListener('DOMContentLoaded', () => getPoll());
document.body.addEventListener('click', (e) => {
  const currentTarget = e.target;
  if (currentTarget.classList.contains('poll__answer')) {
    lightButton(currentTarget);
    showModalWindow();
  }
  if (currentTarget.classList.contains('modal__close')) {
    getPollStatistics(getID());
    deleteModalWindow(currentTarget);
  }
});

/**
 * Отправляет запрос на сервер для получения опроса
 */
function getPoll() {
  fetch('https://netology-slow-rest.herokuapp.com/poll.php')
    .then((response) => response.json())
    .then((response) => addPoll(response))
    .catch((err) => console.log(err));
}

/**
 * Отправляет запрос на сервер с заданными параметрами
 * @param pollID
 * @param answerID
 */
function getPollStatistics({ pollID, answerID }) {
  fetch('https://netology-slow-rest.herokuapp.com/poll.php', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: `vote=${pollID}&answer=${answerID}`,
  })
    .then((response) => response.json())
    .then((response) => voteCount(response.stat))
    .catch((err) => console.log(err));
}

/**
 * Возвращает id опроса и ответа
 * @return {{answerID: number, pollID: number}}
 */
function getID() {
  const element = [...pollAnswersContainer.children].find((button) => button.classList.contains('poll__active'));
  const pollID = +element.closest('.poll').querySelector('.poll__title').dataset.pollId;
  const answerID = +element.dataset.answer;
  return {
    pollID,
    answerID,
  };
}

/**
 * Преобразовывает количество голосов в количество голосов в процентах и запускает функцию,
 * которая формирует разметку статистики
 * @param {array} data
 */
function voteCount(data) {
  const total = data.reduce((acc, prev) => acc + prev.votes, 0);
  const array = data.reduce((acc, prev) => {
    let newPrev = { ...prev };
    newPrev = {
      answer: newPrev.answer,
      votes: ((newPrev.votes * 100) / total).toFixed(2),
    };
    acc.push(newPrev);
    return acc;
  }, []);
  showStatistics(array);
}

/**
 * Функция устанавливает активный класс для выбранной кнопки
 * @param {object} button
 */
function lightButton(button) {
  button.classList.add('poll__active');
}

/**
 * Функция, которая создает модальное окно
 */
function showModalWindow() {
  const modal = `
  <div class="modal__wrapper modal__active">
    <div class="modal__body">
      <div class="modal__content">
        <div class="modal__text">
         <p>Спасибо, ваш голос засчитан!</p>
        </div>
        <hr>
        <button class="modal__close">Закрыть</button>      
      </div>
    </div>  
  </div>
  `;
  pollContainer.insertAdjacentHTML('afterbegin', modal);
}

/**
 * Функция для удаления модального окнаб также удаляет класс poll_active у текущей кнопки
 * @param {object} currentTarget
 */
function deleteModalWindow(currentTarget) {
  currentTarget.closest('.modal__wrapper').classList.remove('modal__active');
  currentTarget.closest('.modal__wrapper').remove();
  [...document.querySelectorAll('button')].forEach((button) => {
    button.classList.remove('poll__active');
  });
}

/**
 * Принимает массив со статистикой и формирует разметку для отображения статистики
 * @param {array} data
 */
function showStatistics(data) {
  if (!data.length) {
    pollAnswersContainer.innerHTML = '';
    pollAnswersContainer.innerText = 'Что-то пошло не так...';
    return;
  }
  pollAnswersContainer.innerHTML = '';
  const template = data.map((item) => `<div>${item.answer}: <b>${item.votes}%</b></div>`).join(' ');
  pollAnswersContainer.insertAdjacentHTML('afterbegin', template);
}

/**
 * Принимает ответ от сервера и формирует разметку опроса с вариантами ответа.
 * @param currency
 */
function addPoll(currency) {
  const { id, data: { title, answers } } = currency;
  const template = answers.map((answer, index) => `<button class="poll__answer" data-answer="${index}">${answer}</button>`).join(' ');
  pollTittleContainer.textContent = title;
  pollTittleContainer.dataset.pollId = id;
  pollAnswersContainer.insertAdjacentHTML('afterbegin', template);
}
