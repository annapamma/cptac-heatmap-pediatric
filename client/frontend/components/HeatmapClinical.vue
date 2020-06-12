<template>
    <div class="heatmap-clinical">
        <apexchart
            class="apex-container"
            :height="height"
            :options="options"
            :series="series"
          />
    </div>
</template>

<script>
    export default {
        name: "HeatmapClinical",
        props: ['options', 'series'],
        computed: {
            height() {
                return this.$store.state.heights[this.series.length];
            },
        },
    }
</script>

<style>
  .apexcharts-canvas {
    height: 100%;
  }

  .apexcharts-legend {
    height: 100%;
  }

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
