<template>
  <div class="input-text-area">
      <textarea v-model="geneInput" id="gene-input" :placeholder="'Paste gene list'"></textarea>
      <button @click="submitGenes">Visualize</button>
  </div>
</template>

<script>
export default {
  name: 'InputTextArea',
  data() {
    return {
      geneInput: '',
    };
  },
  computed: {
    genes () {
      const trimmedGeneList = this.geneInput.trim().toUpperCase();
      let geneListArr = [];

      if (trimmedGeneList.length === 0) {
          return []
      }

      const combinations = [
          ['\t', ' '],
          ['\t', '\n'],
          ['\t', ','],
          ['\n', ' '],
          ['\n', ','],
          [' ', ','],
          [';', ','],
          [';', '\t'],
          [';', '\n'],
          [';', ' ']
      ];

      for (let i = 0; i < combinations.length; i++) {
        let c = combinations[i];
        if (trimmedGeneList.includes(c[0]) && trimmedGeneList.includes(c[1])) {
          //TODO: change alert to line after visualize button
          alert('Enter genes separated by a newline, tab, or space. '
            + 'Your list seems to include multiple separators.');
          return [];
        }
      }

      if (trimmedGeneList.includes('\t')) {
        geneListArr = trimmedGeneList.split('\t');
      } else if (trimmedGeneList.includes(' ')) {
        geneListArr = trimmedGeneList.split(' ');
      } else if (trimmedGeneList.includes(';')) {
        geneListArr = trimmedGeneList.split(';');
      } else if (trimmedGeneList.includes(',')) {
        geneListArr = trimmedGeneList.split(',');
      } else {
        geneListArr = trimmedGeneList.split('\n');
      }

      return [...new Set(geneListArr)];
    },
  },
  methods: {
    submitGenes() {
      if (!this.genes.length) {
        alert('Please enter genes.');
        return;
      }
      this.$store.dispatch('submitGenes', this.genes.join('%20'));
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
    width: 100%;
    min-height: 150px;
    margin: 10px auto;
    border: 1px solid black;
  }
</style>
