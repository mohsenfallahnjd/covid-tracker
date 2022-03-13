<template>
  <div class="top-ten-page">
    <b-list-group class="country-list">
      <!-- badResponse Message -->
      <b-list-group-item
        v-if="badResponse === true"
        class="country-list__item bad-response"
        @click="reloadPage()"
      >
        <span class="country-list__item--country bad-response--text">
          Please Refresh This Page..!
        </span>
        <span class="country-list__item--country bad-response--text">
          --- Tap to reload ---
        </span>
      </b-list-group-item>
      <!--  -->

      <!-- World -->
      <b-list-group-item class="country-list__item first-item" lazy>
        <b-row class="country-list__item--title">
          <img
            class="country-list__item--image"
            style="width: 23px"
            src="../assets/img/internet.png"
          />
          Global
          <router-link class="more-data" :to="{ name: 'WorldStatistics' }">
            <b-icon-clipboard-data class="more-data--icon" />
            See More Data
          </router-link>
          <span class="reload-page">
            <b-icon-arrow-repeat @click="reloadPage()" />
          </span>
        </b-row>

        <span class="country-list__item--details">
          <b-row class="country-list__item--datail-row">
            <span>
              <div class="detail-title">total</div>
              <div
                v-if="formatNumber(worldData.cases) !== 'undefined'"
                class="detail-number total"
              >
                {{ formatNumber(worldData.cases) }}
              </div>
            </span>
            <span>
              <div class="detail-title">confirmed</div>
              <div
                v-if="formatNumber(worldData.todayCases) !== 'undefined'"
                class="detail-number confirmed"
              >
                <b-icon-arrow-up />
                {{ formatNumber(worldData.todayCases) }}
              </div>
            </span>
            <span>
              <div class="detail-title">serious critical</div>
              <div
                v-if="formatNumber(worldData.critical) !== 'undefined'"
                class="detail-number confirmed"
              >
                {{ formatNumber(worldData.critical) }}
              </div>
            </span>
          </b-row>
          <b-row class="country-list__item--datail-row">
            <span>
              <div class="detail-title">total deaths</div>
              <div
                v-if="formatNumber(worldData.deaths) !== 'undefined'"
                class="detail-number deaths"
              >
                {{ formatNumber(worldData.deaths) }}
              </div>
            </span>
            <span>
              <div class="detail-title">deaths</div>
              <div
                v-if="formatNumber(worldData.todayDeaths) !== 'undefined'"
                class="detail-number deaths"
              >
                <b-icon-arrow-up />
                {{ formatNumber(worldData.todayDeaths) }}
              </div>
            </span>
            <span>
              <div class="detail-title">total recovered</div>
              <div
                v-if="formatNumber(worldData.recovered) !== 'undefined'"
                class="detail-number recovered"
              >
                {{ formatNumber(worldData.recovered) }}
              </div>
            </span>
          </b-row>
          <b-row class="country-list__item--datail-row">
            <span class="detail-title--end">
              <div class="detail-title--end--title">active cases</div>
              <div
                v-if="formatNumber(worldData.active) !== 'undefined'"
                class="detail-title--end--number actived"
              >
                {{ formatNumber(worldData.active) }}
              </div>
            </span>
          </b-row>
          <span class="last-update">
            Last updated {{ lastUpdate(worldData.updated) }}
          </span>
        </span>
      </b-list-group-item>
      <!--  -->

      <b-list-group-item
        v-for="(countries, item) in rankList"
        :key="item"
        class="country-list__item"
        lazy
      >
        <b-row class="country-list__item--title">
          <span class="rank-num"> {{ item + 1 }}. </span>
          <img
            class="country-list__item--image"
            :src="countries.countryInfo.flag"
          />
          {{ countries.country }}
          <span class="reload-page">
            <b-icon-arrow-repeat @click="reloadPage()" />
          </span>
        </b-row>
        <span class="country-list__item--details">
          <b-row class="country-list__item--datail-row">
            <span>
              <div class="detail-title">total</div>
              <div class="detail-number total">
                {{ formatNumber(countries.cases) }}
              </div>
            </span>
            <span>
              <div class="detail-title">confirmed</div>
              <div class="detail-number confirmed">
                <b-icon-arrow-up />
                {{ formatNumber(countries.todayCases) }}
              </div>
            </span>
            <span>
              <div class="detail-title">serious critical</div>
              <div class="detail-number confirmed">
                {{ formatNumber(countries.critical) }}
              </div>
            </span>
          </b-row>
          <b-row class="country-list__item--datail-row">
            <span>
              <div class="detail-title">total deaths</div>
              <div class="detail-number deaths">
                {{ formatNumber(countries.deaths) }}
              </div>
            </span>
            <span>
              <div class="detail-title">deaths</div>
              <div class="detail-number deaths">
                <b-icon-arrow-up />
                {{ formatNumber(countries.todayDeaths) }}
              </div>
            </span>
            <span>
              <div class="detail-title">total recovered</div>
              <div class="detail-number recovered">
                {{ formatNumber(countries.recovered) }}
              </div>
            </span>
          </b-row>
          <b-row class="country-list__item--datail-row">
            <span class="detail-title--end">
              <div class="detail-title--end--title">active cases</div>
              <div class="detail-title--end--number actived">
                {{ formatNumber(countries.active) }}
              </div>
            </span>
          </b-row>
          <span class="last-update">
            Last updated {{ lastUpdate(countries.updated) }}
          </span>
        </span>
      </b-list-group-item>

      <!-- loading -->
      <b-list-group-item
        v-if="loadingSpin === true"
        class="country-list__item loading"
      >
        <span class="country-list__item--country">
          <strong>Loading . . .</strong>
          <b-spinner small class="loading--spin" />
        </span>
      </b-list-group-item>
      <!--  -->
      <!-- LoadMore -->
      <b-list-group-item
        v-if="loadingSpin === false"
        class="country-list__item loading"
      >
        <b-icon-plus-circle @click="addCountry()" />
      </b-list-group-item>
      <!--  -->
    </b-list-group>

    <!-- IconBar -->
    <b-card class="navbar-icon" no-body>
      <b-nav card-header tabs>
        <b-nav-item :to="{ name: 'HomePage' }">
          <img src="../assets/img/logo.svg" alt="home-page" />
          <span class="caption">
            Home
          </span>
        </b-nav-item>

        <b-nav-item class="active-line" :to="{ name: 'AllCountry' }">
          <img src="../assets/img/countryActive.svg" alt="all-country" />
          <span class="caption active-color">
            Countries Ranking
          </span>
        </b-nav-item>

        <!-- <b-nav-item to="/TopTenPage">
          <img src="../assets/img/topTen.svg" alt="top-ten" />
          <span class="caption">
            Top10
          </span>
        </b-nav-item> -->
      </b-nav>
      <b-card-body>
        <router-view></router-view>
      </b-card-body>
    </b-card>
    <!--  -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "TopTen",
  data: () => ({
    rankList: [],
    allCountry: {},
    worldData: {},
    date: {},
    countryCounter: 0,
    badResponse: false,
    loadingSpin: true,
  }),
  beforeMount() {
    axios
      .get("https://corona.lmao.ninja/v2/countries?sort=cases")
      .then((response) => {
        // this.rankList = response.data;
        this.allCountry = response.data;
        this.addCountry();
        this.loadingSpin = false;
        if (response.status !== 200) {
          this.badResponse = true;
        }
      })
      .catch((error) => {
        console.log(error, "get CountryList in AllCountry error");
        this.loadingSpin = false;
        this.badResponse = true;
      });

    // world
    axios
      .get("https://corona.lmao.ninja/v2/all")
      .then((response) => {
        this.worldData = response.data;
        this.loadingSpin = false;
        if (response.status !== 200) {
          this.badResponse = true;
        }
      })
      .catch((error) => {
        console.log(error, "get worldData in AllCountry error");
        this.loadingSpin = false;
        this.badResponse = true;
      });
    //
  },
  methods: {
    reloadPage() {
      location.reload();
    },
    lastUpdate(date) {
      return moment(date)
        .utc(false)
        .fromNow();
    },
    formatNumber(num) {
      num = `${num}`;
      return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    addCountry() {
      for (let i = 0; i < 10; i++) {
        this.rankList.push(this.allCountry[this.countryCounter]);
        this.countryCounter++;
      }
    },
  },
};
</script>

