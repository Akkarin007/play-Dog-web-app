<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg">

   
          <v-btn class="mx-2" fab  small  >
            <img src="../assets/images/icons/blau.png" loading="lazy" width="50" height="50">
          </v-btn>
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import Vue from "vue";
import board from "../assets/data/boardExample";

export default Vue.extend({
  name: "GameDashboard",

  data: () => ({
    board,
    field: [] }),
  computed: {
    board(){
      const boardSize = this.board.boardSize;
      const pieceArray = this.board.players.map(player => {
     
      const pieces = player.pieces.map(piece => {
          return { pieceIdx: piece.piece_idx, piecePos: piece.piece_pos}
        }).filter(piece => player.house.find(inHousePieceIdx => piece.pieceIdx == inHousePieceIdx.inHouse));

        return {color: player.color, pieces: pieces}
      })

      const boardArray = []

      for (let i = 0; i < boardSize; i++) {
        for (let playerIdx = 0; playerIdx < this.board.playerNumber; playerIdx++) {
          const element = pieceArray[playerIdx].pieces.find(piece => piece.piecePos === i);
          if (element){
            boardArray.push({color: pieceArray[playerIdx].color, pos: i})
          }
          else {
            boardArray.push({color: null, pos: i})
          }
          
        }
      }

      return boardArray
    }
  }
});

</script>
