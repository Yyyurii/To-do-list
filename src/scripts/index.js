// для створення записів/завдання
const postList = document.querySelector('.posts-list');
const postInput = $('.post-input');

const post = (text) => {
  const element = document.createElement('div');
  element.classList.add('posts-list__item', 'checkbox')
  element.innerText = text;
  element.innerHTML = `
      <input class="custom-checkbox" type="checkbox" id="${text}">
      <label for="${text}">${text}</label>
      <i class="fas fa-ellipsis-v extra-menu-btn"></i>
      <div class="extra-menu extra-menu-display">
        <div class="arrow-up"></div>
        <div class="extra-menu__item"><i class="fas fa-thumbtack"></i>Pin on the top</div>
        <div class="extra-menu__item"><i class="fas fa-file-signature"></i>Add a memo</div>
        <div class="extra-menu__item"><i class="fas fa-trash-alt"></i>Delete</div>
      </div>
  `;
  postList.append(element);
}

post('hello');
post('work HARD!');

// відмітити як виконане зачеркнувши
postList.addEventListener('click', (e) => {
  const label = document.querySelectorAll('label');
  label.forEach(element => {
    if (e.target === element) {
      e.target.classList.toggle('cross-out');
      e.target.parentNode.classList.toggle('done');
      e.target.parentNode.classList.toggle('undone');
    }
  });
})

// btn 'add' анімація
$('.plus-btn').click(() => {
  postInput.slideToggle('1000');
})

// onKeyPress 'enter' add task
postInput.keypress(function (e) {
  const keycode = (e.keyCode ? e.keyCode : e.which);
  if (keycode == '13') {
    e.preventDefault();
    const value = $('input:text').val();
    post(value);
    $('input:text').val('');
    postInput.slideToggle('1000');
  }
});

// Показує всі або виконані завдання
const doneTaskBtn = document.querySelector('.header__done-posts');
const allTaskBtn = document.querySelector('.header__all-posts');
const header = document.querySelector('.header');
const headerLineBottom = document.querySelector('.header__line-bottom');


doneTaskBtn.addEventListener('click', () => {
  let postListItem = document.querySelectorAll('.posts-list__item');
  postListItem.forEach(element => {
    if (element.classList.contains('done')) {
      element.style.display = 'flex';
      headerLineBottom.style.cssText = 'width: 150px; left: 0;';
      header.style.cssText = 'background: linear-gradient(to right, #8080802e 50%, white 50%);';
    } else {
      element.style.display = 'none'
      header.style.cssText = 'background: linear-gradient(to right, #8080802e 50%, white 50%);';
      headerLineBottom.style.cssText = 'left: 0;';
    }
  });
})

allTaskBtn.addEventListener('click', () => {
  let postListItem = document.querySelectorAll('.posts-list__item');
  postListItem.forEach(element => {
    element.style.display = 'flex';
    header.style.cssText = 'background: linear-gradient(to right, white 50%, #8080802e 50%);';
    headerLineBottom.style.cssText = 'right: 0;';
  })
})

// extra menu
postList.addEventListener('click', (e) => {
  const extraMenuBtn = document.querySelectorAll('.extra-menu-btn');
  extraMenuBtn.forEach(element => {
    if (e.target === element) {
      e.target.nextElementSibling.classList.toggle('extra-menu-display')
    }
  });
})

// sorting
postList.addEventListener('change', () => {
  let postListItem = document.querySelectorAll('.posts-list__item');
  console.log(postListItem);
  postListItem.forEach(element => {
    if (element.classList.contains('done')) {
      $(element).fadeOut('1000');
      element.parentNode.prepend(element);
      $(element).fadeIn('1000');
    }
  })
})