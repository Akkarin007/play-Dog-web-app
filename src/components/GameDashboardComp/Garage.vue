<template>
  <v-container>
    <v-sheet rounded="lg" min-height="200">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Players Garage </v-list-item-title>
          <v-list-item-subtitle>...</v-list-item-subtitle>
          <v-row cols="12" sm="8" class="ma-2">
            <img
              v-for="img in garageChanged"
              :key="img.id"
              :src="img.image"
              loading="lazy"
              width="50"
              height="50"
            /><v-btn class="ma-3 justify-center" small dark @click="endGame()">
              end game
            </v-btn>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  garageObs,
  getActivePlayer,
  getCurrentLobbyID,
  setCurrentLobbyID,
} from "@/common/board";
import { getWebSocket } from "@/common/websocket";

export default Vue.extend({
  name: "Garage",

  computed: {
    garageChanged: () => {
      return garageObs.garage;
    },
  },
  methods: {
    endGame() {
      const lobbyId = getCurrentLobbyID();
      console.log(lobbyId);
      if (lobbyId) {
        let end = JSON.stringify({
          type: "endGame",
        });
        let leave = JSON.stringify({
          type: "leaveLobby",
          lobbyID: lobbyId,
          playerName: getActivePlayer(),
        });
        getWebSocket().send(leave);
        getWebSocket().send(end);
        console.log(end);
        console.log(leave);
        setCurrentLobbyID("");
        this.$router.replace({ name: "InitGame" });
      }
    },
  },
});
</script>
