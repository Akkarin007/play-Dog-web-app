<template>
<<<<<<< HEAD
    <v-container>
        <v-sheet rounded="lg" min-height="200px">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                >CurrentPlayer: P{{ currentPlayer }}</v-list-item-title
              >
              <v-list-item-subtitle
                >{{ currentPlayerHouse }} Pieces Left to
                Play!</v-list-item-subtitle
              >
              <v-row cols="12" sm="8" class="ma-2">
                <img
                  v-for="img in inHouseChanged"
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
=======
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
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
</template>

<script lang="ts">
import Vue from "vue";
<<<<<<< HEAD
import {
  inHouseObs,
  boardObs
} from "@/common/board";
=======
import { inHouseObs, boardObs } from "@/common/board";
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb

export default Vue.extend({
  name: "House",

  data: () => ({
    board: boardObs.board,
<<<<<<< HEAD
    currentPlayerHouse:
      boardObs.board.players[boardObs.board.currentPlayer].house.length,
  }),
  computed: {
=======
      
  }),
  computed: {
    currentPlayerHouse: () => {
      return boardObs.board.players[boardObs.board.currentPlayer].house.length;
    },
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
    currentPlayer() {
      return boardObs.board.currentPlayer + 1;
    },
    inHouseChanged: () => {
      return inHouseObs.inHouse;
    },
  },
});
</script>