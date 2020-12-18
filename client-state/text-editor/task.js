const textareaElement = document.getElementById('editor');

document.addEventListener('DOMContentLoaded', () => loadDataFromLocalStorage());
textareaElement.addEventListener('input', () => saveDataInLocalStorage());

function saveDataInLocalStorage() {
  localStorage.setItem('text', textareaElement.value);
}

function loadDataFromLocalStorage() {
  textareaElement.value = localStorage.getItem('text');
}
