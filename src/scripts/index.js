const taskInput = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.add-task-btn');
const tasksList = document.querySelector('.tasks-list');
const calendarDate = document.querySelector('.calendar');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let tasksListItem = [];

function Task(description) {
  this.description = description;
  this.completed = false;
  this.fixed = false;
};

(() => {
  const newDate = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let nowDay;
  let nowMonth;
  days.forEach((item, index) => {
    if (index == newDate.getDay()) {
      nowDay = item;
    }
  });
  month.forEach((item, index) => {
    if (index == newDate.getMonth()) {
      nowMonth = item;
    }
  })
  calendarDate.innerHTML = `
    <div class="">${nowDay}</div>
    <div class="">${nowMonth} ${newDate.getDate()}, ${newDate.getFullYear()}</div>
  `
})();

const createTemplate = (task, index) => {
  return `
    <div class="tasks-list__item ${task.completed ? 'checked' : ''}">
      <div class="thumbtack">
        <div class="${task.fixed ? '' : 'hide'}">
          <i class="fas fa-thumbtack hide"></i>
        </div>
        <input onclick="completeTask(${index})" class="custom-checkbox" type="checkbox" id="item_${index}" ${task.completed ? 'checked' : ''}>
        <label for="item_${index}">${task.description}</label>
      </div>
      <i class="fas fa-ellipsis-v extra-menu-btn" onclick="onToggleExtraMenu(${index})" data-toggle="modal"></i>
      <div class="extra-menu hide">
        <div class="arrow-up"></div>
        <div class="extra-menu__item thumbtack" onclick="fixedTask(${index})"><i class="fas fa-thumbtack"></i>Pin on the top</div>
        <div class="extra-menu__item file-signature"><i class="fas fa-file-signature"></i>Add a memo</div>
        <div class="extra-menu__item trash-alt" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i>Delete</div>
      </div>
    </div>
  `
}

const filterTask = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false && item.fixed == false);
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true && item.fixed == false);
  const fixedTasks = tasks.length && tasks.filter(item => item.fixed == true);
  tasks = [...fixedTasks, ...activeTasks, ...completedTasks];
}

const completeTask = index => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    tasksListItem[index].classList.add('checked');
  } else {
    tasksListItem[index].classList.remove('checked');
  }
  updateLocalStrg();
  fillTasksList();
}

const fixedTask = index => {
  tasks[index].fixed = !tasks[index].fixed;
  updateLocalStrg();
  fillTasksList();
}

const deleteTask = index => {
  tasksListItem[index].classList.add('delition');
  tasks.splice(index, 1);
  updateLocalStrg();
  fillTasksList();
}

const fillTasksList = () => {
  tasksList.innerHTML = '';
  if (tasks.length > 0) {
    filterTask();
    tasks.forEach((item, index) => {
      tasksList.innerHTML += createTemplate(item, index);
    });
  }
  tasksListItem = document.querySelectorAll('.tasks-list__item');
};
fillTasksList();

const updateLocalStrg = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const allTasks = () => {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  fillTasksList();
}

const completedTasks = () => {
  const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...completedTasks];
  fillTasksList();
}

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(taskInput.value));
  updateLocalStrg();
  fillTasksList();
  taskInput.value = '';
});

function showCover() {
  const coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';
  tasksList.append(coverDiv);
}

function hideCover() {
  const coverDiv = document.getElementById('cover-div');
  if (document.getElementById('cover-div')) {
    document.getElementById('cover-div').remove();
  }

  document.querySelectorAll('.extra-menu').forEach(element => {
    element.classList.add('hide');
  })
}

function onToggleExtraMenu(index) {
  const extraMenu = document.querySelectorAll('.extra-menu');
  showCover();
  extraMenu[index].classList.remove('hide');
  if (document.querySelector('#cover-div')) {
    document.querySelector('#cover-div').addEventListener('click', () => {
      hideCover();
    })
  }
};
