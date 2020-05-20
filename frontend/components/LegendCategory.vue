<template>
    <div class="legend-category">
        <label for="v-for-object">
          {{ category }}
            <!--<p v-if="category === 't(3;2)/t(3;5)/Genome instability'">t() indicates chromosomal translocation event</p>-->
        </label>
        <ul id="v-for-object" class="legend-elements">
          <li v-for="element in elements">
            <legend-element :value="element[0]" :color="element[1]"/>
          </li>
        </ul>
    </div>
</template>

<script>
import LegendElement from './LegendElement.vue';

export default {
  name: 'legend-category',
  components: { LegendElement },
  props: ['category', 'elements'],
  // data () {
  //     return {
  //         'category': 'TEST',
  //         'elements': {
  //             1: 'red',
  //             2: 'yellow',
  //             3: 'blue'
  //         }
  //     }
  // },
};
</script>

<style scoped>
.legend-elements {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-top: 10px;
    margin-bottom: 10px;
}

.legend-category label {
    font-size: small;
    font-weight: bold;
}

.legend-category label p {
    font-size: x-small;
    font-weight: lighter;
    margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
