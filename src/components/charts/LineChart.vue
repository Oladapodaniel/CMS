<script setup>
import { onUpdated, defineProps, ref } from "vue";
import Highcharts from "highcharts";

// Define the props
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  seriesData: {
    type: Array,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  domId: {
    type: String,
    required: true,
  },
});

const headerText = ref(null);

const initializeChart = () => {
  headerText.value = props.header;
  Highcharts.chart(props.domId, {
    chart: {
      type: "line",
    },
    title: {
      text: `<div class="fw-400 text-font s-20">${props.title ? props.title : ""}</div>`,
      align: "left",
      x: 10,
      margin: 50,
    },
    subtitle: {
      text: props.subtitle ? props.subtitle : "",
      align: "left",
      x: 70,
      y: 50,
    },
    xAxis: {
      categories: props.categories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: "",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: props.seriesData,
  });
};

onUpdated(() => {
  initializeChart();
});
</script>

<template>
  <div>
    <div class="d-flex">
      <div class="fw-500 s-24  text-dak mb-3">
        <p>{{ headerText }}</p>
      </div>
    </div>
  </div>
  <div :id="props.domId" style="width: 100%; height: 400px"></div>
</template>
