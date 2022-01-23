<template>
  <login />
</template>

<script lang="ts">
import Vue from 'vue'
import Login from '../components/Login.vue'

  export default Vue.extend({
    name: 'LoginView',

    components: {
      Login
    },
  })
</script>
