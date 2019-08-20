<template>
  <div class="pathway-container">

    <div class="pathway-db-selector">
      <select v-model="selectedPathwayDb">
        <option value="hallmark">Hallmark</option>
        <option value="kegg">KEGG</option>
        <option value="reactome">Reactome</option>
      </select>
    </div>
    <input class="pathway-container-text-input" v-model="searchTerm" placeholder="Search pathways"/>
    <ul>
      <li v-for="pw in pathwayNames" v-on:click="addPathwayGenes(pw)">
        {{ pw }}
      </li>
    </ul>
  </div>
</template>


<script>
import pwNames from '@/pathwayNames';

export default {
  name: 'PathwayContainer',
  data() {
    return {
      searchTerm: '',
      selectedPathwayDb: 'hallmark',
    };
  },
  computed: {
    pathwayNames() {
      return pwNames[this.selectedPathwayDb]
        .filter((name) => {
          const searches = this.searchTerm.toLowerCase().split(' ');
          return searches.every(search => name.toLowerCase().includes(search));
        });
    },
  },
  methods: {
    addPathwayGenes(pw) {
      // clears pathway genes
      this.$store.dispatch('setGeneList', '');

      // shows pathway name
      this.$store.dispatch(
        'setPathwayIsSelected',
        true,
      );

      // updates gene list to pathway genes
      this.$store.dispatch(
        'fetchPathwayGenes',
        {
          db: this.selectedPathwayDb,
          pw,
        },
      );
    },
  },
};
</script>

<style scoped>
  .pathway-container {
    width: 90%;
    min-width: 150px;
    height: 100%;
    margin: 10px auto;
    /*background-color: pink;*/
    font-size: small;
    overflow-y: scroll;
    border: solid 1px black;
    padding: 5px;
  }

  .pathway-db-selector {
    /*background-color: gray;*/
    display: inline;
    margin: 0 auto;
  }

  .pathway-db-selector label {
    padding-left: 2px;
    padding-right: 10px;
  }

  .pathway-container-text-input {
    width: 95%;
    margin: 4px auto;
    padding-left: 5px;
    border: solid 1px black;
  }

  .pathway-container ul {
    padding-left: 0;
    list-style-type: none;
    margin: 0 auto;
  }

  .pathway-container li {
    cursor: pointer;
  }
</style>
