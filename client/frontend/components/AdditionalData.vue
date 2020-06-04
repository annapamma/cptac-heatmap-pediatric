<template>
    <div class="additional-data">
        <div class="sample-description">
            <img @click="displaySampleHistologyLinks"
                     src="../assets/histology-icon.png"
                     alt="links for histologic images"
                     title="links for histologic images">
            <img @click="displayClinicalData"
                     src="../assets/clipboard.png"
                     alt="links for clinical data"
                     title="links for clinical data">
        </div>
        <modal :height="'auto'" :scrollable="true" :draggable="true" :name="selectedSample">
            <div class="modal-content">
                <histology-display :sample="selectedSample"/>
            </div>
        </modal>
        <modal :height="'auto'" :scrollable="true" :draggable="true" :name="clinicalDataModalName">
            <div class="modal-content">
                <clinical-data-display :sample="selectedSample"/>
            </div>
        </modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import HistologyDisplay from "./HistologyDisplay.vue";
    import ClinicalDataDisplay from "./ClinicalDataDisplay.vue";

  export default {
      name: "AdditionalData",
      components: {
          ClinicalDataDisplay,
          HistologyDisplay
      },
      computed: {
          ...mapState({
              selectedSample: 'selectedSample',
          }),
          clinicalDataModalName() {
              return `${this.selectedSample}_clinical`
          }
      },
      methods: {
          displaySampleHistologyLinks() {
              if (!this.$store.state.selectedSample) {
                  return
              }
              this.$modal.show(this.$store.state.selectedSample);
          },
          displayClinicalData() {
              if (!this.$store.state.selectedSample) {
                  return
              }
              this.$modal.show(`${this.$store.state.selectedSample}_clinical`);
              console.log('clicked clinical')
          },
      }
  }
</script>

<style scoped>
.additional-data img {
        width:1em;
        height:1em;
        margin: 5px;
        padding: 2px;
        border: solid 1px black;
        cursor: pointer;
    }
</style>
