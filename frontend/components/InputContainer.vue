<template>
  <div class="input-container">
    <input-text-area />
    <button-container />
    <track-selector v-if="selectedView === 'all'"/>
  </div>
</template>

<script>
import ButtonContainer from './ButtonContainer.vue';
import InputTextArea from './InputTextArea.vue';
import PathwayContainer from './PathwayContainer.vue';
import ViewDropdown from './ViewDropdown.vue';
import TrackSelector from "./TrackSelector.vue";

export default {
  components: {
      TrackSelector,
      ViewDropdown,
    PathwayContainer,
    ButtonContainer,
    InputTextArea,
  },
  name: 'InputContainer',
    computed: {
      selectedView() {
          return this.$store.state.selectedView;
      }
    }
};
</script>

<style scoped>
  .input-container {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100%;
    margin-top: 2px;
      padding: 10px;
      font-size: small;
  }
</style>
