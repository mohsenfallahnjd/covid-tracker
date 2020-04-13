<template>
  <div class="country-selection">
    <!-- header -->
    <b-container class="header-container">
      <div class="country-selection__header">
        <div class="country-selection__header--back-icon">
          <b-icon-chevron-left @click="goBack()"></b-icon-chevron-left>
        </div>
        <div class="country-selection__header--title">
          Choose your country
        </div>
        <b-form-input
          class="search-bar"
          type="search"
          size="lg"
          v-model="search"
          placeholder="Search..."
        ></b-form-input>
      </div>
    </b-container>
    <!--  -->

    <!-- list -->
    <b-list-group class="country-list">
      <!-- badResponse Message -->
      <b-list-group-item
        v-if="badResponse === true"
        class="country-list__item bad-response"
      >
        <span class="country-list__item--country bad-response">
          Please Refresh This Page..!
        </span>
      </b-list-group-item>
      <!--  -->

      <router-link v-else :to="{ name: 'HomePage' }">
        <b-list-group-item
          v-for="(countries, item) in filteredList"
          :key="item"
          class="country-list__item"
          @click="changeRoute(countries.country)"
        >
          <span class="country-list__item--country">
            <!-- <img
              :src="`http://www.countryflags.io/${countries.flag}/shiny/16.png`"
            /> -->
            <img :src="countries.flag" />
            {{ countries.country }}
          </span>
        </b-list-group-item>
      </router-link>

      <!-- loading -->
      <b-list-group-item
        v-if="loadingSpin === true"
        class="country-list__item loading"
      >
        <span class="country-list__item--country ">
          <strong>Loading . . .</strong>
          <b-spinner small class="loading--spin" />
        </span>
      </b-list-group-item>
      <!--  -->
    </b-list-group>
    <!--  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CountrySelection",
  data: () => ({
    countryList: [],
    search: "",
    badResponse: false,
    loadingSpin: true
  }),
  beforeMount() {
    axios
      .get(
        "https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=250"
      )
      .then(response => {
        this.countryList = response.data.data.rows.sort(function(a, b) {
          const countryA = a.country.toLowerCase();
          const countryB = b.country.toLowerCase();
          if (countryA < countryB) return -1;
          if (countryA > countryB) return 1;
          return 0;
        });
        this.loadingSpin = false;
        if (response.status !== 200) {
          this.badResponse = true;
        }
      })
      .catch(error => {
        this.loadingSpin = false;
        this.badResponse = true;
        console.log(error, "CountryList Get erorr");
      });

    localStorage.setItem("flag", false);
  },
  methods: {
    changeRoute(country) {
      localStorage.setItem("countrySelected", country);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    filteredList() {
      return this.countryList.filter(Country => {
        return Country.country
          .toLowerCase()
          .startsWith(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.country-selection
    position: relative
    width: 100%
    height: 100%
    background: #FFFFFF
    &__header
        position: fixed
        display: flex
        flex-direction: row
        padding: 0px
        width: auto
        height: auto
        left: 32px
        top: 40px
        background-color: #FFFFFF
        &--title
            position: static
            width: 100%
            height: 100%
            left: 50px
            bottom: 0px
            font-style: normal
            font-weight: 600
            font-size: 24px
            line-height: 28px
            color: #1C2C40
            flex: none
            align-self: center
            margin: 16px 10px
        &--back-icon
            position: static
            width: 24px
            height: 24px
            left: 0px
            top: 2px
            flex: none
            align-self: center
            margin: 16px 0px
        .search-bar
            position: fixed
            width: 80%
            flex: none
            align-self: center
            margin: 60px 0px
            background: #F1F2F6
            border-radius: 8px
    .country-list
        height: auto
        overflow-y: scroll
        &__item
            display: flex
            flex-direction: row
            padding: 15px 40px
            width: 100%
            border-radius: 0px
            border: none
            align-self: center
            margin: 0px 0px
            &--country
                font-style: normal
                font-weight: 600
                font-size: 16px
                line-height: 20px
                color: #1C2C40
                align-self: center
                margin: 2px 0px
                img
                  width: 6vw
                  object-fit: cover
                  margin-right: 10px
                  margin-bottom: 0.8vh
    .header-container
        height: 185px
        background-color: #FFFFFF
.bad-response
  color: #FF073A !important
  justify-content: center
  font-weight: 900
.loading
  justify-content: center
  letter-spacing: 2px
  &--spin
    margin-left: 1em
</style>
