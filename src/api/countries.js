import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";

function getAllCountries() {
  return axios.get(`${baseUrl}/all`);
}

function getAllCountriesByRegion(region) {
  return axios.get(`${baseUrl}/region/${region}`);
}

function getAllCountriesByName(name, fullText = false) {
  const doFullText = fullText ? "?fullText=true" : "";
  return axios.get(`${baseUrl}/name/${name}${doFullText}`);
}

export { getAllCountries, getAllCountriesByRegion, getAllCountriesByName };
