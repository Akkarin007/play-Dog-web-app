<template>
<<<<<<< HEAD
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
                />
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
    </v-container>
=======
  <v-container>
    <v-sheet rounded="lg" min-height="200">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Players Garage </v-list-item-title>
          <v-row v-for="garage in garageChanged" :key="garage.name" cols="12" sm="8" class="ma-2">
          <v-list-item-subtitle >{{garage.name}}</v-list-item-subtitle>
            <img
              v-for="img in garage.garage"
              :key="img.id"
              :src="img.image"
              loading="lazy"
              width="50"
              height="50"
            />
          </v-row>
          <v-btn class="ma-3 justify-center" small dark @click="endGame()">
              end game
            </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>
  </v-container>
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
</template>

<script lang="ts">
import Vue from "vue";
import {
  garageObs,
<<<<<<< HEAD
} from "@/common/board";

=======
  getActivePlayer,
  getCurrentLobbyID,
  reset,
} from "@/common/board";
import { getWebSocket } from "@/common/websocket";
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb

export default Vue.extend({
  name: "Garage",

  computed: {
    garageChanged: () => {
      return garageObs.garage;
<<<<<<< HEAD
    }
=======
    },
  },
  methods: {
    endGame() {
      const lobbyId = getCurrentLobbyID();
      console.log(lobbyId);
      if (lobbyId) {
        let end = JSON.stringify({
          type: "endGame",
          lobbyID: lobbyId,
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
        reset();
        this.$router.replace({ name: "InitGame" });
      }
    },
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
  },
});
</script>
