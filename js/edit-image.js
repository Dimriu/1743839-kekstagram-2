const editImage = function () {
  const imgUploadForm = document.querySelector('.img-upload__form');
  const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
  const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
  const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
  const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
  imgUploadPreview.style.transform = `scale(${(1)})`;

  let scale = 1;
  const STEP = 0.25;
  let count = 0;

  const onScaleControlSmaller = function () {
    if(scale > STEP && scale <= 1) {
      scale = scale - STEP;
      count = count + 1;
      imgUploadPreview.style.transform = `scale(${(scale)})`;
      scaleControlValue.value = `${scale * 100 }%`;
    }
  };

  const onScaleControlBigger = function () {
    if(scale + STEP <= 1) {
      scale = scale + STEP;
      count = count + 1;
      imgUploadPreview.style.transform = `scale(${(scale)})`;
      scaleControlValue.value = `${scale * 100 }%`;
    }
  };

  scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onScaleControlBigger);

};

export {editImage};
