<template>
  <div class="top-ten-page">
    <b-list-group class="country-list">
      <b-list-group-item
        v-for="(countries, item) in rankList"
        :key="item"
        class="country-list__item"
        lazy
      >
        <span class="country-list__item--title">
          <span v-if="countries.country !== 'World'" class="rank-num">
            {{ item }}.
          </span>
          <img class="country-list__item--image" :src="countries.flag" />
          {{ countries.country }}
          <router-link to="/WorldStatistics">
            <b-icon-clipboard-data v-if="countries.country === 'World'" />
          </router-link>
          <span v-if="countries.country === 'World'" class="last-update">
            Last updated {{ lastUpdate }}
          </span>
        </span>
        <span class="country-list__item--details">
          <b-row class="country-list__item--datail-row">
            <span>
              <div class="detail-title">total</div>
              <div class="detail-number total">
                {{ countries.total_cases }}
              </div>
            </span>
            <span>
              <div class="detail-title">confirmed</div>
              <div class="detail-number confirmed">
                <b-icon-arrow-up />
                {{ countries.new_cases }}
              </div>
            </span>
            <span>
              <div class="detail-title">serious critical</div>
              <div class="detail-number confirmed">
                {{ countries.serious_critical }}
              </div>
            </span>
          </b-row>
          <b-row class="country-list__item--datail-row">
            <span>
              <div class="detail-title">total deaths</div>
              <div class="detail-number deaths">
                {{ countries.total_deaths }}
              </div>
            </span>
            <span>
              <div class="detail-title">deaths</div>
              <div class="detail-number deaths">
                <b-icon-arrow-up />
                {{ countries.new_deaths }}
              </div>
            </span>
            <span>
              <div class="detail-title">total recovered</div>
              <div class="detail-number recovered">
                {{ countries.total_recovered }}
              </div>
            </span>
          </b-row>
          <b-row class="country-list__item--datail-row">
            <span class="detail-title--end">
              <div class="detail-title--end--title">active cases</div>
              <div class="detail-title--end--number actived">
                {{ countries.active_cases }}
              </div>
            </span>
          </b-row>
        </span>
      </b-list-group-item>
      <!-- loadMore -->
      <b-icon-plus-circle @click="loadMore()" />
      <!--  -->
    </b-list-group>

    <!-- IconBar -->
    <b-card class="navbar-icon" no-body>
      <b-nav card-header tabs>
        <b-nav-item to="/HomePage">
          <img src="../assets/img/logo.svg" alt="home-page" />
          <span class="caption">
            Home
          </span>
        </b-nav-item>

        <b-nav-item class="active-line" to="/AllCountry">
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
    rankList: {},
    date: {},
    pageNumber: 1
  }),
  beforeMount() {
    axios
      .get(
        "https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search"
      )
      .then(response => {
        this.rankList = response.data.data.rows;
        this.date = response.data.data.last_update;
      })
      .catch(error => {
        console.log(error, "get CountryList in AllCountry error");
      });
  },
  methods: {
    loadMore() {
      if (this.pageNumber < 23) {
        axios
          .get(
            `https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?page=${++this
              .pageNumber}`
          )
          .then(response => {
            for (const i of response.data.data.rows) {
              this.rankList.push(i);
            }
            this.date = response.data.data.last_update;
          })
          .catch(error => {
            console.log(error, "loadMore error");
          });
      }
    }
  },
  computed: {
    lastUpdate() {
      return moment(
        moment(this.date, ["DDMMMMY HH:mm", "MMMMDDY HH:mm"]).utc(true)
      ).fromNow();
    }
  }
};
</script>

<style lang="sass" scoped>

.top-ten-page
  position: relative
  width: 100%
  height: 100%
  background: #FFFFFF
  .country-list
    margin-top: 3vh
    margin-bottom: 9vh
    // overflow-y: scroll
    display: flex
    align-items: center
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
      &--title
        position: static
        font-style: normal
        font-weight: 600
        font-size: 18px
        line-height: 22px
        color: #1C2C40
        align-self: flex-start
        margin: 0px 0px 10px 6px
      &--image
        width: 8vw
        object-fit: cover
        margin-right: 3px
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
  margin-left: 3em
.rank-num
    font-size: 10px
    margin-right: 3px
</style>
