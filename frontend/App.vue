<template>
  <div id="app">
      <logo-container />
      <cptac-description />
      <div class="main">
        <input-container />
        <heatmap-container />
        <the-legend-container />
      </div>
  </div>
</template>

<script>
import CptacDescription from '../frontend/components/CptacDescription.vue';
import HeatmapContainer from '../frontend/components/HeatmapContainer.vue';
import InputContainer from '../frontend/components/InputContainer.vue';
import LogoContainer from '../frontend/components/LogoContainer.vue';
import TheLegendContainer from "./components/TheLegendContainer.vue";

export default {
  components: {
      TheLegendContainer,
    CptacDescription,
    HeatmapContainer,
    InputContainer,
    LogoContainer,
  },
    mounted() {
      this.$store.dispatch('loadFirstData')
    }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 99vw;
    height: 100vh;
    margin: 0 auto;
  }

  .main {
    display: flex;
    flex-direction: row;
    height: 85%;
  }
</style>
