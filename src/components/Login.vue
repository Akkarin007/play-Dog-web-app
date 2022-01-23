<template>

  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card-actions class="justify-center">
          <v-sheet class="mt-10" rounded="lg" max-width="300" min-height="150">
            <div class="px-4 py-4">
              <div class=".justify-start">
                <h1
                  v-if="loggedIn === false"
                  style="text-align: center"
                  class=".justify-start"
                >
                  Log in
                </h1>
                <h1
                  v-if="loggedIn === true"
                  style="text-align: center"
                  class=".justify-start"
                >
                  Sign out?
                </h1>
                <v-card-actions
                  v-if="loggedIn === false"
                  class="justify-center"
                  max-width="250"
                >
                  <v-text-field
                    v-model="email"
                    label="email"
                    outlined
                  ></v-text-field>
                </v-card-actions>
                <v-card-actions
                  v-if="loggedIn === false"
                  class="justify-center"
                  max-width="250"
                >
                  <v-text-field
                    class="mt-n6"
                    v-model="password"
                    label="password"
                    outlined
                  ></v-text-field>
                </v-card-actions>

                <v-card-actions
                  v-if="loggedIn === false"
                  class="justify-center"
                >
                  <v-btn
                    class="justify-center"
                    type="submit"
                    @click="login()"
                    width="250"
                    height="40"
                    small
                    dark
                    >login</v-btn
                  >
                </v-card-actions>
                <v-card-actions v-if="loggedIn === true" class="justify-center">
                  <v-btn
                    type="submit"
                    class="justify-center"
                    @click="signout()"
                    width="250"
                    height="40"
                    small
                    dark
                  >
                    signout</v-btn
                  >
                </v-card-actions>
                <v-card-actions
                  v-if="loggedIn === false"
                  class="justify-center"
                >
                  <v-btn
                    type="submit"
                    class="justify-center"
                    @click="register()"
                    width="250"
                    height="40"
                    small
                    dark
                  >
                    register</v-btn
                  >
                </v-card-actions><v-card-actions
                  v-if="loggedIn === false"
                  class="justify-center"
                >
                  <v-btn
                    type="submit"
                    class="justify-center"
                    @click="registerWithGoogle()"
                    width="250"
                    height="40"
                    small
                    red
                  >
                    continue with google? <v-icon>mdi-google</v-icon></v-btn
                  >
                </v-card-actions>
                <div v-if="error">{{ error.message }}</div>
              </div>
              <!--  -->
            </div>
          </v-sheet>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseAuth } from "@/main";

export default Vue.extend({
  name: "Login",

  data: () => ({
    email: "",
    password: "",
    error: "",
    loggedIn: false,
  }),
  created() {
    firebaseAuth.onAuthStateChanged(firebaseAuth.getAuth(), (user) => {
      this.loggedIn = !!user;
    });
    console.log("created! = ", this.loggedIn);
  },
  methods: {
    async login() {
      try {
        const user = await firebaseAuth.signInWithEmailAndPassword(
          firebaseAuth.getAuth(),
          this.email,
          this.password
        );
        console.log("logged in as: ", user);
        this.loggedIn = true;
        await this.$router.replace({ name: "InitGame" });
      } catch (err) {
        console.log(err);
        this.error = String(err);
      }
    },
    async registerWithGoogle() {
      try {
        let provider = new firebaseAuth.GoogleAuthProvider();
        const user = await firebaseAuth.signInWithPopup(
          firebaseAuth.getAuth(),
          provider
        );
        console.log("logged in as: ", user);
        await this.$router.replace({ name: "InitGame" });
      } catch (err) {
        console.log(err);
        this.error = String(err);
      }
    },
    async signout() {
      try {
        const user = await firebaseAuth.signOut(firebaseAuth.getAuth());
        console.log(user);
        // await this.$router.replace({ name: "Login" });
        this.loggedIn = false;
      } catch (err) {
        console.log(err);
        this.error = String(err);
      }
    },

    async register() {
      try {
        const user = await firebaseAuth.createUserWithEmailAndPassword(
          firebaseAuth.getAuth(),
          this.email,
          this.password
        );
        console.log(user);
        this.loggedIn = true;
        this.$router.replace({ name: "/InitGame" });
      } catch (err) {
        console.log(err);
        this.error = String(err);
      }
    },
  },
});
</script>
