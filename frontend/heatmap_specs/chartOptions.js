export default (colorScale, ctx) => ({
  chart: {
      // width: '100%',
    minWidth: '800px',
    type: 'heatmap',
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    events: {
      updated() {
        // adjustYAxis();
      },
      mounted() {
        // adjustYAxis();
      },
      dataPointSelection(event, chartContext, config) {
        const { dataPointIndex } = config;
        const { seriesIndex } = config;
        const selectedSeries = chartContext.series.w.config.series[seriesIndex].name;
        const selectedSample = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].x;
        const selectedValue = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].value;
        const selectedPeptide = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].Peptide;
        const HGVSp_Short = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].HGVSp_Short;
        const selectedGene = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex]['gene'];
        ctx.$store.dispatch(
          'updateSelectedDataPoint',
          {
            selectedSeries,
            selectedSample,
            selectedValue,
            selectedPeptide,
            selectedGene,
              HGVSp_Short
          },
        );
      },
    },
  },
  plotOptions: {
    heatmap: {
      radius: 0,
      padding: 1,
      enableShades: false,
      colorScale,
    },
  },
  dataLabels: {
    enabled: false,
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'none',
        value: 0,
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    padding: {
      top: 0,
      right: 3,
      bottom: 0,
      left: 6,
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {

      minWidth: 190,
      offsetY: 100,
      // show: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  animations: {
    enabled: false,
  },
});

function adjustYAxis() {
  const graph = document.getElementsByClassName('apexcharts-inner apexcharts-graphical')[0];
  graph.setAttribute('transform', 'translate(163, 0)');
  const yAxis = document.getElementsByClassName('apexcharts-yaxis')[0];
  yAxis.setAttribute('transform', 'translate(139, 0)');
  const allSeries = document
    .getElementsByClassName('apexcharts-series apexcharts-heatmap-series')[0];
  const seriesHeight = parseFloat(allSeries.firstElementChild.getAttribute('height'));
  const allYAxes = document.getElementsByClassName('apexcharts-yaxis-texts-g')[0].children;
  for (let i = 1; i < allYAxes.length; i++) {
    const yAxis = allYAxes[i];
    yAxis.setAttribute('y', (i * seriesHeight - (seriesHeight / 3)).toString());
    yAxis.setAttribute('height', seriesHeight.toString());
    yAxis.style['vertical-align'] = 'top';
  }
}
