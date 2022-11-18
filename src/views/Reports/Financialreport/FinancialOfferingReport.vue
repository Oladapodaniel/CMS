<template>
    <div class="container container-top container-wide mb-4">
        <div class="row d-flex justify-content-between px-3">
          <div class="heading-text"> Offering And Contribution Report</div>
          <div class="default-btn font-weight-normal c-pointer"
                @click="() => (showExport = !showExport)"
                style="width: fixed; position:relative">Export &nbsp; &nbsp; <i class="pi pi-angle-down" ></i>
                <div class=" c-pointer" style="width: 6rem; z-index:1000; position:absolute" v-if="showExport">
                      <Listbox @click="downloadFile" v-model="selectedFileType" :options="bookTypeList" optionLabel="name"/>
                </div>
          </div>
          <!-- <div @click="() => showExport = !showExport" class="cursor-pointer default-btn border-0 bg-secondary d-flex align-items-center justify-content-center"><div>Export</div>&nbsp;&nbsp;<i class="pi pi-chevron-down"></i></div> -->
        </div>
        <!-- <transition name="move" mode="out-in">
          <div class="row my-4 " v-if="showExport">
              <div class="col-sm-5">
                  <span class="p-float-label">
                      <InputText id="inputtext" class="w-100" type="text" v-model="fileName" />
                      <label for="inputtext">Enter file name</label>
                  </span>
              </div>
              <div class="col-sm-4 mt-2 mt-sm-0 mt-md-0 mt-lg-0 ">
                  <Dropdown v-model="selectedFileType" class="w-100" :options="bookTypeList" placeholder="Select file type"  />
              </div>
              <div @click="downloadFile" class="col-sm-2 mt-2 mt-sm-0 mt-md-0 mt-lg-0 offset-sm-1"><div class="default-btn d-flex align-items-center  generate-report  c-pointer justify-content-center">Download</div></div>
          </div>
        </transition> -->
        <div class="col-12 pl-2 mt-3 py-2">
           This reports provides a detailed list of all the offerings and contribution reports, you can also generate report for individual contributions 
        </div>
        <div class="container-fluid ">
                <div class="row py-5  " style="background: #ebeff4;  border-radius: 0.5rem;">
                  <div class="col-9">
                      <div class="row">
                        <div class="col-md-6 col-sm-12 pr-md-0">
                            <div class="p-field p-col-11 pt-md-2 pb-2">
                              <div>
                                <label for="icon" class="mb-0 font-weight-bold">Start Date</label>
                              </div>
                              <Calendar dateFormat="dd/mm/yy" class="w-100" id="icon" v-model="startDate" :showIcon="true" />
                            </div>
                        </div>
                        <!-- <div class="p-field p-col-md-6 p-col-lg-12  font-weight-bold  mt-0">
                            <div><label for="icon">Start Date</label></div>
                            <Calendar id="icon" class="w-100" v-model="startDate" :showIcon="true" />
                        </div> -->
                         <div class="col-md-6 col-sm-12 pr-md-0">
                            <div class="p-field p-col-11 pt-md-2">
                              <div>
                                <label for="icon" class="mb-0 font-weight-bold">End Date</label>
                              </div>
                              <Calendar dateFormat="dd/mm/yy" class="w-100" id="icon" v-model="endDate" :showIcon="true" />
                            </div>
                        </div>

                        <!-- <div class="p-field p-col-md-6 p-col-lg-12 font-weight-bold mt-2 mt-sm-2 mt-md-0 mt-lg-0">
                            <div><label for="icon">End Date</label></div>
                            <Calendar id="endDate" class="w-100" v-model="endDate" :showIcon="true" />
                        </div> -->
                        <div class="col-md-6 col-sm-12 pr-md-0">
                          <div class="p-field  pt-md-2 p-col-12  font-weight-bold">
                              <div><label for="icon" class=" mb-0 font-weight-bold">Select Categories</label></div>
                              <!-- <div> -->
                                <MultiSelect v-model="selectedCategories" :options="Categories" optionLabel="name" placeholder="Select Categories" :filter="true" class="multiselect-custom w-100">
                                    <template #value="slotProps">
                                        <div class="country-item country-item-value bg-secondary font-weight-bold small" v-for="option of slotProps.value" :key="option.code">
                                            <div>{{option.name}}</div>
                                        </div>
                                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                                            Select Categories
                                        </template>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="country-item">
                                            <div>{{slotProps.option.name}}</div>
                                        </div>
                                    </template>
                                </MultiSelect>
                            <!-- </div>   -->
                          </div>
                        </div>
                        <div class=" col-sm-12 col-md-6 pr-md-0   pt-md-2 ">
                            <div><label for="" class=" mb-0 font-weight-bold ">Select Member</label></div>
                            <div class="dropdown ">
                              <!-- <button id="dropdownMenuButton" class="btn border-secondary default-btn" data-toggle="dropdown">{{ userSearchString ? userSearchString: 'Search Member' }}</button>  -->
                              <input type="text" class="form-control" style="height: 2.8rem;" 
                                        v-model="userSearchString"
                                        @input="searchForUsers"
                                        data-toggle="dropdown"
                                    />
                                <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton" >
                                    
                                    <a
                                    class="dropdown-item font-weight-700 small-text" href="#"
                                    v-for="(member, index) in searchedMembers"
                                    :key="index"
                                    @click="addExistingMember(member)"
                                    >{{ member.name }}</a>
                                    <a
                                    class="dropdown-item font-weight-700 small-text"
                                    href="#"
                                    v-if="
                                        searchingForMembers && searchedMembers.length === 0
                                    "
                                    ><i class="pi pi-spin pi-spinner"></i></a>
                                    <p
                                    class="modal-promt pl-1 bg-secondary m-0"
                                    v-if="
                                        userSearchString.length < 3 &&
                                        searchedMembers.length === 0
                                    "
                                    >
                                    Enter 3 or moore characters
                                    </p>
                                    <a
                                    class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                                    style="border-top: 1px solid #002044; color: #136acd"
                                    @click="showAddMemberForm"
                                    data-dismiss="modal"
                                    >
                                    </a>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-9 col-md-6 col-lg-3 mt-2">
                        <div style="height: 43%"></div>
                        <div @click="genarateReport">
                            <button class=" col-11 w-100 default-btn generate-report  "><div class="text-white">Generate Report</div></button>
                        </div>
                    </div> 
                  </div>
        </div>
        <div id="element-to-print">
          <div class="container-fluid  ">
              <!-- <div class="row" :class="{ 'show-report': showReport, 'hide-report' : !showReport}">
                  <div class="col-12 ">
                      <div class="mt-5 display-1 pb-2 font-weight-bold text-center heading-text" >
                        Offering And Givings Report
                      </div>
                  </div>
              </div> -->
              <div class="row" :class="{ 'show-report': showReport, 'hide-report' : !showReport}">
                <div class="col-12 round-border container-fluid d-flex mt-3 flex-wrap">
                    <!-- <div class="col-12 col-sm-12 col-md-12 col-lg-12"> -->
                        <!-- <div class="col-12   text-center" > -->
                            <!-- <div class="col-12 text-center" :class="{ 'show-report': showReport, 'hide-report' : !showReport}">No Data Available</div> -->
                             <div class="col-12 col-md-6 col-lg-6  " >
                                  <OfferingColumnChart
                                      domId="chart1"
                                      title="Offering Report"
                                      distance="5"
                                      :titleMargin="10"
                                      :data="offeringDetail"
                                      subtitle="Offering And Giving Data"
                                      :series="mappedOfferingCol"
                                      yAxisText = "Offering"
                                      
                                  />
                              </div>
                            
                        <!-- </div> -->
                    <!-- <div class="col-12 "> -->
                      <!-- <div class="col-12  text-center" > -->
                          <!-- <div class="col-12  font-weight-bold">Membership By Marital Status</div> -->
                          <!-- <div class="col-12 text-center" :class="{ 'show-report': !showReport, 'hide-report' : showReport}">No Data Available</div> -->
                           <div class="col-12 col-md-6 mt-3 col-lg-6  " >
                              <OfferingPieChart
                                domId="chart3"
                                  distance="5"
                                  :titleMargin="10"
                                  :summary="mappedOffering"
                              />
                            </div>
                         
                      <!-- </div> -->
                  <!-- </div> -->
                </div>
              </div>
          </div>
            <section>
                      <!-- table header -->
                  <div class=" mt-3 container-fluid table-main px-0 remove-styles2 remove-border responsiveness "
                  :class="{ 'show-report': showReport, 'hide-report' : !showReport}" >
                          <table class="table remove-styles mt-0  table-header-area " id="table">
                            <thead class="table-header-area-main">
                              <tr class="small-text text-capitalize text-nowrap" style="border-bottom: 0">
                                  <!-- <th class="">Group Name</th> -->
                                  <th scope="col">Offering name</th>
                                  <th scope="col">Event name</th>
                                  <th scope="col">Contact name</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Channel</th>
                              </tr>
                            </thead>
                            <tbody class="font-weight-bold text-nowrap" style="font-size: small;">
                                <tr v-for="(OfferingList, index) in offeringInChurch" :key="index">
                                <td>{{ OfferingList.contributionName }}</td>
                                <td>{{ OfferingList.eventName }}</td>
                                <td>{{ OfferingList.contactName }}</td>
                                <td>{{ OfferingList.amount.toLocaleString()}}.00</td>
                                <td>{{ formatDate(OfferingList.date) }}</td>
                                <td>{{ OfferingList.channel }}</td>
                                </tr>
                            </tbody>
                            <tbody class="font-weight-bolder text-nowrap"
                                        style="font-size: small">

                                 <tr class="answer-row2">
                                  <td class="gross-total">Total</td>
                                  <td></td>
                                  <td></td>
                                  <td class="gross-total responsive-horizontalrule">NGN {{sumTotal && sumTotal.amount ? sumTotal.amount.toLocaleString() : 0}}.00
                                    <hr class="horizontal-rule" />
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
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
    </div>
