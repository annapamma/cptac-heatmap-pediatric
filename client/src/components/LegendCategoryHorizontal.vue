<template>
    <div class="legend-category">
        <label for="v-for-object">{{ category }}
        </label>
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

.legend-elements li {
    margin: 5px -9.5px;
}
.legend-category label {
    font-size: small;
    font-weight: bold;
}

.legend-category label p {
    font-size: x-small;
    /*font-weight: bold;*/
    margin: 0;
}

</style>
