<template>
  <div id="home-page" class="home-page">
    <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
      <b-container class="header-container" :aria-hidden="show ? 'true' : null">
        <img
          src="../assets/img/homeHeader.svg"
          class="header-container--background"
          alt="header-container--background"
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
            <img
              class="country-name--image"
              :src="countryData.countryInfo.flag"
            />

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
              <span
                v-if="formatNumber(countryData.todayCases) !== 'undefined'"
                class="confirmed-box--number--confirmed"
              >
                <span>
                  {{ formatNumber(countryData.cases) }}
                </span>
                <p>
                  <b-icon-arrow-up class="arrow" />
                  {{ formatNumber(countryData.todayCases) }}
                </p>
              </span>
            </div>
            <div class="planet-chart">
              <canvas id="planet-chart-confirmed" />
            </div>
          </div>
          <!--  -->

          <!-- Recovered -->
          <div class="confirmed-box">
            <p class="confirmed-box--title">
              Recovered
            </p>
            <div class="confirmed-box--number padding-zero">
              <span
                v-if="formatNumber(countryData.recovered) !== 'undefined'"
                class="confirmed-box--number--recovered"
              >
                {{ formatNumber(countryData.recovered) }}
                <p>
                  <b-icon-shield-shaded />
                </p>
              </span>
            </div>
            <div class="planet-chart">
              <canvas id="planet-chart-recovered" />
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
              <span
                v-if="formatNumber(countryData.active) !== 'undefined'"
                class="confirmed-box--number--active"
              >
                {{ formatNumber(countryData.active) }}
                <p class="critical-case">
                  <b-icon-exclamation-circle style="font-size:15px" />
                  {{ formatNumber(countryData.critical) }}
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
              <span
                v-if="formatNumber(countryData.todayDeaths) !== 'undefined'"
                class="confirmed-box--number--NewDeaths"
              >
                <span>
                  {{ formatNumber(countryData.deaths) }}
                </span>
                <p>
                  <b-icon-arrow-up class="arrow" />
                  {{ formatNumber(countryData.todayDeaths) }}
                </p>
              </span>
            </div>
            <div class="planet-chart">
              <canvas id="planet-chart-deaths" />
            </div>
          </div>
          <!--  -->
        </b-col>
      </b-row>

      <!-- additional data -->
      <b-col class="additional-data-box">
        <b-col class="additional-data-box--col">
          <b-row class="additional-data-box--row">
            <p class="data-box--title">
              tests:
            </p>
            <div class="data-box--number padding-zero">
              <span
                v-if="formatNumber(countryData.tests) !== 'undefined'"
                class="data-box--number"
              >
                {{ formatNumber(countryData.tests) }}
              </span>
            </div>
          </b-row>
          <b-row class="additional-data-box--row">
            <p class="data-box--title">
              tests.pom:
            </p>
            <div class="data-box--number padding-zero">
              <span
                v-if="
                  formatNumber(countryData.testsPerOneMillion) !== 'undefined'
                "
                class="data-box--number"
              >
                {{ formatNumber(countryData.testsPerOneMillion) }}
              </span>
            </div>
          </b-row>
        </b-col>
        <b-col class="additional-data-box--col">
          <b-row class="additional-data-box--row">
            <p class="data-box--title">
              cases.pom:
            </p>
            <div class="data-box--number padding-zero">
              <span
                v-if="
                  formatNumber(countryData.casesPerOneMillion) !== 'undefined'
                "
                class="data-box--number--confirmed"
              >
                {{ formatNumber(countryData.casesPerOneMillion) }}
              </span>
            </div>
          </b-row>
          <b-row class="additional-data-box--row">
            <p class="data-box--title">
              deaths.pom:
            </p>
            <div class="data-box--number padding-zero">
              <span
                v-if="
                  formatNumber(countryData.deathsPerOneMillion) !== 'undefined'
                "
                class="data-box--number--NewDeaths"
              >
                {{ formatNumber(countryData.deathsPerOneMillion) }}
              </span>
            </div>
          </b-row>
        </b-col>
      </b-col>

      <!--  -->

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

    <!-- IconBar -->
    <b-card class="navbar-icon" no-body>
      <b-nav card-header tabs>
        <b-nav-item class="active-line" :to="{ name: 'HomePage' }">
          <img src="../assets/img/homePageActive.svg" alt="home-page" />
          <span class="caption active-color">
            Home
          </span>
        </b-nav-item>

        <b-nav-item :to="{ name: 'AllCountry' }">
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
import Chart from "chart.js";

