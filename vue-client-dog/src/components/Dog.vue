<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-sheet min-height="70vh" rounded="lg">
          <div class=".justify-start">
            <input v-model="boardSize" placeholder="edit me">
            <input v-model="pieceAmount" placeholder="edit me">
            <input v-model="cardAmount" placeholder="edit me">
            <v-btn @click="startGame()" small dark> start game</v-btn>
          </div>
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { getWebSocket } from "@/common/websocket";
import Vue from "vue";

export default Vue.extend({
  name: "Dog",

  data: () => ({
    boardSize: 23,
    pieceAmount: 4,
    cardAmount: 6
  }),
  methods: {
    startGame() {
      const size = this.boardSize;
      const pieceAmount = this.pieceAmount;
      const cardAmount = this.cardAmount;
      console.log(size, pieceAmount, cardAmount)
      //getWebSocket().send(JSON.stringify({}))
    },
  },
});
</script>
