<script setup>
import { computed, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import AnalyticsCard from './component/AnalyticsCard.vue';
import MoreDropdown from './component/MoreDropdown.vue';
import Table from "@/components/table/Table";
import ColumnChart from "@/components/charts/BranchColumnChart.vue";
import router from '../../../router';
import { GetAllBranchRemmitance } from '../../../services/remittance/branchremittance';
import amountWithCommas from '../../../services/numbers/numbers_formatter'

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const summaries = ref(null)
const loading = ref(false)
const analyticssummary = computed(() => {
    return [
    {
        icon: require('../../../assets/ecommerce/WalkIcon.png'),
        texttop: 'Total People',
        topvalue: `${summaries.value?.totalPeople?.toLocaleString() ?? 0}`,
        textbottom: 'Total branches',
        bottomvalue: `${summaries.value?.totalBranches?.toLocaleString() ?? 0}`,
        trend: '42%&#8593;'
    },
    {
        icon: require('../../../assets/money_transfer.png'),
        texttop: 'Past year remitted',
        topvalue: `${summaries.value?.lastYearTotalRemittableAmount?.toLocaleString() ?? 0}`,
        textbottom: 'Current year remittable',
        bottomvalue: `NGN ${summaries.value?.currentYearTotalRemittableAmount?.toLocaleString() ?? 0}`,
        trend: '35%&#8593;'
    },
    {
        icon: require('../../../assets/arrow_downward.png'),
        texttop: 'Last month remitted',
        topvalue: `NGN ${summaries.value?.lastMonthTotalRemittableAmount?.toLocaleString() ?? 0}`,
        textbottom: 'Current month remittable',
        bottomvalue: `NGN ${summaries.value?.currentMonthTotalRemittableAmount?.toLocaleString() ?? 0}`,
        trend: '12%&#8593;'
    },
    {
        icon: require('../../../assets/money_outstanding.png'),
        texttop: 'Month outstanding',
        topvalue: `NGN ${summaries.value?.currentMonthTotalOutstandingAmount?.toLocaleString() ?? 0}`,
        textbottom: 'Year outstanding',
        bottomvalue: `NGN ${summaries.value?.currentYearTotalOutstandingAmount?.toLocaleString() ?? 0}`,
        trend: '32%&#8593;'
    },
]})

const remittanceheader = ref([
    {
        name: "Name",
        value: "tenantName"   
    },
    {
        name: "Month",
        value: "month"   
    },
    {
        name: "Year to date",
        value: "year"   
    },
    {
        name: "Status",
        value: "paymentStatus"   
    },
    {
        name: "Amount Paid",
        value: "totalAmountPaid"   
    },
    {
        name: "Outstanding",
        value: "totalOutstanding"   
    },
    {
        name: "Action",
        value: "action"   
    },
])

const body = ref([])


const chartseries = ref([
        {
            name: 'Corn',
            data: [387749, 280000, 129000, 64300, 54000, 34300]
        },
        {
            name: 'Wheat',
            data: [45321, 140000, 10000, 140500, 19500, 113500]
        }
    ])

    const categories = ref(['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'])

    const getAllBranchesRemittance = async() => {
        loading.value = true;
        try {
            const response = await GetAllBranchRemmitance()
            loading.value = false;
            console.log(response)
            body.value = response.remittancesummaries
            summaries.value = response
        } catch (error) {
            console.error(error)
            loading.value = false;
        }
    }
    getAllBranchesRemittance();
</script>

<template>
    <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="container-top">
            <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
                <div class="font-weight-bold h2 text-black text-head">Remittance Overview</div>
                <MoreDropdown />
            </div>
            <el-progress :percentage="100" :indeterminate="true" :duration="1" v-if="loading">
                <div></div>
            </el-progress>
            <section class="mt-4">
                <div class="row">
                    <div class="col-12 col-md-6 col-xl-3 mt-3" style="gap: 20px"
                        v-for="(item, index) in analyticssummary" :key="index">
                        <AnalyticsCard :item="item"/>
                    </div>
                </div>
            </section>
            <section class="mt-5" v-loading="loading">
                <Table :data="body" :headers="remittanceheader" :checkMultipleItem="false"
                    >
                    <template v-slot:tenantName="{ item }">
                        <div class="py-2">
                            <div class="c-pointer fw-500 s-16">
                            {{ item.tenantName }}
                        </div>
                        <div class="s-12 text-secondary transform_none">Membership size: {{ item.membershipsize }}</div>
                        </div>
                    </template>
                    <template v-slot:month="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.month }}
                        </div>
                    </template>
                    <template v-slot:year="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.year }}
                        </div>
                    </template>
                    <template v-slot:paymentStatus="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.paymentStatus }}
                        </div>
                    </template>
                    <template v-slot:totalAmountPaid="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.totalAmountPaid }}
                        </div>
                    </template>
                    <template v-slot:totalOutstanding="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            NGN {{ amountWithCommas.amountWithCommas(item.totalOutstanding) }}
                        </div>
                    </template>
                    <template v-slot:action="{ item }">
                        <div class="c-pointer fw-500 s-16" @click="router.push(`/tenant/branchremittance/remittancesummary/${item.id}`)">
                            <div style="text-decoration: underline; color: #136acd">View details</div>
                        </div>
                    </template>
                </Table>
            </section>
            <!-- <section class="mt-5 border">
                <ColumnChart domId="chart1" :data="chartseries" :series="categories" :header="'Remittance by Month'" />
            </section>
            <section class="mt-5 border">
                <ColumnChart domId="chart2" :data="chartseries" :series="categories" :header="'Remittance by Branch'" />
            </section>
            <section class="mt-5 border">
                <ColumnChart domId="chart3" :data="chartseries" :series="categories" :header="'Monthly Outstanding'" />
            </section> -->
        </div>
    </main>
</template>
<style scoped>
.transform_none {
    text-transform: none;
}
</style>