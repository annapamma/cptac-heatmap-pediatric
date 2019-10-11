<template>
  <div class="disease-single-type" id="heatmap-and-legend">
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
import clinical from '@/clinical';

export default {
  name: 'DiseaseSingleType',
  components: {
    Loading,
  },
  props: ['track'],
  data() {
    return {
      fullPage: false,
      chartOptionsClinical: chartOptions(colorScale, this),
      singleMapping:{
        'mutation': ' mut',
        'proteo': ' Proteo',
        'rna': ' rna',
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    filter() {
      return this.singleMapping[this.track];
    },
    height() {
      return this.clinicalSeries.length * 18;
    },
    disease() {
      return this.$store.state.selectedDisease;
    },
    clinicalSeries() {
      const series = this.$store.state.series
        .filter(el =>
          el.name === '' ||
          clinical.includes(el.name) ||
          el.name.includes(this.filter));

      if (this.disease === 'all') {
        return series;
      }

      return series.map(el => ({
        name: el.name,
        data: el.data.filter(el => diagnosis[this.disease][el.x]),
      }));
    },
  },
  mounted() {
    this.$store.dispatch('updateSelectedView', this.track);
    const legendImg = document.createElement('img');
    legendImg.src = require('@/assets/legend.jpg');
    legendImg.style = 'background-color: #00FFFF; '
      + 'max-width: 1000px; '
      + 'min-width: 400px; '
      + 'text-align: center; '
      + 'display: block; '
      + 'margin-left: -30px; '
      + 'margin-right: auto;';
    const parentNode = document.querySelector('.disease-single-type');
    parentNode.append(legendImg);
  },
};
</script>

<style lang="css">
  .disease-single-type {
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

  .disease-single-type {
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
