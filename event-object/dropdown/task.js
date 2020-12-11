const dropdownBtns = [...document.querySelectorAll('.dropdown__value')];
const dropdownLists = [...document.querySelectorAll('.dropdown__list')];

// Events
dropdownBtns.forEach((el, index) => el.addEventListener('click', () => dropdownActive(index)));
dropdownLists.forEach((el, index) => el.addEventListener('click', (e) => selectItem(e, index)));

// Handlers
function dropdownActive(index) {
  dropdownLists[index].classList.toggle('dropdown__list_active');
}

function selectItem(e, index) {
  e.preventDefault();
  if (e.target.classList.contains('dropdown__link')) {
    dropdownBtns[index].textContent = e.target.textContent;
  }
  dropdownLists[index].classList.remove('dropdown__list_active');
}
