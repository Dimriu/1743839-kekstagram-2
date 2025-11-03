import { validationFieldsForm } from './validation-fields-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadInput = document.querySelector('.img-upload__input');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const description = imgUploadForm.querySelector('.text__description');

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
    }
  }
};

function openForm () {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', closeForm);
  document.addEventListener('keydown', onKeydownEsc);
  validationFieldsForm();
}

function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  imgUploadForm.removeEventListener('change', openForm);
  imgUploadCancel.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onKeydownEsc);

}

imgUploadInput.addEventListener('change', openForm);
