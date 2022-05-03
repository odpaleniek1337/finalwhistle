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
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getSubscriptionMain } from '../utils/queries.js';
export default {
  data () {
    return {
      subscription: {},
      username: localStorage.getItem('username')
    }
  },
  methods: {
    fetchSubsciption () {
        this.axios.post(this.apilink, 
        {
            query: getSubscriptionMain(localStorage.getItem('sub_id'))
        },
        {
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => {
            this.subscription = response.data.data.getSubscription.Teams
            console.log(this.subscription);
            if (response.data.errors !== undefined) {
                throw Error(response.data.errors[0].message)
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
  },
  mounted() {
    this.fetchSubsciption();
  }
}
</script>

<style lang="scss" scoped>
    @import "../scss/pages/dashboard.scss";
    @import "../scss/components/neons.scss";
    @import "../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
</style>