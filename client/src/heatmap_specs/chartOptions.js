export default (colorScale, ctx) => ({
  chart: {
    type: 'heatmap',
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    events: {
      dataPointSelection(event, chartContext, config) {
        const { dataPointIndex } = config;
        const { seriesIndex } = config;
        const selectedSeries = chartContext.series.w.config.series[seriesIndex].name;
        const selectedSample = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].x;
        const selectedValue = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].y;
        ctx.$store.dispatch(
          'updateSelectedDataPoint',
          {
            selectedSeries,
            selectedSample,
            selectedValue,
          },
        );
      },
    },
  },
  plotOptions: {
    heatmap: {
      // shadeIntensity: 1,
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
    },
  },
  tooltip: {
    enabled: false,
  },
  animations: {
    enabled: false,
  },
});
