<template>
  <div id="home-page" class="home-page">
    <b-container class="header-container">
      <img
        src="../assets/img/homeHeader.svg"
        class="header-container--background"
      />
      <div class="header-title">
        <h6>Covid-19 Tracker</h6>
        <h3 class="country-name null-msg" v-if="nullMsg == true">
          Please Select Country First..!
        </h3>
        <h3 class="country-name" v-else>
          {{ countryData.Country }}
        </h3>
        <p @click="reloadPage()">
          <b-icon-arrow-repeat></b-icon-arrow-repeat>
          Last updated
          {{ lastUpdate }}
        </p>
      </div>
    </b-container>

    <b-row class="boxs">
      <b-col class="boxs-col">
        <div class="confirmed-box">
          <p class="confirmed-box--title">
            New Confirmed
          </p>
          <div class="confirmed-box--number">
            <span class="confirmed-box--number--confirmed">
              {{ countryData.NewConfirmed }}
            </span>
          </div>
        </div>
        <div class="confirmed-box">
          <p class="confirmed-box--title">
            New Recovered
          </p>
          <div class="confirmed-box--number padding-zero">
            <span class="confirmed-box--number--recovered">
              {{ countryData.NewRecovered }}
              <p>T: {{ countryData.TotalRecovered }}</p>
            </span>
          </div>
        </div>
      </b-col>
      <b-col class="boxs-col">
        <div class="confirmed-box">
          <p class="confirmed-box--title">
            Deaths
          </p>
          <div class="confirmed-box--number padding-zero">
            <span class="confirmed-box--number--NewDeaths">
              {{ countryData.NewDeaths }}
              <p>T: {{ countryData.TotalDeaths }}</p>
            </span>
          </div>
        </div>
        <div class="confirmed-box">
          <p class="confirmed-box--title">
            Total
          </p>
          <div class="confirmed-box--number">
            <span class="confirmed-box--number--deceased">
              {{ countryData.TotalConfirmed }}
            </span>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "HomePage",
  data: () => ({
    countryData: {},
    countryCode: null,
    items: [
      {
        Total_Confirmed: "",
        Total_Deaths: "",
        Total_Recovered: ""
      }
    ],
    nullMsg: true
  }),
  beforeMount() {
    this.countryCode = localStorage.getItem("countryCode");
    if (!this.countryCode) {
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
    this.items[0].Total_Confirmed = this.countryData.TotalConfirmed;
    this.items[0].Total_Deaths = this.countryData.TotalDeaths;
    this.items[0].Total_Recovered = this.countryData.TotalRecovered;
  },
  methods: {
    reloadPage() {
      axios
        .get("https://api.covid19api.com/summary")
        .then(response => {
          localStorage.setItem(
            "dataCountry",
            JSON.stringify(
              response.data.Countries.filter(
                // item => item.CountryCode === this.countryData.CountryCode
                item => item.CountryCode === this.countryCode
              )[0]
            )
          );
          if (response.status === 200) {
            location.reload();
          } else {
            console.log(
              response.status,
              "response log in reloadFunction at HomePage"
            );
          }
        })
        .catch(error => {
          console.log(error, "reloadFunction in HomePage erroe");
        });
    }
  },
  computed: {
    lastUpdate() {
      return moment(this.countryData.Date).fromNow();
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
        margin-left: 10vw
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
            font-size: 40px
            line-height: 36px
            color: #FFFFFF
            flex: none
            order: 0
            align-self: flex-start
            margin: 20px 16px
            text-transform: capitalize
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
                // font-weight: 500
                font-size: 32px
                line-height: 36px
                flex: none
                order: 0
                align-self: center
                margin: auto 0px
                padding-bottom: 32px
                &--confirmed
                    color: #FF073A
                &--NewDeaths
                    color: #6C757D
                    p
                      font-weight: 100
                      font-size: 10px
                      margin: 0
                &--recovered
                    color: #28A745
                    p
                      font-weight: 100
                      font-size: 10px
                      margin: 0
                &--deceased
                    color: #007BFF
.null-msg
  font-size: 20px !important
.padding-zero
  padding: 0px !important
</style>
