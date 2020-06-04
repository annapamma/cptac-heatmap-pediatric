<template>
    <div class="legend-category">
        <div class="legend-category-label">
            <label for="v-for-object">{{ category }}</label>
        </div>
        <ul id="v-for-object" class="legend-elements">
          <li v-for="element in elements">
            <legend-element-horizontal :value="element[0]" :color="element[1]" :missing="category === 'Missing'"/>
          </li>
        </ul>
    </div>
</template>

<script>
import LegendElementHorizontal from './LegendElementHorizontal.vue';

export default {
  name: 'legend-category-horizontal',
  components: {
    LegendElementHorizontal,
  },
  props: ['category', 'elements'],
};
</script>

<style scoped>
.legend-elements {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
}

.legend-category {
    font-size: small;
    margin-top: 12px;
}

.legend-category label p {
    font-size: x-small;
    margin: 0;
}

.legend-category-label {
    font-weight: bold;
    text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>
