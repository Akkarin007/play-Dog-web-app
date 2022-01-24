<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        
        <v-btn class="justify-center" v-bind="attrs"
          v-on="on" width="250" height="40" small dark> join game</v-btn>
      </template>
      <v-card>
        <v-card-title>Select lobby</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-for="lobby in lobbies" :key="lobby.name"
            v-model="dialogm1"
            column
          >
            <v-radio
              :label="lobby.name"
              :value="lobby"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="dark darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
             small dark
            @click="selectLobby()"
          >
            select
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseAuth } from "@/main";

export default Vue.extend({
  name: "Lobby",

  data: () => ({
    dialogm1: {name: "nothing", value: 0},
    dialog: false,
    lobbies: [{name: "test", value: 30},{name: "test1", value: 3}]
  }),
  created() {
    
  },
  methods: {
    selectLobby() {
        console.log(this.dialogm1.name)
    }
  },
});
</script>