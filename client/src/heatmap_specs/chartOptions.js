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
      mounted() {
        let graph = document.getElementsByClassName('apexcharts-inner apexcharts-graphical')[0];
        graph.setAttribute("transform", "translate(163, 0)");
        let allSeries = document
          .getElementsByClassName('apexcharts-series apexcharts-heatmap-series')[0];
        console.log('all series? ', allSeries)
        let seriesHeight = parseFloat(allSeries.firstElementChild.getAttribute("height"));
        console.log(seriesHeight)
        // let seriesYCoordinates = [];
        // let seriesHeightCoordinates = [];
        // for (let series of allSeries) {
        //   if (series.firstElementChild) {
        //     seriesYCoordinates.push(series.firstElementChild.getAttribute("y"));
        //     seriesHeightCoordinates.push(series.firstElementChild.getAttribute("height"));
        //   } else {
        //     seriesYCoordinates.push('skip');
        //     seriesHeightCoordinates.push('skip');
        //   }
        // }
        // console.log('seriesYCoordinates!!! ', seriesYCoordinates);
        // console.log('seriesHeightCoordinates!!! ', seriesHeightCoordinates);
        //
        let allYAxes = document.getElementsByClassName('apexcharts-yaxis-texts-g')[0].children;
        for (let i = 1; i < allYAxes.length; i++) {
          let yAxis = allYAxes[i];
          console.log('y axis el: ', yAxis);
          yAxis.setAttribute('y', (i * seriesHeight - (seriesHeight/3)).toString());
          yAxis.setAttribute('height', seriesHeight.toString());
          yAxis.style['vertical-align'] = 'top'
        }
        //   if (i===0) {
        //     let yAxis = allYAxes[i];
        //     yAxis.setAttribute('y', '0');
        //   } else {
        //     let expectedCoord = seriesYCoordinates[i];
        //     if (expectedCoord !== 'skip') {
        //       let yAxis = allYAxes[i];
        //       yAxis.setAttribute('y', seriesYCoordinates[i-1]);
        //       yAxis.setAttribute('height', seriesHeightCoordinates[i-1]);
        //     }
        //   }
        //   // console.log('Y axis!!! ', typeof boop, boop);
        //
        // }
        // for (let yAxis of allYAxes) {
        //   let label =
        // }
          // .map((el) => {
          //   console.log('IN MAP: ', el)
          // });
        // console.log(rectangles)
        let yAxis = document.getElementsByClassName('apexcharts-yaxis')[0];
        yAxis.setAttribute("transform", "translate(139, 0)");
      },
      dataPointSelection(event, chartContext, config) {
        const { dataPointIndex } = config;
        const { seriesIndex } = config;
        const selectedSeries = chartContext.series.w.config.series[seriesIndex].name;
        const selectedSample = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].x;
        const selectedValue = chartContext.series.w.config.series[seriesIndex].data[dataPointIndex].value;
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
        value: 0
      }
    }
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
