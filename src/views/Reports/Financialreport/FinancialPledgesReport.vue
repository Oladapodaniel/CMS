<template>
    <div class="container-fluid">
        <div class="row justify-content-between">
            <div class="head-text">Dues, Pledges And Partnership Report</div>
            <div class="c-pointer my-sm-0 my-2">
                <el-dropdown trigger="click" class="w-100">
                    <div class="d-flex justify-content-between default-btn text-dark w-100" size="large">
                        <span class="mt-1">Export</span>
                        <div class="mt-1">
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(bookType, index) in bookTypeList" :key="index">
                                <a class="no-decoration text-dark" @click="downloadFile(bookType)">
                                    {{ bookType.name }}
                                </a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="row">
            <div class="pl-1">
                This reports provides a detailed list of all the Dues, pledges and
                partnership reports
            </div>
        </div>
        <div class="row py-5" style="background: #ebeff4; border-radius: 0.5rem">
            <div class="col-sm-12 col-12 ">
                <div class="row">
                    <div class="col-sm-12 col-md-4   pt-md-2 pr-md-0">
                        <div>
                            <label for="" class="mb-0 font-weight-bold">Select Member</label>
                        </div>
                        <MembersSearch @memberdetail="chooseContact" :currentMember="selectedContact" />
                    </div>
                    <div class="col-md-4 col-sm-12 mt-2 mt-md-0  pr-md-0">
                        <div class="p-field pt-md-2 p-col-12">
                            <div>
                                <label for="icon" class="mb-0 font-weight-bold">Select Categories</label>
                            </div>
                            <div>
                                <SelectAllDropdown :items="allPledgeDefinitionList" @selected-item="setSelectedCategory" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12 mt-2 mt-md-0 ">
                        <div class="p-field pt-md-2 p-col-12">
                            <div>
                                <label for="icon" class="mb-0 font-weight-bold">Select Status</label>
                            </div>
                            <div>
                                <SelectAllDropdown :items="allPledgeStatus" @selected-item="setSelectedStatus" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-12 mt-2 mt-md-0 pr-md-0">
                        <div class="p-field p-col-12 pt-md-2 pb-2">
                            <div>
                                <label for="icon" class="mb-0 font-weight-bold">Start Date</label>
                            </div>
                            <el-date-picker v-model="startDate" type="date" format="DD/MM/YYYY" size="large"
                                class="w-100" />
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-12  mt-1 mt-md-0 pr-md-0">
                        <div class="p-field p-col-11 pt-md-2 ">
                            <div>
                                <label for="icon" class="mb-0 font-weight-bold">End Date</label>
                            </div>
                            <el-date-picker v-model="endDate" type="date" format="DD/MM/YYYY" size="large" class="w-100" />
                        </div>
                    </div>
                    <div class="col-12 col-md-4 mt-2 d-flex justify-content-center">
                        <el-button class="c-pointer mt-4" :color="primarycolor" round :loading="loading"
                            @click="genarateReport">
                            Generate Report
                        </el-button>
                    </div>


                </div>
            </div>

        </div>
    </div>
    <div id="element-to-print" class="">
        <div class="container-fluid d-flex justify-content-center my-2" v-if="displayTitle">
            <div class="head-text">Pledges And Partnership Report</div>
        </div>
        <div class="container-fluid">
            <div class="row" :class="{ 'show-report': showReport, 'hide-report': !showReport }">
                <div class="col-12 round-border container-fluid d-flex mt-3 flex-wrap">
                    <div class="col-12 col-md-6 col-lg-6">
                        <OfferingColumnChart domId="chart1" title="Pledges and Partnership Report" distance="5"
                            :titleMargin="10" :data="offeringDetail" subtitle="Pledges And Partnership Data"
                            :series="mappedOfferingCol" yAxisText="Pledges" />
                    </div>

                    <div class="col-12 col-md-6 mt-3 col-lg-6">
                        <OfferingPieChart domId="chart3" distance="5" :titleMargin="10" :summary="mappedOffering" />
                    </div>
                </div>
            </div>
        </div>
        <section class="container-fluid">
            <!-- table header -->
            <div class="row">
                <div v-if="offeringInChurch.length > 0"
                    class="mt-3 container-fluid table-main px-0 remove-styles2 remove-border responsiveness"
                    :class="{ 'show-report': showReport, 'hide-report': !showReport }">
                    <table class="table remove-styles mt-0 table-header-area" id="table">
                        <thead class="table-header-area-main">
                            <tr class="small-text text-capitalize text-nowrap" style="border-bottom: 0">
                                <th scope="col">Status</th>
                                <th scope="col">Pledge no.</th>
                                <th scope="col">Pledge name</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Redeemed</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody class="font-weight-bold text-nowrap" style="font-size: small">
                            <tr v-for="(item, index) in offeringInChurch" :key="index">
                                <td>{{ item.status }}</td>
                                <td>{{ item.pledgeNumber }}</td>
                                <td>{{ item.pledgeItemName }}</td>
                                <td>{{ item.contact }}</td>
                                <td>{{ item && item.currencySymbol ? item.currencySymbol : "" }}
                                    {{ Math.abs(item.amount).toLocaleString() }}.00</td>
                                <td>{{ item.currencySymbol
                                }}{{ Math.abs(item.totalPaymentSum).toLocaleString() }}.00</td>
                                <td>{{ formatDate(item.date) }}</td>

                            </tr>
                        </tbody>
                        <tbody class="font-weight-bolder text-nowrap" style="font-size: small">
                            <tr class="answer-row2">
                                <td class="gross-total">Total in Naira</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="gross-total responsive-horizontalrule">
                                    <!-- NGN -->
                                    {{ pledgesInNaira && pledgesInNaira.length  > 0 && pledgesInNaira[0].currencySymbol === "₦" ?
                                        pledgesInNaira[0].currencySymbol : "" }}
                                    {{
                                        sumTotal && sumTotal.amount
                                        ? sumTotal.amount.toLocaleString()
                                        : 0
                                    }}.00
                                    <hr class="horizontal-rule" />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tbody class="font-weight-bolder text-nowrap" style="font-size: small">
                            <tr class="answer-row2">
                                <td class="gross-total">Total in Dollar</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="gross-total responsive-horizontalrule">

                                    {{ pledgesInDollars && pledgesInDollars.length > 0 && pledgesInDollars[0].currencySymbol === "$" ?
                                        pledgesInDollars[0].currencySymbol : "" }}
                                    {{
                                        sumTotalInDollars && sumTotalInDollars.amount
                                        ? sumTotalInDollars.amount.toLocaleString()
                                        : 0
                                    }}.00
                                    <hr class="horizontal-rule" />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--end table header -->
        </section>
    </div>
