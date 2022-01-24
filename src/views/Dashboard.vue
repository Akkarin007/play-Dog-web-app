<template>
  <game-dashboard />
</template>

<script lang="ts">
import GameDashboard from "@/components/GameDashboard.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Dashboard",

  components: {
    GameDashboard,
  },
});
</script>
