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

const postList = document.querySelector('.posts-list');
postList.addEventListener('click', (e) => {
  const label = document.getElementsByTagName('label');
  for (let i = 0; i < label.length; i++) {
    if (e.target === label[i]) {
      e.target.classList.toggle('cross-out');
    }
  }
})