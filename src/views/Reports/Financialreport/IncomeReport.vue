<template>
  <div class="container-fluid px-5 mt-5">
     <div class="row d-flex justify-content-between px-3">
            <h3 class="heading-text ml-1">Basic Income And Revenue Reportee</h3>
            <!-- {{currencySymbol}} -->
            <div class="default-btn  font-weight-normal c-pointer"
                @click="() => (showExport = !showExport)"
                style="width: fixed; position:relative">Export &nbsp; &nbsp; <i class="pi pi-angle-down" ></i>
                <div class=" c-pointer" style="width: 6rem; z-index:1000; position:absolute" v-if="showExport">
                      <Listbox @click="downloadFile" v-model="selectedFileType" :options="bookTypeList" optionLabel="name"/>
                </div>
          </div>
            <!-- <div @click="() => showExport = !showExport" class="cursor-pointer default-btn border-0 bg-secondary d-flex align-items-center justify-content-center"><div>Export</div>&nbsp;&nbsp;<i class="pi pi-chevron-down"></i></div> -->
      </div>
      <!-- <div class="row my-4" v-if="showExport">
          <div class="col-sm-5">
              <span class="p-float-label">
                  <InputText id="inputtext" class="w-100" type="text" v-model="fileName" />
                  <label for="inputtext">Enter file name</label>
              </span>
          </div>
          <div class="col-sm-4">
              <Dropdown v-model="selectedFileType" class="w-100" :options="bookTypeList" placeholder="Select file type" />
          </div>
          <div @click="downloadFile" class="col-sm-2 offset-sm-1"><div class="default-btn d-flex align-items-center justify-content-center c-pointer exportButton">Export</div></div>
      </div> -->
    <!-- header area -->
    <div class="container">
      <div
        class="
          row
          d-flex
          flex-row
          justify-content-between
          mt-5
          align-items-center
        "
      >
      </div>
    </div>
    <!--end of header area -->

    <!-- date area -->
    <div class="container-fluid my-3  bg-area">
      <div
        class="row px-4 w-100 ml-md-5 px-sm-4 mt-sm-3"
      >
        <div class="col-md-4 col-sm-12 px-md-0">
          <div class="p-field p-col-12 pt-md-2 pb-2">
            <div>
              <label for="icon" class="mb-0 font-weight-bold">Start Date</label>
            </div>
            <Calendar id="icon" class="w-100"  dateFormat="dd/mm/yy" v-model="startDate" :showIcon="true" />
          </div>
        </div>
        <div class="col-md-4 col-sm-12 px-md-0">
          <div class="p-field p-col-12 pt-md-2">
            <div>
              <label for="icon" class="mb-0 font-weight-bold">End Date</label>
            </div>
            <Calendar id="endDate" class="w-100" v-model="endDate" :showIcon="true" dateFormat="dd/mm/yy"/>
          </div>
        </div>
        <div class="col-md-3 col-sm-12 pr-md-0">
          <div class="p-field p-col-12 pt-md-2">
            <button
              class="default-btn generate-report c-pointer font-weight-normal mt-4"
              @click="incomeEndPoint"
            >
            Generate Report
              <!-- Generate &nbsp; &nbsp; <i class="pi pi-angle-down"></i> -->
            </button>
          </div>
        </div>
      </div>
    </div>
    <section id="element-to-print" :class="{'hideClass' : !toggleReport, 'showClass':toggleReport}"> 
        <!-- chart area -->
          <div class="row chart-div">
                <div class="col-12 ">
                    <div class="my-5 text-center  serviceAttendance">
                       <!-- <span class="heading-text">INCOME STATEMENT</span> <span class="statement">-[Statement of Activities]</span>  -->
                    </div>
                </div>
                <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                    <div class="col-12 text-center" style="">
                        <!-- <div class="col-12  font-weight-bold pt-3">Membership By Marital Status</div> -->
                        <!-- <div class="col-12">No Data Available</div> -->
                        <div class="col-12 " style="">
                         <ColumnChart2
                            domId="chart"
                            title=""
                            :titleMargin="10"
                            :series="series"
                            :yAxisText="'Amount'"
                            :data="columnChartData"
                         />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div class="col-12 text-center">
                        <!-- <div class="col-12 font-weight-bold pt-3">Membership By Marital Status</div> -->
                        <!-- <div class="col-12">No Data Available</div> -->
                        <div class="col-12" style="">
                         <ByMaritalStatusChart
                            domId="chart1"
                            title=""
                            :titleMargin="10"
                            :summary="pieChartData"
                         />
                        </div>
                    </div>
                </div>
            </div>
      <!-- table header -->
      <div class="container-fluid table-main px-0 remove-styles2 remove-border my-5" >
        <table class="table remove-styles mt-0 table-responsive table-hover table-header-area" id="table">
          <thead class="table-header-area-main">
            <tr
              class="font-weight-bold text-capitalize text-nowrap"
              style="border-bottom: 0"
            >
              <th scope="col">Fund</th>
              <th scope="col">Account Category</th>
              <th scope="col">Account Name</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody class="font-weight-bold small-text text-nowrap" v-for="(group, index) in Array.from(series)" :key='index'>
              
            <tr v-for="(item, index) in accounts(group)" :key='index'>
              <td>{{item ? item.fund : ''}}</td>
              <td>{{item ? item.accountCategory : ''}}</td>
              <td>{{item.accountName ? item.accountName : ''}}</td>
              <td>{{item ? item.description : ''}}</td>
              <td>{{item && item.currency ? item.currency.symbol : ''}}{{item ?  Math.abs(item.amount) : ''}}</td>
              <td>{{item ? formatDate(item.date): ''}}</td>
            </tr>        
            <tr class="second-row">
              <td class="totalAmount">Total Income</td>
              <td></td>
              <td></td>
              <td></td>
              <td class="totalAmount">{{ currencySymbol }}{{numberWithCommas(grouped(group))}}</td>
              <td></td>
            </tr>  
          </tbody>
            <tr class="grand-total">
              <td class="gross-total">Grand Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td class="gross-total responsive-horizontalrule">{{ currencySymbol }}{{numberWithCommas(grandTotal)}}<hr class="horizontal-rule"></td>
              <td></td>
            </tr> 
        </table>
        <div class="table-foot d-flex justify-content-end mt-n3">
          <PaginationButtons />
        </div>
      </div>
      <!--end table header -->
    </section>
  </div>
