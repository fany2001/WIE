import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueKonva from 'vue-konva'
import Konva from 'konva'
import router from './router'
const app = createApp(App);
app.use(VueKonva);
app.use(Konva);
app.use(router)
app.mount('#app');
