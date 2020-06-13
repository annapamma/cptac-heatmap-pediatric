<template>
    <div class="diagnosis-selector">
      <button
        v-for="(style, diagnosis) in diagnoses"
        class="diagnosis-button"
        :style="style"
        @click="selectDiagnosis(diagnosis)"
      >
        {{ acronyms.hasOwnProperty(diagnosis) ? acronyms[diagnosis] : diagnosis }}
      </button>
    </div>
</template>

<script>
    export default {
        name: "DiagnosisSelector",
        data() {
          return {
            diagnoses: {
              'Ganglioglioma': {
                'background-color': 'rgb(0, 255, 255, 0.75)',
                'color': '#000000',
              },
              'Ependymoma': {
                'background-color': '#00FF40',
                'color': '#000000',
              },
              'Craniopharyngioma': {
                'background-color': '#FFBF00',
                'color': '#000000',
              },
              'Low-grade glioma/astrocytoma': {
                'background-color': '#9F72FF',
                'color': '#000000',
              },
              'High-grade glioma/astrocytoma': {
                'background-color': 'rgb(50, 73, 220, 0.75)',
                'color': '#000000',
              },
              'Atypical Teratoid Rhabdoid Tumor (ATRT)': {
                'background-color': 'rgb(179, 3, 3, 0.75)',
                'color': '#000000',
              },
              'Medulloblastoma': {
                'background-color': '#FF7ECF',
                'color': '#000000',
              },
              'All': {
                'background-color': '#D3D3D3',
                'color': '#000000',
              },
            },
            acronyms: {
              'Low-grade glioma/astrocytoma': 'LGG',
              'High-grade glioma/astrocytoma': 'HGG',
              'Atypical Teratoid Rhabdoid Tumor (ATRT)': 'ATRT'
            }
          }
        },
      methods: {
          selectDiagnosis(diagnosis) {
            this.$store.dispatch('selectDiagnosis', diagnosis)
          }
      }
    }
</script>

<style scoped>
  .diagnosis-button {
    font-weight: bold;
    border: 1px solid black;
    border-radius: 2px;
    padding: 4px 10px;
  }
  .diagnosis-selector {
    display: flex;
    flex-direction: row;
    margin-right: -15px;
  }

  .diagnosis-selector > * {
    margin-right: 15px;
  }
</style>
