<template>
  <div class="card main-box container login-card">
    <div class="">
      <div class="title-text" style="padding-left: 23px" >LOGIN</div>
    </div>
    <div class="container">
      <div class="row">
        <div class="row" style="padding-left: 38px">
          <div class="login-text" >Username:</div>
          <input style="width: 200px; min-width: 150px;" type="text" v-model="username" />
        </div>
        <div class="row" style="padding-left: 38px">
          <div class="login-text">Password:</div>
          <input style="width: 200px; min-width: 150px;" type="password" v-model="password" />
        </div>
      </div>
      <div class="row" style="padding-left: 23px; padding-top:15px">
        <div class="login-text">
          You don't have an account? Click <a class="link-register-text" href="/register">here</a> to create!
        </div>
      </div>
      <div class="row mt-3">
        <a v-on:click="login" class="neon-button" style="margin-bottom: 15px;">Login</a>
      </div>
      <div class="row" style="padding-left: 23px">
        <div class="login-text">
            By continuing, you agree to our User Agreement and Privacy Policy.
        </div>
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
    }
  },
  methods: {
    login () {
        console.log('login');
        this.axios.post(this.apilink, {
          query: `mutation {
            login(Username: "${this.username}", Password: "${this.password}") {
                id
                Username
                Token
            }}
          `
      })
      .then(response => {
          Swal.fire({
              title: 'Successfully logged in!',
              icon: 'success'
          })
          if (response.data.errors !== undefined) {
            throw Error(response.data.errors[0].message)
          }
          else {
            localStorage.setItem('jwt', response.data.data.login.Token);
            localStorage.setItem('typeDashboard', 1);
            localStorage.setItem('username', response.data.data.login.Username);
            localStorage.setItem('id', response.data.data.login.id);
            setTimeout(() => window.location.reload(true), 1000);
          }
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
    @import "../scss/pages/login.scss";
    @import "../scss/components/neons.scss";
</style>