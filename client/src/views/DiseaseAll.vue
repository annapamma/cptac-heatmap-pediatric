<template>
  <div class="disease-all">
    <apexchart type=heatmap height="300" :options="chartOptionsClinical" :series="clinicalSeries" />
  </div>
</template>

<script>
// @ is an alias to /src
import chartOptions from '@/heatmap_specs/chartOptions';
import colorScale from '@/heatmap_specs/colorScale';

// TODO: add data point selection event as computed property
export default {
  name: 'DiseaseAll',
  data() {
    return {
      chartOptionsClinical: chartOptions(colorScale, this),
    };
  },
  computed: {
    disease() {
      return this.$store.state.selectedDisease;
    },
    cases() {
      const diseaseMapping = {
        Ganglioglioma: 1021,
        Ependymoma: 1022,
        Craniopharyngioma: 1023,
        LGG: 1024,
        HGG: 1025,
        ATRT: 1026,
        Medulloblastoma: 1027,
      };
      const { diagnosis } = this.$store.state;
      return diagnosis
        .reduce((acc, el) => {
          acc[el.x] = el.y === diseaseMapping[this.disease];
          return acc;
        }, {});
    },
    clinicalSeries() {
      const series = name => (
        this.disease === 'all'
          ? {
            name,
            data: this.$store.state[name],
          }
          : {
            name,
            data: this.$store.state[name].filter(el => this.cases[el.x]),
          }
      );
      const blankRow = { name: ' ', data: [] };
      const { proteo } = this.$store.state;
      const proteins = this.disease === 'all'
        ? Object
          .entries(proteo)
          .map(gene => ({ name: gene[0], data: gene[1] }))
        : Object
          .entries(proteo)
          .map(gene => ({ name: gene[0], data: gene[1].filter(el => this.cases[el.x]) }));
      return [
        ...proteins,
        blankRow,
        series('cl col'),
        series('phospho cl'),
        series('rna cl'),
        blankRow,
        series('diagnosis'),
        series('grade'),
        series('Ependymoma_RELA status'),
        series('LGG_BRAF status'),
        series('CTNNB1 status'),
        series('HGG_H3FA status'),
        series('Last Known Clinical Status'),
      ];
    },
  },
  components: {
  },
  methods: {
    goToSingleDisease(disease) {
      this.$router.push(`/${disease}`);
    },
  },
  mounted() {
    let legendImg = document.createElement("img");
    legendImg.src = require("@/assets/legend.jpg");
    legendImg.style = "background-color: #00FFFF; " +
      "max-width: 1000px; " +
      "min-width: 400px; " +
      "text-align: center; " +
      "display: block; " +
      "margin-left: auto; " +
      "margin-right: auto;";
    let parentNode = document.querySelector('.disease-all');
    parentNode.append(legendImg);
  }
};
</script>

<style lang="css">
  .apexcharts-canvas {
    height: 100%;
  }

  .apexcharts-legend {
    height: 100%;
  }

  .disease-all {
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
</style>
