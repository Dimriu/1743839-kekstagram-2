import { getData } from './api.js';

const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const elementPicture = templatePicture.querySelector('.picture');

const displayPhotos = function (items) {
  const photosFragment = document.createDocumentFragment();
  items.forEach(({id, url, description, likes, comments}) => {
    const picture = elementPicture.cloneNode(true);
    picture.dataset.photoId = id;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    photosFragment.append(picture);
  });
  picturesContainer.appendChild(photosFragment);
};

getData()
  .then((data) => {
    displayPhotos(data.slice());
  });
