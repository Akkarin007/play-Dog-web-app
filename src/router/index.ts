import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import InitGame from '../views/InitGame.vue'
import LoginView from '../views/LoginView.vue'
import * as firebase from "firebase/app";
import { firebaseAuth } from "@/main";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/initGame',
    name: 'InitGame',
    component: InitGame,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebaseAuth.getAuth().currentUser
  if(requiresAuth && !isAuthenticated) {
    next("/login")
  } else {
    next()
  }
})
export default router
