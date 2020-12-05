const taskInput = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.add-task-btn');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));


function Task(description) {
  this.description = description;
  this.completed = false;
  this.fixed = false;
};

const updateLocalStrg = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(taskInput.value));
  updateLocal();
});