import { validationFieldsForm } from './validation-fields-form.js';
import { editImage } from './edit-image.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadInput = document.querySelector('.img-upload__input');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const description = imgUploadForm.querySelector('.text__description');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const onKeydownEsc = function(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if(document.activeElement === textHashtags || document.activeElement === description) {
      textHashtags.blur();
      description.blur();
      evt.stopPropagation();
    } else {
      closeForm();
      imgUploadForm.reset();
      imgUploadPreview.style.removeProperty('filter');
      imgUploadEffectLevel.classList.add('hidden');
    }
  }
};

function openForm () {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', closeForm);
  document.addEventListener('keydown', onKeydownEsc);
  validationFieldsForm();
  editImage();
}

function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  imgUploadForm.removeEventListener('change', openForm);
  imgUploadCancel.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onKeydownEsc);
  imgUploadPreview.style.removeProperty('filter');
  imgUploadEffectLevel.classList.add('hidden');
}

imgUploadInput.addEventListener('change', openForm);
