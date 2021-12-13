<template>
  <v-container>
    
    <v-card
    class="mx-auto"
    max-width="150"
    rounded
  >
    <div class="justify-center d-flex">

    <img 
      src="../assets/images/cards/1 11 play.png"
      height="200px"
    >
    </div>
    <div class="justify-center d-flex">
      <v-btn class="ma-3"
        small
        dark
      >
        play
      </v-btn>
    </div>

  </v-card>
  </v-container>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
  name: "CardComponent",
  data: () => ({
  }),
  computed: {
  
  }
});

</script>
