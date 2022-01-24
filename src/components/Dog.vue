<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card-actions class="justify-center">
          <v-sheet class="mt-10" rounded="lg" max-width="300" min-height="350">
            <div class="px-4 py-4">
              <div class=".justify-start">
                <v-card-actions class="justify-center" max-width="250">
                  <v-text-field
                    v-model="boardSize"
                    label="boardSize"
                    outlined
                  ></v-text-field>
                </v-card-actions>
                <v-card-actions class="justify-center" max-width="250">
                  <v-text-field
                    class="mt-n6"
                    v-model="pieceAmount"
                    label="pieceAmount"
                    outlined
                  ></v-text-field>
                </v-card-actions>
                <v-card-actions class="justify-center" max-width="250">
                  <v-text-field
                    class="mt-n6"
                    v-model="cardAmount"
                    label="cardAmount"
                    outlined
                  ></v-text-field>
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <v-btn class="justify-center" @click="startGame()" to="/dashboard" width="250" height="40" small dark> start new game</v-btn>
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <lobby></lobby>
                </v-card-actions>
                
              </div>
              <!--  -->
            </div>
          </v-sheet>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { getWebSocket } from "@/common/websocket";
import Vue from "vue";
import Lobby from "./Lobby.vue";

export default Vue.extend({
  components: { Lobby },
  name: "Dog",

  data: () => ({
    boardSize: 20,
    pieceAmount: 4,
    cardAmount: 6
  }),
  methods: {
    startGame() {
      const size = this.boardSize;
      const pieceAmount = this.pieceAmount;
      const cardAmount = this.cardAmount;
      console.log(size, pieceAmount, cardAmount)
      getWebSocket().send(JSON.stringify({
        "type": "startGame",
        "cardNum": cardAmount,
        "pieceNum": pieceAmount,
        "size": size
      }))
    },
    joinGame() {
      getWebSocket().send(JSON.stringify({
        "type": "getBoard",
      }))
    }
  },
});
</script>
