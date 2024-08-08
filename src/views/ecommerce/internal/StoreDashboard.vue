<script setup>
import { inject } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import HeaderSection from './component/HeaderSection.vue';
import DatasetAnalytics from './component/DatasetAnalytics.vue';
import StoreTable from './component/StoreTable.vue';
import ChartCard from './component/ChartCard.vue';
import ColumnChartEcommerce from './component/charts/ColumnChartEcommerce.vue';
import AreaChart from './component/charts/AreaChart.vue';
import router from '../../../router';


const primarycolor = inject("primarycolor");
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
    <!-- :breadcrumbs="{ name: 'dashboard', route: '/tenant' }"  -->
    <HeaderSection title="Ecommerce" rightbuttontext="Upload New Product" @handleClick="handleClick">
      <template #rightbutton>
        <div class="d-flex">
          <el-button class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn secondary-button" size="large" round>
            Use Kiosk Mode
          </el-button>
          <el-button :color="primarycolor" class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn" @click="handleClick"
            size="large" round>
            Upload new Product
          </el-button>
        </div>
      </template>
    </HeaderSection>
    <DatasetAnalytics />
    <div class="row mt-5">
      <div class="col-12 col-md-8">
        <StoreTable :data="orderBody" :headers="orderheader" :checkMultipleItem="true"
          @checkedrow="handleSelectionChange" headerText="Recent Orders"
          :viewall="{ name: 'View all orders', route: '/tenant/store/orders' }">
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
      <div class="col-12 col-md-4">
        <ChartCard title="Sales Trend">
          <template #chart>
            <ColumnChartEcommerce domId="chart1" />
          </template>
        </ChartCard>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 col-md-8">
        <StoreTable :data="orderBody" :headers="orderheader" :checkMultipleItem="true"
          @checkedrow="handleSelectionChange" headerText="Top Selling Products"
          :viewall="{ name: 'View all products', route: '/tenant/store/products' }">
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
      <div class="col-12 col-md-4">
        <ChartCard title="Order Trend">
          <template #chart>
            <ColumnChartEcommerce domId="chart2" />
          </template>
        </ChartCard>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <div class="chart-bg">
          <div class="bg-white">
            <ChartCard title="Revenue Trend">
              <template #chart>
                <AreaChart domId="chart3" />
              </template>
            </ChartCard>
          </div>
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