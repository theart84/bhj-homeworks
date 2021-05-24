const formElement = document.getElementById('form');
const progressElement = document.querySelector('progress');

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  sendFile();
});

function sendFile() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  xhr.upload.addEventListener('progress', (e) => {
    const { loaded, total } = e;
    setProgress(loaded, total);
  });
  xhr.upload.addEventListener('load', (e) => {
    console.log('Данные успешно отправлены!');
  });
  xhr.send(new FormData(formElement));
}

function setProgress(loadedData, totalData) {
  progressElement.value = (loadedData / totalData).toFixed(2);
}
