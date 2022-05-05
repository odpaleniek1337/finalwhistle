import { createWebHistory, createRouter } from "vue-router";
import DashboardPage from '../pages/DashboardPage.vue';
import DashboardCustomizePage from '../pages/DashboardCustomizePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';

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
    beforeEnter: (to, from, next) => {
      next(handleLogged(null, '/login'))
    },
  }, 
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      next(handleLogged('/', null))
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      next(handleLogged('/', null))
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function handleLogged(pathLogged, pathUnlogged){
  var auth = localStorage.getItem('jwt');
  if (auth == null || auth == ''){
    localStorage.setItem('typeDashboard', 0)
    return pathUnlogged
  } else {
    localStorage.setItem('typeDashboard', 1)
    return pathLogged
  }
}

export default router;