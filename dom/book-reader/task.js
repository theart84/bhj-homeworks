const fontsElements = [...document.querySelectorAll('.book__control_font-size a')];
const textColorElements = [...document.querySelectorAll('.book__control_color a')];
const backgroundColorElements = [...document.querySelectorAll('.book__control_background a')];
const bookElement = document.querySelector('.book');

// Events
fontsElements.forEach((el) => el.addEventListener('click', toggleFSButtons));
textColorElements.forEach((el) => el.addEventListener('click', toggleTCButtons));
backgroundColorElements.forEach((el) => el.addEventListener('click', toggleBGButtons));

// Handlers
function toggleFSButtons(e) {
  e.preventDefault();
  const currentElement = e.target;
  const { size } = currentElement.dataset;
  changeSateAtFSButton(size, currentElement);
  changeSizeText(size);
}

function toggleTCButtons(e) {
  e.preventDefault();
  const currentElement = e.target;
  const { textColor } = currentElement.dataset;
  changeStateAtButton(textColor, currentElement);
  changeColorParagraph(textColor);
}

function toggleBGButtons(e) {
  e.preventDefault();
  const currentElement = e.target;
  const bgcColor = currentElement.dataset.bgColor;
  changeStateAtButton(bgcColor, currentElement);
  changeColorParagraph(bgcColor, 'bg');
}

function changeSateAtFSButton(size, element) {
  fontsElements.forEach((el) => el.classList.remove('font-size_active'));
  element.classList.add('font-size_active');
}

function changeStateAtButton(color, element) {
  const elements = element.closest('.book__control').querySelectorAll('.color');
  [...elements].forEach((el) => el.classList.remove('color_active'));
  element.classList.add('color_active');
}

function changeSizeText(size) {
  if (size === 'small') {
    bookElement.classList.remove('book_fs-small');
    bookElement.classList.add('book', 'book_fs-small');
  } else if (size === 'big') {
    bookElement.classList.remove('book_fs-big');
    bookElement.classList.add('book', 'book_fs-big');
  } else {
    bookElement.classList.remove('book_fs-small', 'book_fs-big');
    bookElement.classList.add('book');
  }
}

function changeColorParagraph(color, type = 'color') {
  if (color === 'black') {
    bookElement.classList.remove(
      `book_${type}-${type === 'bg' ? 'white' : 'whitesmoke'}`,
      `book_${type}-gray`,
    );
    bookElement.classList.add('book', `book_${type}-${color}`);
  } else if (color === 'gray') {
    bookElement.classList.remove(
      `book_${type}-${type === 'bg' ? 'white' : 'whitesmoke'}`,
      `book_${type}-black`,
    );
    bookElement.classList.add('book', `book_${type}-${color}`);
  } else {
    bookElement.classList.remove(`book_${type}-black`, `book_${type}-gray`);
    bookElement.classList.add('book', `book_${type}-${color}`);
  }
}
