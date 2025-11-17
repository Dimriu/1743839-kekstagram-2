import { closeForm } from './form.js';

const body = document.querySelector('body');
const errorDownloadingFromServer = document.querySelector('#data-error').content;
const successSubmittingToServer = document.querySelector('#success').content;
const errorSubmittingToServer = document.querySelector('#error').content;

function showErrorDownloadingFromServer (message) {
  const error = errorDownloadingFromServer.cloneNode(true);
  if(message) {
    message = error.querySelector('.data-error__title').textContent;
  }
  body.append(error);
  const errorBody = body.querySelector('.data-error');
  setTimeout(() => {
    errorBody.remove();
  }, 5000);
}

function showSuccessSubmittingToServer (message) {
  const success = successSubmittingToServer.cloneNode(true);
  if(message) {
    message = success.querySelector('.success__title').textContent;
  }
  body.append(success);

  const successButton = document.querySelector('.success__button');
  function clearButtonClick () {
    document.querySelector('.success').remove();
    body.removeEventListener('click', clearScreenClick);
    successButton.removeEventListener('click', clearButtonClick);
    closeForm();
  }
  successButton.addEventListener('click', clearButtonClick);

  function clearScreenClick (evt) {
    if(evt.target !== document.querySelector('.success__inner') && evt.target !== document.querySelector('.success__title') && document.querySelector('.success')) {
      body.querySelector('.success').remove();
      body.removeEventListener('click', clearScreenClick);
      closeForm();
    }
  }
  body.addEventListener('click', clearScreenClick);
}

function showErrorSubmittingToServer (message) {
  const error = errorSubmittingToServer.cloneNode(true);
  if(message) {
    message = error.querySelector('.error__title').textContent;
  }
  body.append(error);

  const errorButton = document.querySelector('.error__button');
  function clearButtonClickError () {
    document.querySelector('.error').remove();
    errorButton.removeEventListener('click', clearButtonClickError);
  }
  errorButton.addEventListener('click', clearButtonClickError);

  function clearScreenClickError (evt) {
    if(evt.target !== document.querySelector('.error__inner') && evt.target !== document.querySelector('.error__title') && document.querySelector('.error')) {
      document.querySelector('.error').remove();
      body.removeEventListener('click', clearScreenClickError);
    }
  }
  body.addEventListener('click', clearScreenClickError);

}

export {showErrorDownloadingFromServer, showSuccessSubmittingToServer, showErrorSubmittingToServer};
