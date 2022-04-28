<template>
  <div class="card main-box container register-card">
    <div class="">
      <div class="title-text" style="padding-left: 23px" >REGISTER</div>
    </div>
    <div class="container">
      <div class="row">
        <div class="row" style="padding-left: 38px">
          <div class="register-text" >Username:</div>
          <input style="width: 200px; min-width: 150px;" type="text" v-model="username" />
        </div>
        <div class="row" style="padding-left: 38px">
          <div class="register-text">Password:</div>
          <input style="width: 200px; min-width: 150px;" type="password" v-model="password" />
        </div>
        <div class="row" style="padding-left: 38px">
          <div class="register-text">Confirm password:</div>
          <input style="width: 200px; min-width: 150px;" type="password" v-model="confirmPassword" />
        </div>
      </div>
      <div class="row mt-3">
        <a v-on:click="register" class="neon-button" style="margin-bottom: 15px;">Register</a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    register () {
      this.axios.post('http://localhost:3000/graphql', {
          query: `mutation {
            registerUser(username: "${this.username}", password: "${this.password}") {
                Token
                Username
            }}
          `
      })
      .then(response => {
          Swal.fire({
              title: 'Successfully registered!',
              icon: 'success'
          })
          console.log(response);
          console.log(' ');
          console.log(response.data);
          localStorage.setItem('jwt', response.data.Token);

          //setTimeout(() => window.location.reload(true), 2000)
      })
      .catch(error => {
          Swal.fire({
              title: 'Error!',
              text: error,
              icon: 'error'
          })
      });
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../scss/pages/register.scss";
    @import "../scss/components/neons.scss";
</style>