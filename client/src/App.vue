<template>
  <div id="app">
      <logo-container />
      <cptac-description />
    <div class="main">
      <input-container />
      <heatmap-container />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InputContainer from '@/components/InputContainer.vue';
import HeatmapContainer from '@/components/HeatmapContainer.vue';
import LogoContainer from '@/components/LogoContainer.vue';
import CptacDescription from './components/CptacDescription';

export default {
  components: {
    CptacDescription,
    HeatmapContainer,
    InputContainer,
    LogoContainer,
  },
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

  .logo-bar {
    display: flex;
    flex-direction: row;
    height: 80px;
  }

      ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

</style>
