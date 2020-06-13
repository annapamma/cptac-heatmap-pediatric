<template>
  <div class="heatmap-container">
    <diagnosis-selector />
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
<!--    <heatmap v-if="selectedView === 'phospho'"-->
<!--        v-for="(val, gene) in phosphoSeries"-->
<!--        :options="options"-->
<!--        :series="val"-->
<!--        :gene="gene"-->
<!--        :key="gene.toString()"-->
<!--    />-->
<!--      <heatmap v-if="selectedView === 'mutation'"-->
<!--        v-for="(val, gene) in mutationSeries"-->
<!--        :options="options"-->
<!--        :series="val"-->
<!--        :gene="gene"-->
<!--        :key="gene.toString()"-->
<!--    />-->
  </div>
</template>

<script>
// import TheLegendContainer from './TheLegendContainer.vue';
import Heatmap from './Heatmap.vue';
import HeatmapClinical from "./HeatmapClinical.vue";
import DiagnosisSelector from "./DiagnosisSelector";

import chartOptions from '../heatmap_specs/chartOptions.js';
import colorScale from '../heatmap_specs/colorScale.js';
import diagnosisSample from "../src/diagnosis.js";

export default {
    name: 'HeatmapContainer',
    components: {
      DiagnosisSelector,
        HeatmapClinical,
        Heatmap,
        // TheLegendContainer,
    },
    data() {
        return {
            options: chartOptions(colorScale, this),
            isLoading: true,
            fullPage: false,
        };
    },
    computed: {
        diagnosis() {
          return this.$store.state.selectedDiagnosis;
        },
        mutationSeries() {
            return this.$store.state.mutationSeries;
        },
        phosphoSeries() {
            return this.$store.state.phosphoSeries;
        },
        series() {
          return filterByDiagnosisByGene(this.$store.state.series, this.diagnosis);
          // if (this.diagnosis === 'All') {
          //   return this.$store.state.series;
          // }
          // return this.$store.state.series.map(el => ({
          //   name: el.name,
          //   data: el.data.filter(el => diagnosisSample[el.x] === this.diagnosis),
          // }));
            // return ;
        },
        topSeries() {
          return filterByDiagnosis(this.$store.state.topSeries, this.diagnosis);
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

function filterByDiagnosis(s, d) {
  if (d === 'All') {
    return s
  }
  return s.map(el => ({
    name: el.name,
    data: el.data.filter(el => diagnosisSample[el.x] === d),
  }));
}

function filterByDiagnosisByGene(s, d) {
  if (d === 'All') {
    return s
  }
  let new_s = {}
  for (const [gene, gene_s] of Object.entries(s)) {
    new_s[gene] = gene_s.map(el => ({
      data: el.data.filter(el => diagnosisSample[el.x] === d),
      name: el.name,
    }));
  }
  return new_s
}
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
