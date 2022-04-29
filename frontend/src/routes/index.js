import { createWebHistory, createRouter } from "vue-router";
import DashboardPage from '../pages/DashboardPage.vue';
import DashboardCustomizePage from '../pages/DashboardCustomizePage.vue';
//import ChatPage from '../pages/ChatPage.vue';
import LeagueStandingsPage from '../pages/LeagueStandingsPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import EventPage from '../pages/EventPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import TargetSettingsPage from '../pages/TargetSettingsPage.vue';
import UserSettingsPage from '../pages/UserSettingsPage.vue';

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardPage,
  },
  {
    path: "/user/customizeDashboard",
    name: "dashboardCustomize",
    component: DashboardCustomizePage,
  }, 
  /*{
    path: "/chat",
    name: "chat",
    component: ChatPage,
  }, */
  {
    path: "/league/:id",
    name: "leagueStandings",
    component: LeagueStandingsPage,
  }, 
  {
    path: "/event/:id",
    name: "eventInfo",
    component: EventPage,
  }, 
  {
    path: "/user/customizeTarget/:id",
    name: "targetCustomize",
    component: TargetSettingsPage,
  }, 
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      next(handleLogged('/', 2))
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      next(handleLogged('/', 2))
    },
  },
  {
    path: "/user/settings",
    name: "userSettings",
    component: UserSettingsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function handleLogged(pathLogged, typeDashboard){
  var auth = localStorage.getItem('jwt');
  if (auth == null || auth == ''){
    localStorage.setItem('typeDashboard', typeDashboard)
    return 
  } else {
    return pathLogged
  }
}

export default router;