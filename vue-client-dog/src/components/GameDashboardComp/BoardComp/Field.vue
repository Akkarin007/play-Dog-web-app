<template>
      <v-btn class="ma-2" @click="selectPiece()" fab small> 
                  <img
                    :id="'field' + fieldIndex"
                    :src="fieldImage"
                    loading="lazy"
                    width="50"
                    height="50"
                    :style="{backgroundColor: selected}"
                  />
                </v-btn>
</template>

<script lang="ts">

import { boardObs } from "@/common/board";
import { selection, selectionObs } from "@/common/boardService";
import Vue from "vue";

export default Vue.extend({
  name: "field",
  props: {
    fieldIndex: Number,
    pieceIdx: Number,
    fieldImage: String,
    color: String,
    playerIdx: Number
  },
  data: () => ({
  }),
  computed: {
    
    currentPlayer() {
      return boardObs.board.currentPlayer;
    },
    selected() {
      let color = 'transparent'
      selectionObs.selectedState.forEach((selection:any) => {
        if(this.fieldIndex === selection.fieldIdx) {
          color = 'white';
        }
      });
      return color;
    },
  },
  methods: {
    selectPiece(){
      if(this.color != '') {
        const isOwnPiece = this.playerIdx === this.currentPlayer;

        selection([isOwnPiece, this.pieceIdx, this.playerIdx], this.fieldIndex)
      }
    }
  }
});

</script>
