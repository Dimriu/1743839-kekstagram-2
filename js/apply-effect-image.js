const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectLevelSlider = document.querySelector('.effect-level__slider'); // ползунок
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

imgUploadEffectLevel.classList.add('hidden');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 10,
  },
  start: 5,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});

imgUploadEffects.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  if (effect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else if (effect === 'chrome') {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
    });
  } else if (effect === 'sepia') {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
    });
  } else if (effect === 'marvin') {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 0,
      step: 1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
    });
  } else if (effect === 'phobos') {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 0,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
    });
  } else if (effect === 'heat') {
    imgUploadEffectLevel.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 1,
      step: 0.1,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
    });
  }

});


