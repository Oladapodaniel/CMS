<template>
    <div class="container container-top container-wide mb-4">
       <div class="row d-flex justify-content-between px-3">
              <div class="heading-text">People Report</div>
              <div class="default-btn border-secondary font-weight-normal c-pointer"
                @click="() => (showExport = !showExport)"
                style="width: fixed; position:relative">
                        Export &nbsp; &nbsp; <i class="pi pi-angle-down" ></i>
                        <div class=" c-pointer" style="width: 6rem; z-index:1000; position:absolute" v-if="showExport">
                              <Listbox @click="downloadFile" v-model="selectedFileType" :options="bookTypeList" optionLabel="name"/>
                        </div>
              </div>
        </div>
        <div class="container-fluid mt-2 ">
            <div class="row py-5 " style="background: #ebeff4;  border-radius: 0.5rem;">
                <div class="col-12 col-md-6 col-lg-3 mt-2 mt-sm-0 mt-md-0 mt-lg-0 ">
                    <div><label for="" class="font-weight-bold">Select Members</label></div>
                    <div>
                        <MultiSelect v-model="selectedMember" :options="memberShips" optionLabel="name" placeholder="Select Member" :filter="true" class="multiselect-custom w-100">
                            <template #value="slotProps">
                                <div class="country-item country-item-value bg-secondary font-weight-bold small" v-for="option of slotProps.value" :key="option.code">
                                    <div>{{option.name}}</div>
                                </div>
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    Select Member
                                </template>
                            </template>
                            <template #option="slotProps">
                                <div class="country-item">
                                    <div>{{slotProps.option.name}}</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>

                </div>
                <div class="col-12 col-md-6 col-lg-3 mt-2 mt-sm-0 mt-md-0 mt-lg-0 ">
                    <div class=""><label for="" class=" ml-2 font-weight-bold">Gender</label></div>
                    <div>
                        <MultiSelect v-model="selectedGender" :options="memberGender" optionLabel="name" placeholder="Select gender" :filter="true" class="multiselect-custom w-100">
                            <template #value="slotProps">
                                <div class="country-item country-item-value bg-secondary font-weight-bold small" v-for="option of slotProps.value" :key="option.code">
                                    <div>{{option.name}}</div>
                                </div>
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    Select Gender
                                </template>
                            </template>
                            <template #option="slotProps">
                                <div class="country-item">
                                    <div>{{slotProps.option.name}}</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 mt-2 mt-sm-0 mt-md-0 mt-lg-0 ">
                    <div><label for="" class="font-weight-bold">Marital Status</label></div>
                    <div>
                        <MultiSelect v-model="selectedMaritalStatus" :options="memberMaritalStatus" optionLabel="name" placeholder="Marital status" :filter="true" class="multiselect-custom w-100">
                            <template #value="slotProps">
                                <div class="country-item country-item-value bg-secondary font-weight-bold small " v-for="option of slotProps.value" :key="option.code">
                                    <div>{{option.name}}</div>
                                </div>
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    Marital status
                                </template>
                            </template>
                            <template #option="slotProps">
                                <div class="country-item">
                                    <div>{{slotProps.option.name}}</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <label for="" ></label>
                    <div class="mt-2" @click="genarateReport">
                        <button class=" default-btn generate-report c-pointer font-weight-normal ">Generate Report </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="element-to-print">
          <div  class="container-fluid ">
              <div  class="row" :class="{ 'show-report': showReport, 'hide-report' : !showReport}">
                  <!-- <div class="col-12 ">
                      <div class="mt-5 pb-2 text-center Display-1 heading-text">
                          Congregation Members Report
                      </div>
                  </div> -->
                  <div class="col-12 mt-4 round-border d-flex flex-wrap">
                      <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                      <div class="col-12 mt-sm-3 mt-md-0 mt-lg-2  text-center" >
                          <div class="col-12 font-weight-bold">Membership By Gender</div>
                          <!-- <div class="col-12" >No Data Available</div> -->
                          <div class="col-12">
                              <MembershipPieChart
                                  domId="chart1"
                                  distance="5"
                                  :titleMargin="10"
                                  :summary="mappedGender"
                              />
                          </div>
                      </div>
                  </div>
                  <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                      <div class="col-12  mt-3 mt-sm-3 mt-md-0 mt-lg-2 text-center" >
                          <div class="col-12  font-weight-bold">Membership By Marital Status</div>
                          <!-- <div class="col-12" :class="{ 'show-report': !showReport, 'hide-report' : showReport}">No Data Available</div> -->
                          <div class="col-12 " >
                              <MembershipPieChart
                                  domId="chart2"
                                  distance="5"
                                  :titleMargin="10"
                                  :summary="mappedMaritalStatus"
                              />
                          </div>
                      </div>
                  </div>
                  </div>
              </div>
              <!-- <div class="row" :class="{ 'show-report': showReport, 'hide-report' : !showReport}">
                <div class="col-12 table d-flex flex-wrap">
                    <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                      <div class="col-12 text-center mt-3 mt-sm-3 mt-md-0 mt-lg-2 " >
                          <div class="col-12  font-weight-bold ">Membership By Members</div>
                          <div class="col-12 ">
                              <MembershipPieChart
                                  domId="chart3"
                                  distance="5"
                                  :titleMargin="10"
                                  :summary="mappedMember"
                              />
                          </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-12  col-md-6 col-lg-6" >
                      <div class="col-12   text-center mt-3 mt-sm-3 mt-md-0 mt-lg-2  ">
                          <div class="col-12 w-100  font-weight-bold" >Membership By Age Group</div>
                          <div class="col-12 ">
                              <MembershipPieChart
                                  domId="char4"
                                  distance="5"
                                  :titleMargin="10"
                                  :summary="mappedAgeGroup"

                              />
                          </div>
                      </div>
                  </div>
                </div>
              </div> -->
          </div>
          <!-- <div > -->
              <!-- <div class="row "> -->
                  <section>
                      <!-- table header -->
                      <div v-if="membersInChurch[0]" class=" mt-4 container-fluid table-main px-0 remove-styles2 remove-border responsiveness  "
                      :class="{ 'show-report': showReport, 'hide-report' : !showReport}" >
                          <table class="table remove-styles mt-0 table-hover table-header-area " id="table" >
                          <thead class="table-header-area-main" >
                              <tr
                              class="text-capitalize text-nowrap"
                              style="border-bottom: 0"
                              >
                              <!-- <th scope="col">Church Activity</th> -->
                              <th scope="col">Membership</th>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Email</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Home Address</th>
                              <th scope="col">Birthday</th>
                              <!-- <th scope="col">Marital Status</th>
                              <th scope="col">Age Group</th>
                              <th scope="col">Birthday</th> -->
                              </tr>
                          </thead>
                          <tbody class=" small-text font-weight-bold text-nowrap" >
                              <tr v-for="(member, index) in membersInChurch" :key="index">
                              <!-- <td>{{member.churchActivity}}</td> -->
                              <td>{{member.membership}}</td>
                              <td>{{member.firstName}}</td>
                              <td>{{member.lastName}}</td>
                              <td>{{member.mobilePhone}}</td>
                              <td>{{member.email}}</td>
                              <td>{{member.gender}}</td>
                              <td>{{member.homeAddress}}</td>
                              <td>{{member.birthDay}}</td>
                              <!-- <td>{{member.maritalStatus}}</td>
                              <td>{{member.ageGroup}}</td>
                              <td>{{member.birthDay}}</td> -->
                              </tr>
                          </tbody>
                          </table>
                          <!-- <div class="table-foot d-flex justify-content-end mt-n3">
                          <PaginationButtons />
                          </div> -->
                      </div>
                      <!--end table header -->
                  </section>
        </div>
            <!-- </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import {computed, ref } from "vue";
