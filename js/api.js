import { showErrorDownloadingFromServer, showSuccessSubmittingToServer, showErrorSubmittingToServer } from './response-server.js';
//import {debounce} from './utils.js'
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const getData = () =>
  fetch(
    'https://31.javascript.htmlacademy.pro/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showErrorDownloadingFromServer();
      }
    })
    .then((data) => data)
    .catch((error) => {
      showErrorDownloadingFromServer(error.message);
    })
    .finally(() => {
      imgUploadSubmit.disabled = false;
    });

const setData = (body) => fetch(
  'https://31.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    credentials: 'same-origin',
    body,
  })
  .then((response) => {
    if (response.ok) {
      showSuccessSubmittingToServer();
    }
  })
  .catch((error) => {
    showErrorSubmittingToServer(error);
  })
  .finally(() => {
    imgUploadSubmit.disabled = false;
  });

export{getData,setData};


