<template>
  <div id="app">
    <router-view />
    <b-card class="navbar-icon" no-body>
      <b-nav card-header tabs>
        <b-nav-item to="/CountrySelection">
          <img src="./assets/img/country.svg" alt="select-country" />
          <span class="caption">
            countries
          </span>
        </b-nav-item>
        <b-nav-item to="/HomePage">
          <img src="./assets/img/logo.svg" alt="select-country" />
          <span class="caption">
            Home
          </span>
        </b-nav-item>
        <b-nav-item to="/TopTenPage">
          <img src="./assets/img/topTen.svg" alt="select-country" />
          <span class="caption">
            Top10
          </span>
        </b-nav-item>
      </b-nav>

      <!-- <b-card-body>
        <router-view></router-view>
      </b-card-body> -->
    </b-card>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap')
#app
  position: relative
  width: 100vw
  height: 100vh
  background: #FFFFFF
  font-family: 'Varela Round', sans-serif
  .navbar-icon
    position: fixed
    width: 100vw
    height: 49px
    left: 0px
    bottom: 0px
    background: #FFFFFF
    box-shadow: 0px -1px 0px #E5E9F2
    display: flex
    align-items: center
    .caption
      font-style: normal
      font-weight: 500
      font-size: 15px
      line-height: 18px
      color: #6C757D
</style>
