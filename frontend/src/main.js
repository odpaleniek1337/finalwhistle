import { createApp } from 'vue';
import App from './pages/App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRankingStar, faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faRankingStar, faGear, faCircleXmark);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const Vue = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon);

import router from './routes/index.js';
Vue.use(router);

import axios from 'axios';
Vue.config.globalProperties.axios=axios;
Vue.config.globalProperties.apilink='http://localhost:3000/graphql';

Vue.mount("#app");