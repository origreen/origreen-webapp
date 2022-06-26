import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ProfilesView from '@/views/ProfilesView.vue';
import FoodIdView from '@/views/FoodIdView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/profiles'
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: ProfilesView
  },
  {
    path: '/food/:id',
    name: 'food-id',
    component: FoodIdView,
    props: true
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
