<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>CurrentPlayer: P{{board.currentPlayer}}</v-list-item-title>
            <v-list-item-subtitle>{{currentPlayerHouse}} Pieces Left to Play!</v-list-item-subtitle>
             <v-row cols="12" sm="8" class="ma-2">
            <img v-for="img in inHouse" :key="img.id" 
                    :src="img.image"
                    loading="lazy"
                    width="50"
                    height="50"
                  />
                  </v-row>
          </v-list-item-content>
        </v-list-item>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet
          min-height="100vh"
          class="d-flex overflow-auto justify-center"
          rounded="lg"
        >
          <v-col cols="12" sm="20">
            <div class="ma-2 d-flex overflow-auto justify-center">
              <h1>Welcome to Dog!</h1>
            </div>
            <v-row cols="12" sm="8" class="ma-2">
              <div v-for="img in field" :key="img.pos">
                <v-btn class="ma-2" fab small>
                  <img
                    :id="img.pos"
                    :src="img.image"
                    loading="lazy"
                    width="50"
                    height="50"
                  />
                </v-btn>
              </div>
            </v-row>
            <div>
              <div class="d-flex overflow-auto">
                <div v-for="img in field" :key="img.pos">
                  <card-component></card-component>
                </div>
              </div>
            </div>
          </v-col>
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Players Garage </v-list-item-title>
            <v-list-item-subtitle>...</v-list-item-subtitle>
             <v-row cols="12" sm="8" class="ma-2">
            <img v-for="img in garage" :key="img.id" 
                    :src="img.image"
                    loading="lazy"
                    width="50"
                    height="50"
                  />
                  </v-row>
          </v-list-item-content>
        </v-list-item>
        
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import board, { field, inhouse, garage } from "../assets/data/boardExample";
import CardComponent from "./CardComponent.vue";

export default Vue.extend({
  components: { CardComponent },
  name: "GameDashboard",

  data: () => ({
    board,
    currentPlayerHouse: board.players[board.currentPlayer].house.length
  }),
  computed: {
    field() {
      return field();
    },
    inHouse() {
      return inhouse();
    },
    garage() {
      return garage();
    },
  },
});
</script>
