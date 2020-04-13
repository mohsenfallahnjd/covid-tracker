<template>
  <div id="home-page" class="home-page">
    <div>
      <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
        <b-container
          class="header-container"
          :aria-hidden="show ? 'true' : null"
        >
          <img
            src="../assets/img/homeHeader.svg"
            class="header-container--background"
          />

          <!-- title -->
          <div class="header-title">
            <h6>
              Covid-19 Tracker
            </h6>

            <!-- null-Massage -->
            <h3 class="country-name null-msg red-color" v-if="nullMsg == true">
              Please Select Country . . !
              <router-link to="/CountrySelection">
                <b-icon-caret-down-fill class="select-country" />
              </router-link>
            </h3>
            <!--  -->

            <h3 class="country-name" v-else>
              <img class="country-name--image" :src="countryData.flag" />
              {{ countryData.country }}
              <router-link to="/CountrySelection">
                <b-icon-caret-down-fill class="select-country" />
              </router-link>
            </h3>
            <p
              ref="show"
              :disabled="show"
              variant="primary"
              @click="reloadPage()"
            >
              <b-icon-arrow-repeat />
              Last updated
              {{ lastUpdate }}
            </p>
          </div>
          <!--  -->
        </b-container>

        <!-- Confirmed -->
        <b-row class="boxs">
          <b-col class="boxs-col">
            <div class="confirmed-box">
              <p class="confirmed-box--title">
                Confirmed
              </p>
              <div class="confirmed-box--number">
                <span class="confirmed-box--number--confirmed">
                  <span>
                    <b-icon-arrow-up class="arrow" />
                    {{ countryData.new_cases }}
                  </span>
                  <p>{{ countryData.total_cases }}</p>
                </span>
              </div>
            </div>
            <!--  -->

            <!-- Recovered -->
            <div class="confirmed-box">
              <p class="confirmed-box--title">
                Recovered
              </p>
              <div class="confirmed-box--number padding-zero">
                <span class="confirmed-box--number--recovered">
                  {{ countryData.total_recovered }}
                  <p>
                    <b-icon-shield-shaded />
                  </p>
                </span>
              </div>
            </div>
            <!--  -->
          </b-col>
          <b-col class="boxs-col">
            <!-- active -->
            <div class="confirmed-box">
              <p class="confirmed-box--title">
                active
              </p>
              <div class="confirmed-box--number">
                <span class="confirmed-box--number--deceased">
                  {{ countryData.active_cases }}
                  <p class="critical-case">
                    <b-icon-exclamation-circle style="font-size:15px" />
                    {{ countryData.serious_critical }}
                  </p>
                </span>
              </div>
            </div>
            <!--  -->

            <!-- Deaths -->
            <div class="confirmed-box">
              <p class="confirmed-box--title">
                Deaths
              </p>
              <div class="confirmed-box--number padding-zero">
                <span class="confirmed-box--number--NewDeaths">
                  <span>
                    <b-icon-arrow-up class="arrow" />
                    {{ countryData.new_deaths }}
                  </span>
                  <p>{{ countryData.total_deaths }}</p>
                </span>
              </div>
            </div>
            <!--  -->
          </b-col>
        </b-row>

        <template v-slot:overlay>
          <div class="text-center">
            <b-icon
              v-if="badResponse !== true"
              icon="stopwatch"
              font-scale="3"
              animation="cylon"
            ></b-icon>
            <p v-if="badResponse !== true" id="cancel-label">Please wait...</p>
            <div v-if="badResponse === true" class="bad-response">
              <p class="bad-response--text" id="refresh-label">
                <b-icon-arrow-repeat />
                Please Refresh This Page..!
              </p>
            </div>

            <b-button
              ref="cancel"
              variant="outline-danger"
              size="sm"
              aria-describedby="cancel-label"
              @click="show = false"
            >
              Cancel
            </b-button>

            <b-button
              class="ml-3"
              v-if="badResponse === true"
              variant="outline-success"
              size="sm"
              @click="reloadPage()"
            >
              Reload
            </b-button>
          </div>
        </template>
      </b-overlay>
    </div>

    <!-- IconBar -->
    <b-card class="navbar-icon" no-body>
      <b-nav card-header tabs>
        <b-nav-item class="active-line" to="/HomePage">
          <img src="../assets/img/homePageActive.svg" alt="home-page" />
          <span class="caption active-color">
            Home
          </span>
        </b-nav-item>

        <b-nav-item to="/AllCountry">
          <img src="../assets/img/country.svg" alt="all-country" />
          <span class="caption">
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
        <router-view />
      </b-card-body>
    </b-card>
    <!--  -->
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "HomePage",
  data: () => ({
    countryData: {},
    countrySelected: null,
    date: {},
    nullMsg: true,
    show: false,
    badResponse: false
  }),
  beforeMount() {
    this.countrySelected = localStorage.getItem("countrySelected");
    this.date = localStorage.getItem("lastUpdate");
    if (!this.countrySelected) {
      this.nullMsg = true;
    } else {
      this.nullMsg = false;
      if (JSON.parse(localStorage.getItem("flag")) === false) {
        localStorage.setItem("flag", true);
        this.reloadPage();
      }
    }
  },
  mounted() {
    this.countryData = JSON.parse(localStorage.getItem("dataCountry"));
  },
  methods: {
    reloadPage() {
      this.show = true;
      this.badResponse = false;

      axios
        .get(
          `https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=${this.countrySelected}`
        )
        .then(response => {
          localStorage.setItem(
            "dataCountry",
            JSON.stringify(response.data.data.rows[0])
          );
          localStorage.setItem(
            "lastUpdate",
            JSON.stringify(response.data.data.last_update)
          );
          console.log(response);

          if (response.status === 200) {
            this.show = false;
            location.reload();
          } else {
            this.badResponse = true;

            console.log(
              response.status,
              "response log in reloadFunction at HomePage"
            );
          }
        })
        .catch(error => {
          this.badResponse = true;
          console.log(error, "reloadFunction in HomePage error");
        });
    },
    onShown() {
      // this.$refs.cancel.focus();
    },
    onHidden() {
      // this.$refs.show.focus();
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
.home-page
    position: relative
    width: 100%
    height: 100%
    background: #FFFFFF
.header-container
    display: flex
    height: 34.5%
    background: #222B45
    overflow: hidden
    padding: 0
    &--background
        height: 100%
        width: 100vw
        object-fit: cover
    .header-title
        position: absolute
        display: flex
        flex-direction: column
        align-self: center
        justify-self: center
        margin-left: 8vw
        h6
            position: static
            font-style: normal
            font-weight: 500
            font-size: 20px
            line-height: 18px
            color: #FFFFFF
            flex: none
            order: 0
            align-self: flex-start
            margin: 0px 16px
        p
            position: static
            font-style: normal
            font-weight: 500
            font-size: 15px
            line-height: 18px
            color: #C0CCDA
            flex: none
            order: 1
            align-self: flex-start
            margin: 0px 16px
        .country-name
            position: static
            width: auto
            font-style: normal
            font-weight: bold
            font-size: 30px
            line-height: 30px
            color: #FFFFFF
            flex: none
            order: 0
            align-self: flex-start
            padding: 16px
            text-transform: capitalize
            margin: 0
            &--image
              width: 8vw
              object-fit: cover
              margin-right: 3px
              margin-bottom: 0.8vh
    .select-country
      padding-bottom: 0.09em
      color: #C0CCDA
      font-style: normal
      font-weight: normal
      font-size: 20px
.boxs
    width: 90vw
    height: 90vw
    margin: 0px auto
    display: flex
    .boxs-col
        .confirmed-box
            margin: 15% 0px
            height: 40%
            background: #FFFFFF
            box-shadow: 0px 8px 40px rgba(28, 44, 64, 0.1)
            display: flex
            flex-direction: column
            justify-content: center
            &--title
                font-style: normal
                font-weight: bold
                font-size: 12px
                line-height: 14px
                text-transform: uppercase
                color: #8391A7
                display: flex
                padding-top: 20px
                align-self: center
            &--number
                font-style: normal
                font-weight: bold
                // font-weight: 800
                font-size: 25px
                line-height: 36px
                flex: none
                order: 0
                align-self: center
                margin: auto 0px
                // padding-bottom: 32px
                &--confirmed
                    color: #FF073A
                    p
                      font-weight: 100
                      font-size: 12px
                      margin: 0
                &--NewDeaths
                    color: #6C757D
                    p
                      font-weight: 100
                      font-size: 12px
                      margin: 0
                &--recovered
                    color: #28A745
                    p
                      font-weight: 100
                      font-size: 12px
                      margin: 0
                &--deceased
                    color: #007BFF
                    p
                      font-weight: 100
                      font-size: 12px
                      margin: 0
.null-msg
  font-size: 20px !important
  margin-right: 1vw !important
.red-color
  color: #FF073A !important
.padding-zero
  padding: 0px !important
.arrow
  font-size: 20px
.critical-case
  color: #FFB100
.bad-response
  padding-bottom: 3vw
  width: max-content
  &--text
    color: #FF073A !important
    align-self: center
    font-weight: 900
</style>
