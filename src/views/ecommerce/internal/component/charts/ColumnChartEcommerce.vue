<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import Highcharts from "highcharts";

const props = defineProps(['domId'])
// ({
//     domId: {
//         type: "String",
//         required: true
//     }
// })
const chart = ref(null)
onMounted(() => {
    const highchartsOptions = {
      chart: {
        type: 'column',
        renderTo: props.domId
      },
      title: {
        text: '',
        align: 'left'
      },
      subtitle: {
        text:
          'Source: <a target="_blank" ' +
          'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
        align: 'left'
      },
      xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
        crosshair: true,
        accessibility: {
          description: 'Countries'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '100 metric tons'
        }
      },
      tooltip: {
        valueSuffix: ' (1000 MT)'
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Corn',
          data: [387, 200, 120, 640, 540, 300]
        },
        {
          name: 'Wheat',
          data: [41, 100, 10, 140, 10, 110]
        }
      ]
    }
    chart.value = new Highcharts.chart(highchartsOptions);
})

</script>

<template>
    <div class="chart-div" :id="domId" ref="chartDiv"></div>
</template>