<template>
  <dog />
</template>

<script lang="ts">
import Vue from 'vue'
import Dog from '../components/Dog.vue'

  export default Vue.extend({
    name: 'InitGame',

    components: {
      Dog
    },
  })
</script>
