<template>
  <div class="input-text-area">
      <textarea v-model="geneInput" :placeholder="'Paste gene list or select pathways'"></textarea>
      <div class="specific-data">
        <b>Length:</b> {{ genes.filter(function(el) { return el; }).length }}
      </div>
      <button class="button-visualize" @click="submitGenes">Visualize</button>
      <button class="button-excel" @click="downloadExcel">Download Excel</button>
  </div>
</template>

<script>
export default {
  name: 'InputTextArea',
  computed: {
    geneInput: {
      set(txt) {
        this.$store.dispatch('setGeneList', txt)
      },
      get() {
        return this.$store.state.genes.join("\n")
      }
    },
    genes() {
      return this.$store.state.genes;
    },
  },
  methods: {
    submitGenes() {
      if (!this.genes.length) {
        alert('Please enter genes.');
        return;
      }
      this.$store.dispatch(
        'submitGenes',
        {
          genes: this.genes.join('%20'),
        }
      );
    },
    downloadExcel() {
      this.$store.dispatch(
        'getExcelData',
        {
          genes: this.genes.join('%20'),
        }
      );
    },
  },
};
</script>

<style scoped>
  .input-text-area {
    width: 80%;
    margin: 10px auto;
  }

  .input-text-area textarea {
    width: 97%;
    min-height: 150px;
    margin: 0 auto;
    border: 1px solid black;
  }

  .button-visualize {
    width: 100%;
    background-color: #008CBA;
    margin: 0 auto;
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
</style>
