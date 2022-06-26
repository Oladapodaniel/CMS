<template>
  <div class="container container-top container-wide mb-4">
    <div class="row d-flex justify-content-between px-3">
      <div class="heading-text">New Convert Performance Report</div>
      <div
        class="default-btn mb-2 font-weight-normal border-secondary c-pointer"
        @click="() => (showExport = !showExport)"
        style="width: fixed; position: relative"
      >
        Export &nbsp; &nbsp; <i class="pi pi-angle-down"></i>
        <div
          class="c-pointer"
          style="width: 6rem; z-index: 1000; position: absolute"
          v-if="showExport"
        >
          <Listbox
            @click="downloadFile"
            v-model="selectedFileType"
            :options="bookTypeList"
            optionLabel="name"
          />
        </div>
      </div>
    </div>

    <!-- date area -->
    <div class="container-fluid my-2 pt-4 pb-5 bg-area">
      <div class="row px-4 w-100 ml-md-5 px-sm-4 mt-sm-3">
        <div class="col-md-4 col-sm-12 px-md-0">
          <div class="p-field p-col-12 pt-md-2 pb-2">
            <div>
              <label for="icon" class="mb-0 font-weight-bold">Start Date</label>
            </div>
            <Calendar
              dateFormat="dd/mm/yy"
              class="w-100"
              id="icon"
              v-model="startDate"
              :showIcon="true"
            />
          </div>
        </div>
        <div class="col-md-4 col-sm-12 pr-md-0">
          <div class="p-field p-col-12 pt-md-2">
            <div>
              <label for="icon" class="mb-0 font-weight-bold">End Date</label>
            </div>
            <Calendar
              dateFormat="dd/mm/yy"
              class="w-100"
              id="icon"
              v-model="endDate"
              :showIcon="true"
            />
          </div>
        </div>
        <div class="col-md-4 col-sm-12 pr-md-0">
          <div class="p-field p-col-12 pt-md-2">
            <button
              class="
                default-btn
                generate-report
                c-pointer
                font-weight-normal
                mt-4
              "
              @click="generateReport"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="element-to-print">
      <div class="container-fluid">
        <div class="row w-100"></div>
        <div
          class="row"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <div
            class="col-12 container-fluid round-border mt-3 d-flex flex-wrap"
          >
            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
              <div class="col-12 text-center">
                <div class="col-12 font-weight-bold">Gender Distribution</div>
                <div class="col-12">
                  <PerformancePieChart
                    domId="chart2"
                    distance="5"
                    :titleMargin="10"
                    :summary="mappedGender"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
              <div class="col-12 text-center mt-3 mt-sm-0 mt-md-0 mt-lg-0">
                <div class="col-12 font-weight-bold">Marital Status</div>
                <div class="col-12">
                  <PerformancePieChart
                    domId="chart3"
                    distance="5"
                    :titleMargin="10"
                    :summary="mappedMaritalStatus"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div
          class="
            container-fluid
            mt-4
            table-main
            px-0
            remove-styles2 remove-border
            responsiveness
          "
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <table
            class="table remove-styles mt-0 table-hover table-header-area"
            id="table"
          >
            <thead class="table-header-area-main">
              <tr class="text-capitalize text-nowrap" style="border-bottom: 0">
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Home Address</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody
              class="font-weight-bold text-nowrap"
              style="font-size: small"
            >
              <tr
                v-for="(NewConvert, index) in newConvertInChurch"
                :key="index"
              >
                <td>{{ NewConvert.lastName }} {{ NewConvert.firstName }}</td>
                <td>{{ NewConvert.mobilePhone }}</td>
                <td>{{ NewConvert.email }}</td>
                <td>{{ NewConvert.homeAddress }}</td>
                <td>{{ NewConvert.gender }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Calendar from "primevue/calendar";
import axios from "@/gateway/backendapi";
import PerformancePieChart from "../../../components/charts/ReportPieChart.vue";
import PerformanceColumnChart from "../../../components/charts/ColumnChart.vue";
import Listbox from "primevue/listbox";
import MultiSelect from "primevue/multiselect";
import dateFormatter from "../../../services/dates/dateformatter";
import exportService from "../../../services/exportFile/exportservice";
import printJS from "print-js";
export default {
  components: {
    Listbox,
    MultiSelect,
    PerformancePieChart,
    PerformanceColumnChart,
    Calendar,
  },
  setup() {
    const showReport = ref(false);
    const pieChart = ref([
      {
        name: "First Timer ",
        color: "#002044",
        data: [0, 3, 13, 14, 0, 15, 20, 20],
      },
    ]);
    const startDate = ref("");
    const endDate = ref("");
    const newConvertInChurch = ref([]);
    const genderChartResult = ref([]);
    const maritalStatusChartResult = ref([]);
    const eventDateChartResult = ref([]);
    const attendanceSeries = ref("weekly");
    const attendanceData = ref([]);
    const mainAttendanceData = ref([]);
    const showExport = ref(false);
    const fileName = ref("");
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
    ]);
    const selectedFileType = ref("");
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);

    const attendanceChart = computed(() => {
      if (newConvertInChurch.value.length === 0) return [];
      attendanceData.value = [];
      mainAttendanceData.value = [];
      newConvertInChurch.value.forEach((i) => {
        let attendanceIndex = Object.keys(i).findIndex(
          (i) => i === "activityDate"
        );
        let attendanceValue = Object.values(i)[attendanceIndex];
        attendanceData.value.push(attendanceValue);
      });
      mainAttendanceData.value.push({
        name: "Attendance",
        color: "#002044",
        data: attendanceData.value,
      });
      return mainAttendanceData.value;
    });
    const genderChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      genderChartResult.value = [];
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object
      for (const prop in result) {
        // genderChartResult.value
        console.log(prop, result[prop]);
        genderChartResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
      console.log(genderChartResult.value);
    };

    const mappedGender = computed(() => {
      if (genderChartResult.value.length === 0) return [];
      return genderChartResult.value.map((i) => i);
    });

    const maritalStatusChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      maritalStatusChartResult.value = [];
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object
      // genderChartResult.value
      for (const prop in result) {
        // genderChartResult.value
        console.log(prop, result[prop]);
        maritalStatusChartResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
      console.log(maritalStatusChartResult.value);
    };

    const mappedMaritalStatus = computed(() => {
      if (maritalStatusChartResult.value.length === 0) return [];
      return maritalStatusChartResult.value.map((i) => i);
    });
    const eventDateChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      eventDateChartResult.value = [];
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object
      // genderChartResult.value
      for (const prop in result) {
        // genderChartResult.value
        console.log(prop, result[prop]);
        eventDateChartResult.value.push({
          name: prop,
          //   value: result[prop].length
        });
      }
      console.log(eventDateChartResult.value);
    };

    const mappedEventDate = computed(() => {
      if (eventDateChartResult.value.length === 0) return [];
      return eventDateChartResult.value.map((i) => formatDate(i.name));
    });

    const generateReport = () => {
      axios
        .get(
          `/api/Reports/people/getFirstTimersReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}`
        )
        .then((res) => {
          newConvertInChurch.value = res.data;
          genderChart(res.data, "gender");
          maritalStatusChart(res.data, "maritalStatus");
          eventDateChart(res.data, "activityDate");
          setTimeout(() => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
              document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
              document.getElementById("table")
            );
          }, 1000);
          showReport.value = true;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const downloadFile = () => {
      exportService.downLoadExcel(
        selectedFileType.value.name,
        document.getElementById("element-to-print"),
        fileName.value,
        fileHeaderToExport.value,
        fileToExport.value
      );
    };
    const formatDate = (date) => {
      return dateFormatter.normalDate(date);
    };

    return {
      attendanceChart,
      mainAttendanceData,
      attendanceData,
      genderChartResult,
      attendanceSeries,
      maritalStatusChart,
      genderChart,
      eventDateChart,
      mappedGender,
      mappedMaritalStatus,
      mappedEventDate,
      maritalStatusChartResult,
      eventDateChartResult,
      startDate,
      endDate,
      generateReport,
      showReport,
      pieChart,
      showExport,
      fileName,
      bookTypeList,
      selectedFileType,
      fileToExport,
      fileHeaderToExport,
      printJS,
      // downLoadExcel,
      downloadFile,
      formatDate,
      newConvertInChurch,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.show-report {
  display: block;
}
.hide-report {
  display: none;
}

/* .default-btn {
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 3rem;
    padding: .5rem 1.25rem;
    width: auto;
	border:none;
    max-height: 40px;
    background: #6c757d47 !important;
    color:#000;
    text-decoration: none;
    min-width: 121px;
} */

.default-btn:hover {
  text-decoration: none;
}

.generate-report {
  font-size: 1rem;
  color: #fff;
  background-color: #136acd !important ;
  border: none;
  min-width: 7rem;
}

.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.round-border {
  border-radius: 0.5rem;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
}
.bg-area {
  background-color: #ebeff4;
  border-radius: 0.5rem;
  padding: 0.2rem 0 1.2rem 0;
}

.table {
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem;
}

.table-header-area {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.table-header-area-main {
  background-color: #ebeff4;
}

.table-main {
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45 !important;
  border: 0.063rem solid #dde2e6 !important;
  border-radius: 30px !important;
  text-align: left !important;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem !important;
}

.remove-styles {
  border: none !important;
  box-shadow: none !important;
  border-bottom: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.remove-styles2 {
  padding-right: 0;
  padding-left: 0;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  /* overflow-x: scroll; */
}
.move-enter-active {
  animation: move-in 0.8s;
}
.move-leave-active {
  animation: move-in 0.8s reverse;
}
@keyframes move-in {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.remove-border {
  box-shadow: none !important;
}

.p-multiselect {
  width: 18rem;
}

.multiselect-custom {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}

.country-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-flex;
  margin-right: 0.5rem;
  /* background-color:  */
  /* background-color: var(--primary-color); */
  /* color: var(--primary-color-text); */
}
img.flag {
  width: 17px;
}

@media screen and (max-width: 640px) {
  .p-multiselect {
    width: 100%;
  }
}
</style>