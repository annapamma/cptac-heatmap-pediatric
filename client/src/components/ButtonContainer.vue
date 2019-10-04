<template>
  <div class="button-container">
    <div class="buttons-and-legend">
      <div class="specific-data"><b>Series:</b> {{ this.series }}</div>
      <div class="specific-data"><b>Sample:</b> {{ this.sample }}</div>
      <div class="specific-data"><b>Value:</b> {{ this.value }}</div>
      <div class="specific-data" v-if="selectedView === 'phospho' && this.phosphoId.length">
        <b>phosphosite id:</b> {{ this.phosphoId }}
      </div>
      <div class="sort-buttons" v-if="genes.length <= 30 && !this.phosphoId">
        <button @click="sort(ascending=true)" style="background-color: lightgray;">
          Sort {{ this.series.length ? `by ${this.series}: ascending` : '' }}
        </button>
        <button @click="sort(ascending=false)" style="background-color: lightgray;">
          Sort {{ this.series.length ? `by ${this.series}: descending` : '' }}
        </button>
      </div>
      <div class="sort-buttons" v-if="genes.length <= 30 && this.phosphoId">
        <button @click="sort(ascending=true)" style="background-color: lightgray;">
          Sort {{ this.series.length ? `by ${this.phosphoId} (${this.series}): ascending` : '' }}
        </button>
        <button @click="sort(ascending=false)" style="background-color: lightgray;">
          Sort {{ this.series.length ? `by ${this.phosphoId} (${this.series}): descending` : '' }}
        </button>
      </div>
      <div class="sort-buttons-alert specific-data" v-if="!(genes.length <= 30)">
        Shorten gene list to 30 genes or less to enable track sorting.
      </div>
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
      return this.$store.state.selectedSeries;
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
    phosphoId() {
      return this.$store.state.selectedPhosphoId;
    },
    genes() {
      return this.$store.state.genes;
    },
  },
  methods: {
    sort(ascending) {
      if (this.selectedView === 'phospho') {
        if (this.series.length) {
          this.$store.dispatch(
            'sortSamplesPhospho',
            {
              series: this.phosphoId.length ? this.phosphoId : this.series,
              ascending,
              phospho: this.phosphoId.length,
            },
        );
      }
      } else {
        if (this.series.length || this.series === 'rna cl') {
          this.$store.dispatch(
            'sortSamples',
            {
              series: this.series,
              ascending,
            },
          );
        }
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

  .sort-buttons-alert {
    margin-top: 10px;
  }
</style>
