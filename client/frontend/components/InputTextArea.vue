<template>
  <div class="input-text-area">
      <div class="pathway-header" v-if="pathwayIsSelected">
        {{ selectedPathway }}
      </div>
      <textarea v-model="geneInput" :placeholder="'Paste gene list or select pathway'"></textarea>
      <div class="text-length-and-clear-button">
        <div class="gene-length-data">
          <b>Length:</b> {{ genes.filter(function(el) { return el; }).length }}
        </div>
        <button class="button-clear" @click="clearGenes">Clear</button>
      </div>
      <button class="button-visualize" @click="submitGenes">Visualize</button>
      <button class="button-excel" @click="downloadExcel">Download Excel</button>
      <view-dropdown />
  </div>
</template>

<script>
import ViewDropdown from "./ViewDropdown.vue";

export default {
    components: {ViewDropdown},
    name: 'InputTextArea',
    computed: {
    geneInput: {
      set(txt) {
        this.$store.dispatch('setGeneList', txt);
      },
      get() {
        return this.$store.state.genes.join('\n');
      },
    },
    genes() {
      return this.$store.state.genes;
    },
    pathwayIsSelected() {
      return this.$store.state.pathwayIsSelected;
    },
    selectedPathway() {
      return this.$store.state.selectedPathway;
    },
  },
  methods: {
    clearGenes() {
      this.geneInput = '';
      this.$store.dispatch('setPathwayIsSelected', false);
    },
    submitGenes() {
      if (!this.genes.length) {
        alert('Please enter genes.');
        return;
      }
      this.$store.dispatch(
        'submitGenes',
        {
          genes: this.genes,
        },
      );
      // this.$store.dispatch(
      //   'submitGenesPhospho',
      //   {
      //     genes: this.genes,
      //   },
      // );
      // this.$store.dispatch(
      //   'submitGenesMutation',
      //   {
      //     genes: this.genes,
      //   },
      // );
      // this.$store.dispatch(
      //   'fetchGeneDetails',
      //   {
      //     genes: this.genes,
      //   },
      // );
    },
    downloadExcel() {
        if (this.$store.state.selectedView === 'phospho') {
            this.$store.dispatch(
                'downloadExcelPhospho',
                {
                    genes: this.genes,
                },
            );
        } else if (this.$store.state.selectedView === 'mutation') {
            this.$store.dispatch(
                'downloadExcelMutation',
                {
                    genes: this.genes,
                },
            );
        } else {
            this.$store.dispatch(
            'downloadExcel',
            {
              genes: this.genes,
            },
          );
        }
    },
  },
};
</script>

<style scoped>
  .input-text-area {
    overflow-wrap: break-word;
  }

  .input-text-area textarea {
    width: 97%;
    min-height: 150px;
    margin: 0 auto;
    border: 1px solid black;
  }

  .input-text-area .pathway-header {
    width: 97%;
    display: inline-block;
    overflow-wrap: break-word;
  }

  .button-visualize {
    width: 100%;
    background-color: #008CBA;
    margin: 4px auto;
    border: 1px solid black;
    font-weight: bold;
    color: white;
    border-radius: 4px;
  }

  .button-excel {
    width: 100%;
    background-color: #1cba40;
    margin: 0 auto;
    border: 1px solid black;
    font-weight: bold;
    color: white;
    border-radius: 4px;
  }

  .specific-data {
    font-size: small;
  }

  .text-length-and-clear-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .gene-length-data {
    font-size: small;
    display: flex;
    width: 40%;
    flex-direction: row;
  }

  .pathway-header {
    font-size: small;
    display: flex;
    font-weight: bold;
    width: 40%;
    flex-direction: row;
    /*justify-content: space-around;*/
  }

  .gene-length-data b {
    padding-right: 2px;
  }

  .button-clear {
    width: 40%;
    background-color: #ffffff;
    border: 1px solid black;
    font-weight: bold;
    color: black;
    border-radius: 4px;
  }
</style>
