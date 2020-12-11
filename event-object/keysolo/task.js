class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');
    this.timerID = null;

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.clearTimer();
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  setTimer() {
    this.timerElement.textContent = `${
      [...this.container.querySelectorAll('.symbol')].length
    }s.`;
    this.timerID = setInterval(this.timer.bind(this), 1000);
  }

  clearTimer() {
    clearInterval(this.timerID);
    this.timerID = null;
  }

  timer() {
    let count = parseInt(this.timerElement.textContent, 10);
    count -= 1;
    this.timerElement.textContent = `${count}s.`;
    if (!count) {
      this.clearTimer();
      this.fail();
    }
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

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    // eslint-disable-next-line no-plusplus
    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.clearTimer();
    this.setNewWord();
  }

  fail() {
    // eslint-disable-next-line no-plusplus
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.clearTimer();
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  // eslint-disable-next-line class-methods-use-this
  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript',
      'я люблю kitkat',
      'вы убили Kenny',
    ];
    const index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    this.wordElement.innerHTML = [...word]
      .map((s, i) => `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`)
      .join('');

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
    this.setTimer();
  }
}

// eslint-disable-next-line no-new
new Game(document.getElementById('game'));
