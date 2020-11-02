import service from '../services/country-Service';
import countryInfoCard from '../templates/country.hbs';
import countryList from '../templates/List.hbs';
import _, { defaultTo } from 'lodash';
import { info, error, defaults } from '@pnotify/core';

import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
defaults.styling = 'material';
defaults.icons = 'material';

const refs = {
  searchInput: document.querySelector('#search-country'),
  content: document.querySelector('#countries-cont'),
  button: document.querySelector('.cross'),
};

refs.searchInput.addEventListener(
  'input',
  _.debounce(searchformSubmitHandler, 500),
);
refs.button.addEventListener('click', clear);

function searchformSubmitHandler(e) {
  e.preventDefault();
  clearCountriesContainer();
  const query = e.target.value;

  service.fetchCountries(query).then(data => {
    if (data.length > 10) {
      info({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 2000,
      });
    } else if (data.status === 404) {
      error({
        text: 'No country has been found. Please enter a more specific query!',
        delay: 2000,
      });
    }
    if (data.length > 1 && data.length <= 10) {
      insertCard(data, countryList);
    } else if (data.length === 1) {
      // const markup = buildInfoOneCard(data[0]);
      insertCard(data, countryInfoCard);
    }
  });
}
function insertCard(countries, template) {
  const markup = countries.map(country => template(country)).join('');
  refs.content.insertAdjacentHTML('afterbegin', markup);
}

// function insertCard(countries, template) {
//   const markup = countries
//     .map(country => console.log(template(country)))
//     .join('');
//   refs.content.insertAdjacentHTML('afterbegin', markup);
// }

// function buildInfoOneCard(card) {
//   return countryInfoCard(card);
// }

// function buildInfoEachCard(card) {
//   return countryList(card);
// }

// function buildListMarkup(countries, template) {
//   const markup = countries.map(country => template(country)).join();
//   refs.content.insertAdjacentHTML('afterbegin', markup);
// }

function clearCountriesContainer() {
  refs.content.innerHTML = '';
}

function clear(e) {
  if (e.target.classList.contains('cross')) {
    refs.searchInput.value = '';
  }
}
