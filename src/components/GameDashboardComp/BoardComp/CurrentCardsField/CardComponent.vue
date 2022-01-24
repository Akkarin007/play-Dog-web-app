<template>
  <v-container>
    <v-card class="mx-auto" max-width="300" rounded>
      <div class="justify-center d-flex">
        <img :src="cardImage" height="220px" />
      </div>
      <div class="justify-center d-flex">
        <div
          v-for="(symbol, index) in splitSymbol()"
          :key="'card' + cardIndex + 'button' + index"
        >
          <button-normal
            v-if="symbol != 'swapCard'"
            class="ma-1"
            :btnIndex="index"
            :cardNumIndex="cardIndex"
            :btnSymbol="symbol"
<<<<<<< HEAD
=======
            :disabled="isYourTurn"
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
          ></button-normal>
          <button-swap
            v-if="symbol === 'swapCard'"
            class="ma-1"
            :cardNumIndex="cardIndex"
            :btnSymbol="symbol"
<<<<<<< HEAD
=======
            :disabled="isYourTurn"
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
          ></button-swap>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
<<<<<<< HEAD
=======
import { isYourTurn } from "@/common/board";
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
import Vue from "vue";
import ButtonNormal from "./CardComp/ButtonNormal.vue";
import ButtonSwap from "./CardComp/ButtonSwap.vue";

export default Vue.extend({
  components: { ButtonNormal, ButtonSwap },

  name: "CardComponent",
  props: {
    cardImage: String,
    cardIndex: Number,
    cardSymbol: String,
  },
  data: () => ({}),
<<<<<<< HEAD
=======
  computed: {
    isYourTurn: () => {
      return !isYourTurn();
    },
  },
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
  methods: {
    splitSymbol() {
      return this.cardSymbol.split(" ");
    },
  },
});
</script>
