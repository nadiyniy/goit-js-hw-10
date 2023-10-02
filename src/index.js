import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectBreedEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const containerEl = document.querySelector('.cat-info');

selectBreedEl.addEventListener('change', OnSelectchange);

loaderEl.classList.remove('is-hidden');

function OnSelectchange(e) {
  const breedsId = e.target.value;

  loaderEl.classList.remove('is-hidden');
  containerEl.classList.add('is-hidden');
  selectBreedEl.classList.add('is-hidden');
  errorEl.classList.add('is-hidden');

  fetchCatByBreed(breedsId)
    .then(data => {
      const { url } = data[0];
      const breedInfo = data[0].breeds[0];
      const { name, description, temperament } = breedInfo;

      const markup = `
    <img src="${url}"
    alt="${name}"/>
    <h3>${name}</h3>
    <p>${description}</p>
    <p>${temperament}</p>`;

      containerEl.innerHTML = markup;

      loaderEl.classList.add('is-hidden');
      containerEl.classList.remove('is-hidden');
      selectBreedEl.classList.remove('is-hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        {
          // closeButton: true,
          cssAnimationStyle: 'from-top',
          timeout: 5000,
        }
      );
      errorEl.classList.add('is-hidden');
      selectBreedEl.classList.remove('is-hidden');
      containerEl.classList.add('is-hidden');
      loaderEl.classList.add('is-hidden');
    });
}

fetchBreeds()
  .then(res => {
    const markup = res
      .map(el => {
        return `<option value="${el.id}">${el.name}</option>`;
      })
      .join('');
    selectBreedEl.innerHTML = markup;

    new SlimSelect({
      select: selectBreedEl,
    });

    loaderEl.classList.add('is-hidden');

    selectBreedEl.classList.remove('is-hidden');
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      {
        // closeButton: true,
        cssAnimationStyle: 'from-top',
        timeout: 5000,
      }
    );
    errorEl.classList.add('is-hidden');
    selectBreedEl.classList.add('is-hidden');
  })
  .finally(() => {
    loaderEl.classList.add('is-hidden');
  });
