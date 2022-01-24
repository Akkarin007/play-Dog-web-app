<template>
  
      <v-card v-if="getCurrentLobby == undefined">
        <v-card-title>Select lobby</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-radio-group
            v-for="lobby in lobbiesChanged"
            :key="lobby.lobbyID"
            v-model="selectedLobby"
            column
          >
            <v-radio :label="getLabel(lobby)" :value="lobby"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="dark darken-1" text @click="close()">
            Close
          </v-btn>
          <v-btn small dark @click="selectLobby()"> select </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseAuth } from "@/main";

import { getWebSocket } from "../common/websocket";
import { lobbiesObs } from "../common/board";
export default Vue.extend({
  name: "Lobby",
  props: ['getCurrentLobby', 'lobbiesChanged','userEmail'],
  data: () => ({
    selectedLobby: { lobbyID: "nothing", lobbyInGame: 0, lobbyPlayers: [""] },
    dialog: false,
    lobbies: lobbiesObs.lobbies,
  }),
  methods: {
    close() {
      this.$emit('closeEvent', false)
    },
    getLabel(lobby: any) {
      return (
        lobby.lobbyID + " " + lobby.lobbyPlayers.length + "/" + lobby.lobbySize
      );
    },
    selectLobby() {
      console.log(this.selectedLobby.lobbyID);
      console.log("currentUser: ", this.userEmail);
      if (this.selectedLobby.lobbyID != "unknown user" && this.userEmail != 'unknown user') {
        let data = JSON.stringify({
          type: "joinLobby",
          playerName: this.userEmail,
          lobbyID: this.selectedLobby.lobbyID,
        });
        getWebSocket().send(data);
      }
    },
  },
});
</script>