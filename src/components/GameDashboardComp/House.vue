<template>
  <v-container>
    <v-sheet rounded="lg" min-height="200px">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title
            >CurrentPlayer: P{{ currentPlayer }}</v-list-item-title
          >
          <v-list-item-subtitle
            >{{ currentPlayerHouse }} Pieces Left to Play!</v-list-item-subtitle
          >
          <v-row
            v-for="house in inHouseChanged"
            :key="house.name"
            cols="12"
            sm="8"
            class="ma-2"
          >
            <v-list-item-subtitle>{{ house.name }}</v-list-item-subtitle>
            <img
              v-for="img in house.house"
              :key="img.id"
              :src="img.image"
              loading="lazy"
              width="50"
              height="50"
            />
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { inHouseObs, boardObs } from "@/common/board";

export default Vue.extend({
  name: "House",

  data: () => ({
    board: boardObs.board,
      
  }),
  computed: {
    currentPlayerHouse: () => {
      return boardObs.board.players[boardObs.board.currentPlayer].house.length;
    },
    currentPlayer() {
      return boardObs.board.currentPlayer + 1;
    },
    inHouseChanged: () => {
      return inHouseObs.inHouse;
    },
  },
});
</script>