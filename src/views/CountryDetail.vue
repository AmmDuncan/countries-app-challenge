<template>
  <div class="container">
    <div class="back-btn elevated" @click="$router.go(-1)">&larr; Back</div>
    <loading-state v-if="isLoading"></loading-state>
    <div class="content" v-else-if="country">
      <div class="image">
        <img :src="country.flags.svg" alt="">
      </div>
      <div class="details">
        <h1>{{ country.name.common }}</h1>

        <div class="other-details">

          <div class="card-detail">
            <span class="label">Native Name: </span>
            <span class="value">
              {{ getNativeName(country.name?.nativeName) }}
            </span>
          </div>

          <div class="card-detail">
            <span class="label">Population: </span>
            <span class="value">
              {{ country.population.toLocaleString() }}
            </span>
          </div>

          <div class="card-detail">
            <span class="label">Region: </span>
            <span class="value">
              {{ country.region }}
            </span>
          </div>

          <div class="card-detail">
            <span class="label">Region: </span>
            <span class="value">
              {{ country.subregion }}
            </span>
          </div>

          <div class="card-detail">
            <span class="label">Capital: </span>
            <span class="value">{{ country.capital?.join(", ") }}</span>
          </div>

          <div class="card-detail">
            <span class="label">Top Level Domain: </span>
            <span class="value">{{ country.tld?.[0] }}</span>
          </div>

          <div class="card-detail">
            <span class="label">Currency: </span>
            <span class="value">{{ Object.values(country.currencies)[0].name }}</span>
          </div>

          <div class="card-detail">
            <span class="label">Languages: </span>
            <span class="value">{{ Object.values(country.languages).join(", ") }}</span>
          </div>

        </div>

        <div class="borders">
          <div class="card-detail">
            <span class="label">Border Countries:</span>
            <span class="value">
              <span class="border elevated" v-for="code in country.borders" :key="code"
                    @click="goToCountry(countryCode[code])">
                {{ countryCode[code] }}
              </span>
              <span v-if="!country.borders || country.borders.length === 0"
                    style="font-weight: 800">No border countries</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingState from "@/components/LoadingState";
import {mapActions, mapState, mapGetters} from "vuex";

export default {
  name: "CountryDetail",
  components: {LoadingState},
  props: ['countryName'],
  computed: {
    ...mapState(['isLoading', 'country']),
    ...mapGetters(['countryCode']),
    fetchedCountryName() {
      return this.country?.name.common
    }
  },
  methods: {
    ...mapActions(['fetchCountries', 'fetchSingleCountry']),
    fetchCountry() {
      this.fetchSingleCountry({search: this.countryName})
    },
    getNativeName(nativeObject) {
      // is native Object is null or undefined do nothing
      if (!nativeObject) return;
      // Native name is an object whose keys are not consistent
      // we'll get an array of all values and return the native name in the first value
      const nativeNameValues = Object.values(nativeObject);
      const topValue = nativeNameValues[0];
      return topValue.common;
    },
    goToCountry(country) {
      this.$router.push(`/${country}`)
    }
  },
  watch: {
    $route() {
      if (this.countryName != this.fetchedCountryName) {
        this.fetchCountry()
      }
    }
  },
  mounted() {
    // fetch all countries for countryCode getter
    this.fetchCountries({});
    this.fetchCountry()
  }
}
</script>

<style scoped>
.image {
  aspect-ratio: 26/16;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top left;
}

.back-btn {
  position: sticky;
  top: 80px;
  z-index: 10;
  width: max-content;
  margin-top: 64px;
  padding: 8px 24px;
  cursor: pointer;
  transition: scale ease 200ms;
}

.back-btn:hover {
  scale: 1.035;
}

.content {
  padding-block: 8vh;
  display: grid;
  gap: 1rem;
}

h1 {
  /*margin: 0;*/
}

.other-details {
  display: grid;
  gap: 8px;
}

.card-detail .label {
  font-weight: 600;
}

.borders .card-detail {
  flex-flow: row nowrap;
  display: flex;
  gap: 1rem;
}

.borders .label {
  flex-basis: max-content;
  white-space: nowrap;
}

.borders .value {
  flex-basis: auto;
  flex-flow: row wrap;
  display: inline-flex;
  gap: 8px;
}


.borders {
  margin-top: 48px;
}

.border {
  display: inline-block;
  padding: 4px 16px;
  cursor: pointer;
  transition: scale 200ms ease;
}

.border:hover {
  scale: 1.025;
}


@media (min-width: 576px) {
  .other-details {
    display: grid;
    grid: repeat(5, max-content) / auto-flow 1fr;
  }
}

@media (min-width: 768px) {
  .content {
    max-width: 600px;
    margin-inline: auto;
  }
}

@media (min-width: 992px) {
  .content {
    grid: 1fr / 1fr 1fr;
    gap: 4rem;
    max-width: 100%;
  }
}
</style>