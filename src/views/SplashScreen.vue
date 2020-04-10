<template>
  <div id="splash-screen">
    <div id="app-title">
      <img src="../assets/SplashScreen/logo.svg" id="covid-logo" />
      <div id="title">Coronavirus Tracker</div>
    </div>
    <img src="../assets/SplashScreen/worldMap.svg" id="world-map" />
  </div>
</template>

<script>
export default {
  name: "SplashScreen",
  methods: {
    goToHome() {
      this.$router.push("/HomePage");
    }
  },
  created() {
    setTimeout(() => {
      this.goToHome();
    }, 3000);
  }
};
</script>

<style lang="sass" scoped>
#splash-screen
  position: absolute
  width: 100%
  height: 100%
  left: 0px
  top: 0px
  background: #222B45
  border: 1px solid #000000
  box-sizing: border-box
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
  overflow: hidden
  display: flex
  justify-content: center
  align-items: center
  #world-map
    width: 1277px
    height: 958px
    left: -451px
    top: -73px
  #app-title
    display: flex
    flex-direction: column
    padding: 0px
    position: absolute
    width: 219px
    height: 154px
    #covid-logo
      position: static
      flex: none
      order: 0
      align-self: center
      margin: 0px 24px
    #title
      position: static
      left: 0%
      right: 0%
      top: 80.52%
      bottom: 0%
      font-style: normal
      font-weight: bold
      font-size: 24px
      line-height: 30px
      text-align: center
      color: #EB5569
      flex: none
      order: 1
      align-self: center
      margin: 0px 24px
</style>
