<template>
  <v-container>
    <v-row cols="12" sm="8" class="ma-2 justify-center">
        <div v-for="(field) in fieldChanged" :key="'field' + field.pos">
        <field :fieldIndex="field.pos" :fieldImage="field.image" :color="field.color" :pieceIdx="field.pieceIdx" :playerIdx="field.playerIdx"></field>
        </div> 
        </v-row
    >

    <!--  -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  fieldObs,
} from "@/common/board";
import Field from "./CurrentGameBoardComp/Field.vue";

export default Vue.extend({
  components: { Field},
  name: "CurrentGameBoard",

  computed: {
    fieldChanged: () => {
      return fieldObs.field;
    },
  },
});
</script>
