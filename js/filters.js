import {createRandomIdFromRangeGenerator, debounce} from './utils.js';
import { getData } from './api.js';
import { displayPhotos } from './display-photos.js';
const INITIAL_DATA = {
  COUNT_RANDOM_ELEMENTS: 10,
  COUNT_OBJECTS: 25,
  SHOW_DELAY: 500
};

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');


getData()
  .then((data) => {
    displayPhotos(data.slice());
    const elements = document.querySelectorAll('.picture img');
    for (let i = 0; i < 25; i++) {
      elements[i].addEventListener('load', on);
    }
    let count = 0;
    function on () {
      count = count + 1;
      if (count === INITIAL_DATA.COUNT_OBJECTS) {
        imgFilters.classList.remove('img-filters--inactive');
        for (let i = 0; i < INITIAL_DATA.COUNT_OBJECTS; i++) {
          elements[i].removeEventListener('load', on);
        }
      }
    }
  });

function showFilterDefault () {
  if(!filterDefault.classList.contains('img-filters__button--active')) {
    filterDefault.classList.add('img-filters__button--active');
  }
  if(filterRandom.classList.contains('img-filters__button--active')) {
    filterRandom.classList.remove('img-filters__button--active');
  }
  if(filterDiscussed.classList.contains('img-filters__button--active')) {
    filterDiscussed.classList.remove('img-filters__button--active');
  }
  const elements = document.querySelectorAll('.picture');
  for (const element of elements) {
    element.remove();
  }
  getData()
    .then((data) => {
      displayPhotos(data.slice());
    });
}
const filterDefaultDebounce = debounce(showFilterDefault, INITIAL_DATA.SHOW_DELAY);
filterDefault.addEventListener('click', filterDefaultDebounce);

function showFilterRandom() {
  if(!filterRandom.classList.contains('img-filters__button--active')) {
    filterRandom.classList.add('img-filters__button--active');
  }
  if(filterDefault.classList.contains('img-filters__button--active')) {
    filterDefault.classList.remove('img-filters__button--active');
  }
  if(filterDiscussed.classList.contains('img-filters__button--active')) {
    filterDiscussed.classList.remove('img-filters__button--active');
  }
  const elements = document.querySelectorAll('.picture');
  for (const element of elements) {
    element.remove();
  }
  getData()
    .then((data) => {
      const dataTemp = data.slice();
      data = showRandomElements(dataTemp);
      displayPhotos(data.slice());
    });
}
const filterRandomDebounce = debounce(showFilterRandom, INITIAL_DATA.SHOW_DELAY);
filterRandom.addEventListener('click', filterRandomDebounce);

function showFilterDiscussed() {
  if(!filterDiscussed.classList.contains('img-filters__button--active')) {
    filterDiscussed.classList.add('img-filters__button--active');
  }
  if(filterRandom.classList.contains('img-filters__button--active')) {
    filterRandom.classList.remove('img-filters__button--active');
  }
  if(filterDefault.classList.contains('img-filters__button--active')) {
    filterDefault.classList.remove('img-filters__button--active');
  }
  const elements = document.querySelectorAll('.picture');
  for (const element of elements) {
    element.remove();
  }
  getData()
    .then((data) => {
      const dataTemp = data.slice();
      data = sortDownArray(dataTemp);
      displayPhotos(data.slice());
    });

}
const filterDiscussedDebounce = debounce(showFilterDiscussed, INITIAL_DATA.SHOW_DELAY);
filterDiscussed.addEventListener('click', filterDiscussedDebounce);

function showRandomElements (array) {
  const randomElement = createRandomIdFromRangeGenerator(0, INITIAL_DATA.COUNT_OBJECTS - 1);
  const randomIndexs = [];
  for (let i = 0; i < INITIAL_DATA.COUNT_RANDOM_ELEMENTS; i++) {
    randomIndexs.push(randomElement());
  }
  const randomElements = [];
  for (let i = 0; i < randomIndexs.length; i++) {
    randomElements.push(array[randomIndexs[i]]);
  }
  return randomElements;
}

function sortDownArray (array) {
  for (let i = 0; i <= array.length - 2; i++) {
    let maxValue = array[i].comments.length;
    for (let j = i + 1; j <= array.length - 1; j++) {
      if (array[j].comments.length > maxValue) {
        maxValue = array[j].comments.length;
        const swap = array[i];
        array[i] = array[j];
        array[j] = swap;
      }
    }
  }
  return array;
}
