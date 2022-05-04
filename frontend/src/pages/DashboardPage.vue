<template>
  <div class="card main-box container p-4">
    <div v-if="!this.username">
      <div class="title-text">Hi Mate!</div>
      <div class="dashboard-desc-text">Please log in or register to fully experience the app!</div>
    </div>
    <div v-else>
      <div class="title-text" >Hello, {{ this.username }}!</div>
      <div class="row" style="margin-right: 0px; margin-left: 0px;">
        <div class="dashboard-desc-text">Your favourite competitions in one place! </div>
      </div>
      <div v-if="this.reversedSubscription">
        <div class="row" style="margin-right: 0px; margin-left: 0px;">
          <div class="dashboard-desc-text">Sports</div>
        </div>
        <!-- eslint-disable -->
        <div class="dashboard-desc-text-smaller" v-for="(target, name1, index) in this.reversedSubscription.Sports" :key="target" style="list-style-type: none;">
          {{ name1 }}
          <div class="dashboard-desc-text-smaller2" v-for="(target, name2, index) in this.reversedSubscription.Sports[name1].Leagues" :key="target" style="list-style-type: none;">
            <div class="row">
              <div class="col-sm">{{ name2 }}</div>
              <div class="col-sm text-right">Place</div>
              <div class="col-sm text-right">Points</div>
              <div class="col-sm text-right">Form</div>
            </div>
            <div class="dashboard-desc-text-smaller3" v-for="(target, name3, index) in this.reversedSubscription.Sports[name1].Leagues[name2].Teams" :key="target" style="list-style-type: none;">
              <div class="row">
                <div class="col-sm">{{ name3 }}</div>
                <div class="col-sm text-right">{{ target.Place }}</div>
                <div class="col-sm text-right">{{ target.Points }}</div>
                <div class="col-sm text-right">{{ target.Form }}</div>
              </div>
            </div>
          </div>
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getSubscriptionMain } from '../utils/queries.js';
import { reverseSubscription } from '../utils/autocompletes.js';
export default {
  data () {
    return {
      subscription: [],
      reversedSubscription: {},
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
            this.reversedSubscription = reverseSubscription(this.subscription)
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
    if (localStorage.getItem('sub_id')){
      this.fetchSubsciption();
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../scss/pages/dashboard.scss";
    @import "../scss/components/neons.scss";
    @import "../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
</style>