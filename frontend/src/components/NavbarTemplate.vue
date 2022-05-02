<template>
    <div class="navbar-template-container container">
        <div class="row">
            <div class="col-sm-4">
                <div style="padding-top: 10px; padding-left: 15px">
                    <a href="/">
                        <font-awesome-icon class="neon-icon" icon="ranking-star" size="3x"/>
                    </a>
                </div>
            </div>
            <div class="col-sm text-right">
                <p v-if="typePage == 1" style="padding-top: 20px; padding-right: 15px">
                    <a class="neon-button" href="/user/customizeDashboard">Settings</a>
                    <a class="neon-button" v-on:click="logout">Logout</a>
                </p>
                <p v-else style="padding-top: 20px; padding-right: 15px"> 
                    <a class="neon-button" href="/login">Login</a>
                    <a class="neon-button" href="/register">Register</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  computed: { 
    typePage: function() { 
      return localStorage.getItem('typeDashboard') 
    } 
  },
  methods: {
    logout () {
        localStorage.setItem('typeDashboard', 0);
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        localStorage.removeItem('sub_id');
        Swal.fire({
                title: 'Successfully logged out!',
                icon: 'success'
            })
        setTimeout(() => window.location.reload(true), 1000)
        console.log("LOGOUT");
    }
  }
};
</script>

<style lang="scss" scoped>
    @import "../scss/components/navbar.scss";
    @import "../scss/components/neons.scss";
    @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
</style>