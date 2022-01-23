import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import * as firebase from 'firebase/app'
import * as auth from 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyBg8rcwk_u4gPy4WPr2ORhRynipLnk95iE",

  authDomain: "web-app-dog-auth.firebaseapp.com",

  projectId: "web-app-dog-auth",

  storageBucket: "web-app-dog-auth.appspot.com",

  messagingSenderId: "123274816863",

  appId: "1:123274816863:web:5b092551cb3248ffebdaea"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

Vue.prototype.$axios = axios;
export const firebaseAuth = auth
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
