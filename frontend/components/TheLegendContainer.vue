<template>
    <div class="the-legend-container">
      <ul id="legend-categories-horizontal" class="legend-categories">
        <li v-for="(elements, category) in legend[selectedView].categoriesHorizontal">
          <legend-category-horizontal :category="category" :elements="elements"/>
        </li>
      </ul>
      <ul id="legend-categories" class="legend-categories">
        <li v-for="(elements, category) in legend[selectedView].categories">
          <legend-category :category="category" :elements="elements"/>
        </li>
      </ul>
    </div>
</template>

<script>
import LegendCategory from './LegendCategory.vue';
import LegendCategoryHorizontal from './LegendCategoryHorizontal.vue';

import legend from '../src/legendOptions.js'

export default {
  name: 'the-legend-container',
  components: {
    LegendCategory,
    LegendCategoryHorizontal,
  },
  data() {
    return {
        legend
    };
  },
  computed: {
    selectedView () {
        return this.$store.state.selectedView;
    },
  },
};
</script>

<style scoped>
  .the-legend-container {
      width: 200px;
      height: 100%;
      margin-left: 10px;
  }

  ul {
    margin: 0;
    padding: 10px;
    list-style: none;
  }
</style>
