<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="justify-center"
          v-bind="attrs"
          v-on="on"
          width="250"
          height="40"
          small
          dark
          @click="getLobbies()"
        >
          join lobby</v-btn
        >
      </template>
      <lobbyselection
        v-if="getCurrentLobby == undefined"
        :userEmail="userEmail"
        :lobbiesChanged="lobbiesChanged"
        v-on:closeEvent="dialog = false"
      ></lobbyselection>
      <lobbyjoined
        :boardSize="boardSize"
        :pieceAmount="pieceAmount"
        :cardAmount="cardAmount"
        :getCurrentLobby="getCurrentLobby"
        :userEmail="userEmail"
        v-on:closeEvent="dialog = false"
      ></lobbyjoined>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseAuth } from "@/main";

import { getWebSocket } from "../../common/websocket";
import { lobbiesObs, setCurrentLobbyID } from "../../common/board";
import Lobbyselection from "./Lobbyselection.vue";
import Lobbyjoined from "./Lobbyjoined.vue";
export default Vue.extend({
  components: { Lobbyselection, Lobbyjoined },
  name: "Lobby",
  props: ["boardSize", "pieceAmount", "cardAmount", "lobbyID"],
  data: () => ({
    selectedLobby: { lobbyID: "nothing", lobbyInGame: 0, lobbyPlayers: [""] },
    dialog: false,
    lobbies: lobbiesObs.lobbies,
    userEmail: "unknown user",
  }),
  computed: {
    lobbiesChanged: () => {
      return lobbiesObs.lobbies;
    },
    getCurrentLobby() {
      let isLobby = undefined;
      if (lobbiesObs.lobbies) {
        lobbiesObs.lobbies.forEach((lobby) => {
          if (lobby.lobbyPlayers) {
            lobby.lobbyPlayers.forEach((player) => {
              if (player.playerName === this.userEmail) {
                isLobby = lobby;
              }
            });
          }
        });
      }
      return isLobby;
    },
  },
  created() {
    firebaseAuth.onAuthStateChanged(firebaseAuth.getAuth(), (user) => {
      user?.email
        ? (this.userEmail = user.email)
        : (this.userEmail = "unknown user");
    });
    this.lobbies = [
      {
        lobbyID: "nothing",
        lobbySize: 0,
        lobbyInGame: false,
        lobbyPlayers: [{ playerName: "" }],
      },
    ];
  },
  methods: {
    getLabel(lobby: any) {
      return (
        lobby.lobbyID + " " + lobby.lobbyPlayers.length + "/" + lobby.lobbySize
      );
    },
    getLobbies() {
      getWebSocket().send(
        JSON.stringify({
          type: "getLobbies",
        })
      );
    },
  },
});
</script>