import axios from "@/gateway/backendapi";
import MembershipPieChart from '../../../components/charts/ReportPieChart.vue';
// import PaginationButtons from "../../../components/pagination/PaginationButtons";
import Listbox from 'primevue/listbox';
import MultiSelect from 'primevue/multiselect';
// import ExcelExport from "../../../services/exportFile/exportToExcel"
// import InputText from 'primevue/inputtext';
import printJS from "print-js";
// import html2pdf from "html2pdf.js";
import exportService from "../../../services/exportFile/exportservice"
// import Piechart from "../../../components/charts/PieChart2.vue"
export default {
    components: {
        // GenderPieChart,
        // InputText,
        MembershipPieChart,
        // Dropdown,
        Listbox,
        MultiSelect,
        // PaginationButtons
         },
    setup() {
    const selectedMember = ref();
    const selectedGender = ref();
    const selectedMaritalStatus = ref();
    const showReport = ref(false)
    const memberShips = ref({});
    const memberMaritalStatus = ref({});
    const memberGender = ref({});
    // const genderSummary = ref([]);
    const membersInChurch = ref([]);
    const genderChartResult = ref([]);
    const memberChartResult = ref([]);
    const maritalStatusChartResult = ref([]);
    const ageGroupChartResult = ref([]);
    const showExport = ref(false);
    const fileName = ref("")
    const bookTypeList = ref([{ name : 'xlsx'}, { name: 'csv'}, {name: 'txt'}, {name: 'pdf'} ])
    const selectedFileType = ref("");
    const fileHeaderToExport = ref([])
    const fileToExport = ref([]);


   const genderChart = (array, key) => {
       // Accepts the array and key
      // Return the end result
        genderChartResult.value = []
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, []); // empty object is the initial value for result object
      // genderChartResult.value
      for (const prop in result) {
        // genderChartResult.value
        console.log(prop, result[prop])
        genderChartResult.value.push({
          name: prop,
          value: result[prop].length
        })
      }
      console.log(genderChartResult.value, "genderChartR")
    };

    const mappedGender = computed(() => {
      if (genderChartResult.value.length === 0) return []
      return genderChartResult.value.map(i => i)
    })
   const memberChart = (array, key) => {
       // Accepts the array and key
      // Return the end result
      memberChartResult.value = []
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
        console.log(prop, result[prop])
        memberChartResult.value.push({
          name: prop,
          value: result[prop].length
        })
      }
    };

    const mappedMember = computed(() => {
      if (memberChartResult.value.length === 0) return []
      return memberChartResult.value.map(i => i)
    })
   const maritalStatusChart = (array, key) => {
       // Accepts the array and key
      // Return the end result
       maritalStatusChartResult.value = []
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, []); // empty object is the initial value for result object
      // genderChartResult.value
      for (const prop in result) {
        // genderChartResult.value
        console.log(prop, result[prop])
        maritalStatusChartResult.value.push({
          name: prop,
          value: result[prop].length
        })
      }
      console.log(maritalStatusChartResult.value, "marital result")
    };

    const mappedMaritalStatus = computed(() => {
      if (maritalStatusChartResult.value.length === 0) return []
      return maritalStatusChartResult.value.map(i => i)
    })
   const ageGroupChart = (array, key) => {
       // Accepts the array and key
      // Return the end result
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
        console.log(prop, result[prop])
        // ageGroupChartResult.value = []
        ageGroupChartResult.value.push({
          name: prop,
          value: result[prop].length
        })
      }
    };

    const mappedAgeGroup = computed(() => {
      if (ageGroupChartResult.value.length === 0) return []
      return ageGroupChartResult.value.map(i => i)
    })

      const downloadFile = () => {
        exportService.downLoadExcel(selectedFileType.value.name, document.getElementById('element-to-print'), fileName.value, fileHeaderToExport.value, fileToExport.value)
      }

    const genarateReport = () => {
        const memberID =  selectedMember.value.map((i) => i.id)
        const genderID =  selectedGender.value.map((i) => i.id)
        const maritalStatusID = selectedMaritalStatus.value.map((i) => i.id)
        let body = {
        gender : genderID,
        maritalStatus : maritalStatusID,
        membershipStatus : maritalStatusID,
        membershipType : memberID
        }
        axios.post('/api/Reports/people/getAllContactsByParameterReport',body)
        .then((res) =>{
            console.log(res.data)
            membersInChurch.value = res.data;
            console.log(membersInChurch.value, 'allbyGideon')
            genderChart(res.data,'gender')
            maritalStatusChart(res.data,'maritalStatus')
            memberChart(res.data,'membership')
            ageGroupChart(res.data,'ageGroup')
            setTimeout(() => {
                        fileHeaderToExport.value = exportService.tableHeaderToJson(document.getElementsByTagName("th"))
                        fileToExport.value = exportService.tableToJson(document.getElementById("table"))
                    }, 1000)
                    
                    showReport.value = true;

        }).catch((error) =>{
            console.log(error)
        })

          showReport.value = true;

    }


    const getMemberClassification = async () => {
      try {
        axios
          .get('/api/Reports/people/getMemberClassification')
          .then((res) => {
            // tenantCurrency.value = res.data;
            memberShips.value = res.data;
            // console.log(res.data,'Fejiro');
          })
          .catch((err) => console.log(err));
        // donationSummary.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getMemberClassification();

    const getMaritalStatus = async () => {
      try {
        axios
          .get('/api/Reports/people/getMaritalStatus')
          .then((res) => {
            memberMaritalStatus.value = res.data;
            // console.log(res,'gideon');
          })
          .catch((err) => console.log(err));
        // donationSummary.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getMaritalStatus();

    const getGender = async () => {
      try {
        axios
          .get('/api/Reports/people/getGender')
          .then((res) => {
            memberGender.value = res.data;
            // console.log(res,'Samson');
          })
          .catch((err) => console.log(err));
        // donationSummary.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getGender();

     return {
        genarateReport,
        genderChartResult,
        memberChartResult,
        maritalStatusChartResult,
        ageGroupChartResult,
        genderChart,
        memberChart,
        maritalStatusChart,
        ageGroupChart,
        showReport,
        //  genderSummary,
        memberShips,
        memberMaritalStatus,
        memberGender,
        membersInChurch,
        mappedGender,
        mappedMember,
        mappedMaritalStatus,
        mappedAgeGroup,
        selectedMember,
        selectedGender,
        selectedMaritalStatus,
        showExport,
        fileName,
        bookTypeList,
        selectedFileType,
        fileToExport,
        fileHeaderToExport,
        printJS,
        // downLoadExcel,
        downloadFile
    }
}
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.show-report{
    display: block;
}
.hide-report{
    display: none;
}


    /* font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 3rem; */
    /* border: 1px solid #002044; */
    /* padding: .5rem 1.25rem;
    width: auto;
	border:none; */
    /* outline: transparent !important; */
    /* max-height: 40px;
    background: #6c757d47 !important;
    color:#000;
    text-decoration: none;
    min-width: 121px; */


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
.round-border{
   border-radius: 0.5rem;
   box-shadow: 0 0.063rem 0.25rem #02172e45;
   border: 0.063rem solid #dde2e6;
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

.remove-styles{
  border: none !important;
box-shadow: none !important;
    border-bottom: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.remove-styles2{
padding-right: 0;
padding-left: 0;
border-top-left-radius: 0 !important;
border-top-right-radius: 0 !important;
overflow-x: scroll;
}

.move-enter-active {
  animation: move-in .8s;
}
.move-leave-active {
  animation: move-in .8s reverse;
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

.remove-border{
    box-shadow: none !important;
}

.p-multiselect {
    width: 18rem;
}

.multiselect-custom {

        padding-top: .1rem;
        padding-bottom: .1rem;

}

    .country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
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