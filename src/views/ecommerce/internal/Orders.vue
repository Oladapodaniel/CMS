<script setup>
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import ChartCard from './component/ChartCard.vue';
import AreaChart from './component/charts/AreaChart.vue';
import LineChart from './component/charts/LineChart.vue';
import HeaderSection from './component/HeaderSection.vue';
import StoreTable from './component/StoreTable.vue';

const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const orderBody = [
    {
        name: '48 Laws of Power',
        price: '12,000',
        status: 'Completed',
        type: 'E-book'
    },
    {
        name: 'The Designs of Books',
        price: '12,000',
        status: 'Completed',
        type: 'E-book'
    },
    {
        name: 'A millions to one',
        price: '12,000',
        status: 'Cancelled',
        type: 'Hard Copy'
    },
    {
        name: '48 Laws of Power',
        price: '12,000',
        status: 'Completed',
        type: 'E-book'
    },
    {
        name: 'The Designs of Books',
        price: '12,000',
        status: 'Completed',
        type: 'E-book'
    },
    {
        name: 'A millions to one',
        price: '12,000',
        status: 'Cancelled',
        type: 'Hard Copy'
    },
]

const orderheader = [
    { name: 'Product name', value: 'name' },
    { name: 'Product price', value: 'price' },
    { name: 'Status', value: 'status' },
    { name: 'Product Type', value: 'type' },
]

const handleClick = () => {
    router.push('/tenant/store/add')
    console.log('button cliked')
}

const handleSelectionChange = (payload) => {
    console.log(payload, 'he')
}
</script>

<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <HeaderSection title="Orders" @handleClick="handleClick"
            :breadcrumbs="{ name: 'Ecommerce > Orders', route: '/tenant/store' }" />

        <div class="mt-5">
            <StoreTable :data="orderBody" :headers="orderheader" :checkMultipleItem="true"
                @checkedrow="handleSelectionChange" headerText="Recent Orders"
                :viewall="{}">
                <template v-slot:name="{ item }">
                    <div @click="showMemberRow(item)" class="c-pointer">
                        {{ item.name }}
                    </div>
                </template>
                <template v-slot:price="{ item }">
                    <div @click="showMemberRow(item)" class="c-pointer">
                        {{ item.price }}
                    </div>
                </template>
                <template v-slot:status="{ item }">
                    <div @click="showMemberRow(item)" class="c-pointer">
                        {{ item.status }}
                    </div>
                </template>
                <template v-slot:type="{ item }">
                    <div @click="showMemberRow(item)" class="c-pointer">
                        {{ item.type }}
                    </div>
                </template>
            </StoreTable>
        </div>
        <div class="mt-5">
            <div class="chart-bg">
                <div class="bg-white">
                  <ChartCard
                    title="Order Status Chart"
                  >
                    <template #chart>
                      <LineChart domId="chart2" />
                    </template>
                  </ChartCard>
                </div>
              <div class="bg-white mt-5">
                <ChartCard
                  title="Order Trend"
                >
                  <template #chart>
                    <AreaChart domId="chart1" />
                  </template>
                </ChartCard>
              </div>
            </div>
        </div>
    </div>
</template>

<style setup>
.chart-bg {
  border: 1px solid rgba(206, 206, 206, 1);
  background-color: rgba(245, 245, 245, 1);
  padding: 60px;
  border-radius: 8px;
}

@media (max-width: 767px) {
  .chart-bg {
    padding: 10px;
  }
}
</style>