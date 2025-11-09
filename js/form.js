import { editImage } from './edit-image.js';

const MAX_HASHTAGS = 5;
const messageErrorValidation = {
  errorInvalidHashtag: 'введён невалидный хэштег',
  errorNumberHashtags: 'превышено количество хэштегов',
  errorHashtagsDuplicated: 'хэштеги повторяются',
  errorMessageLength: 'длина комментария больше 140 символов'
};
const bodyModalOpen = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadInput = document.querySelector('.img-upload__input');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const description = imgUploadForm.querySelector('.text__description');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyModalOpen.classList.add('modal-open');
  document.addEventListener('keydown', onKeydownEsc);
  editImage();
};

const closeForm = () => {
  imgUploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  bodyModalOpen.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeydownEsc);
  imgUploadPreview.style.removeProperty('filter');
  imgUploadEffectLevel.classList.add('hidden');
};

function onKeydownEsc (evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === textHashtags || document.activeElement === description) {
      textHashtags.blur();
      description.blur();
      evt.stopPropagation();
    } else {
      closeForm();
    }
  }
}

const norm = (texts) => texts
  .toUpperCase()
  .split(' ');

const isInvalidHashtag = (value) => norm(value).every((text) => /^#[a-zа-яё0-9]{1,19}$/i.test(text) && !/\s{2}/i.test(text) || /^$/.test(text));

pristine.addValidator(
  textHashtags,
  isInvalidHashtag,
  messageErrorValidation.errorInvalidHashtag,
  1,
  true
);

const isNumberHashtags = (value) => norm(value).length <= MAX_HASHTAGS;

pristine.addValidator(
  textHashtags,
  isNumberHashtags,
  messageErrorValidation.errorNumberHashtags,
  2,
  true
);

function isUniqueHashtags (value) {
  const array = norm(value);
  const tempArray = [array[0]];
  for (let j = 0; j < array.length; j++) {
    for (let i = j + 1; i < array.length; i++) {
      if(array[j + 1] === array[i]){
        if (!tempArray.includes(array[i])) {
          tempArray.push(array[i]);
        }
      }
    }
  }
  return (array.length === tempArray.length);
}

pristine.addValidator(
  textHashtags,
  isUniqueHashtags,
  messageErrorValidation.errorHashtagsDuplicated,
  3,
  true
);

function isMessageLength(value) {
  const isValid = /^[a-zа-яё0-9.,:;?!-\s]{0,140}$/i.test(value);
  return isValid;
}

pristine.addValidator(
  description,
  isMessageLength,
  messageErrorValidation.errorMessageLength,
  4,
  true
);

const onCloseForm = () => {
  closeForm();
};

const onOpenForm = () => {
  openForm();
};

const onSubmitForm = (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
};

imgUploadInput.addEventListener('change', onOpenForm);
imgUploadCancel.addEventListener('click', onCloseForm);
imgUploadForm.addEventListener('submit', onSubmitForm);
