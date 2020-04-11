<template>
  <div class="country-selection">
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
    <b-list-group class="country-list">
      <b-list-group-item v-if="badRespones === true" class="country-list__item red-color">
        <span class="country-list__item--country red-color">
          Please Refresh This Page..!
        </span>
      </b-list-group-item>
      <router-link v-else :to="{ name: 'HomePage' }">
        <b-list-group-item
          v-for="(Countries, item) in filteredList"
          :key="item"
          class="country-list__item"
          @click="changeRoute(Countries.ISO2)"
        >
          <span class="country-list__item--country">
            <img
              :src="`http://www.countryflags.io/${Countries.ISO2}/shiny/16.png`"
            />
            {{ Countries.Country }}
          </span>
        </b-list-group-item>
      </router-link>
    </b-list-group>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CountrySelection",
  data: () => ({
    countryList: [],
    search: "",
    badRespones: false
  }),
  beforeMount() {
    // axios
    //   .get("https://api.covid19api.com/summary")
    //   .then(response => {
    //     this.countryList = response.data.Countries;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    axios
      .get("https://api.covid19api.com/countries")
      .then(response => {
        this.countryList = response.data.sort(function(a, b) {
          const countryA = a.Country.toLowerCase();
          const countryB = b.Country.toLowerCase();
          if (countryA < countryB) return -1;
          if (countryA > countryB) return 1;
          return 0;
        });
        if (response.status !== 200) {
          this.badRespones = true;
        }
      })
      .catch(error => {
        console.log(error, "CountryList Get erorr");
        this.badRespones = true;
      });
  },
  mounted() {
    localStorage.setItem("flag", false);
  },
  methods: {
    changeRoute(ISO2) {
      localStorage.setItem("countryCode", ISO2);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    filteredList() {
      return this.countryList.filter(Country => {
        return Country.Country.toLowerCase().startsWith(
          this.search.toLowerCase()
        );
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
        height: 450px
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
                    padding: 0px 8px
    .header-container
        height: 185px
        background-color: #FFFFFF
.red-color
  color: #FF073A !important
  justify-content: center
</style>
