<template>
  <div class="world-statistics-page">
    <b-list-group class="country-list">
      <b-list-group-item class="country-list__item">
        <span class="country-list__item--title">
          <b-icon-caret-left-fill
            class="back-btn"
            @click="goBack()"
          ></b-icon-caret-left-fill>
          <img
            class="country-list__item--image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/800px-International_Flag_of_Planet_Earth.svg.png"
          />
          World
          <span class="last-update"> Last updated {{ lastUpdate }} </span>
        </span>
        <span class="country-list__item--details">
          <b-row class="country-list__item--detail-row">
            <b-col class="padding-zero">
              <span>
                <div class="detail-title">total</div>
                <div class="detail-number total">
                  {{ worldData.total_cases }}
                </div>
              </span>
            </b-col>
            <b-col class="padding-zero">
              <div>
                <div class="detail-title">serious critical</div>
                <div class="detail-number confirmed">
                  {{ worldData.critical_condition_active_cases }}
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row class="country-list__item--detail-row">
            <b-col class="padding-zero">
              <span>
                <div class="detail-title">T.deaths</div>
                <div class="detail-number deaths">
                  {{ worldData.death_closed_cases }} /
                  {{ worldData.closed_cases_death_percentage }}%
                </div>
              </span>
            </b-col>
            <b-col class="padding-zero">
              <span>
                <div class="detail-title">active cases</div>
                <div class="detail-number actived">
                  {{ worldData.currently_infected }}
                </div>
              </span>
            </b-col>
          </b-row>

          <b-row class="country-list__item--detail-row">
            <b-col class="padding-zero">
              <span>
                <div class="detail-title">A.C.mild condition</div>
                <div class="detail-number mild-case">
                  {{ worldData.mild_condition_active_cases }} /
                  {{ worldData.active_cases_mild_percentage }}%
                </div>
              </span>
            </b-col>
            <b-col class="padding-zero">
              <span>
                <div class="detail-title">A.C.critical</div>
                <div class="detail-number confirmed">
                  {{ worldData.active_cases_critical_percentage }}%
                </div>
              </span>
            </b-col>
          </b-row>

          <b-row class="country-list__item--detail-row">
            <b-col class="padding-zero">
              <span>
                <div class="detail-title">T.recovered</div>
                <div class="detail-number recovered">
                  {{ worldData.recovered_closed_cases }} /
                  {{ worldData.closed_cases_recovered_percentage }}%
                </div>
              </span>
            </b-col>
            <b-col class="padding-zero">
              <span>
                <div class="detail-title">cases with outcome</div>
                <div class="detail-number  out-come">
                  {{ worldData.cases_with_outcome }}
                </div>
              </span>
            </b-col>
          </b-row>

          <b-row class="country-list__item--detail-row">
            <span class="detail-title--end">
              <div class="detail-title--end--title">general death rate</div>
              <div class="detail-title--end--number confirmed">
                {{ worldData.general_death_rate }}
              </div>
            </span>
          </b-row>
        </span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "WorldStatistics",
  data: () => ({
    worldData: {},
    date: {}
  }),
  beforeMount() {
    axios
      .get(
        "https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats"
      )
      .then(response => {
        this.worldData = response.data.data;
        this.date = response.data.data.last_update;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    lastUpdate() {
      return moment(
        moment(this.date, ["DDMMMMY HH:mm", "MMMMDDY HH:mm"]).utc(true)
      ).fromNow();
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="sass" scoped>

.world-statistics-page
  position: relative
  width: 100%
  height: 100%
  background: #FFFFFF
  display: flex
  justify-content: center
  align-items: center
  .country-list
    // margin-top: 3vh
    // margin-bottom: 7vh
    display: flex
    align-items: center
    justify-content: center
    &__item
      display: flex
      flex-direction: column
      justify-content: center
      padding: 20px
      width: 93vw
      height: auto
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
      &--detail-row
        display: flex
        flex-direction: row
        padding: 0px
        position: static
        width: 100%
        margin: 10px 0px
        justify-content: space-between
        .detail-title
            display: flex
            position: static
            font-style: normal
            font-weight: bold
            font-size: 10px
            line-height: 14px
            letter-spacing: 0.05em
            text-transform: uppercase
            color: #8391A7
            align-self: center
            margin: 15px 4px
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
.out-come
    color: #FFB100
.mild-case
  color: #1EE34B
.total
  font-weight: 600 !important
.last-update
  font-size: 9px !important
  margin-left: 2em
.padding-zero
  padding: 0px !important
.back-btn
    padding-right: 2em
</style>
