<template>
  <div class="button-container">
    <div class="buttons-and-legend">
    <!--      <additional-data />-->
      <div class="specific-data"><b>Series:</b> {{ this.series }}</div>
      <div class="specific-data"><b>Sample:</b> {{ this.sample }}</div>
      <div class="specific-data"><b>Value:</b> {{ this.value }}</div>
<!--      <div class="specific-data" v-if="selectedView === 'phospho'"><b>Peptide:</b> {{ this.peptide }}</div>-->
<!--      <div class="specific-data" v-if="selectedView === 'mutation' && HGVSp_Short.length > 0">-->
<!--          <b>HGVSp_Short:</b> {{ HGVSp_Short }}-->
<!--      </div>-->
      <div class="sort-buttons" v-if="genes.length <= 30">
        <button @click="sort(ascending=true)" style="background-color: lightgray;">
          Sort {{ this.series.length ? `by ${this.series}: ascending` : '' }}
        </button>
        <button @click="sort(ascending=false)" style="background-color: lightgray;">
          Sort {{ this.series.length ? `by ${this.series}: descending` : '' }}
        </button>
      </div>
<!--      <div class="sort-buttons-alert specific-data" v-if="!(genes.length <= 30)">-->
<!--        Shorten gene list to 30 genes or less to enable track sorting.-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
// import AdditionalData from "./AdditionalData.vue";
export default {
  components: {
      // AdditionalData
  },
  name: 'ButtonContainer',
  computed: {
    series() {
      return this.$store.state.selectedSeries;
    },
    HGVSp_Short() {
      return this.$store.state.HGVSp_Short;
    },
    sample() {
      return this.$store.state.selectedSample;
    },
    value() {
      return this.$store.state.selectedValue;
    },
    selectedView() {
      return this.$store.state.selectedView;
    },
    peptide() {
      return this.$store.state.selectedPeptide;
    },
    genes() {
      return this.$store.state.genes;
    },
  },
  methods: {
    sort(ascending) {
        this.$store.dispatch(
          'sortSamples',
          ascending
        );
    },
  },
};
</script>

<style scoped>
  .button-container button {
    width: 100%;
    border-radius: 4px;
    border: solid 1px black;
    margin-top: 8px;
  }

  .button-container p {
    font-size: small;
    text-align: justify;
    font-weight: bold;
    margin: 2px auto;
    padding: 2px;
  }

  .specific-data {
    font-size: small;
  }

  .sort-buttons-alert {
    margin-top: 10px;
  }
</style>
