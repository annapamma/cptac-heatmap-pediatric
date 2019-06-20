<template>
  <div class="input-container">
        <!--<button @click="sortAscending" style="background-color: gray;">Sort ascending</button>-->
    <!--<button @click="goToSingleDisease('Ganglioglioma')" style="background-color: #00FFFF;">Ganglioglioma</button>-->
    <!--<button @click="goToSingleDisease('Ependymoma')" style="background-color: #00FF40;">Ependymoma</button>-->
    <!--<button @click="goToSingleDisease('Craniopharyngioma')" style="background-color: #FFBF00;">Craniopharyngioma</button>-->
    <!--<button @click="goToSingleDisease('LGG')" style="background-color: #9F72FF;">LGG</button>-->
    <!--<button @click="goToSingleDisease('HGG')" style="background-color: #3249DC;">HGG</button>-->
    <!--<button @click="goToSingleDisease('ATRT')" style="background-color: #B30303;">ATRT</button>-->
    <!--<button @click="goToSingleDisease('Medulloblastoma')" style="background-color: #FF7ECF;">Medulloblastoma</button>-->
    <input-text-area />
    <button-container />
    <data-container />
  </div>
</template>

<script>
import ButtonContainer from './ButtonContainer.vue';
import InputTextArea from './InputTextArea.vue';
import DataContainer from './DataContainer.vue';

export default {
  components: {
    DataContainer,
    ButtonContainer,
    InputTextArea,
  },
  name: 'InputContainer',
  methods: {
    goToSingleDisease() {},
  },
};
</script>

<style scoped>
  .input-container {
    display: flex;
    flex-direction: column;
    width: 18%;
    height: 100%;
    /*background-color: pink;*/
    /*border: solid 1px black;*/
    margin-top: 2px;
  }
</style>
