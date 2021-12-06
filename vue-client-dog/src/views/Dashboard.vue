<template>
  <game-dashboard />
</template>

<script lang="ts">
import GameDashboard from '@/components/GameDashboard.vue'
import Vue from 'vue'

  export default Vue.extend({
    name: 'Home',

    components: {
      GameDashboard
    },
  })
</script>
