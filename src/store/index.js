import { createStore } from "vuex";
import {
  getAllCountries,
  getAllCountriesByRegion,
  getAllCountriesByName,
} from "@/api/countries";

export default createStore({
  state: {
    countries: null,
    isLoading: false,
    country: null,
  },
  getters: {
    countryCode(state) {
      const newObj = {};

      state.countries?.forEach((country) => {
        const code = country.cca3;
        const name = country.name.common;
        newObj[code] = name;
      });
      return newObj;
    },
  },
  mutations: {
    SET_LOADING: (state, loading) => {
      state.isLoading = loading;
    },
    SET_COUNTRIES: (state, countries) => {
      state.countries = countries;
    },
    SET_SINGLE_COUNTRY: (state, country) => {
      state.country = country;
    },
  },
  actions: {
    async fetchCountries({ commit }, options) {
      try {
        const { region, search } = options;

        commit("SET_LOADING", true);

        let res = search
          ? await getAllCountriesByName(search)
          : region
          ? await getAllCountriesByRegion(region)
          : await getAllCountries();

        const { data } = res;
        commit("SET_COUNTRIES", data);
      } catch (err) {
        console.log(err);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async fetchSingleCountry({ commit }, options) {
      try {
        const { search } = options;

        commit("SET_LOADING", true);

        let res = await getAllCountriesByName(search, true);
        const { data } = res;

        commit("SET_SINGLE_COUNTRY", data[0]);
      } catch (err) {
        console.log(err);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  modules: {},
});
