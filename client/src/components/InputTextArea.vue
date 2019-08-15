<template>
  <div class="input-text-area">
      <textarea v-model="geneInput" :placeholder="'Paste gene list'"></textarea>
      <button class="button-visualize" @click="submitGenes">Visualize</button>
      <button class="button-excel" @click="downloadExcel">Download Excel</button>
  </div>
</template>

<script>
import clinicalExcelData from '@/excelData';

import { utils, writeFile } from 'xlsx';

export default {
  name: 'InputTextArea',
  data() {
    return {
      geneInput: 'CASP3,RRAS2,RASA1,RPS6KA2,NF1,BRAF',
    };
  },
  computed: {
    excelData() {
      const { proteo, clinicalTracks } = this.$store.state;

      const excelArr = clinicalTracks.map(track => clinicalExcelData[track]);

      for (const gene in proteo) {
        if (proteo.hasOwnProperty(gene)) {
          const geneObj = { 'Gene symbol': gene, 'Data type': 'proteo' };
          for (const entry in proteo[gene]) {
            if (proteo[gene].hasOwnProperty(entry)) {
              geneObj[proteo[gene][entry].x] = proteo[gene][entry].y;
            }
          }
          excelArr.push(geneObj);
        }
      }

      return excelArr;
    },
    genes() {
      const trimmedGeneList = this.geneInput.trim().toUpperCase();
      let geneListArr = [];

      if (trimmedGeneList.length === 0) {
        return [];
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
        [';', ' '],
      ];

      for (let i = 0; i < combinations.length; i++) {
        const c = combinations[i];
        if (trimmedGeneList.includes(c[0]) && trimmedGeneList.includes(c[1])) {
          // TODO: change alert to line after visualize button
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
      this.$store.dispatch(
        'submitGenes',
        {
          genes: this.genes.join('%20'),
        }
      );
    },
    downloadExcel() {
      const excelHeaders = ['Data type', 'Gene symbol', ...this.$store.state.sortOrder];
      const ws = utils.json_to_sheet(this.excelData, { header: excelHeaders });
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws);
      writeFile(wb, 'CPTAC3-pbt.xls');
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
    /*margin-left: 0;*/
    /*margin-right: 0;*/
    /*margin-top: 10px;*/
    /*margin-bottom: 2px;*/
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
</style>
