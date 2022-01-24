import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
<<<<<<< HEAD
import Home from '../views/Home.vue'
=======
import InitGame from '../views/InitGame.vue'
import LoginView from '../views/LoginView.vue'
import * as firebase from "firebase/app";
import { firebaseAuth } from "@/main";
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
<<<<<<< HEAD
    path: '/',
    name: 'Home',
    component: Home
=======
    path: '/initGame',
    name: 'InitGame',
    component: InitGame,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
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
<<<<<<< HEAD
    path: '/dashboard',
=======
    path: '/game',
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
<<<<<<< HEAD
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
=======
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {requiresAuth: true}
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
  }
]

const router = new VueRouter({
  routes
})

<<<<<<< HEAD
=======
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebaseAuth.getAuth().currentUser
  if(requiresAuth && !isAuthenticated) {
    next("/login")
  } else {
    next()
  }
})
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
export default router
