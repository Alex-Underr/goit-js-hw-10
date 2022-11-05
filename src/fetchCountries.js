const COUNTRIES_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountry(inputCountrySearch) {
  return fetch(
    `${COUNTRIES_URL}/${inputCountrySearch}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
