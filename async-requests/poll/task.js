const pollContainer = document.querySelector('.poll');
const pollTittleContainer = document.getElementById('poll__title');
const pollAnswersContainer = document.getElementById('poll__answers');

document.addEventListener('DOMContentLoaded', () => getPoll());
document.body.addEventListener('click', (e) => {
  const currentTarget = e.target;
  if (currentTarget.classList.contains('poll__answer')) {
    showModalWindow();
  }
  if (currentTarget.classList.contains('modal__close')) {
    deleteModalWindow(currentTarget);
  }
});

function getPoll() {
  fetch('https://netology-slow-rest.herokuapp.com/poll.php')
    .then((response) => response.json())
    .then((response) => addPoll(response))
    .catch((err) => console.log(err));
}

function showModalWindow() {
  const modal = `
  <div class ="modal__wrapper modal__active">
    <div class="modal__text">
      <p>Спасибо, ваш голос засчитан!</p>
    </div>
    <hr>
    <div>
      <button class="modal__close">Закрыть</button>
    </div>    
  </div>
  `;
  pollContainer.insertAdjacentHTML('afterbegin', modal);
  document.body.querySelector('.wrapper').classList.add('wrapper__modal');
}

function deleteModalWindow(currentTarget) {
  currentTarget.closest('.modal__wrapper').classList.remove('modal__active');
  currentTarget.closest('.modal__wrapper').remove();
  document.body.querySelector('.wrapper').classList.remove('wrapper__modal');
}

function addPoll(currency) {
  const { title, answers } = currency.data;
  const template = answers.map((answer) => `<button class="poll__answer">${answer}</button>`).join(' ');
  pollTittleContainer.textContent = title;
  pollAnswersContainer.insertAdjacentHTML('afterbegin', template);
}
