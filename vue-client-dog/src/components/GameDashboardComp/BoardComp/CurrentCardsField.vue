<template>
  <v-container>
    <div>
        <v-sheet class="justify-center" rounded="lg">
        <div class="d-flex overflow-auto">
            <div v-for="(card, index) in cardsChanged" :key="card.pos">
            <card-component :cardImage="card.image" :cardIndex="index" :cardSymbol="card.symbol"></card-component>
            </div>
        </div>
        </v-sheet>
    </div>
    <!--  -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  cardObs
} from "@/common/board";
import CardComponent from "./CurrentCardsField/CardComponent.vue";

export default Vue.extend({
  components: { CardComponent},
  name: "CurrentCardsField",

  computed: {
    cardsChanged: () => {
      return cardObs.cards;
    },
  },
});
</script>
