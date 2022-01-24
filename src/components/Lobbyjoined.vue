<template>
  <v-card v-if="getCurrentLobby != null">
    <v-card-title>Joined Lobby: {{ getLabel(getCurrentLobby) }}</v-card-title>
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
      <v-btn color="dark darken-1" text @click="leaveLobby()">
        Leave Lobby
      </v-btn>
      <v-btn class="ma-1" small dark @click="startGame()" to="/dashboard">
        startGame
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { setCurrentLobbyID, setActivePlayer } from "@/common/board";
import Vue from "vue";
import { getWebSocket } from "../common/websocket";

export default Vue.extend({
  name: "Lobbyjoined",
  props: [
    "getCurrentLobby",
    "userEmail",
    "boardSize",
    "pieceAmount",
    "cardAmount",
    "lobbyID",
  ],

  data: () => ({}),
  methods: {
    getLabel(lobby: any) {
      return (
        lobby.lobbyID + " " + lobby.lobbyPlayers.length + "/" + lobby.lobbySize
      );
    },
    leaveLobby() {
      const lobbyId = this.getCurrentLobby.lobbyID;
      if (lobbyId) {
        let data = JSON.stringify({
          type: "leaveLobby",
          lobbyID: lobbyId,
          playerName: this.userEmail,
        });
        getWebSocket().send(data);
        console.log(data);
        this.$emit("closeEvent", false);
      }
    },
    startGame() {
      setCurrentLobbyID(this.getCurrentLobby.lobbyID);
      setActivePlayer(this.userEmail);
      let data = JSON.stringify({
        type: "startGame",
        lobbyID: this.getCurrentLobby.lobbyID,
        cardNum: this.cardAmount,
        pieceNum: this.pieceAmount,
        size: this.boardSize,
      });
      getWebSocket().send(data);
      console.log(data);
      this.$emit("closeEvent", false);
    },
  },
});
</script>