export default {
  name: "HomePage",
  data: () => ({
    countryData: {},
    countrySelected: null,
    nullMsg: true,
    show: false,
    badResponse: false,
    chartData: {},
  }),
  mounted() {
    this.countrySelected = localStorage.getItem("countrySelected");
    if (!this.countrySelected) {
      // this.getLocation();
      // localStorage.setItem("countrySelected", "Iran"); //default country
      // this.reloadPage();
      this.nullMsg = true;
    } else {
      this.nullMsg = false;
      if (JSON.parse(localStorage.getItem("flag")) === false) {
        localStorage.setItem("flag", true);
        this.reloadPage();
      }
    }
    this.countryData = JSON.parse(localStorage.getItem("countryData"));
    this.chartData = JSON.parse(localStorage.getItem("chartData"));
    this.createChart("planet-chart-confirmed", this.chartData.cases, "#FF073A");
    this.createChart("planet-chart-deaths", this.chartData.deaths, "#6C757D");
    this.createChart(
      "planet-chart-recovered",
      this.chartData.recovered,
      "#28A745"
    );
  },
  methods: {
    reloadPage() {
      this.show = true;
      this.badResponse = false;
      this.planetChartData();

      axios
        .get(`https://corona.lmao.ninja/v2/countries/${this.countrySelected}`)
        .then((response) => {
          localStorage.setItem("countryData", JSON.stringify(response.data));
          if (response.status === 200) {
            this.show = false;
            location.reload();
          } else {
            this.badResponse = true;

            console.log(
              response.status,
              "response error log in reloadFunction at HomePage"
            );
          }
        })
        .catch((error) => {
          this.badResponse = true;
          console.log(error, "reloadFunction in HomePage error");
        });
    },
    onShown() {
      // this.$refs.cancel.focus();
    },
    onHidden() {
      // this.$refs.show.focus();
    },
    planetChartData() {
      axios
        .get(
          `https://corona.lmao.ninja/v2/historical/${localStorage.getItem(
            "countrySelected"
          )}`
        )
        .then((response) => {
          localStorage.setItem(
            "chartData",
            JSON.stringify(response.data.timeline)
          );
        })
        .catch((error) => {
          console.log(error, "chartDataConfirmed.js error");
        });
    },
    createChart(chartId, item, borderColor) {
      const ctx = document.getElementById(chartId).getContext("2d");
      Chart.defaults.global.legend.display = false;
      new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(item),
          datasets: [
            {
              label: item,
              data: Object.values(item),
              fill: false,
              borderColor: borderColor,
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },

                ticks: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            ],
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      });
    },
    formatNumber(num) {
      num = `${num}`;
      return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
  computed: {
    lastUpdate() {
      return moment(moment(this.countryData.updated).utc(false)).fromNow();
    },
  },
};
</script>

<style lang="sass" scoped>
.home-page
    position: relative
    width: 100%
    height: 100vh
    background: #FFFFFF
    overflow-y: scroll
.header-container
    display: flex
    height: 34vh
    background: #222B45
    overflow: hidden
    padding: 0
    &--background
        height: 100%
        width: 100%
        object-fit: cover
    .header-title
        position: absolute
        display: flex
        flex-direction: column
        align-self: center
        justify-self: center
        margin-left: 8vw
        padding-bottom: 2em
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
    width: 88vw
    //height: 90vw
    margin: -4em auto
    display: flex
    // margin-bottom: 3em
    .boxs-col
        padding: 0px 0.5em
        .confirmed-box
            margin: 10% 0px
            height: 40vw
            background: #FFFFFF
            box-shadow: 0px 8px 40px rgba(28, 44, 64, 0.08)
            display: flex
            flex-direction: column
            justify-content: center
            border-radius: 3px
            width: auto
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
                font-size: 21px
                line-height: 30px
                flex: none
                order: 0
                align-self: center
                margin: auto 0px
                // padding-bottom: 32px
                &--confirmed
                    color: #FF073A
                    display: flex
                    align-items: center
                    p
                      font-weight: 100
                      font-size: 10px
                      margin: 0
                      padding-left: 6px
                &--NewDeaths
                    color: #6C757D
                    display: flex
                    align-items: center
                    p
                      font-weight: 100
                      font-size: 10px
                      margin: 0
                      padding-left: 6px
                &--recovered
                    color: #28A745
                    display: flex
                    align-items: center
                    p
                      font-weight: 100
                      font-size: 10px
                      margin: 0
                      padding-left: 6px

                &--active
                    color: #007BFF
                    //display: flex
                    //align-items: center
                    p
                      font-weight: 100
                      font-size: 10px
                      margin: 0
                      padding-left: 10px
                      margin-top: 15px
.null-msg
  font-size: 20px !important
  margin-right: 1vw !important
.red-color
  color: #FF073A !important
.padding-zero
  padding: 0px !important
.arrow
  font-size: 10px
.critical-case
  color: #FFB100
.bad-response
  padding-bottom: 3vw
  width: max-content
  &--text
    color: #FF073A !important
    align-self: center
    font-weight: 900
.additional-data-box
  width: 83vw
  height: 12vh
  margin: 5em auto
  display: flex
  box-shadow: 0px 8px 40px rgba(28, 44, 64, 0.08)
  flex-direction: column
  border-radius: 3px
  &--col
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
  &--row
    padding: 0em 1em
    .data-box
      &--title
        position: static
        font-style: normal
        font-weight: bold
        font-size: 8px
        line-height: 14px
        letter-spacing: 0.05em
        text-transform: uppercase
        color: #8391A7
        align-self: center
        margin: 8px 4px
      &--number
        position: static
        font-style: normal
        font-weight: 500
        font-size: 12px
        line-height: 18px
        margin: 10px 4px
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
        &--active
          color: #007BFF
          p
            font-weight: 100
            font-size: 12px
            margin: 0
.planet-chart
  height: 40px !important
  width: 80px !important
  margin: 5px auto 10px
</style>
