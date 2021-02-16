<template>
  <div class="con">
    <div :id="domId" class="chart summary-chart" style="height: 100%"></div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue";
import Highcharts from "highcharts";

export default {
  props: [
    "title",
    "subtitle",
    "distance",
    "domId",
    "titleMargin",
    "titleMarginLeft",
    "height",
    "summary",
  ],
  setup(props) {
    const chart = ref(null);
    const getSummary = ref([]);

    console.log(props);

    onUpdated(() => {
      try {
        getSummary.value = [ ]
        props.summary.forEach((i) => {
          let summaryObj = {
            name: i.name === 'Not_Specified' ? `<div style="font-weight: 200; color: red;">Not Sure</div>` : i.name === null ? 'Not Sure' : `<div style="font-weight: 200; color: red;">${i.name}</div>`,
            y: i.value,
          };
          getSummary.value.push(summaryObj);
        });
      } catch (error) {
        console.log(error);
      }
      
      // var highchartsOptions = {
      //   chart: {
      //     type: "pie",
      //     renderTo: props.domId,
      //     height: props.height ? props.height : 216,
      //   },
      //   credits: {
      //     enabled: false,
      //   },
      //   tooltip: {
      //     enabled: false,
      //   },
      //   title: {
      //     text: `<b style="font-weight:normal;font-size:10px">${props.title}</b>`,
      //     align: "left",
      //     x: props.titleMarginLeft ? props.titleMarginLeft : 20,
      //     y: props.titleMargin ? props.titleMargin : 20,
      //     margin: 0,
      //   },
      //   legend: {
      //     align: 'right',
      //     layout: 'vertical'
      //   },
      //   subtitle: {
      //     text: props.subtitle,
      //     align: "left",
      //     x: props.titleMarginLeft ? props.titleMarginLeft : 20,
      //     y: 50,
      //   },
      //   xAxis: {
      //     allowDecimals: false,
      //     title: {
      //       text: "Age",
      //     },
      //   },
      //   yAxis: {
      //     title: {
      //       text: "Pot Value",
      //     },
      //     labels: {
      //       formatter: function () {
      //         return "£" + this.value / 1000 + "k";
      //       },
      //     },
      //     opposite: false,
      //   },
      //   plotOptions: {
      //     pie: {
      //       colors: ["#0f0221", "#136acd", "#dde2e6"],
      //       // allowPointSelect: true,
      //       cursor: "pointer",
      //       dataLabels: {
      //         enabled: true,
      //         formatter: function () {
      //           return (
      //             this.point.name +
      //             ": " +
      //             Math.round(this.percentage * 100) / 100 +
      //             " %"
      //           );
      //         },
      //         // format: '{point.name}: {point.y:.1f}%',
      //         distance: props.distance ? props.distance : 3,
      //       },
      //       size: 180,
      //       showInLegend: true,
      //     },
      //   },
      //   series: [
      //     {
      //       name: "Brands",
      //       colorByPoint: true,
      //       data: getSummary.value,
      //     },
      //   ],
      //   //   credits: false,
      // };
//       var highchartsOptions =  {
//   chart: {
//     plotBackgroundColor: null,
//     plotBorderWidth: null,
//     plotShadow: false,
//     type: 'pie',
//     renderTo: props.domId,
//     height: props.height ? props.height : 216,
//   },
//   title: {
//     text: `<b style="font-weight:normal;font-size:20px">${props.title}</b>`
//   },
//   legend:{
//     layout: 'vertical',
//     align: 'right'
//     // verticalAlign: 'top',
//     // floating: true,
//   },
//   tooltip: {
//     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//   },
//   accessibility: {
//     point: {
//       valueSuffix: '%'
//     }
//   },
//   plotOptions: {
//     pie: {
//       allowPointSelect: true,
//       cursor: 'pointer',
//       size: '100%',
//       dataLabels: {
//         enabled: false
//       },
//       showInLegend: true
//     }
//   },
//   series: [{
//     name: 'Brands',
//     colorByPoint: true,
//     data: getSummary.value
//   }]
// }

  // Make monochrome colors
// var pieColors = (function () {
//     var colors = [],
//         base = Highcharts.getOptions().colors[0],
//         i;

//     for (i = 0; i < 10; i += 1) {
//         // Start out with a darkened base color (negative brighten), and end
//         // up with a much brighter color
//         colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
//     }
//     return colors;
// }());

// Build the chart
var highchartsOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: props.domId,
        height: 250
    },
    title: {
        text: props.title
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            // colors: pieColors,
            colors: ["#0f0221", "#136acd", "#dde2e6", '#67a9cf', '#708eb1'],
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -40,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    series: [{
        name: 'Share',
        data: getSummary.value
    }]
}

      chart.value = new Highcharts.chart(highchartsOptions);
    });
    // Highcharts.setOptions({
    //   colors: ["brown", "purple", "#DDDF00"],
    // });
    // })

    onMounted(() => {
    //   getSummary.value = [
    //   {
    //     name: "Male",
    //     y: 50,
    //   },
    //   {
    //     name: "Female",
    //     y: 50,
    //   },
    // ];
    });

    return { chart, getSummary };
  },
};
</script>

<style scoped>
.con {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.chart {
  display: flex;
  align-items: center;
  width: 100% !important;
}

.chart div {
  width: 100%;
}

.summary-chart {
  width: 100% !important;
  /* box-shadow: 0px 1px 4px #02172E45; */
  /* border: 1px solid #DDE2E6; */
  border-radius: 22px;
  /* margin-bottom: 24px; */
}
</style>