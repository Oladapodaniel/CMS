<template>
  <div class="container">
    <div class="container-fluid">
      <div class="row mb-4 px-0 overview">
        <div class="col-md-5 sub-header">
          Overview
        </div>

        <div class="col-md-4 mb-2 p-0 ">
          <Dropdown class="w-100"
              v-model="selectedContactOwner"
              :options="contactOwners"
              optionLabel="name"
              placeholder="Select contact owner"
              @change="getAllDatePeriods"
          />
        </div>
        <div class="col-md-3 p-0">
          <!-- <div class="mb-4 px-0 mr-n5"> -->
           <Dropdown class="w-100"
              v-model="selectedPeriod"
              :options="periodRange"
              optionLabel="name"
              placeholder="Select period"
              @change="getAllDatePeriods"
          />
        <!-- </div> -->
        </div>
      </div>

      <div class="row justify-content-between mother-row">
        <div class="col-md-2 item-Area mb-4">
          <div class="row p-2 mb-2 d-flex justify-content-between">
              <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                <i class="pi pi-users text-center"></i>
              </div>
              <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total">{{analyticsData.totalGuests}}</div>
          </div>
          <div class="row p-2">
              <p class="item-text ml-2">Total Guest</p>
          </div>
        </div>

        <div class="col-md-2 item-Area mb-4">
          <div class="row p-2 mb-2 d-flex justify-content-between">
              <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                <img class="trend-icon" src="/img/trend-icon.b63f0d8d.svg" alt="">
              </div>
              <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total pl-0">{{analyticsData.retentionRate}}%</div>
          </div>
          <div class="row p-2 ">
              <p class="item-text ml-2 text-truncate">Retention Rate</p>
          </div>
        </div>

        <div class="col-md-2 item-Area mb-4">
          <div class="row p-2 mb-2 d-flex justify-content-between">
              <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                <i class="pi pi-list text-center"></i>
              </div>
              <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total">{{analyticsData.averageActivity}}</div>
          </div>
          <div class="row p-2">
              <p class="item-text ml-2 text-truncate">Activity Involved</p>
          </div>
        </div>

        <!-- <div class="col-md-2 item-Area mb-4">
          <div class="row p-2 mb-2 d-flex justify-content-between">
              <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                <i class="pi pi-list text-center"></i>
              </div>
              <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total">{{analyticsData.averageActivity}}</div>
          </div>
          <div class="row p-2">
              <p class="item-text ml-2 text-truncate">Activity Involved</p>
          </div>
        </div> -->
      </div>
    </div>
      <div class="row mt-5 mother-row">
          <div class="col-md-6 col-12 mb-5">
            <div class="card">
                 <!-- <h5 class="p-2">Lifecycle Summary</h5> -->
                  <FunnelChart domId="funnel" :funneldata="analyticsData.lifeCycleSummary"/>
            </div>
          </div>
          <div class="col-md-6 col-12">
             <div class="card">
                  <!-- <h5 class="p-2">Retention Summary</h5> -->
                  <ColumnChart domId="column" :columndata="analyticsData.retentionSummary" :yAxis="`Number of Guest`" :desc="`Inflow Summary`"/>
            </div>
           </div>
      </div>

      <div class="row my-3 mother-row">
          <div class="col-md-6 col- mb-5">
            <div class="card">
                 <!-- <h5 class="p-2">Interested Visitors</h5> -->
                        <PieChart domId="piechart" :piedata1="analyticsData.interestedSummary" :data='name1' />
            </div>
          </div>
          <div class="col-md-6 col-12">
             <div class="card">
                <!-- <h5 class="p-2">Source Summary</h5> -->
                      <!-- <BarChart domId="barchart1"/> -->
                      <PieChart domId="piechart2" :piedata1="analyticsData.sourceSummary" :data="name2"/>
            </div>
           </div>
      </div>

  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import { onMounted, ref } from "vue";
