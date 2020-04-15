<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  // beforeMount() {
  //   if (navigator.geolocation) {
  //     console.log("Geolocation is supported!");
  //   } else {
  //     console.log("Geolocation is not supported for this Browser/OS.");
  //   }
  // },
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
      font-size: 13px
      line-height: 18px
      color: #6C757D
  .active-line
    border-top: 2px solid #EB5569
  .active-color
    color: #EB5569 !important
</style>
