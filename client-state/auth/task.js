const form = document.getElementById('signin__form');
const welcomeElement = document.getElementById('welcome');
const loginPageElement = document.querySelector('.login__page');
const signinElement = document.getElementById('signin');
const logoutBtn = document.getElementById('logout__btn');

// Events
document.addEventListener('DOMContentLoaded', () => {
  const userID = localStorage.getItem('userID');
  if (!userID) {
    return;
  }
  addWelcomeBlock(userID);
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  requestAuth();
});

logoutBtn.addEventListener('click', () => {
  logout();
});

// Handlers
function logout() {
  welcomeElement.classList.remove('welcome_active');
  loginPageElement.classList.remove('login__page-active');
  signinElement.classList.add('signin_active');
  localStorage.removeItem('userID');
}

function hideSigninBlock() {
  signinElement.classList.remove('signin_active');
}

function requestHandler(data) {
  const { success, user_id } = data;
  if (!success) {
    alert('Неверный логин/пароль');
    return;
  }
  localStorage.setItem('userID', user_id);
  addWelcomeBlock(user_id);
}

function addWelcomeBlock(id) {
  hideSigninBlock();
  welcomeElement.firstElementChild.textContent = id;
  welcomeElement.classList.add('welcome_active');
  loginPageElement.classList.add('login__page-active');
}

// Request
function requestAuth() {
  fetch('https://netology-slow-rest.herokuapp.com/auth.php', {
    method: 'POST',
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then((response) => requestHandler(response))
    .catch((err) => console.log(err));
  form.reset();
}
