import { getData } from './api.js';
import {displayComments} from './shown-comments.js';

const picturesContainer = document.querySelector('.pictures');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const bigPicture = document.querySelector('.big-picture');
const bodyModalOpen = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const showBigPhoto = (evt) => {
  const currentPictuer = evt.target.closest('.picture');
  if(currentPictuer) {
    evt.preventDefault();
    const elementId = currentPictuer.dataset.photoId;
    bigPictureImg.src = currentPictuer.querySelector('.picture__img').src ;
    bigPictureImg.alt = currentPictuer.querySelector('.picture__img').alt;
    socialCaption.textContent = currentPictuer.querySelector('.picture__img').alt;
    likesCount.textContent = currentPictuer.querySelector('.picture__likes').textContent;
    getData()
      .then((data) => {
        displayComments(data[elementId]);
      });
    bigPicture.classList.remove('hidden');
    bodyModalOpen.classList.add('.modal-open');
    bigPictureCancel.addEventListener('click', onBigPhotoClickClose);
    document.addEventListener('keydown', onKeydownEsc);
  }
};

function closeBigPhoto () {
  bigPicture.classList.add('hidden');
  bodyModalOpen.classList.remove('.modal-open');
  bigPictureCancel.removeEventListener('click', onBigPhotoClickClose);
  document.removeEventListener('keydown', onKeydownEsc);
}

function onBigPhotoClickClose() {
  closeBigPhoto();
}

function onKeydownEsc (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPhoto();
  }
}

picturesContainer.addEventListener('click', showBigPhoto);
