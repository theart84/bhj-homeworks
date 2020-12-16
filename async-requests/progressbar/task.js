const formElement = document.getElementById('form');
const progressElement = document.querySelector('progress');

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  sendFile();
});
let total = 0;
let loaded = 0;

function sendFile() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  xhr.upload.addEventListener('progress', (e) => {
    total = e.total;
    loaded = e.loaded;
    setProgress(loaded);
  });
  xhr.send(new FormData(formElement));
}

function setProgress(loadedData) {
  progressElement.value = ((loadedData * 100) / total / 100).toFixed(2);
}
