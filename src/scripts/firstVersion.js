// для створення записів/завдання
const postList = document.querySelector('.posts-list');
const postInput = $('.post-input');
const pinBoard = document.querySelector('.pin-board');

const post = (text) => {
  const element = document.createElement('div');
  element.classList.add('posts-list__item', 'checkbox')
  element.innerText = text;
  element.innerHTML = `
      <input class="custom-checkbox" type="checkbox" id="${text}">
      <label for="${text}">${text}</label>
      <i class="fas fa-ellipsis-v extra-menu-btn"></i>
        <div class="extra-menu hide">
        <div class="arrow-up"></div>
        <div class="extra-menu__item thumbtack"><i class="fas fa-thumbtack"></i>Pin on the top</div>
        <div class="extra-menu__item file-signature"><i class="fas fa-file-signature"></i>Add a memo</div>
        <div class="extra-menu__item trash-alt"><i class="fas fa-trash-alt"></i>Delete</div>
      </div>
  `;
  postList.prepend(element);
}

post('Work');
post('Don');

// відмітити як виконане зачеркнувши та перемістити в кінець списку
letDownPost = () => {
  const allPosts = document.querySelectorAll('.done');
  allPosts.forEach(element => {
    if (element.classList.contains('pin')) {
      pinBoard.append(element)
    } else {
      postList.append(element);
    }
  })
};

onToggleDone = (event) => {
  const label = document.querySelectorAll('label');
  label.forEach(element => {
    if (event.target === element) {
      event.target.classList.toggle('cross-out');
      event.target.parentNode.classList.toggle('done');
    }
  });
}

postList.addEventListener('click', (event) => {
  onToggleDone(event);
  letDownPost();
  onToggleExtraMenu(event);
  pinTask(event);
});


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
    if (value != '') {
      post(value);
      $('input:text').val('');
      postInput.slideToggle('1000');
    }
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
      postList.prepend(element);
      pinBoard.classList.add('hide');
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
    postList.prepend(element);
    pinBoard.classList.remove('hide');
    element.style.display = 'flex';
    header.style.cssText = 'background: linear-gradient(to right, white 50%, #8080802e 50%);';
    headerLineBottom.style.cssText = 'right: 0;';
  });

})

// extra menu
function showCover() {
  let coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';
  document.querySelector('.posts-list').append(coverDiv);
}

function hideCover() {
  const extraMenu = document.querySelectorAll('.extra-menu');
  if (document.getElementById('cover-div')) {
    document.getElementById('cover-div').remove();
  }

  extraMenu.forEach(element => {
    element.classList.add('hide');
  })
}

function onToggleExtraMenu(event) {
  const extraBtns = document.querySelectorAll('.extra-menu-btn');

  extraBtns.forEach(element => {
    if (element == event.target) {
      element.nextElementSibling.classList.remove('hide');
      showCover();
    }
    if (document.querySelector('#cover-div')) {
      document.querySelector('#cover-div').addEventListener('click', () => {
        hideCover();
      })
    }
  })
};

function pinTask(event) {
  const pinBtn = document.querySelectorAll('.thumbtack');
  pinBtn.forEach( element => {
    if (element == event.target) {
      const parentEl = element.parentNode.parentNode;
      parentEl.classList.add('pin');
      pinBoard.classList.remove('hide');
      pinBoard.append(parentEl);
      hideCover();
      onToggleExtraMenu(event);
    }
  });
};