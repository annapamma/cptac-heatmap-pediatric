<template>
  <div class="disease-phospho" id="heatmap-and-legend">
    <!--<h3>PHOSPHO</h3>-->
    <loading :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
       :opacity="0.7"
    />
    <apexchart v-if="!isLoading" type=heatmap :height="height" :options="chartOptionsClinical" :series="clinicalSeries" />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import chartOptions from '@/heatmap_specs/chartOptions';
import colorScale from '@/heatmap_specs/colorScale';

import diagnosis from '@/diagnosis';

export default {
  name: 'DiseasePhospho',
  components: {
    Loading,
  },
  data() {
    return {
      fullPage: false,
      chartOptionsClinical: chartOptions(colorScale, this),
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    height() {
      return this.clinicalSeries.length * 18;
    },
    disease() {
      return this.$store.state.selectedDisease;
    },
    clinicalSeries() {
      const series = this.$store.state.series_phospho;

      if (this.disease === 'all') {
        return series;
      }

      return series.map(el => ({
        name: el.name,
        data: el.data.filter(el => diagnosis[this.disease][el.x]),
      }));
    },
  },
  // methods: {
  //   goToSingleDisease(disease) {
  //     this.$router.push(`/${disease}`);
  //   },
  // },
  mounted() {
    this.$store.dispatch('updateSelectedView', 'phospho');
    if (!this.$store.state.firstPhosphoFetched) {
      this.$store.dispatch('fetchPhospho');
    }
  },
};
</script>

<style lang="css">
  .disease-phospho {
    width: 800px;
    max-width: 800px;
    min-width: 800px;
    margin: 10px auto;
  }

  /*#chart {*/
    /*max-width: 600px;*/
    /*min-width: 600px;*/
    /*background-color: yellow;*/
  /*}*/

  .apexcharts-canvas {
    height: 100%;
  }

  .apexcharts-legend {
    height: 100%;
  }

  .disease-phospho {
    background-color: white;
    width: 97%;
    height: 100vh;
  }

  .apexcharts-heatmap-rect {
    stroke-width: 0 !important;
  }

  .apexcharts-heatmap-rect:hover {
      outline: black 1px solid !important;
      cursor: pointer;
      z-index: 100;
  }

  .apexcharts-yaxis {
    /*background-color: pink !important;*/
    border: solid 1px black;
    /*border: pink !important;*/
  }
</style>
