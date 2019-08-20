<template>
  <div class="pathway-container">
    <!--<p>{{pathwayNames}}</p>-->
    <input v-model="searchTerm" placeholder="Search pathways"/>
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
      // pathwayNames: pathwayNames,
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
        true
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
    width: 80%;
    height: 100%;
    margin: 10px auto;
    background-color: pink;
    font-size: small;
    overflow-y: scroll;
  }

  .pathway-container input {
    width: 95%;
    margin: 0 auto;
    padding-left: 5px;
    border: solid 1px black;
  }

  .pathway-container ul {
    padding-left: 0;
    list-style-type: none;
  }

  .pathway-container li {
    cursor: pointer;
  }
</style>