<style lang="sass" scoped>

.top-ten-page
  position: relative
  width: 100%
  height: 100%
  .country-list
    margin-bottom: 9vh
    // overflow-y: scroll
    display: flex
    align-items: center
    .first-item
      margin-top: 3vh
    &__item
      display: flex
      flex-direction: column
      padding: 20px
      width: 93vw
      height: auto //220px
      background: #FFFFFF
      box-shadow: 0px 8px 40px rgba(28, 44, 64, 0.05)
      border: none
      margin-bottom: 2vh
      border-radius: 20px
      &--details
        display: flex
        flex-direction: column
        align-items: center
      &--title
        position: static
        font-style: normal
        font-weight: 600
        font-size: 18px
        line-height: 22px
        color: #1C2C40
        margin: 0px 0px 10px 6px
        .reload-page
          margin-left: auto
      &--image
        width: 38px //8vw
        height: 23px //5vw
        object-fit: cover
        margin-right: 0.8em
        margin-bottom: 0.8vh
      &--datail-row
        display: flex
        flex-direction: row
        padding: 0px
        position: static
        width: 100%
        margin: 0px
        justify-content: space-between
        .detail-title
          position: static
          font-style: normal
          font-weight: bold
          font-size: 10px
          line-height: 14px
          letter-spacing: 0.05em
          text-transform: uppercase
          color: #8391A7
          align-self: center
          margin: 8px 4px
          &--end
            display: flex
            align-items: center
            margin: 8px auto 0px
            &--title
              position: static
              font-size: 15px
              font-style: normal
              font-weight: bold
              line-height: 14px
              letter-spacing: 0.05em
              text-transform: uppercase
              // color: #8391A7
              align-self: center
              margin: 8px 4px
            &--number
              position: static
              font-style: normal
              font-weight: 600
              font-size: 18px
              line-height: 18px
              margin: 0px 5px
        .detail-number
          position: static
          font-style: normal
          font-weight: 500
          font-size: 15px
          line-height: 18px
          margin: 10px 4px

.confirmed
  color: #FF073A
.recovered
  color: #28A745
.deaths
  color: #6C757D
.actived
  color: #007BFF
.total
  font-weight: 600 !important
.last-update
  font-size: 9px !important
  font-weight: 500
.rank-num
    font-size: 10px
    margin-right: 0.5em
    padding-top: 0.4em
.loading
  display: flex
  align-items: center
  justify-content: center
  letter-spacing: 2px
  margin-top: 3vw
  box-shadow: none !important
  &--spin
    margin-left: 1em
.bad-response
  margin-top: 3vw
  box-shadow: none !important
  &--text
    color: #FF073A !important
    align-self: center
    font-weight: 900
.more-data
  margin-left: inherit
  font-size: 10px
  &--icon
    font-size: 16px !important
</style>
