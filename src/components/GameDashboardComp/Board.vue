<template>
  <v-container>
    <v-sheet class="justify-center" rounded="lg" color="grey lighten-3">
      <div class="ma-2 d-flex overflow-auto justify-center">
        <h1>{{ getUser }}</h1>
      </div>

      <current-game-board />
      <v-row cols="12" sm="8" class="ma-2 justify-center"
        ><v-divider></v-divider
      ></v-row>
      <v-row cols="12" sm="8" class="ma-2 justify-center"
        ><v-alert
          class="ma-1"
          :color="getTurnColor"
          dense
          text
          :type="getTurnStatus"
          >{{ isYourTurn }}</v-alert
        >
      </v-row>
      <v-row cols="12" sm="8" class="ma-2 justify-center"
        ><v-divider></v-divider>
      </v-row>

      <current-cards-field />
      <!--  -->
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CurrentGameBoard from "./BoardComp/CurrentGameBoard.vue";
import CurrentCardsField from "./BoardComp/CurrentCardsField.vue";
import { isYourTurn, getCurrentLobbyID } from "@/common/board";
export default Vue.extend({
  components: { CurrentGameBoard, CurrentCardsField },
  name: "Board",
  computed: {
    getUser: () => {
      return `Welcome to Lobby: ${getCurrentLobbyID()}`;
    },
    getTurnColor: () => {
      if (isYourTurn()) {
        return "green";
      }
      return "red";
    },
    getTurnStatus: () => {
      if (isYourTurn()) {
        return "success";
      }
      return "warning";
    },
    isYourTurn: () => {
      if (isYourTurn()) {
        return "its Your Turn!";
      }
      return "Please wait for your turn to come!";
    },
  },
});
</script>
