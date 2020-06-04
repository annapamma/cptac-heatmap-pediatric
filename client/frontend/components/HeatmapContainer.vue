<template>
  <div class="heatmap-container">
    <heatmap-clinical
        :series="topSeries"
        :options="options"
    />
    <heatmap v-if="selectedView === 'all'"
        v-for="(val, gene) in series"
        :options="options"
        :series="val"
        :gene="gene"
        :key="gene"
    />
    <heatmap v-if="selectedView === 'phospho'"
        v-for="(val, gene) in phosphoSeries"
        :options="options"
        :series="val"
        :gene="gene"
        :key="gene.toString()"
    />
      <heatmap v-if="selectedView === 'mutation'"
        v-for="(val, gene) in mutationSeries"
        :options="options"
        :series="val"
        :gene="gene"
        :key="gene.toString()"
    />
    <heatmap-clinical
        :series="chromosomeSeries"
        :options="options"
    />
    <heatmap-clinical
        :series="bottomSeries"
        :options="options"
    />
  </div>
</template>

<script>
import TheLegendContainer from './TheLegendContainer.vue';
import Heatmap from './Heatmap.vue';
import HeatmapClinical from "./HeatmapClinical.vue";

import chartOptions from '../heatmap_specs/chartOptions.js';
import colorScale from '../heatmap_specs/colorScale.js';

export default {
    name: 'HeatmapContainer',
    components: {
        HeatmapClinical,
        Heatmap,
        TheLegendContainer,
    },
    data() {
        return {
            options: chartOptions(colorScale, this),
            isLoading: true,
            fullPage: false,
        };
    },
    computed: {
        mutationSeries() {
            return this.$store.state.mutationSeries;
        },
        phosphoSeries() {
            return this.$store.state.phosphoSeries;
        },
        series() {
            return this.$store.state.series;
        },
        topSeries() {
            return this.$store.state.topSeries;
        },
        chromosomeSeries() {
            return this.$store.state.chromosomeSeries;
        },
        bottomSeries() {
            return this.$store.state.bottomSeries;
        },
        selectedTracks() {
            return this.$store.state.selectedTracks;
        },
        selectedView() {
            return this.$store.state.selectedView;
        }
    },
};
</script>

<style scoped>
  .heatmap-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }


  .heatmap-container p {
    margin: 2px;
  }


</style>
