const currencyContainer = document.getElementById('items');
const loaderElement = document.getElementById('loader');

document.addEventListener('DOMContentLoaded', () => {
  loadCurrencyFromLocalStorage();
  getRateCurrency();
});

function getRateCurrency() {
  fetch('https://netology-slow-rest.herokuapp.com')
    .then((response) => response.json())
    .then((response) => addCurrency(response))
    .catch((err) => console.log(err));
}

function loadCurrencyFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('currency'));
  if (!data) {
    return;
  }
  let template = '';
  data.forEach((element) => template += templateRateCurrency(element));
  currencyContainer.insertAdjacentHTML('afterbegin', template);
}

function addCurrency(data) {
  const currencyArray = [];
  currencyContainer.innerHTML = '';
  const { Valute } = data.response;
  loaderElement.classList.remove('loader_active');
  let template = '';
  Object.values(Valute).forEach((element) => {
    template += templateRateCurrency(element);
    currencyArray.push({ CharCode: element.CharCode, Value: element.Value });
  });
  localStorage.setItem('currency', JSON.stringify(currencyArray));
  currencyContainer.insertAdjacentHTML('afterbegin', template);
}

function templateRateCurrency({ CharCode, Value }) {
  return `
    <div class="item">
      <div class="item__code">${CharCode}</div>
      <div class="item__value">${Value}</div>
      <div class="item__currency">руб.</div>
    </div>
  `;
}
