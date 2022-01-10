<template>
  <v-container>
    <v-sheet class="justify-center" rounded="lg" color="grey lighten-3">
        <div class="ma-2 d-flex overflow-auto justify-center">
            <h1>Welcome to Dog!</h1>
        </div>
        
        <current-game-board />

        <v-progress-linear value="15"></v-progress-linear>
        <v-row cols="12" sm="8" class="ma-2 justify-center"
            ><v-divider></v-divider
        ></v-row>
        
        <current-cards-field />
        <!--  -->
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CurrentGameBoard from "./BoardComp/CurrentGameBoard.vue"
import CurrentCardsField from "./BoardComp/CurrentCardsField.vue"
export default Vue.extend({
  components: { CurrentGameBoard, CurrentCardsField},
  name: "Board",
});
</script>
