<template>
<<<<<<< HEAD
      <v-btn class="ma-2" @click="selectPiece()" fab small> 
=======
<div >
      <v-btn class="ma-2"  @click="selectPiece()" fab small > 
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
                  <img
                    :id="'field' + fieldIndex"
                    :src="fieldImage"
                    loading="lazy"
                    width="50"
                    height="50"
<<<<<<< HEAD
                    :style="{backgroundColor: selected}"
                  />
                </v-btn>
=======
                    :style="{backgroundColor: selected, 'border-radius': '2em'}"
                  />
                </v-btn></div>
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
</template>

<script lang="ts">

<<<<<<< HEAD
import { boardObs } from "@/common/board";
=======
import { boardObs, colorizedHouses } from "@/common/board";
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
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
<<<<<<< HEAD
  }),
  computed: {
    
=======
    style: 'transparent'
  }),
  computed: {
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
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
<<<<<<< HEAD
      return color;
=======
      const test = colorizedHouses(this.fieldIndex)
      return test;
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
    },
  },
  methods: {
    selectPiece(){
      if(this.color != '') {
        const isOwnPiece = this.playerIdx === this.currentPlayer;

        selection([isOwnPiece, this.pieceIdx, this.playerIdx], this.fieldIndex)
      }
<<<<<<< HEAD
    }
=======
    },
>>>>>>> fca34e9f7adacc4518daad9c8abe803baea06ccb
  }
});

</script>
