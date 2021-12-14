<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <house />
      </v-col>

      <v-col cols="20" sm="8">
        <board />
      </v-col>

      <v-col cols="12" sm="2">
        <garage />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import House from "./GameDashboardComp/House.vue"
import Garage from "./GameDashboardComp/Garage.vue"
import Board from "./GameDashboardComp/Board.vue"
export default Vue.extend({
  components: { House, Garage, Board},
  name: "GameDashboard",
});
</script>
