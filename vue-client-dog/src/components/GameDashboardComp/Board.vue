<template>
  <v-container>
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  boardObs,
  fieldObs,
  cardObs
} from "@/common/board";
import CardComponent from "./BoardComp/CardComponent.vue";
import Field from "./BoardComp/Field.vue";

export default Vue.extend({
  components: { CardComponent, Field},
  name: "Board",

  data: () => ({
    board: boardObs.board,
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
  },
});
</script>
