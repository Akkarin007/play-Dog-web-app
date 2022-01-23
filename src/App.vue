<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link.title"
          :to="link.to"
        >
          {{ link.title }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
      <v-container>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import connectWebSocket from './common/websocket'

  export default {
    
    
    beforeCreate() {
      connectWebSocket()
    },
    data: () => ({
      links: [
        { title:'Login', to: '/login' },
        { title:'initGame', to: '/InitGame' },
        { title: 'Game', to: '/dashboard' },
        { title:'About', to: '/about' }
      ],
    }),
  }
</script>