<template>
  <v-container>
    
    <v-card
    class="mx-auto"
    max-width="160"
    rounded
  >
    <div class="justify-center d-flex">
    <img 
      src="../assets/images/cards/1 11 play.png"
      height="200px"
    >

    </div>

    <v-btn class="ma-3"
              small
              dark
            >
              play
            </v-btn>

  </v-card>
  </v-container>
</template>

<script lang="ts">

import Vue from "vue";
import board,{field} from "../assets/data/boardExample";

export default Vue.extend({
  name: "CardComponent",

  data: () => ({
    image: "../assets/images/icons/field.png",
    board,
    field: field()
  }),
  computed: {
  
  }
});

</script>