</template>
  
<script>
import { computed, ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import { ElMessage } from "element-plus";
import OfferingPieChart from "../../../components/charts/ReportPieChart.vue";
import OfferingColumnChart from "../../../components/charts/ReportColumnChart.vue";
import dateFormatter from "../../../services/dates/dateformatter";
import pledge from "../../../services/pledgemodule/pledgemodule";
import printJS from "print-js";
import SelectAllDropdown from "../ReportsDropdown.vue";
import MembersSearch from "../../../components/membership/MembersSearch.vue";
import exportService from "../../../services/exportFile/exportservice";
import groupArray from "../../../services/groupArray/groupResponse";

export default {
    components: {
        OfferingPieChart,
        MembersSearch,
        OfferingColumnChart,
        SelectAllDropdown,
        groupArray,
    },
    setup() {
        const Categories = ref([]);
        const showReport = ref(false);
        const displayTitle = ref(false);
        const primarycolor = inject("primarycolor");
        const startDate = ref("");
        const endDate = ref("");
        const selectedContact = ref({});
        const selectedStatus = ref({});
        const selectedCategory = ref({});
        const selectedofferingCategory = ref();
        const offeringPersonID = ref("");
        const offeringInChurch = ref([]);
        const allPledgeDefinitionList = ref([]);

        const offeringData = ref([]);
        const offeringChartResult = ref([]);
        const offeringColumnChartResult = ref([]);

        const mainOfferingData = ref([]);
        const mappedOfferingCol = ref([]);
        const columnData = ref([]);
        const showExport = ref(false);
        const loading = ref(false);
        const fileName = ref("Pledges And Partnership Report");
        const bookTypeList = ref([
            { name: "xlsx" },
            { name: "csv" },
            { name: "txt" },
            { name: "pdf" },
        ]);
        const selectedFileType = ref("");
        const fileHeaderToExport = ref([]);
        const pledgesInNaira = ref({});
        const pledgesInDollars = ref({});
        const fileToExport = ref([]);
        const sumTotal = computed(() => {
            if (pledgesInNaira.value.length === 0) return 0;
            return pledgesInNaira.value.reduce((a, b) => {
                return { amount: a.amount + b.amount };
            });
        });
        const sumTotalInDollars = computed(() => {
            if (pledgesInDollars.value.length === 0) return 0;
            return pledgesInDollars.value.reduce((a, b) => {
                return { amount: a.amount + b.amount };
            });
        });

        const allPledgeStatus = ref([
            { name: "Paid", id: '1' },
            { name: "Over Due", id: '2' },
            { name: "No Payment", id: '3' },
            { name: "Partial", id: '4' },
            { name: "---", id: '5' },
        ]);

        const offeringDetail = computed(() => {
            mappedOfferingCol.value = [];
            mainOfferingData.value = [];
            columnData.value = [];

            if (offeringColumnChartResult.value.length === 0) return [];
            offeringColumnChartResult.value.forEach((i) => {
                let sumvalue = 0;
                i.value.forEach((j) => {
                    sumvalue += +j.amount;
                });

                mappedOfferingCol.value.push(i.name);
                columnData.value.push(sumvalue);
            });

            mainOfferingData.value.push({
                name: "Pledge",
                color: "#002044",
                data: columnData.value,
            });

            return mainOfferingData.value;
        });
        const offeringChart = (array, key) => {
            // Accepts the array and key
            // Return the end result
            offeringChartResult.value = [];
            let result = array.reduce((result, currentValue) => {
                // If an array already present for key, push it to the array. Else create an array and push the object
                (result[currentValue[key]] = result[currentValue[key]] || []).push(
                    currentValue
                );
                return result;
            }, []); // empty object is the initial value for result object
            for (const prop in result) {
                // genderChartResult.value

                offeringChartResult.value.push({
                    name: prop,
                    value: result[prop].length,
                });
                offeringColumnChartResult.value.push({
                    name: prop,
                    value: result[prop],
                });
            }
        };
        const mappedOffering = computed(() => {
            if (offeringChartResult.value.length === 0) return [];
            return offeringChartResult.value.map((i) => i);
        });

        const chooseContact = (payload) => {
            payload.firstName = payload.name;
            selectedContact.value = payload;
            offeringPersonID.value = payload.id;
        };

        const setSelectedStatus = (payload) => {
            selectedStatus.value = payload;
        };
        const setSelectedCategory = (payload) => {
            selectedCategory.value = payload
        };
        const getAllPledgeDefinition = async () => {
            try {
                const res = await pledge.getPledgeDefinition();
                allPledgeDefinitionList.value = res.returnObject;
            } catch (error) {
                console.log(error);
            }
        };
        getAllPledgeDefinition();

        const genarateReport = () => {
            offeringColumnChartResult.value = [];
            loading.value = true;
            const payload = {
                personId: selectedContact.value && selectedContact.value.id ? selectedContact.value.id : "",
                status: selectedStatus.value.map((i) => i.name),
                pledgeItemIDs: selectedCategory.value.map((i) => i.id),
                startDate: startDate.value ? new Date(startDate.value).toLocaleDateString("en-US") : "",
                endDate: endDate.value ? new Date(endDate.value).toLocaleDateString("en-US") : ""



            }
            axios.post(
                '/api/Reports/pledges/getAllPledgesSearch', payload
            ).then((res) => {
                console.log(res.data, 'ggfg');
                offeringInChurch.value = res.data.returnObject;
                pledgesInNaira.value = offeringInChurch.value.filter((i) => i.currencySymbol === "₦")
                pledgesInDollars.value = offeringInChurch.value.filter((i) => i.currencySymbol === "$")

                offeringChart(res.data.returnObject, "pledgeItemName");
                if (offeringInChurch.value.length < 0) {
                    showReport.value = false;
                    ElMessage({
                        type: "warning",
                        message: "Data not Found for this particular member",
                        duration: 3000,
                    });
                } else {
                    showReport.value = true;
                }

                loading.value = false;
            })
                .catch((err) => {
                    console.log(err);
                    loading.value = false;
                });
        };
        const downloadFile = (item) => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
                document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
                document.getElementById("table")
            );
            if (item.name === "pdf") {
                displayTitle.value = true;
            } else {
                displayTitle.value = false;
            }
            exportService.downLoadExcel(
                item.name,
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
            mainOfferingData,
            pledgesInDollars,
            pledgesInNaira,
            displayTitle,
            chooseContact,
            offeringDetail,
            offeringData,
            offeringChart,
            mappedOffering,
            mappedOfferingCol,
            offeringChartResult,
            setSelectedStatus,
            selectedStatus,
            allPledgeStatus,
            allPledgeDefinitionList,
            setSelectedCategory,
            startDate,
            formatDate,
            selectedContact,
            loading,
            primarycolor,
            selectedCategory,
            Categories,

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

            printJS,
            sumTotalInDollars,
            downloadFile,

            genarateReport,
            showReport,
            selectedofferingCategory,
            offeringColumnChartResult,
            columnData,
        };
    },
};
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

.answer {
    font-weight: bolder;
    color: rgb(0, 0, 0);
}

.answer-row {
    background-color: #d5d5d5;
    border-radius: 30px !important;
    border-bottom-left-radius: 50px !important;
    border-bottom-right-radius: 50px !important;
    font-weight: bold;
}

.answer-row:hover {
    background-color: #d1d1d1;
}

.table-row-bg {
    background: #ebeff4;
}

.show-report {
    display: block;
}

.hide-report {
    display: none;
}

.round-border {
    border-radius: 0.5rem;
    box-shadow: 0 0.063rem 0.25rem #02172e45;
    border: 0.063rem solid #dde2e6;
}

.responsiveness {
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
    background-color: #136acd !important;
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
    overflow-x: scroll;
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
  