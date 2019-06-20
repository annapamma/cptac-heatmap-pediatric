<template>
  <div class="input-text-area">
      <textarea v-model="geneInput" id="gene-input" :placeholder="'Paste gene list'"></textarea>
  </div>
</template>

<script>
export default {
  name: 'InputTextArea',
  data() {
    return {
      geneInput: '',
    };
  },
};
</script>

<style scoped>
  .input-text-area {
    width: 80%;
    /*background-color: lightblue;*/
    margin: 10px auto;
  }

  .input-text-area textarea {
    width: 100%;
    min-height: 150px;
    margin: 10px auto;
    border: 1px solid black;
  }
</style>
