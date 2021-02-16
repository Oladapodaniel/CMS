<template>
  <div>
    <div class="container pb-5">
      <div class="row mt-3 mb-4">
        <div class="col-md-12">
          <router-link to="/tenant/sms/sent" class="d-flex text-decoration-none">
            <span class="mr-2"><i class="fa fa-arrow-left back-icon"></i></span>
            <span> Back</span>
          </router-link>
        </div>
      </div>

      <div class="row grey-border py-2">
        <div class="col-md-4">
          <div class="row my-3">
            <div class="col-md-12 d-flex flex-column">
              <span>Status</span>
              <span class="status" v-if="!finished">Unfinished</span>
              <span class="status bg-success" v-else>Finished</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-12 d-flex flex-column">
              <span class="font-weight-bold units-used">{{ units }}</span>
              <span class="units-text">SMS Unit Used</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-12 d-flex flex-column">
              <span class="font-weight-bold units-used">{{ messages.length }}</span>
              <span class="units-text">Contacts</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
            <ReportChart domId="reportChart" title="" :height="400" :summary="statsData" :percentage="false" />
        </div>
        <div class="col-md-4">
          <SecondChart domId="reportBarChart" title="" :height="400" :summary="chartData" :percentage="true" />
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-12">
          <div class="row theader light-grey-bg py-2 font-weight-700">
            <div class="col-md-3">
              <span>Number</span>
            </div>
            <div class="col-md-3">
              <span>Recipient</span>
            </div>
            <div class="col-md-3">
              <span>Status</span>
            </div>
            <div class="col-md-3">
              <span>Date</span>
            </div>
          </div>
        </div>

        <div class="col-md-12 px-0">
          <hr class="hr mt-0" />
        </div>
      </div>

      <div class="row" v-for="(message, index) in messages" :key="index">
        <div class="col-md-12 py-2">
          <div class="row">
            <div class="col-md-3">
              <span class="hidden-header">Number</span>
              <span class="small-text">{{ message.recipient }}</span>
            </div>
            <div class="col-md-3">
              <span class="hidden-header">Recipient</span>
              <span class="small-text">{{ message.name }}</span>
            </div>
            <div class="col-md-3">
              <span class="hidden-header">Status</span>
              <span class="small-text" v-if="message.deliveryReport.includes('sent')">
                <!-- <Tag
                  class="p-mr-2"
                  severity="success"
                  :value="message.deliveryReport"
                  rounded
                ></Tag> -->
                sent
              </span>
              <span class="small-text text-danger" v-else-if="message.deliveryReport === 'failed'">
                <!-- <Tag
                  class="p-mr-2"
                  severity="error"
                  :value="message.deliveryReport"
                  rounded
                ></Tag> -->
                failed
              </span>
              <span class="small-text" v-if="message.deliveryReport === 'sms queued'">
                queued
              </span>
              <span class="small-text" v-if="message.deliveryReport === 'sms processed'">
                processed
              </span>
            </div>
            <div class="col-md-3 small-text">
              <span class="hidden-header">Date</span>
              <span>{{ formatDate(message.date) }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-12 px-0">
          <hr class="hr" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportChart from "@/components/charts/BarChart.vue";
import SecondChart from "@/components/charts/SecondReportPie.vue";
import { useRoute } from "vue-router";
import communicationService from "../../services/communication/communicationservice";
import { computed, ref } from "vue";

export default {
  components: { ReportChart, SecondChart },

  setup() {
    const route = useRoute();
    const messages = ref([]);
    const units = route.query.units;
    const loading = ref(false);
    const statuses = ["sent", "failed", "sms queued", "sms processed"];

    const getMessageReport = async () => {
      try {
          loading.value = true;
        const reportData = await communicationService.getMessageReport(
          route.params.messageId
        );
        console.log(reportData, "xxx");
        messages.value = reportData;
      } catch (error) {
          loading.value = false;
        console.log(error);
      }
    };

    getMessageReport();

    const doSMSAnalysis = (allSMS) => {
      const chartData = [];
      for (let status of statuses) {
          const count = allSMS.filter(i => i.deliveryReport === status).length;
        chartData.push({
          name: status.includes("queued") ? "queued" : status,
          y: +((count / allSMS.length) * 100).toFixed(2),
        });
      }
      return chartData;
    };

    const getSMSStats = (allSMS) => {
      const chartData = [];
      for (let status of statuses) {
          const count = allSMS.filter(i => i.deliveryReport.includes(status)).length;
        chartData.push({
          name: status.includes("queued") ? "queued" : status,
          y: count,
        });
      }
      return chartData;
    };

    const formatDate = (date) => {
      let formattedDate = " ";
      if (date) {
        const monthDay = new Date(date).toString().split(" ").slice(1, 3).join(" ");
        const time = new Date(date).toString().split(" ").slice(4, 5).join(" ").slice(0, 5);
        formattedDate = `${monthDay}, ${time}`;
      }
      return formattedDate;
    }

    const chartData = computed(() => {
        const data = doSMSAnalysis(messages.value);
        return data;
    })

    const statsData = computed(() => {
        const data = getSMSStats(messages.value);
        console.log(data, "stats data");
        return data;
    })

    const finished = computed(() => {
        const unsent = messages.value.filter(i => i.deliveryReport === "sms queued").length;
        console.log(unsent, "unsent");
        if (unsent > 0) return false;
        return true;
    })

    return {
      messages,
      units,
      chartData,
      loading,
      finished,
      statsData,
      formatDate,
    };
  },
};
</script>

<style scoped>
.back-icon {
  background: grey;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.status {
  background: grey;
  height: 30px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22px 0 0 22px;
}

.units-used {
  font-size: 30px;
}

.units-text {
  color: #0f529f;
  font-weight: 700;
}

.hidden-header {
  display: none;
}
</style>