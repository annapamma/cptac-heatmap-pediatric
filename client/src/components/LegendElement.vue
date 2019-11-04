<template>
    <div class="legend-element">
        <div class="box" v-bind:style="{ 'backgroundColor': color }" id="colorbox"></div>
        <label for="colorbox">{{ value }}</label>
    </div>
</template>

<script>
export default {
  name: 'legend-element',
  props: ['value', 'color'],
};
</script>

<style scoped>
    .legend-element {
        display: flex;
        flex-direction: row;
        justify-content: left;
        margin: -1px;
        /*margin: 0px;*/
    }

    .legend-element label {
        font-size: 9px;
        font-weight: bold;
        margin-left: 1px;
    }

    .box{
        width:9px;
        height:9px;
        border-radius: 1px;
        /*padding-bottom: -1px;*/

    }
</style>
