// для створення записів/завдання
const post = (id, text) => {
  const parent = document.querySelector('.posts-list');
  const element = document.createElement('div');
  element.classList.add('posts-list__item')
  element.innerText = text;
  element.innerHTML = `
    <div class="checkbox">
      <input class="custom-checkbox" type="checkbox" id="${id}" value="indigo">
      <label for="${id}">${text}</label>
    </div>
  `;
  parent.append(element);
}

post('2','hello');
post('3','work HARD!');

// відмітити як виконане зачеркнувши
const postList = document.querySelector('.posts-list');
postList.addEventListener('click', (e) => {
  const label = document.querySelectorAll('label');
  label.forEach(element => {
    if (e.target === element) {
      e.target.classList.toggle('cross-out');
    }
  });
})

// btn 'add'
const addBtn = document.querySelector('.btn');
addBtn.addEventListener('click', () => {
  const postInput = document.querySelector('.post-input');
  // postInput.style.display = 'block';
  postInput.classList.toggle('post-input-block');
})