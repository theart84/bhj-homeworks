const containerElement = document.querySelector('.interests_main');

containerElement.addEventListener('click', (e) => {
  let currentElement = e.target;
  const { parentElement } = e.target;
  const labelInnerText = parentElement.innerText;
  if (
    labelInnerText === 'Еда'
    || labelInnerText === 'Домашние животные'
    || labelInnerText === 'Котики'
  ) {
    const childElements = [...parentElement.nextElementSibling.querySelectorAll('label input')];
    if (currentElement.checked) {
      childElements.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.checked = true;
      });
    } else {
      childElements.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.checked = false;
      });
    }
  }
  while (currentElement) {
    const parent = currentElement
      .closest(['ul'])
      .parentNode.querySelector('input');
    const siblings = getArrayInputs(
      'input',
      parent.closest('li').querySelector('ul'),
    );
    const checkStatus = siblings.map((check) => check.checked);
    const every = checkStatus.every(Boolean);
    const some = checkStatus.some(Boolean);

    parent.checked = every;
    parent.indeterminate = !every && every !== some;

    currentElement = currentElement !== parent ? parent : 0;
  }
});

function getArrayInputs(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
