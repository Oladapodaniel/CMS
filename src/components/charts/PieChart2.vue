<template>
  <div id="chart"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import Highcharts from "highcharts";

export default {
    name: "Chart1",
    props: ["chartType"],
  setup(props) {
    const chart = ref(null);
    onMounted(() => {
      var highchartsOptions = {
        chart: {
          type: "pie",
          renderTo: "chart",
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        title: {
          text: props.chartType,
        },
        xAxis: {
          allowDecimals: false,
          title: {
            text: "Age",
          },
        },
        yAxis: {
          title: {
            text: "Pot Value",
          },
          labels: {
            formatter: function () {
              return "£" + this.value / 1000 + "k";
            },
          },
          opposite: false,
        },
        plotOptions: {
          //   column: {
          //     pointPadding: 0.02,
          //     borderWidth: 0,
          //     groupPadding: 0.1,
          //     pointWidth: 2,
          //   },
          // bar: {
          //   pointPadding: 0,
          //   borderWidth: 1,
          //   groupPadding: 0.0,
          // },
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              distance: -50,
            },
          },
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: [
              {
                name: "Chrome",
                y: 61.41,
                sliced: true,
                selected: true,
              },
              {
                name: "Internet Explorer",
                y: 11.84,
              },
              {
                name: "Firefox",
                y: 10.85,
              },
              {
                name: "Edge",
                y: 4.67,
              },
            ],
          },
        ],
        //   credits: false,
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });

    return { chart };
  },
};
</script>

<style lang="scss" scoped>
</style>