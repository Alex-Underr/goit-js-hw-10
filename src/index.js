import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountry } from './fetchCountries.js';
import countries from './templates/countries.hbs';

const countryList = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(handleCountryInput, DEBOUNCE_DELAY));

function handleCountryInput(event) {
  const searchQuery = event.target.value.trim();
  if (!searchQuery) {
    return;
  }
  fetchCountry(searchQuery)
    .then(resp => {
      formatInputCountry(resp);
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name!');
    });
}

function formatInputCountry(countryName) {
  countryEl.innerHTML = '';
  countryList.innerHTML = '';
  if (countryName.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (countryName.length <= 10 && countryName.length >= 2) {
    const markup = countries(countryName);
    countryList.innerHTML = markup;
  }

  if (countryName.length === 1) {
    const markup = createMarkup(countryName);
    countryEl.innerHTML = markup;
    return;
  }
}

function createMarkup(data) {
  return data
    .map(el => {
      return `<div class='country_inform'>
  <img class='country_flag' src='${el.flags.svg}' alt='${el.name.official}' />
  <h1 class='country_name'>${el.name.common}</h1>
</div>
<h2 class='country_detail'><span class='header'>Capital: </span>${
        el.capital
      }</h2>
<h2 class='country_detail'><span class='header'>Population: </span>${
        el.population
      }</h2>
<h2 class='country_detail'><span class='header'>Languages: </span>${Object.values(
        el.languages
      ).join(', ')}</h2>`;
    })
    .join();
}
