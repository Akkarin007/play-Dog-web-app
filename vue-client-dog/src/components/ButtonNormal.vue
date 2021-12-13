<template>
      <v-btn 
        @click="selectCardAndPiece()"
        small
        dark
      >
        {{btnSymbol}}
      </v-btn>
</template>

<script lang="ts">

import { selectCardAndPiece } from "@/common/boardService";
import Vue from "vue";

export default Vue.extend({
  name: "btnNormal",
  props: {
    cardNumIndex: Number,
    btnIndex: Number,
    btnSymbol: String
  },
  data: () => ({
  }),
  methods: {
    selectCardAndPiece(){
      //selectCardAndPiece( pieceNum: number, cardNum: any, cardOption: any)
      selectCardAndPiece(this.cardNumIndex, this.btnIndex, 0)
    }
  }
});

</script>
