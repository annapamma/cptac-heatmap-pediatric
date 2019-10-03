<template>
  <div class="view-dropdown">
    <label for="view-dropdown">View</label>
      <select v-model="selectedView" id="view-dropdown">
        <option value="original">original</option>
        <option value="phospho">phospho</option>
        <!--<option value="reactome">Reactome</option>-->
      </select>
  </div>
</template>


<script>
export default {
  name: "view-dropdown",
  data() {
    return {
      selectedView: 'original',
    }
  },
  watch: {
    selectedView() {
      console.log('BRRROOOP: ', this.selectedView)
      this.$router.push({ name: 'disease-phospho' })
    }
  }
}
</script>


<style scoped>
  .view-dropdown {
    width: 80%;
    /*min-width: 150px;*/
    /*height: 100%;*/
    margin: 0 auto;
    /*background-color: pink;*/
    font-size: small;
    /*overflow-y: scroll;*/
    /*border: solid 1px black;*/
    padding: 5px;
  }

  .view-dropdown label {
    width: 20%;
  }

  .view-dropdown select {
    margin-left: 5px;
    width: 80%;
  }
</style>
