import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
export function getImagesByQuery(query) {
  const config = {
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '49660701-34943155f6893778b93ecffed',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };
  return axios(config)
    .then(response => response.data.hits)
    .catch(error =>
      iziToast.show({
        message: `Ooops, something went wrong, try again. ${error}`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: 'red',
      })
    );
}
