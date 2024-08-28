<template>
  <div></div>
  <div class="wrapper">
    <div class="" :id="domId" style="height: 100%" ref="chart"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Highcharts from "highcharts";
export default {
  components: {},

  props: ["domId", "columndata", "xAxisData", "yAxis", "desc"],

  setup(props) {
    const chart = ref(null);
    const headerText = ref(null);

    onMounted(() => {
      headerText.value = props.header;

      var highchartsOptions = {
        chart: {
          type: "column",
          renderTo: props.domId,
        },
        title: {
          text: props.desc,
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        xAxis: {
          categories: props.xAxisData,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: props.yAxis,
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:">{series.name}:</td>' +
            '<td style="padding:"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },

        series: props.columndata,
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });

    return {
      chart,
      headerText,
    };
  },
};
</script>
