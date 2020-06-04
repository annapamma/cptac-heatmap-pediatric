<template>
    <div class="legend-element">
        <div class="box" v-bind:style="{ 'backgroundColor': color }" v-bind:class="{'missing': missing}" id="colorbox"></div>
        <label for="colorbox">{{ value }}</label>
    </div>
</template>

<script>
export default {
  name: 'legend-element-horizontal',
  props: ['value', 'color', 'missing'],
};
</script>

<style scoped>
    .legend-element {
        display: flex;
        flex-direction: column;
        justify-content: left;
        margin: 0 5px;
    }

    .legend-element label {
        font-size: 9px;
        font-weight: bold;
    }

    .box {
        width:9px;
        height:9px;
        border-radius: 1px;
        border: 1px solid lightgrey;
    }

    .missing {
        width:8px;
        height:8px;
        border: solid 1px black;
    }
</style>
