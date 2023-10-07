import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import 'vue-loading-overlay/dist/css/index.css';
import Loading from 'vue-loading-overlay'; 

const app = createApp(App);

app.component('Loading', Loading);
app.use(router).mount('#app');
