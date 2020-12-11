class SoloOnKeyboard {
  constructor(container) {
    this.container = container;
    this.timerID = null;

    this.init();
    this.registerEvents();
  }

  init() {
    this.container.insertAdjacentHTML('afterbegin', SoloOnKeyboard.template());
    this.winsElement = this.container.querySelector('.status__wins');
    this.lossElement = this.container.querySelector('.status__loss');
    this.timerElement = this.container.querySelector('.status__timer');
    this.setWord();
  }

  static template() {
    return `
    <div class="status">
            <p>
                Правильно введённых слов: <span class="status__wins">0</span>
            </p>
            <p>
                Неправильно введённых слов: <span class="status__loss">0</span>
            </p>
            <p>
                Осталось время: <span class="status__timer"></span>
            </p>
        </div>
        <div class="word">
            <span class="symbol">A</span>
            <span class="symbol">r</span>
            <span class="symbol">t</span>
        </div>
    `;
  }

  reset() {
    this.stopTimer();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.setWord();
  }

  registerEvents() {
    document.addEventListener('keyup', (e) => {
      const currentSymbol = this.currentSymbol.textContent;
      const inputSymbol = e.key;
      if (
        inputSymbol.charCodeAt() === 65
        || inputSymbol.charCodeAt() === 83
        || inputSymbol.charCodeAt() === 67
      ) {
        return;
      }
      // eslint-disable-next-line no-unused-expressions
      inputSymbol === currentSymbol ? this.success() : this.fail();
    });
  }

  startTimer() {
    this.timerElement.textContent = `${
      [...this.container.querySelectorAll('.symbol')].length
    }s.`;
    this.timerID = setInterval(this.timer.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.timerID);
    this.timerID = null;
  }

  timer() {
    let count = parseInt(this.timerElement.textContent, 10);
    count -= 1;
    this.timerElement.textContent = `${count}s.`;
    if (!count) {
      this.stopTimer();
      this.fail();
    }
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    const quantityCorrectChar = document.querySelectorAll('.symbol_correct')
      .length;
    const quantityChar = document.querySelectorAll('.symbol').length;
    if (quantityChar === quantityCorrectChar) {
      this.winsElement.textContent += 1;
      this.stopTimer();
      this.setWord();
    }
    if (+this.winsElement.textContent === 10) {
      alert('Вы победили!');
      this.reset();
    }
  }

  fail() {
    this.lossElement.textContent += 1;
    if (+this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.stopTimer();
    this.setWord();
  }

  // eslint-disable-next-line class-methods-use-this
  getNewWord() {
    const dictionary = [
      'react',
      'angular',
      'javascript',
      'python',
      'netology',
      'saggitarius',
      'hello world',
      'youtube',
      'asus',
      'apple',
      'samsung',
      'marvel',
    ];

    return dictionary[Math.floor(Math.random() * dictionary.length)];
  }

  setWord() {
    const wordContainer = document.querySelector('.word');
    wordContainer.innerHTML = '';
    const template = [...this.getNewWord()]
      .map((char, index) => `<span class="symbol ${index === 0 ? 'symbol_current' : ''}">${char}</span>`)
      .join(' ');
    wordContainer.insertAdjacentHTML('afterbegin', template);
    this.currentSymbol = document.querySelector('.symbol_current');
    this.startTimer();
  }
}

// eslint-disable-next-line no-new
new SoloOnKeyboard(document.querySelector('.container'));
