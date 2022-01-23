<template>
  <v-app id="inspire" class="grey lighten-4">
    <v-app-bar app color="white" flat>
      <v-toolbar flat app>
        <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="28"
        ></v-avatar>
        <v-toolbar-title class="text-uppercase grey--text">
          {{ userEmail }}</v-toolbar-title
        >
        <v-avatar
          :color="
            $vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'
          "
          size="32"
        ></v-avatar>

        <v-tabs centered class="ml-n9" color="grey darken-1">
          <v-tab v-for="link in links" :key="link.title" :to="link.to">
            {{ link.title }}
          </v-tab>
        </v-tabs>

        <v-spacer></v-spacer>
        <v-btn
          class="justify-center ma-1"
          type="submit"
          @click="loginOrSignout()"
          small
          dark
        >
          <span v-if="!loggedIn">login?</span>
          <span v-else> signout?</span>
          <v-icon v-if="loggedIn" right>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-toolbar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
      <v-container> </v-container>
    </v-main>
  </v-app>
</template>

<script>
import connectWebSocket from "./common/websocket";

import { firebaseAuth } from "@/main";
export default {
  beforeCreate() {
    connectWebSocket();
  },
  data: () => ({
    loggedIn: false,
    userEmail: "",
    error: "",
    links: [
      { title: "Login", to: "/login" },
      { title: "initGame", to: "/InitGame" },
      { title: "Game", to: "/dashboard" },
      { title: "About", to: "/about" },
    ],
  }),
  created() {
    firebaseAuth.onAuthStateChanged(firebaseAuth.getAuth(), (user) => {
      this.loggedIn = !!user;

      user ? (this.userEmail = user.email) : (this.userEmail = "");
    });
    console.log("created! = ", this.loggedIn);
  },
  methods: {
    async loginOrSignout() {
      if (!this.loggedIn) {
        this.$route.name != "Login"
          ? await this.$router.replace({ name: "Login" })
          : "";
      } else {
        try {
          const user = await firebaseAuth.signOut(firebaseAuth.getAuth());
          console.log(user);
          user ? (this.userEmail = user.email) : (this.userEmail = "");

          this.$route.name != "Login"
            ? await this.$router.replace({ name: "Login" })
            : "";
        } catch (err) {
          console.log(err);
          this.error = String(err);
        }
      }
    },
  },
};
</script>