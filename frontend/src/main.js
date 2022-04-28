import { createApp } from 'vue';
import App from './pages/App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

library.add(faRankingStar);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const Vue = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon);

import router from './routes/index.js';
Vue.use(router);

Vue.mount("#app");