</template>

<script>

 import { computed, ref } from "vue";
 import Calendar from "primevue/calendar";
 import Listbox from 'primevue/listbox';
 import MultiSelect from 'primevue/multiselect';
 import axios from "@/gateway/backendapi";
//  import PaginationButtons from "../../../components/pagination/PaginationButtons";
 import OfferingPieChart from '../../../components/charts/ReportPieChart.vue';
 import OfferingColumnChart from "../../../components/charts/ReportColumnChart.vue";
 import membershipService from "../../../services/membership/membershipservice";
 import dateFormatter from  "../../../services/dates/dateformatter";
 import printJS from "print-js";
//  import html2pdf from "html2pdf.js"
//  import InputText from 'primevue/inputtext';
 import exportService from "../../../services/exportFile/exportservice"
 import groupArray from "../../../services/groupArray/groupResponse"
//  import Dropdown from "primevue/dropdown";

export default {
      components: {
        // Dropdown,
        // InputText,
        Listbox,
        OfferingPieChart,
        OfferingColumnChart,
        Calendar,
        groupArray,
        MultiSelect
        // PaginationButtons 
        },
    setup() {
        const Categories = ref({});
        const selectedCategories = ref([]);
        const showReport = ref(false);
        const startDate = ref("");
        const endDate = ref("");
        const selectedofferingCategory = ref();
        const userSearchString = ref("");
        const searchingForMembers = ref(false);
        const searchedMembers = ref([]);
        const offeringPersonID = ref('');
        const offeringInChurch = ref([]);
        const display = ref(false);
        const offeringData = ref([]);
        const offeringChartResult = ref([]);
        const offeringColumnChartResult = ref([]);
        // const pieChart= ref([])
        const mainOfferingData= ref([])
        const mappedOfferingCol = ref([])
        const columnData = ref([])
        const showExport = ref(false);
        const fileName = ref("")
        const bookTypeList = ref([{ name : 'xlsx'}, { name: 'csv'}, {name: 'txt'},{name: 'pdf'} ])
        const selectedFileType = ref("");
        const fileHeaderToExport = ref([])
        const fileToExport = ref([]);
         
        // onMounted(()=>{
        // pieChart.value = { name: "First Timer ", value: 2, name: "First Timer ", value: 2, };
        // })
      //   const sum = computed => {
      //   if (!arr || arr.length <= 0) return 0;
      //   const amounts = arr.map(OfferingList => OfferingList.amount);
      //   return Math.abs(amounts.reduce((a, b) => a + b))
      // }
        const sumTotal = computed (()=>{
          if(offeringInChurch.value.length === 0) return 0
           return offeringInChurch.value.reduce((a,b) => {
             return { amount: a.amount + b.amount }
            })
          
        })

    const offeringDetail = computed(() => {
        //  if (offeringInChurch.value.length === 0) return []
        //    offeringData.value = []
        //     mainOfferingData.value = []
        //     mappedOfferingCol.value = []
        //    offeringInChurch.value.forEach(i => {
        //     let offeringIndex = Object.keys(i).findIndex(i => i === 'amount')
        //     let offeringValue = Object.values(i)[offeringIndex]
        //     offeringData.value.push(offeringValue)  
        //     // console.log(offeringInChurch.value)  
        //     mappedOfferingCol.value.push(i.contributionName) 
        //  });
        //  mainOfferingData.value.push({
        //      name: 'Offering',
        //      color: '#002044',
        //      data: offeringData.value
        //  })
        //  console.log(mainOfferingData.value)
        //  return mainOfferingData.value  
        mappedOfferingCol.value = []
        mainOfferingData.value = []
        columnData.value = []
        
        if (offeringColumnChartResult.value.length === 0) return []
        offeringColumnChartResult.value.forEach(i => {
          let sumvalue = 0
          i.value.forEach(j => {
            console.log(j)
            sumvalue += +j.amount
          })
          
          mappedOfferingCol.value.push(i.name) 
          columnData.value.push(sumvalue)
          console.log(columnData.value)
        })
    
         mainOfferingData.value.push({
             name: 'Offering',
             color: '#002044',
             data: columnData.value
         })
  
        console.log(columnData)
        return mainOfferingData.value 
     })
     const offeringChart = (array, key) => {
       // Accepts the array and key
      // Return the end result
      offeringChartResult.value = []
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, []); // empty object is the initial value for result object
      for (const prop in result) {
        // genderChartResult.value
        console.log(prop, result[prop])
        offeringChartResult.value.push({
          name: prop,
          value: result[prop].length
        })
        offeringColumnChartResult.value.push({
          name: prop,
          value: result[prop]
        })
         
      }
      console.log(offeringChartResult.value,'giddy')
    };
    const mappedOffering = computed(() => {
      if (offeringChartResult.value.length === 0 ) return []
      return offeringChartResult.value.map(i => i)
    })

    const getMemberClassification = async () => {
      try {
        axios
          .get('/api/Financials/Contributions/Items')   
          .then((res) => {
            Categories.value = res.data;
            console.log(res.data,'Fejiro');
          })
          .catch((err) => console.log(err));
        // donationSummary.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getMemberClassification();

     const genarateReport = () => {
       offeringColumnChartResult.value = []
       if(offeringPersonID.value){
            let OfferingCategory = selectedCategories.value.map(i => i.id)
        //  console.log(OfferingCategory, 'MyGod');
          axios.post(`/api/Reports/financials/getContactContributionsReport?startDate=${new Date(startDate.value).toLocaleDateString("en-US")}&endDate=${new Date(endDate.value).toLocaleDateString("en-US")}&personID=${offeringPersonID.value}`, OfferingCategory )
          .then((res) => {
            console.log(res, "🎄🎄🎄");
            offeringInChurch.value = res.data;
            // console.log(offeringInChurch.value, "✌️✌️");
            offeringChart(res.data,'contributionName')
          //   maritalStatusChart(res.data,'maritalStatus')
          //   eventDateChart(res.data,'activityDate')
                      showReport.value = true;
                      
          })
          .catch((err) => {
            console.log(err);
            
          });
       }
       else{
         let OfferingCateringId = selectedCategories.value.map(i => i.id)
        //  console.log(OfferingPeopleId, 'Category id');
         axios.get(`/api/Reports/financials/getAllContactsAllContributionsReport?startDate=${new Date(startDate.value).toLocaleDateString("en-US")}&endDate=${new Date(endDate.value).toLocaleDateString("en-US")}&categories=${OfferingCateringId.join(',')}`)
         .then((res) =>{
           console.log(res);
           offeringInChurch.value = res.data;
           offeringChart(res.data,'contributionName')
            showReport.value = true;

         })
         .catch((err)=>{
           console.log(err)
         })
       }

    }
     const downloadFile = () => {
        fileHeaderToExport.value = exportService.tableHeaderToJson(document.getElementsByTagName("th"))
        fileToExport.value = exportService.tableToJson(document.getElementById("table"))
        exportService.downLoadExcel(selectedFileType.value.name, document.getElementById('element-to-print'), fileName.value, fileHeaderToExport.value, fileToExport.value)
      }

    const searchForUsers = () => {
          if (userSearchString.value.length >= 3) {
            startSearch(userSearchString.value);
          }
        };
    const startSearch = async (str) => {
          try {
            searchingForMembers.value = true;
            const response = await membershipService.searchMembers(str);
            searchingForMembers.value = false;
            searchedMembers.value = response;
          } catch (error) {
            searchingForMembers.value = false;
            console.log(error);
          }
        };
        const addExistingMember = (member) => {
          userSearchString.value = member.name;
          offeringPersonID.value = member.id
          // console.log(userSearchString.value, member)
        }
        const showAddMemberForm = () => {
          display.value = true;
        };
         const formatDate = (date) => {
      return dateFormatter.normalDate(date);
    };

        return{
            mainOfferingData,
            offeringDetail,
            offeringData,
            offeringChart,
            mappedOffering,
            mappedOfferingCol,
            offeringChartResult,
            display,
            startDate,
            formatDate,
            showAddMemberForm,
            addExistingMember,
            searchForUsers,
            selectedCategories,
            Categories,
            userSearchString,
            searchingForMembers,
            searchedMembers,
            offeringPersonID,
            offeringInChurch,
            endDate,
            showExport,
            fileName,
            bookTypeList, 
            selectedFileType,
            fileToExport,
            fileHeaderToExport,
            sumTotal,
            // tableToJson,
            // tableHeaderToJson,
            printJS,
            // downLoadExcel,
            downloadFile,
            // offeringCategory,
            genarateReport,
            showReport,
            selectedofferingCategory,
            offeringColumnChartResult,
            columnData
            // pieChart
            
        }
    },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.gross-total {
  font-weight: bolder;
  font-size: large;
  color: #fff;
}

.answer-row2 {
  background-color: #136acd;
}
.horizontal-rule {
  border-radius: 5px;
  margin: 0.125rem 0;
  background: white;
  height: 2px;
}

.responsive-horizontalrule {
  display: inline-block;
}

.answer{
  font-weight: bolder;
  color: rgb(0, 0, 0);
}
.answer-row{
  background-color: #d5d5d5;
  border-radius: 30px !important;
  border-bottom-left-radius:  50px !important;
  border-bottom-right-radius: 50px !important;
  font-weight: bold;
}

.answer-row:hover{
  background-color: #d1d1d1;
}
.table-row-bg {
    background: #ebeff4
}
.show-report{
    display: block;
}
.hide-report{
    display: none;
}
.round-border{
   border-radius: 0.5rem;
   box-shadow: 0 0.063rem 0.25rem #02172e45;
   border: 0.063rem solid #dde2e6;
}
.responsiveness{
  max-width: 100%;
  /* overflow-y: scroll; */
}
.table-main {
    width: 100% !important;
    box-shadow: 0 0.063rem 0.25rem #02172e45 !important;
    border: 0.063rem solid #dde2e6 !important;
    /* border-radius: 30px !important; */
    text-align: left !important;
    margin-bottom: auto !important;
    padding-bottom: 0.5rem !important;
}

.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

/* .default-btn { */
    /* font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 3rem;
    border: 1px solid #002044;
    padding: .5rem 1.25rem;
    width: auto;
	border:none;
    outline: transparent !important;
    max-height: 40px;
    background: #6c757d47 !important;
    color:#000;
    text-decoration: none;
    min-width: 121px; */
/* } */

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
