<template>
  <div class="input-container">
    <input-text-area />
    <button-container />
  </div>
</template>

<script>
import ButtonContainer from './ButtonContainer.vue';
import InputTextArea from './InputTextArea.vue';

export default {
  components: {
    ButtonContainer,
    InputTextArea,
  },
  name: 'InputContainer',
  methods: {
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
