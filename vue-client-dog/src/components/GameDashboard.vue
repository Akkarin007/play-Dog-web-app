<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="200px">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                >CurrentPlayer: P{{ currentPlayer }}</v-list-item-title
              >
              <v-list-item-subtitle
                >{{ currentPlayerHouse }} Pieces Left to
                Play!</v-list-item-subtitle
              >
              <v-row cols="12" sm="8" class="ma-2">
                <img
                  v-for="img in inHouseChanged"
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
      </v-col>

      <v-col cols="20" sm="8">
        <v-sheet class="justify-center" rounded="lg" color="grey lighten-3">
          <v-col cols="2" sm="12">
            <div class="ma-2 d-flex overflow-auto justify-center">
              <h1>Welcome to Dog!</h1>
            </div>
            <v-row cols="12" sm="8" class="ma-2 justify-center">
              <div v-for="(field) in fieldChanged" :key="'field' + field.pos">
                <field :fieldIndex="field.pos" :fieldImage="field.image" :color="field.color" :pieceIdx="field.pieceIdx" :playerIdx="field.playerIdx"></field>
              </div> 
              </v-row
            ><v-row cols="12" sm="8" class="ma-2 justify-center"
              ><v-divider></v-divider
            ></v-row>

            <v-progress-linear value="15"></v-progress-linear>
            <v-row cols="12" sm="8" class="ma-2 justify-center"
              ><v-divider></v-divider
            ></v-row>
            <div>
              <v-sheet class="justify-center" rounded="lg">
                <div class="d-flex overflow-auto">
                  <div v-for="(card, index) in cardsChanged" :key="card.pos">
                    <card-component :cardImage="card.image" :cardIndex="index" :cardSymbol="card.symbol"></card-component>
                  </div>
                </div>
              </v-sheet>
            </div>
          </v-col>
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  boardObs,
  fieldObs,
  inHouseObs,
  garageObs,
  cardObs
} from "@/common/board";
import CardComponent from "./CardComponent.vue";
import Field from "./Field.vue";

export default Vue.extend({
  components: { CardComponent, Field},
  name: "GameDashboard",

  data: () => ({
    board: boardObs.board,
    currentPlayerHouse:
      boardObs.board.players[boardObs.board.currentPlayer].house.length,
  }),
  computed: {
    currentPlayer() {
      return boardObs.board.currentPlayer + 1;
    },
    fieldChanged: () => {
      return fieldObs.field;
    },
    cardsChanged: () => {
      return cardObs.cards;
    },
    inHouseChanged: () => {
      return inHouseObs.inHouse;
    },
    garageChanged: () => {
      return garageObs.garage;
    }
  },
});
</script>
