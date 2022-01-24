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
<<<<<<< HEAD
=======
                    v-model="lobbyID"
                    label="lobbyID"
                    outlined
                  ></v-text-field>
                </v-card-actions>
                <v-card-actions class="justify-center" max-width="250">
                  <v-text-field
                    class="mt-n6"
                    v-model="lobbySize"
                    label="lobbySize"
                    outlined
                  ></v-text-field>
                </v-card-actions>
                <v-card-actions class="justify-center" max-width="250">
                  <v-text-field
                    class="mt-n6"
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
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
<<<<<<< HEAD
                <v-card-actions class="justify-center">
                  <v-btn class="justify-center" @click="startGame()" to="/dashboard" width="250" height="40" small dark> start new game</v-btn>
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <v-btn class="justify-center" @click="joinGame()" to="/dashboard" width="250" height="40" small dark> join game</v-btn>
=======

                <v-card-actions class="justify-center">
                  <v-btn
                    class="justify-center"
                    @click="createLobby()"
                    width="250"
                    height="40"
                    small
                    dark
                  >
                    create Lobby</v-btn
                  >
                </v-card-actions>
                <v-card-actions class="justify-center">
                  <lobby
                    :lobbyID="lobbyID"
                    :boardSize="boardSize"
                    :pieceAmount="pieceAmount"
                    :cardAmount="cardAmount"
                  ></lobby>
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
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
<<<<<<< HEAD

export default Vue.extend({
=======
import Lobby from "../components/LobbyComp/Lobby.vue";

import { firebaseAuth } from "@/main";
import { setCurrentLobbyID } from "@/common/board";
export default Vue.extend({
  components: { Lobby },
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
  name: "Dog",

  data: () => ({
    boardSize: 20,
    pieceAmount: 4,
<<<<<<< HEAD
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
=======
    cardAmount: 6,
    lobbyID: "default",
    lobbySize: 4,
    userEmail: "unknown user",
  }),
  created() {
    firebaseAuth.onAuthStateChanged(firebaseAuth.getAuth(), (user) => {
      user?.email
        ? (this.userEmail = user.email)
        : (this.userEmail = "unknown user");
    });
    getWebSocket().send(
          JSON.stringify({
            type: "getBoard",
          }))
  },
  methods: {
    createLobby() {
      if (this.userEmail != "unknown user") {
        setCurrentLobbyID(this.lobbyID);
        getWebSocket().send(
          JSON.stringify({
            type: "createLobby",
            lobbyID: this.lobbyID,
            playerName: this.userEmail,
            lobbySize: Number(this.lobbySize),
          })
        );
      }
    },
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
  },
});
</script>
