export default (colorScale, ctx) => ({
  chart: {
    width: 800,
    minWidth: 800,
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
        const selectedPhosphoId = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].phospho_id;
        ctx.$store.dispatch(
          'updateSelectedDataPoint',
          {
            selectedSeries,
            selectedSample,
            selectedValue,
            selectedPhosphoId,
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
      left: 3,
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
      offsetY: 0,
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
