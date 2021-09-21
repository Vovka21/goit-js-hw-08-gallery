const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const modal = document.querySelector('.lightbox');

const gallery = document.querySelector('.js-gallery');

const close = document.querySelector('.lightbox__button');

const overlay = document.querySelector('.lightbox__overlay');

galleryItems.forEach(element => {
  const li = document.createElement('li');
  li.classList.add('gallery__item');

  const a = document.createElement('a');
  a.classList.add('gallery__link');

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.src = element.preview;
  img.dataset.source = element.original;
  img.alt = element.description;

  document.querySelector('.gallery').appendChild(li);
  li.append(a);
  a.append(img);
});

const imageRef = document.querySelectorAll('img');

const dataSources = [];
imageRef.forEach(elem => {
  dataSources.push(elem.dataset.source);
});

const image = document.querySelector('.lightbox__image');

gallery.addEventListener('click', modalOpen);

function modalOpen(event) {
  event.preventDefault();
  addImageModal(event);

  window.addEventListener('keydown', onEscKeyPress);
  modal.classList.add('is-open');

  // image.src = elem.src;
  // image.alt = elem.alt;
}

function addImageModal(event) {
  const bigImgRef = event.target.getAttribute('data-source');
  const alt = event.target.getAttribute('alt');
  image.setAttribute('src', bigImgRef);
  image.setAttribute('alt', alt);
}

close.addEventListener('click', modalClose);

function modalClose() {
  window.removeEventListener('keydown', onEscKeyPress);
  modal.classList.remove('is-open');
  image.src = '';
  image.alt = '';
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    modalClose();
  }
}

overlay.addEventListener('click', clickOverlay);

function clickOverlay(event) {
  if (event.currentTarget === event.target) {
    modalClose();
  }
}

document.addEventListener('keydown', e => {
  const currentIndex = dataSources.indexOf(image.src);
  if (e.key === 'ArrowLeft') {
    leftClick(currentIndex);
  } else if (e.key === 'ArrowRight') {
    rightClick(currentIndex);
  }
});

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = dataSources.length - 1;
  }
  image.src = dataSources[nextIndex];
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === dataSources.length) {
    nextIndex = 0;
  }
  image.src = dataSources[nextIndex];
}
