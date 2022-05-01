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
      this.axios.post(this.apilink, {
          query: `mutation {
            registerUser(Username: "${this.username}", Password: "${this.password}") {
                id
                Username
                Token
            }}
          `
      })
      .then(response => {
          Swal.fire({
              title: 'Successfully registered!',
              icon: 'success'
          })
          if (response.data.errors !== undefined) {
            throw Error(response.data.errors[0].message)
          }
          else {
            localStorage.setItem('jwt', response.data.data.registerUser.Token);
            localStorage.setItem('typeDashboard', 1)
            localStorage.setItem('username', response.data.data.registerUser.Username);
            setTimeout(() => window.location.reload(true), 1000)
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
    @import "../scss/pages/register.scss";
    @import "../scss/components/neons.scss";
</style>