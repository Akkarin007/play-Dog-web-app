<template>
  
      <v-card v-if="getCurrentLobby != null">
        <v-card-title>Select lobby</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-list-item
            v-for="(lobby, index) in getCurrentLobby.lobbyPlayers"
            :key="lobby.playerName"
            column
          >
            <v-list-item-content>
              <v-list-item-title>{{
                index + ". " + lobby.playerName
              }}</v-list-item-title></v-list-item-content
            >
          </v-list-item>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          
          <v-btn color="dark darken-1" text @click="close()">
            Close
          </v-btn>
          <v-btn small dark @click="leaveLobby()"> Leave Lobby </v-btn>
        </v-card-actions>
        
      </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseAuth } from "@/main";

import { getWebSocket } from "../common/websocket";
import { lobbiesObs } from "../common/board";
export default Vue.extend({
  name: "Lobbyjoined",
  props: ['getCurrentLobby','userEmail'],
  data: () => ({
    dialog: false,
  }),
  methods: {
    close() {
      this.$emit('closeEvent', false)
    },
    leaveLobby() {
      const lobbyId = this.getCurrentLobby.lobbyID
      if (lobbyId) {
        let data = JSON.stringify({
          type: "leaveLobby",
          lobbyID: lobbyId,
          playerName: this.userEmail,
        });
        getWebSocket().send(data);
        console.log(data)
      this.$emit('closeEvent', false)
      }
  }
  }
});
</script>