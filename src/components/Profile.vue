<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="28"
          v-bind="attrs"
          v-on="on"
        ></v-avatar>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <span>change email?</span>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field :label="userEmail" required></v-text-field>
              </v-col>

              <v-col cols="12"> </v-col>

              change password?
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="newPassword"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6"> </v-col>
            </v-row>
          </v-container>
          <small v-if="error == false">*indicates required field</small>
          <small v-if="error" style="color: red"
            >*indicates required field</small
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="lowercase dark darken-1"
            small
            dark
            v-model="newEmail"
            @click="reauthenticateChangeEmail()"
          >
            change Email
          </v-btn>
          <v-btn
            color="lowercase dark darken-1"
            small
            dark
            @click="reauthenticateChangePassword()"
          >
            change password
          </v-btn>
          <v-btn color="dark darken-1" text @click="dialog = false">
            Close
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
  name: "Profile",
  props: ["loggedIn", "userEmail"],
  data: () => ({
    dialog: false,
    newPassword: "",
    newEmail: "",
    error: false,
  }),
  methods: {
    async reauthenticateChangeEmail() {
      const user = firebaseAuth.getAuth().currentUser;
      if (user && this.userEmail && this.newPassword) {
        const credential = firebaseAuth.EmailAuthProvider.credential(
          this.userEmail,
          this.newPassword
        );
        await firebaseAuth.reauthenticateWithCredential(user, credential);
        await firebaseAuth.updateEmail(user, this.newEmail);
        this.error = false;
        this.dialog = false;
      } else {
        this.error = true;
      }
    },
    async reauthenticateChangePassword() {
      let user = await firebaseAuth.getAuth().currentUser;
      if (user && this.newPassword != "") {
        await firebaseAuth
          .updatePassword(user, this.newPassword)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
        const credential = await firebaseAuth.EmailAuthProvider.credential(
          this.userEmail,
          this.newPassword
        );
        await firebaseAuth.reauthenticateWithCredential(user, credential);
        this.error = false;
        this.dialog = false;
      } else {
        this.error = true;
      }
    },
  },
});
</script>
