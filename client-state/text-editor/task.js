const textareaElement = document.getElementById('editor');
const clearButtonElement = document.getElementById('clearField');

// Events
document.addEventListener('DOMContentLoaded', () => loadDataFromLocalStorage());
textareaElement.addEventListener('input', () => saveDataInLocalStorage());
clearButtonElement.addEventListener('click', () => clearText());

// Handlers
function saveDataInLocalStorage() {
  localStorage.setItem('text', textareaElement.value);
}

function loadDataFromLocalStorage() {
  textareaElement.value = localStorage.getItem('text');
}

function clearText() {
  textareaElement.value = '';
  saveDataInLocalStorage();
}
