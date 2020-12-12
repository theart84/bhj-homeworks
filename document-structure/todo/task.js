const inputElement = document.getElementById('task__input');
const addTaskBtn = document.getElementById('tasks__add');
const taskContainer = document.getElementById('tasks__list');

document.addEventListener('DOMContentLoaded', () => {
  loadTaskFromLocalStorage();
});
addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addNewTask();
});
taskContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('task__remove')) {
    return;
  }
  deleteTask(e);
});

function loadTaskFromLocalStorage() {
  const tasks = getTaskFromLocalStorage();
  if (!tasks) {
    localStorage.setItem('tasks', JSON.stringify([]));
  }
  tasks.forEach((task) => {
    const { taskID, taskMessage } = task;
    const template = templateTask(taskMessage, taskID);
    taskContainer.insertAdjacentHTML('afterbegin', template);
  });
}

function getTaskFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function setTaskFromLocalStorage(msg) {
  const task = getTaskFromLocalStorage();
  localStorage.removeItem('tasks');
  task.push(msg);
  localStorage.setItem('tasks', JSON.stringify(task));
}

function delTaskFromLocalStorage(currentTask) {
  const idTask = currentTask.firstElementChild.dataset.id;
  const tasks = getTaskFromLocalStorage();
  const newTasks = tasks.filter((task) => !(task.taskID === idTask));
  localStorage.removeItem('tasks');
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}

function addNewTask() {
  const taskMessage = inputElement.value;
  if (!taskMessage) {
    return;
  }
  const id = getID();
  const template = templateTask(taskMessage, id);
  taskContainer.insertAdjacentHTML('afterbegin', template);
  setTaskFromLocalStorage({ taskID: id, taskMessage });
  inputElement.value = '';
}

function deleteTask(e) {
  const currentTask = e.target.closest('.task');
  delTaskFromLocalStorage(currentTask);
  currentTask.remove();
}

function getID() {
  return `message-${Date.now()}`;
}

function templateTask(msg, id) {
  return `
  <div class="task">
    <div class="task__title" data-id="${id}">${msg}</div>
    <a href="#" class="task__remove">&times;</a>
  </div>
  `;
}
