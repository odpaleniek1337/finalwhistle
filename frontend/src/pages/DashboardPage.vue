<template>
  <div class="card main-box container p-4">
    <div v-if="!this.username">
    <div class="title-text">Hi Mate!</div>
      <div class="dashboard-desc-text">Please log in or register to fully experience the app!</div>
    </div>
    <div v-if="this.username">
      <div class="title-text" >Hello, {{ this.username }}!</div>
      <div class="row" style="margin-right: 0px; margin-left: 0px;">
        <div class="dashboard-desc-text">Your favourite competitions in one place! </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sports: [],
      competitions: [],
      targets: [],
      username: localStorage.getItem('username')
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
    @import "../scss/pages/dashboard.scss";
    @import "../scss/components/neons.scss";
    @import "../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
</style>