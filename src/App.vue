<template>
  <div class="page">
    <div class="content">
      <app-setup v-if="gameState==='SETUP'"></app-setup>
      <template v-else>
        <app-status></app-status>
        <app-grid></app-grid>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Grid from './components/Grid.vue';
import GameSetup from './components/GameSetup.vue';
import GameStatus from './components/GameStatus.vue';
export default {
  name: 'app',
  computed: mapState({
    gameState: state => state.gameState
  }),
  components: {
    'app-grid': Grid,
    "app-setup": GameSetup,
    "app-status": GameStatus
  }
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  position: relative;
  margin: 80px 0;
}

button {
  cursor: pointer;
}
</style>
