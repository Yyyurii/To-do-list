const post = (text) => {
  const parent = document.querySelector('.posts-list__item');
  const element = document.createElement('span');
  element.innerText = text;
  parent.append(element);
}

post('hello');