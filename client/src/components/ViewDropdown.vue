<template>
  <div class="view-dropdown">
    <label for="view-dropdown">View</label>
      <select v-model="selectedView" id="view-dropdown">
        <option value="all">all</option>
        <option value="mutation">mutation</option>
        <option value="proteo">proteo</option>
        <option value="phospho">phospho</option>
      </select>
  </div>
</template>


<script>
export default {
  name: 'view-dropdown',
  computed: {
    selectedView: {
      get() {
        return this.$store.state.selectedView;
      },
      set(view) {
        this.$store.dispatch('updateSelectedView', view);
      }
    }
  },
  watch: {
    selectedView() {
      this.$router.push({ name: `disease-${this.selectedView}` });
    }
  }
};
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
