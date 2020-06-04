<template>
  <div class="view-dropdown">
    <label for="view-dropdown">View</label>
      <select v-model="selectedView" id="view-dropdown">
        <option value="all">all</option>
        <option value="phospho">phospho</option>
        <option value="mutation">mutation</option>
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
      },
    },
  },
};
</script>


<style scoped>
  .view-dropdown {
      margin: 6px 0;
  }

  .view-dropdown label {
    width: 20%;
      font-weight: bold;
  }

  .view-dropdown select {
    margin-left: 5px;
    width: 80%;
  }
</style>
