const widgetElement = document.querySelector('.chat-widget');
const inputElement = document.getElementById('chat-widget__input');
const chatContainer = document.querySelector('.chat-widget__messages');
let timerID = null;

// Events
widgetElement.addEventListener('click', () => {
  widgetElement.classList.add('chat-widget_active');
});

inputElement.addEventListener('keydown', (e) => {
  if (!(e.key === 'Enter')) {
    return;
  }
  clearInterval(timerID);
  clientAnswer();
  botAnswer();
  timerID = setInterval(botWaitingMessage, 30000);
});

inputElement.addEventListener('blur', () => {
  clearInterval(timerID);
});

// Handlers
function clientAnswer() {
  const msg = inputElement.value;
  if (!msg) return;
  chatContainer.insertAdjacentHTML(
    'beforeend',
    getTemplateMessage(msg, ' message_client'),
  );
  inputElement.value = '';
  autoScroll();
}

function botAnswer() {
  const botMessages = [
    'Мы еще не проснулись. Позвоните нам через 10 лет.',
    'До свидания!',
    'Не груби мне, дядя!',
    'Заказывай быстрей или проваливай.',
    'На тупые вопросы я не отвечаю!',
    'Мне нужны твоя куртка и джинсы!',
    'Ты делаешь это без уважения!',
  ];
  const answerLatency = Math.random() * 1500;
  const botMsg = botMessages[Math.floor(Math.random() * botMessages.length)];
  const botMsgTemplate = getTemplateMessage(botMsg);
  setTimeout(() => {
    chatContainer.insertAdjacentHTML('beforeend', botMsgTemplate);
    autoScroll();
  }, answerLatency);
}

function botWaitingMessage() {
  const botMessages = [
    'Э, ну и куда ты пропал?',
    'Ну давай, задавай уже свой гнусный вопрос!',
    'Я сразу понял, что ты тормоз=)',
  ];
  const botMsg = botMessages[Math.floor(Math.random() * botMessages.length)];
  const botMsgTemplate = getTemplateMessage(botMsg);
  chatContainer.insertAdjacentHTML('beforeend', botMsgTemplate);
  autoScroll();
}

function autoScroll() {
  chatContainer.lastElementChild.scrollIntoView();
}

// Templates
function getTemplateMessage(msg, type = '') {
  return `
  <div class="message${type}">
    <div class="message__time">${new Date().toTimeString().slice(0, 5)}</div>
    <div class="message__text">
      ${msg}
    </div>
  </div>
`;
}
