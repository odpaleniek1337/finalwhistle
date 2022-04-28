<template>
    <div id="app">
        <navbar-template />
        <div class="container app-content">
            <router-view />
        </div>
    </div>
</template>

<script>
import NavbarTemplate from '../components/NavbarTemplate.vue';

export default {
  components: {
    NavbarTemplate
  }
}
</script>


<style lang="scss">
    @import '../scss/app.scss';
</style>