</template>

<script>
import { ref, computed} from "vue";
import Calendar from "primevue/calendar";
import ByGenderChart from "@/components/charts/PieChart.vue";
import PaginationButtons from "../../../components/pagination/PaginationButtons";
import ByMaritalStatusChart from "@/components/charts/ReportPieChart";
import ColumnChart2 from "@/components/charts/ReportColumnChart";
// import InputText from 'primevue/inputtext';
// import Dropdown from "primevue/dropdown";
import Listbox from 'primevue/listbox';
import exportService from "../../../services/exportFile/exportservice"
import axios from "@/gateway/backendapi";
// import axioz from "axios";
import dateFormatter from  "../../../services/dates/dateformatter";
import groupResponse from  "../../../services/groupArray/groupResponse";

export default {
  components: {
    ByMaritalStatusChart,
    ColumnChart2,
    Calendar,
    ByGenderChart,
    PaginationButtons,
    // InputText,
    // Dropdown,
    Listbox
  },
  setup() {
    const startDate = ref("");
    const endDate = ref("");
    const membersInChurch = ref([]);
    const toggleReport = ref(false);
    const summary = ref([]);
    const columnChartData = ref([]);
    const series = ref([]);
    const showReport = ref(false)
    const incomeReportData = ref([])
    const currentUser = ref([])
    //   onMounted (() => {
    //        columnChartData.value = [
    //             {
    //                 name: "Male",
    //                 color: "#ddd",
    //                 data: [50],
    //             },
    //             {
    //                 name: "Female",
    //                 data: [50],
    //                 color: "#ddd",
    //             },
    //             {
    //                 name: "Both",
    //                 data: [30],
    //                 color: "#ddd",
    //             },
    //           ];
    //  })
     const pieChartData = ref([]);
     const fileName = ref("");
     const selectedFileType = ref("");
     const bookTypeList = ref([{ name : 'xlsx'}, { name: 'csv'}, {name: 'txt'},{name: 'pdf'} ])
     const fileHeaderToExport = ref([]);
     const fileToExport = ref([]);
     const getIncomeDetails = ref([]);
     const showExport = ref(false);
     const currencySymbol = ref('');
     const formatDate = (activityDate) => {
        return dateFormatter.monthDayYear(activityDate);
      };
     const groupedAccountName = ref({});

    const getIncomeDetailAccountName = computed(() => {
      if (getIncomeDetails.value.length === 0) return []
      const groupAccount = getIncomeDetails.value.map(i => i && i.accountName ? i.accountName : '' )
      const groupAccountSet = new Set(groupAccount)
      groupAccountSet.forEach(i => i)
      // return groupAccountSet
    })

     const incomeEndPoint = () => {
         axios
        .get(`/api/Reports/financials/getAccountTypeReport?startDate=${new Date(startDate.value).toLocaleDateString("en-US")}&endDate=${new Date(endDate.value).toLocaleDateString("en-US")}&accountType=2`)
        // .get(`/api/Reports/financials/getIncomeStatementReport?startDate=${new Date(startDate.value).toLocaleDateString("en-US")}&endDate=${new Date(endDate.value).toLocaleDateString("en-US")}`)
        .then((res) => {
          incomeReportData.value = res.data
           console.log(incomeReportData.value, 'incomereportData');
            pieChartData.value = [];
             toggleReport.value = true;
             getIncomeDetails.value = res.data
            const resMap = res.data.filter(i => i !== null)
            groupedAccountName.value = groupResponse.groupData(resMap, 'accountName')
             const accountNameMap = res.data.map(i => i && i.accountName ? i.accountName : '')
             const groupAccountName = new Set(accountNameMap)
             series.value = [...groupAccountName].filter(i => i !== "")
            console.log(groupAccountName, 'groupAccountName...');

            groupAccountName.forEach(i => {
              let initialValueSum = 0
              let responseFiltered = res.data.filter(j => j && j.accountName ? j.accountName === i : false)
              responseFiltered.forEach(i => {
                initialValueSum += Math.abs(i.amount)
              })
                const data = {
                    name: i,
                    value: initialValueSum
                }
                pieChartData.value.push(data)
            })

            columnChartData.value = constructChartData(res.data, groupAccountName);
    
            setTimeout(() => {
                fileHeaderToExport.value = exportService.tableHeaderToJson(document.getElementsByTagName("th"))
                fileToExport.value = exportService.tableToJson(document.getElementById("table"))
            }, 1000)
          
        }).catch((error) =>{
            console.log(error)
        })

          showReport.value = true;
    }
    const downloadFile = () => {
      exportService.downLoadExcel(selectedFileType.value.name, document.getElementById('element-to-print'), fileName.value, fileHeaderToExport.value, fileToExport.value)
    }

    // incomeEndPoint();
    const constructChartData  = (accounts, series) => {
        // console.log(series, 'SERIES...');
        const data = []
        series.forEach(i => {

            const datum = {
                name: i,
                color: getRandomColor(),
                data: Array.from( new Set(accounts.filter(j => j && j.accountName ? j.accountName === i : false)
                .map(i => Math.abs(i.amount))))
            }
            // console.log(datum, 'DATUM');
            data.push(datum)
            // console.log(i, 'groupAccountNameLLL');
        })
            // console.log(data, 'DATUM');
        return data;
    }
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const numberWithCommas = (x) => {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const grouped = (group) => {
      if (!groupedAccountName.value || !groupedAccountName.value[group] ) return 0
      // console.log(group)
      const sum = groupedAccountName.value[group]
        .filter(i => i.amount)
        .map(i => i.amount)
        .reduce((a, b) => a + b)
      // console.log(sum, "SUM");
      return Math.abs(sum);
    }

    const groupedCurrency = (group) => {
      if (!groupedAccountName.value || !groupedAccountName.value[group] ) return ''
      console.log(groupedAccountName, "groupedAccountName");
      console.log(group, 'group');
      return groupedAccountName.value[group].currency
    }
    const accounts = (group) => {
      // console.log(group, 'group111');
      // alert(group)
      if (!groupedAccountName.value || !groupedAccountName.value[group] ) return []
      return groupedAccountName.value[group]
    }
   
   const grandTotal = computed( () => {
     if (incomeReportData.value.length === 0 ) return 0
     if (incomeReportData.value.length > 0 ) {
       const totalAllGroupAmount = incomeReportData.value.filter(i => i !== null).map(i => i.amount).reduce((a,b) => a + b , 0)
    //  console.log(totalAllGroupAmount, 'bbb')
     return Math.abs(totalAllGroupAmount)
     }
   } )

  const getCurrentlySignedInUser = async() => {
      try {
          const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
          console.log(res.data, 'getCurrentlySignedIn User')
          currentUser.value = res.data
          currencySymbol.value = currentUser.value.currencySymbol
          console.log(currencySymbol.value, "currencySymbol");
      } catch (err) {
          /eslint no-undef: "warn"/
          NProgress.done();
          console.log(err);
       }
   }
   getCurrentlySignedInUser()

    return {
      summary,
      Calendar,
      grouped,
      accounts,
      groupedCurrency,
      startDate,
      grandTotal,
      endDate,
      membersInChurch,
      toggleReport,
      getIncomeDetails,
      pieChartData,
      columnChartData,
      series,
      showExport,
      fileName,
      showReport,
      selectedFileType,
      bookTypeList,
      fileHeaderToExport,
      fileToExport,
      getIncomeDetailAccountName,
      groupedAccountName,
      downloadFile,
      formatDate,
      incomeEndPoint,
      getRandomColor,
      numberWithCommas,
      incomeReportData,
      currencySymbol, 
      currentUser,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

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
.statement {
    font-size: 1rem;
    font: normal normal 700 1.5rem Nunito sans;
 }
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}
.totalAmount {
    font-weight: bolder;
    font-size: medium;
    color: #136acd;
    /* color: blue; */
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

 .chart-div{
        border: 1px solid #DDE2E6;
        border-radius: 10px;
        margin: 0 0 24px 0;
        box-shadow: 0px 1px 4px #02172E45;
        border: 1px solid #DDE2E6;
        padding: 25px 0;
    }
.remove-styles2{
 padding-right: 0;
 padding-left: 0;
 border-top-left-radius: 0 !important;
 border-top-right-radius: 0 !important;
}

.remove-border{
    box-shadow: none !important;
}
.hideClass {
    display: none;
}
.showClass { 
    display: block;
}
.pl-5, .px-5 {
    padding-left: 6rem !important;
}
.exportButton {
    font-weight: 800;
    font-size: 1rem;
    white-space: initial;
    border-radius: 3rem;
    border: 1px solid #136acd;
    padding: 0.5rem 1.25rem;
    color: black;
    width: auto;
    outline: transparent !important;
    max-height: 2.5rem;
    background: #fff;
    min-width: 7.6rem;
}
.second-row {
  /* vertical-align: bottom; */
  background:  #dee2e6;
}

.grand-total {
  background: #136acd;
}

.gross-total {
  font-weight: 800;
  font-size: 19px;
  color: #fff;
}

.horizontal-rule {
  border-radius: 5px;
  margin: 0.125rem 0;
  background: white;
  height: 3px;
}

.responsive-horizontalrule {
    display: inline-block;
}
</style>