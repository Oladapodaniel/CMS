<script setup>
import { ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import AnalyticsCard from './component/AnalyticsCard.vue';
import MoreDropdown from './component/MoreDropdown.vue';
import Table from "@/components/table/Table";

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const analyticssummary = ref([
    {
        icon: require('../../../assets/ecommerce/WalkIcon.png'),
        texttop: 'Total People',
        topvalue: '4,000',
        textbottom: 'Total branches',
        bottomvalue: '38',
        trend: '42%&#8593;'
    },
    {
        icon: require('../../../assets/money_transfer.png'),
        texttop: 'Past year remitted',
        topvalue: 'NGN 368,000',
        textbottom: 'Current year remittable',
        bottomvalue: 'NGN 368,000',
        trend: '35%&#8593;'
    },
    {
        icon: require('../../../assets/arrow_downward.png'),
        texttop: 'Last month remitted',
        topvalue: 'NGN 368,000',
        textbottom: 'Current month remittable',
        bottomvalue: 'NGN 368,000',
        trend: '12%&#8593;'
    },
    {
        icon: require('../../../assets/money_outstanding.png'),
        texttop: 'Month outstanding',
        topvalue: 'NGN 368,000',
        textbottom: 'Year outstanding',
        bottomvalue: 'NGN 6,148,000',
        trend: '32%&#8593;'
    },
])

const remittanceheader = ref([
    {
        name: "Name",
        value: "name"   
    },
    {
        name: "Month",
        value: "month"   
    },
    {
        name: "Amount",
        value: "amount"   
    },
    {
        name: "Status",
        value: "status"   
    },
    {
        name: "Year to date",
        value: "datee"   
    },
    {
        name: "Outstanding",
        value: "outstanding"   
    },
    {
        name: "Action",
        value: "action"   
    },
])

const body = ref([
    {
        name: "Higher Ground",
        month: 'August',
        amount: 'NGN 200,000',
        status: 'Paid',
        datee: 'NGN 100,000',
        outstanding: 'NGN 50,000',
        action: 'action'
    },
    {
        name: "Higher Ground",
        month: 'August',
        amount: 'NGN 200,000',
        status: 'Paid',
        datee: 'NGN 100,000',
        outstanding: 'NGN 50,000',
        action: 'action'
    },
    {
        name: "Higher Ground",
        month: 'August',
        amount: 'NGN 200,000',
        status: 'Paid',
        datee: 'NGN 100,000',
        outstanding: 'NGN 50,000',
        action: 'action'
    },
])

const handleSelectionChange = (payload) => {
    console.log(payload)
}
</script>

<template>
    <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="container-top">
            <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
                <div class="font-weight-bold h2 text-black text-head">Remittance Overview</div>
                <MoreDropdown />
            </div>
            <section class="mt-4">
                <div class="row">
                    <div class="col-12 col-md-6 col-xl-3 mt-3" style="gap: 20px"
                        v-for="(item, index) in analyticssummary" :key="index">
                        <AnalyticsCard :item="item" />
                    </div>
                </div>
            </section>
            <section class="mt-4">
                <Table :data="body" :headers="remittanceheader" :checkMultipleItem="true"
                    @checkedrow="handleSelectionChange">
                    <template v-slot:name="{ item }">
                        <div class="py-2">
                            <div class="c-pointer fw-500 s-16">
                            {{ item.name }}
                        </div>
                        <div class="s-12 text-secondary transform_none">Membership size: 256</div>
                        </div>
                    </template>
                    <template v-slot:month="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.month }}
                        </div>
                    </template>
                    <template v-slot:amount="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.amount }}
                        </div>
                    </template>
                    <template v-slot:status="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.status }}
                        </div>
                    </template>
                    <template v-slot:datee="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.datee }}
                        </div>
                    </template>
                    <template v-slot:outstanding="{ item }">
                        <div class="c-pointer transform_none py-2 fw-500 s-16">
                            {{ item.outstanding }}
                        </div>
                    </template>
                    <template v-slot:action>
                        <div class="c-pointer fw-500 s-16">
                            <div>View details</div>
                        </div>
                    </template>
                </Table>
            </section>
        </div>
    </main>
</template>

<style scoped>
.transform_none {
    text-transform: none;
}
</style>