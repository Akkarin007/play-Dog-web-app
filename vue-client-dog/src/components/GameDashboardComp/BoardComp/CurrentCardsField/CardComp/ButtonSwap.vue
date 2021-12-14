<template>
      <v-btn 
        @click="selectSwap()"
        small
        dark
      >
        {{btnSymbol}}
      </v-btn>
</template>

<script lang="ts">

import Vue from "vue";
import {swapCard} from "@/common/boardService"

export default Vue.extend({
  name: "btnSwap",
  props: {
    cardNumIndex: Number,
    btnSymbol: String
  },
  data: () => ({
  }),
  methods: {
    selectSwap() {
      swapCard(this.cardNumIndex)
    }
  }
});

</script>
