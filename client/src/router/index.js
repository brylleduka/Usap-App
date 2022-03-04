import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto';
import store from '@/store';
import Home from '../views/Home.vue'
import Community from '@/views/Community.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

Vue.use(VueRouter)

function isLoggedIn(to, from, next) {
  store
    .dispatch('auth/authenticate')
    .then(() => {
      next();
    })
    .catch(() => {
      next('/login');
    });
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/community/:id',
    name: 'Community',
    component: Community,
    props: true,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },

]


const scrollBehavior = (to, from, savedPosition) => {
  let scrollTo = 0;

  if (to.hash) {
    scrollTo = to.hash;
  } else if (savedPosition) {
    scrollTo = savedPosition.y;
  }

  return goTo(scrollTo);
};

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes
})

export default router
