const baseUrl = 'https://restcountries.eu/rest/v2/';
const endpoint = 'name/';

export default {
  fetchCountries(query) {
    const requestParams = `${endpoint}${query}`;

    return fetch(baseUrl + requestParams).then(res => res.json());
    // .then(dataParse => {
    //   return dataParse;
    // });
  },
};
