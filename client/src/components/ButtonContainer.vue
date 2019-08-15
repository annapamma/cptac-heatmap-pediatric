<template>
  <div class="button-container">
    <div class="buttons-and-legend">
      <div class="specific-data"><b>Series:</b> {{ this.series }}</div>
      <div class="specific-data"><b>Sample:</b> {{ this.sample }}</div>
      <div class="specific-data"><b>Value:</b> {{ this.value }}</div>
      <button @click="sort(ascending=true)" style="background-color: lightgray;">
        Sort {{ this.series.length ? `by ${this.series}: ascending` : '' }}
      </button>
      <button @click="sort(ascending=false)" style="background-color: lightgray;">
        Sort {{ this.series.length ? `by ${this.series}: descending` : '' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'ButtonContainer',
  computed: {
    series() {
      console.log('selected series: ', this.$store.state.selectedSeries);
      return this.$store.state.selectedSeries;
    },
    sample() {
      return this.$store.state.selectedSample;
    },
    value() {
      return this.$store.state.selectedValue;
    },
    genes() {
      return this.$store.state.genes;
    }
  },
  methods: {
    sort(ascending) {
      console.log('clicked button!')
      if (this.series.length || this.series === 'rna cl') {
        this.$store.dispatch(
          'sortSamples',
          {
            series: this.series,
            ascending
          }
        );
      }
    },
  },
};
</script>

<style scoped>
  .button-container {
    width: 80%;
    height: 30%;
    margin: 10px auto;
  }

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
</style>
