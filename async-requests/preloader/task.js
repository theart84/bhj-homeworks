const currencyContainer = document.getElementById('items');
const loaderElement = document.getElementById('loader');

document.addEventListener('DOMContentLoaded', () => getRateCurrency());

function getRateCurrency() {
  fetch('https://netology-slow-rest.herokuapp.com')
    .then((response) => response.json())
    .then((response) => addCurrency(response))
    .catch((err) => console.log(err));
}

function addCurrency(currency) {
  const { Valute } = currency.response;
  loaderElement.classList.remove('loader_active');
  let template = '';
  Object.values(Valute).forEach((element) => {
    template += templateRateCurrency(element);
  });
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
