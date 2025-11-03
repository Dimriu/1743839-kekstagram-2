const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const description = imgUploadForm.querySelector('.text__description');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const MAX_HASHTAGS = 5;

function validationFieldsForm () {
  const pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  function er (isValid) {
    if (isValid) {
      imgUploadSubmit.disabled = false;
    } else {
      imgUploadSubmit.disabled = true;
    }
  }

  let errorMessage = '';

  const error = function () {
    return errorMessage;
  };

  const validationFieldTextHashtags = function (value) {
    errorMessage = '';
    const inputText = value.toUpperCase();

    if (inputText.length === 0) {
      imgUploadSubmit.disabled = false;
      return true;
    }

    const inputArray = inputText.split(' ');

    function isUniqueValues (array) {
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

    function checkAllHashtags () {
      imgUploadSubmit.disabled = true;
      for (let i = 1 ; i <= MAX_HASHTAGS ; i++) {
        if (inputArray.length === i) {
          if (isUniqueValues(inputArray)) {
            const isValid = /^#[a-zа-яё0-9\s]{1,19}$/i.test(inputArray[(i - 1)]);
            er(isValid);
            return isValid;
          }
        }
      }
    }

    function checkHashtag (array) {
      let isValid = '';
      for (let i = 0; i < array.length; i++) {
        isValid = /^#[a-zа-яё0-9]{1,19}$/i.test(array[i]) && !/\s{2}/i.test(array[i]);
        er(isValid);
      }
      return isValid;
    }

    const rules = [
      {
        check: checkHashtag(inputArray),
        error: 'введён невалидный хэштег',
      }, {
        check: inputArray.length <= MAX_HASHTAGS,
        error: 'превышено количество хэштегов',
      },
      {
        check: inputArray.length >= 1 && checkAllHashtags(),
        error: 'хэштеги повторяются',
      }
    ];

    return rules.every((rule) => {
      const isValid = rule.check;
      if (isValid) {
        return isValid;
      } else {
        errorMessage = rule.error;
      }
    });

  };
  pristine.addValidator(textHashtags, validationFieldTextHashtags, error, 2, false);

  pristine.addValidator(description, (value) => {
    const isValid = /^[a-zа-яё0-9.,:;?!-\s]{0,140}$/i.test(value);
    er(isValid);
    return isValid;
  },
  'длина комментария больше 140 символов'
  );
}

export {validationFieldsForm};