import axios from "@/gateway/backendapi";
import FunnelChart from "@/components/charts/FunnelChart.vue";
import PieChart from "@/components/charts/FirstTimerPiechart.vue";
import ColumnChart from "../../components/charts/FirstTimersColumnchart.vue";
// import BarChart from "@/components/charts/FirstTimersBarchart.vue";
export default {
    components: {
        FunnelChart,
        PieChart,
        ColumnChart,
        Dropdown,
        // BarChart,
    },
    emits: ["firsttimers", "totalfirstimer"],
    setup(props, { emit }) {
      const name1 = ref('Interested Visitors')
      const name2 = ref('How Did You Hear About Us')
      const startDate = ref("");
      const endDate = ref("");
      const analyticsData = ref([]);
      const pieAnalyticsData = ref([]);
      const selectedPeriod = ref({})
      const periodRange = ref([
      {name: 'Last 30days', code:  new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString("en-US")},
			{name: 'Last 90days', code:  new Date(new Date().setDate(new Date().getDate() - 90)).toLocaleDateString("en-US")},
			{name: 'Last 120days', code: new Date(new Date().setDate(new Date().getDate() - 120)).toLocaleDateString("en-US")},
			{name: 'One Year', code: new Date(new Date().setDate(new Date().getDate() - 365)).toLocaleDateString("en-US")},
      ]);
      const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString("en-US");
      const defaultEndDate = new Date().toLocaleDateString("en-US")
      const contactOwners = ref([])
      const selectedContactOwner = ref({})


      const getAllDatePeriods = () => {
              let startDate = selectedPeriod.value.code
              let endDate = new Date().toLocaleDateString("en-US")

             if (selectedContactOwner.value && Object.keys(selectedContactOwner.value).length > 0) {
               axios.get(`/api/FirsttimerManager/analytics?startDate=${startDate}&endDate=${endDate}&personId=${selectedContactOwner.value.id}`).then((res)=> {
                    analyticsData.value = res.data.returnObject;
                    emit('firsttimers', res.data.returnObject.firsttimers)
                    console.log(analyticsData.value)
                }).catch((err)=> {
                  console.log(err)
                })
             }  else {
               axios.get(`/api/FirsttimerManager/analytics?startDate=${startDate}&endDate=${endDate}`).then((res)=> {
                  analyticsData.value = res.data.returnObject;
                  emit('firsttimers', res.data.returnObject.firsttimers)
                    console.log(analyticsData.value, 'srdhkughvukrj')
                }).catch((err)=> {
                  console.log(err)
                })
             }
      }



      const getContactOwners = () => {
             axios.get(`/api/FirsttimerManager/contactowners`).then((res)=> {
               console.log(res)
               contactOwners.value = res.data.map(i => {
                 i.name = i.firstName + ' ' + i.lastName
                 return i
               })
               console.log(contactOwners.value)
          }).catch((err)=> {
            console.log(err)
          })
      }
      getContactOwners()

      const showItem = () => {
              selectedPeriod.value = periodRange.value.find(i => i.name.includes("30"))
             axios.get(`/api/FirsttimerManager/analytics?startDate=${defaultStartDate}&endDate=${defaultEndDate}`).then((res)=> {
               analyticsData.value = res.data.returnObject;
               emit("totalfirstimer", res.data.totalGuests)
               console.log(analyticsData.value, 'segvsjldrkghvjkvbhjlk')
          }).catch((err)=> {
            console.log(err)
          })
      }
      showItem()

        return{
          name1,
          name2,
          startDate,
          endDate,
          analyticsData,
          pieAnalyticsData,
          periodRange,
          selectedPeriod,
          getAllDatePeriods,
          defaultStartDate,
          defaultEndDate,
          showItem,
          contactOwners,
          selectedContactOwner
        }
    },

}
</script>

<style scoped>

.overview{
  margin-left: -27px!important;
}

/* .header1{
text-align: left;
font: normal normal bold 34px/46px Nunito Sans;
letter-spacing: 0px;
color: #02172e;
opacity: 1;
} */

.sub-header{
    color: #136acd !important;
    /* margin: 0 10px; */
    margin-left: -1.75rem;
    color: #02172e;
    opacity: 0.8;
    font-size: 22px;
    font-weight: 600;
}

.mother-row{
      margin-left: -1.75rem!important;
}

.overview-Area{
border-radius: 30px;
box-shadow: 0px 3px 6px #2c28281c;
padding: 24px 10px;
padding-right: 10px;
padding-left: 10px;
background: #fff;
box-shadow: 0px 3px 6px #2c28281c;
border: 1px solid #00204424;
}

.item-Area{
border-radius: 5px;
/* margin-left: 1.5rem; */
padding: 0px 10px;
background: #fff;
border: 1px solid #00204424;
}

.item-text{
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #212529;
}

.item-total{
font-size: 20px;
font-weight: 500;
line-height: 1.2;
}

.top-icon-div{
color: #136acd;
font-size: 24px;
width:50px;
height:50px;
background: #f1f5f8;
padding: 4px;
border-radius: 50%;
}

.pi{
font-size: 1.5rem;
}

/* @media screen and (max-width: 500px) {
  .header1{
text-align: left;
font: normal normal bold 24px/36px Nunito Sans;
letter-spacing: 0px;
color: #02172e;
opacity: 1;
}

} */
</style>
