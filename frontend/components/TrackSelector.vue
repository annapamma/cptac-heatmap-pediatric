<template>
    <div class="track-selector">
        <div id='tracks'>
            <h3>Select tracks to show</h3>
            <div v-for="(name, track) in availableTracks">
              <input type="checkbox" :id="track" :value="track" v-model="selectedTracks">
              <label :for="track">{{ name }}</label>
            </div>
        </div>
      <button @click="handleTrackSelection" style="background-color: lightgray;">
          Redraw
      </button>
    </div>
</template>

<script>
  export default {
    name: "track-selector",
    data() {
        return {
            availableTracks: {
                'methylation': 'Methy',
                'rna': 'mRNA',
                'cnv_lr': 'CNV (lr)',
                'protein': 'Protein',
                'mutation': 'Mut',
            },
            selectedTracks: [
                'methylation', 'rna', 'cnv_baf', 'protein', 'mutation', 'cnv_lr'
            ],
        }
    },
      methods: {
        handleTrackSelection() {
            this.$store.dispatch('updateSelectedTracks', this.selectedTracks)
        }
      }
  }
</script>

<style scoped>
.track-selector button {
    width: 100%;
    border-radius: 4px;
    border: solid 1px black;
    margin-top: 8px;
  }

    .tracks {
        display: flex;
        flex-direction: column;
    }
</style>
