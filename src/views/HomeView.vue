<template>
  <div class="home">
    <div class="container">
      <div class="config-bar">
        <div class="search-bar elevated rounded">
          <div class="icon">
            <v-icon name="oi-search" scale="1.25"></v-icon>
          </div>
          <input v-model="search" type="search" name="search" id="search" placeholder="Search for a country...">
        </div>
        <div class="filter elevated rounded">
          <select v-model="region">
            <option value="">Filter By Region</option>
            <option v-for="option in filters" :key="option.show" :value="option.value">{{ option.show }}</option>
          </select>
        </div>
      </div>

      <loading-state v-if="isLoading"></loading-state>
      <div class="country-list" v-else-if="countries">
        <div class="country-card elevated rounded" v-for="country in countries" :key="country.name.common"
             @click="goToCountry(country.name.common)">

          <div class="card-image">
            <img :src="country.flags.svg" alt="">
          </div>
          <div class="card-body">
            <div class="name">{{ country.name.common }}</div>
            <div class="card-detail">
              <span class="label">Population: </span>
              <span class="value">{{ country.population?.toLocaleString() }}</span>
            </div>
            <div class="card-detail">
              <span class="label">Region: </span>
              <span class="value">{{ country.region }}</span>
            </div>
            <div class="card-detail">
              <span class="label">Capital: </span>
              <span class="value">{{ country.capital?.join(", ") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState, mapActions} from 'vuex'
import LoadingState from "@/components/LoadingState";
import {debounce} from "@/utils/debounce";

export default {
  name: 'HomeView',
  components: {LoadingState},
  props: ['s', 'r'],
  data: () => ({
    filters: [
      {show: "Africa", value: "africa"},
      {show: "America", value: "america"},
      {show: "Asia", value: "asia"},
      {show: "Europe", value: "europe"},
      {show: "Oceania", value: "oceania"},
    ],
    region: "",
    search: "",
  }),
  computed: {
    ...mapState(['countries', 'isLoading']),
  },
  methods: {
    ...mapActions(['fetchCountries']),
    fetchData() {
      this.fetchCountries({region: this.region, search: this.search})
    },
    goToCountry(country) {
      this.$router.push(`/${country}`)
    }
  },
  watch: {
    region(newValue) {
      this.fetchData()
      // spread current query to keep them in the url
      const currentQuery = this.$route.query;
      this.$router.push({query: {...currentQuery, r: newValue}})

    },
    search(newValue) {
      debounce(this.fetchData, 500)
      const currentQuery = this.$route.query;
      this.$router.replace({query: {...currentQuery, s: newValue}})
    }
  },
  mounted() {
    this.search = this.s;
    this.region = this.r;
    this.fetchData();
  }
}
</script>

<style scoped>
.config-bar {
  margin-block: 48px;
  display: flex;
  flex-flow: column;
  gap: 4px;
  align-items: stretch;
  position: sticky;
  top: 80px;
  z-index: 10;
}

.search-bar {
  display: grid;
  grid: 1fr / 2rem auto;
  padding-inline: 32px 20px;
  align-items: center;
}

.search-bar:focus-within {
  outline: 2px solid #3cdece;
}

#search {
  background: transparent;
  border: none;
  /*width: 100%;*/
  height: 100%;
  width: calc(100vw - 64px - 4rem);
  padding-block: 20px;
  color: inherit;
}

#search:focus,
#search:focus-within,
#search:focus-visible {
  outline: none;
  border: none;
}

.filter {
  padding: 0 16px 0 0;
  min-width: 150px;
  height: 56px;
}

select {
  padding: 16px 8px 16px 24px;
  border: none;
  background: transparent;
  width: 100%;
  height: 100%;
  color: inherit;
}

.country-list {
  display: grid;
  grid: auto-flow / repeat(auto-fit, minmax(240px, 272px));
  justify-content: center;
  gap: 48px;
  padding-bottom: 48px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-card {
  cursor: pointer;
  transition: scale ease 250ms, box-shadow ease 250ms;
  overflow: hidden;
}

.country-card:hover {
  scale: 1.05;
  box-shadow: 0 24px 20px -10px rgba(0, 0, 0, 0.05);
}

.country-card:active {
  scale: 0.95;
}

.card-body {
  padding: 20px;
}

.card-image {
  aspect-ratio: 26/16;
}

.name {
  font-weight: 800;
  font-size: 1.125rem;
  margin-bottom: 12px;
}

.card-detail .label {
  font-weight: 600;
}

@media (min-width: 768px) {
  .config-bar {
    flex-flow: row;
    align-items: stretch;
    justify-content: space-between;
  }

  #search {
    max-width: 400px;
  }


  .country-list {
    justify-content: flex-start;
  }
}
</style>