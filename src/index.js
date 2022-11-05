import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountry } from './fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 1000;

inputEl.addEventListener('input', debounce(handleCountryInput, DEBOUNCE_DELAY));

function handleCountryInput(event) {
  const searchQuery = event.target.value.trim();
  if (!searchQuery) {
    return;
  }
  fetchCountry(searchQuery).then(console.log).catch(console.log);
}

function formatInputCountry(countryName) {
  if (countryName.length <= 10) {
    Notiflix.Notify.failure('Oops, there is no country with that name!');
  }
  if (countryName.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
