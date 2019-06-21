<template>
  <div class="heatmap-container">
    <router-view />
    <div class="buttons-and-legend">
    <p>Series: {{ this.series }} // Sample: {{ this.sample }} // Value: {{ this.value }}</p>
    <button @click="sort(ascending=true)" style="background-color: lightgray;">
      Sort {{ this.series.length ? `by: ${this.series} ascending` : '' }}
    </button>
    <button @click="sort(ascending=false)" style="background-color: lightgray;">
      Sort {{ this.series.length ? `by: ${this.series} descending` : '' }}
    </button>
    <button @click="goToSingleDisease('all')" style="background-color: lightgray;">
      All Diagnoses
    </button>
    </div>
    <div class="buttons-and-legend">
    <button @click="goToSingleDisease('Ependymoma')" style="background-color: #00FF40;">
      Ependymoma
    </button>
    <button @click="goToSingleDisease('Medulloblastoma')" style="background-color: #FF7ECF;">
      Medulloblastoma
    </button>
    <button @click="goToSingleDisease('ATRT')" style="background-color: #B30303;">
      ATRT
    </button>
    <button @click="goToSingleDisease('Craniopharyngioma')" style="background-color: #FFBF00;">
      Craniopharyngioma
    </button>
    <button @click="goToSingleDisease('HGG')" style="background-color: #3249DC;">HGG</button>
    <button @click="goToSingleDisease('Ganglioglioma')" style="background-color: #00FFFF;">
      Ganglioglioma
    </button>
    <button @click="goToSingleDisease('LGG')" style="background-color: #9F72FF;">LGG</button>
    </div>
  </div>
</template>

<script>
import clinicalValuesMapping from '@/heatmap_specs/clinicalValuesMapping';

export default {
  components: {
  },
  name: 'HeatmapContainer',
  computed: {
    series() {
      return this.$store.state.selectedSeries;
    },
    sample() {
      return this.$store.state.selectedSample;
    },
    clinicalTrack() {
      return this.$store.state.clinicalTracks.includes(this.series);
    },
    value() {
      return this.clinicalTrack
        ? clinicalValuesMapping[this.$store.state.selectedValue]
        : this.$store.state.selectedValue;
    },
  },
  methods: {
    goToSingleDisease(disease) {
      this.$store.dispatch('selectDisease', disease);
    },
    sort(ascending) {
      if (this.series) {
        this.$store.dispatch(
          'sortSamples',
          {
            ascending,
            series: this.series,
          },
        );
      }
    },
  },
};
</script>

<style scoped>
  .heatmap-container {
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 95%;
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
</style>
