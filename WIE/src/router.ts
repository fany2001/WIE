import {createRouter,createWebHistory} from 'vue-router'
import Home from './components/Home.vue'
const routes = [{
    path: '/',
    name: 'home',
    component: Home
},{
    path: '/main',
    name: 'main',
    component: ()=>import('./components/Main.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true, // applies to all routes
})

export default router;