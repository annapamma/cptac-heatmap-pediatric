<template>
  <div class="heatmap-container">
    <div class="buttons-and-legend">
      <button @click="goToSingleDisease('Ependymoma')" style="background-color: #00FF40;">
        Ependymoma
      </button>
      <button @click="goToSingleDisease('Medulloblastoma')" style="background-color: #FF7ECF;">
        Medulloblastoma
      </button>
      <button @click="goToSingleDisease('Atypical Teratoid Rhabdoid Tumor (ATRT)')" style="background-color: #B30303;">
        ATRT
      </button>
      <button @click="goToSingleDisease('Craniopharyngioma')" style="background-color: #FFBF00;">
        Craniopharyngioma
      </button>
      <button @click="goToSingleDisease('High-grade glioma/astrocytoma')" style="background-color: #3249DC;">HGG</button>
      <button @click="goToSingleDisease('Ganglioglioma')" style="background-color: #00FFFF;">
        Ganglioglioma
      </button>
      <button @click="goToSingleDisease('Low-grade glioma/astrocytoma')" style="background-color: #9F72FF;">LGG</button>
      <button @click="goToSingleDisease('all')" style="background-color: lightgray;">
        All Diagnoses
      </button>
    </div>
    <div class="heatmap-and-legend">
      <router-view />
      <the-legend-container />
    </div>
  </div>
</template>

<script>
import TheLegendContainer from './TheLegendContainer.vue';

export default {
  name: 'HeatmapContainer',
  components: {
    TheLegendContainer,
  },
  data() {
    return {
      isLoading: true,
      fullPage: false,
    };
  },
  methods: {
    goToSingleDisease(disease) {
      this.$store.dispatch('selectDisease', disease);
    },
  },
};
</script>

<style scoped>
  .heatmap-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 10px auto;
    min-width: 800px;
  }

  .heatmap-container button {
    margin: 2px;
    width: 13.5%;
    border: 1px;
    opacity: .8;
    font-weight: bold;
  }

  .heatmap-container p {
    margin: 2px;
  }

  .heatmap-and-legend {
    display: flex;
    flex-direction: row;
    width: 100%;
    /*background-color: yellow;*/
  }

</style>
