<template>
    <div class="heatmap">
        <div class="heatmap-gene-title">
            <a @click="displayGeneDetails">{{ gene }}</a>
        </div>
        <apexchart
            class="apex-container"
            :height="height"
            :options="options"
            :series="series"
          />
            <modal :height="'auto'" :scrollable="true" :draggable="true" :name="gene">
                <div class="modal-content">
                    <h3 class="modal-header">{{ gene }}</h3>
                    <div class="summary-text">{{ geneDetails ? geneDetails['summary'] : 'No information found'}}</div>
                    <div class="additional-links" v-if="geneDetails"><a :href="geneDetails ? geneDetails['url'] : ''" target="_blank">More at NCBI</a></div>
                </div>
            </modal>
    </div>
</template>

<script>
    export default {
        name: "heatmap",
        props: ['options', 'series', 'gene'],
        computed: {
            height() {
                return this.$store.state.heights[this.series.length];
            },
            geneDetails () {
                return this.$store.state.geneDetails[this.gene]
            },
        },
        methods: {
            displayGeneDetails () {
                this.$modal.show(this.gene);
            },
            hide () {
                this.$modal.hide(this.gene);
            }
        },
    }
</script>

<style>
  .apex-container {
    width: calc(100vw - 350px);
    min-width: 800px;
  }

  .apexcharts-canvas {
    height: 100%;
  }

  .apexcharts-legend {
    height: 100%;
  }

  .apexcharts-canvas {
    height: 100%;
  }

  .apexcharts-legend {
    height: 100%;
  }

  .apexcharts-heatmap-rect {
    stroke-width: 0 !important;
  }

  .apexcharts-heatmap-rect:hover {
      outline: black 1px solid !important;
      cursor: pointer;
      z-index: 100;
  }

  .apexcharts-yaxis {
    border: solid 1px black;
  }

    .heatmap-gene-title {
        padding: 0;
        margin-bottom: -30px;
        margin-top: -20px;
        font-weight: bold;
        font-size: 1em;
        color: black;
        position: relative;
        z-index: 99;
        cursor: pointer;
        text-align: center;
    }
    .heatmap-gene-title a {
        color: black;
    }
    .heatmap-gene-title a:hover {
        color: green;
    }

    .modal-header {
        margin: 10px auto -5px;
        text-align: center;
        padding-top: 2px;
    }
    .summary-text {
        padding: 15px;
    }
    .additional-links {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 15px;
    }

</style>
