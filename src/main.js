import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  showLoader();
  clearGallery();
  const inputValue = form.elements['search-text'].value;
  const requestedData = getImagesByQuery(inputValue);

  requestedData
    .then(response => {
      if (response.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          messageColor: '#fff',
          backgroundColor: 'red',
        });
      }
      createGallery(response);
    })
    .catch(error => {
      iziToast.show({
        message: `Ooops, something went wrong, try again. ${error}`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: 'red',
      });
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
}
