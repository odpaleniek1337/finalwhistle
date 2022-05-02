<template>
  <div class="main-box container p-4">
    <div class="title-text">Hello, {{ this.username }}!</div>
    <div class="dashboard-desc-text">Choose sport</div>
    <div class=".row-cols-md-4 d-flex">
        <div v-for="{ id, Name } in this.sports" :key="id" class="col text-center">
        <a class="neon-button" v-on:click="test">{{ Name }}</a>
        </div>
    </div>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
      <div class="dashboard-desc-text">Choose competition</div>
    </div>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
        <input v-model="this.searchCompetitionItem" type="search" placeholder="Search for competition..." class="w-100"/>
        <ul class="w-full rounded px-4 py-2 w-100 dashboard-dropdown" v-if="this.searchCompetitionItem.length">
            <li v-for="competition in foundCompetitions" :key="competition.id" @click="selectCompetition(competition)">
                {{ competition.Name }}
            </li>
        </ul>
    </div>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
      <div class="dashboard-desc-text">Choose your target</div>
    </div>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
        <input v-model="this.searchTargetItem" type="search" placeholder="Search for target..." class="w-100"/>
        <ul class="w-full rounded px-4 py-2 w-100 dashboard-dropdown" v-if="this.searchTargetItem.length">
            <li v-for="target in foundTargets" :key="target.id" @click="selectTarget(target)">
                {{ target.Name }}
            </li>
        </ul>
    </div>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
      <div class="dashboard-desc-text">Manage your targets</div>
    </div>
    <div class="row" style="margin-right: 0px; margin-left: 0px;">
        <ul class="w-full rounded px-4 py-2 w-100 dashboard-dropdown dashboard-dropdown-list" v-if="this.chosenTargets.length">
            <li v-for="target in chosenTargets" :key="target.id">
                {{ target.Name }}
                <a v-on:click="removeFromChosenTargets(target.id)">
                    <font-awesome-icon class="neon-icon float-right" icon="circle-xmark"/>
                </a>
                <font-awesome-icon class="neon-icon float-right" icon="gear"/>
            </li>
        </ul>
    </div>
    <div class=".row-cols-md-2 d-flex">
        <div class="col text-center" style="margin-right: 0px; margin-left: 0px;">
            <a href="/" class="neon-button" style="margin-bottom: 15px;">Cancel</a>
        </div>
        <div class="col text-center" style="margin-right: 0px; margin-left: 0px;">
            <a v-on:click="saveDashboard" class="neon-button" style="margin-bottom: 15px;">Save</a>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { searchCompetition, searchTarget } from '../utils/autocompletes.js'
export default {
  data () {
    return {
      sports: [],
      leagues: [],
      targets: [],
      chosenSport: {},
      chosenCompetition: {},
      chosenTargets: [],
      searchCompetitionItem: '',
      searchTargetItem: '',
      username: localStorage.getItem('username')
    }
  },
  methods: {
      fetchSports () {
        this.axios.post(this.apilink, 
        {
            query: `query { 
                sports {
                    id
                    Name
                }
            }`
        },
        {
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => {
            this.sports = response.data.data.sports;
            if (response.data.errors !== undefined) {
                throw Error(response.data.errors[0].message)
            }
            this.chosenSport = this.sports[0];//additional variable to switch between sports
            this.fetchCompetitions();
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error'
            })
        });
    },
    fetchCompetitions () {
        this.axios.post(this.apilink, 
        {
            query: `query { 
                leagues(sportID: "${this.chosenSport.id}") {
                    id
                    Name
                }
            }`
        },
        {
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => {
            this.leagues = response.data.data.leagues
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
    },
    fetchTargets () {
        this.axios.post(this.apilink, 
        {
            query: `query { 
                teams(leagueID: "${this.chosenCompetition.id}") {
                    id
                    Name
                }
            }`
        },
        {
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => {
            this.targets = response.data.data.teams
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
    },
    fetchSubsciption() {
        this.axios.post(this.apilink, 
        {
            query: `query { 
                user(id: "${localStorage.getItem('id')}") {
                    Subscription {
                        Teams {
                            id
                            Name
                        }
                        id
                    }
                }
            }`
        },
        {
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => {
            localStorage.setItem('sub_id', response.data.data.user.Subscription.id);
            this.chosenTargets = response.data.data.user.Subscription.Teams
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
    },
    selectCompetition(competition) { 
        this.chosenCompetition = competition;
        this.searchCompetitionItem = competition.Name;
        this.fetchTargets();
    },
    selectTarget(target) { 
        if (!this.chosenTargets.includes(target)) {
            this.chosenTargets.push(target);
            this.searchTargetItem = '';
        }
    },
    saveDashboard () {
        this.axios.post(this.apilink, 
        {
            query: `mutation updateSub($teams: [TeamInput]!) { 
                updateSubscription(id: "${localStorage.getItem('sub_id')}", Teams: $teams) {
                    Teams {
                        id
                        Name
                    }
                }
            }`,
            variables: {
                teams: this.chosenTargets
            }
        },
        {
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(response => {
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
        setTimeout(() => window.location.href='/', 1000);
    },
    removeFromChosenTargets (id) {
        this.chosenTargets.splice(this.chosenTargets.findIndex(i => i.id == id), 1);
    }
  },
  computed: {
    foundCompetitions() {
        if (this.searchCompetitionItem && this.leagues.length && (this.chosenCompetition.Name != this.searchCompetitionItem)) {
            return searchCompetition(this.leagues, this.searchCompetitionItem)
        } else {
            return []
        }
    },
    foundTargets() {
        if (this.searchTargetItem && Object.keys(this.chosenCompetition).length) {
            return searchTarget(this.targets, this.searchTargetItem)
        } else {
            return []
        }
    }
  },
  mounted() {
    this.fetchSports();
    this.fetchSubsciption();
  }
}
</script>

<style lang="scss" scoped>
    @import "../scss/pages/customizedashboard.scss";
    @import "../scss/components/neons.scss";
    @import "../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
</style>