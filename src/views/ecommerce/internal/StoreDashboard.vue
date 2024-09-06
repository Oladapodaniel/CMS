<script setup>
import { inject, onMounted, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import HeaderSection from './component/HeaderSection.vue';
import DatasetAnalytics from './component/DatasetAnalytics.vue';
import StoreTable from './component/StoreTable.vue';
import ChartCard from './component/ChartCard.vue';
import ColumnChartEcommerce from './component/charts/ColumnChartEcommerce.vue';
import AreaChart from './component/charts/AreaChart.vue';
import router from '../../../router';
import store from '../../../store/store';
import converter from '../../../services/currency-converter/currencyConverter';
import { getEcommerceSetup, getProductCategories, productType } from '../../../services/ecommerce/ecommerceservice';
import DashboardLoader from './component/DashboardLoader.vue';


const primarycolor = inject("primarycolor");
const { lgAndUp, xlAndUp } = deviceBreakpoint();
const products = ref(store.getters["ecommerce/getproducts"]);
const productCategories = ref(store.getters["ecommerce/getCategories"]);
const productLoading = ref(false);
const storeSetup = ref(null);
const dashboardLoading = ref(false);
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

const productsheader = [
  { name: 'Product name', value: 'name' },
  { name: 'Product price', value: 'price' },
  { name: 'Product Type', value: 'productType' },
  { name: 'Category', value: 'ecommerceCategoryID' },
  { name: 'Status', value: 'status' },
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

const getStarted = () => {
  router.push('/tenant/store/setup')
}

const handleSelectionChange = (payload) => {
  console.log(payload, 'he')
}

const getCategories = async () => {
  productLoading.value = true
  store.dispatch("ecommerce/getProductCategory").then((response => {
    productLoading.value = false;
    productCategories.value = response
    if (products.value.length === 0) {
      allProducts();
    }
  }))
}

const allProducts = async () => {
  store.dispatch("ecommerce/getAllProducts").then((response => {
    console.log(response, 'ffrr')
    products.value = response
  }))
}

onMounted(() => {
  if (productCategories.value.length === 0) {
    getCategories();
  }
})

const getProductCategoriesValue = (id) => productCategories.value.find(i => i.id === id)?.categoryName;

const navigateToViewProduct = (item) => {
  router.push(`/tenant/store/product/${item.id}`)
}

const getStoreSetup = async () => {
  dashboardLoading.value = true;
  try {
    let response = await getEcommerceSetup();
    console.log(response, 'setup here');
    storeSetup.value = response
    dashboardLoading.value = false;
  } catch (error) {
    dashboardLoading.value = false;
    console.error(error);
  }
}
getStoreSetup();
</script>

<template>
  <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
    <HeaderSection title="Ecommerce" rightbuttontext="Upload New Product" @handleClick="handleClick">
      <template #rightbutton>
        <div class="d-flex">
          <el-button :color="primarycolor" class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn" @click="handleClick"
            size="large" round>
            Upload new Product
          </el-button>
        </div>
      </template>
    </HeaderSection>
    <div v-if="dashboardLoading">
      <DashboardLoader />
    </div>
    <div v-else-if="!storeSetup">
      <DatasetAnalytics />
      <div class="layerparent">
        <div class="coverlayer"></div>
      </div>
      <div class="row mt-5">
        <div class="col-12 col-md-8 offset-md-2">
          <div class="cardheader">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <img src="../../../assets/cart_art.svg" />
              <div class="d-flex flex-column flex-md-row">
                <div class="faint_text text-center text-md-left">Home</div>
                <div class="ml-md-5 mr-md-3 text-center text-md-left faint_text">Cart</div>
                <div class="ml-md-5 mr-md-3 text-center text-md-left faint_text">All products</div>
              </div>
            </div>
          </div>
          <div class="cardbody">
            <h2 class="font-weight-600 text-center pt-4">Set-up your Ecommerce Store</h2>
            <div class="s-22 text-center">In few clicks</div>
            <div class="d-flex justify-content-center mt-4">
              <el-button class="get_started" @click="getStarted">
                Get started
              </el-button>
            </div>
            <div class="d-flex justify-content-center mt-5">
              <img src="../../../assets/steps.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <DatasetAnalytics />
      <div class="row mt-5">
        <div class="col-12 col-md-8">
          <transition name="el-fade-in-linear">
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
          </transition>
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
          <transition name="el-fade-in-linear">
            <el-skeleton :rows="5" animated v-if="productLoading" />
            <StoreTable :data="products" :headers="productsheader" :checkMultipleItem="true"
              v-else-if="products.length > 0" @checkedrow="handleSelectionChange" headerText="Top Selling Products"
              :viewall="{ name: 'View all products', route: '/tenant/store/products' }">
              <template v-slot:name="{ item }">
                <div @click="navigateToViewProduct(item)" class="c-pointer">
                  <div class="d-flex align-items-center gap-3">
                    <img :src="item.imageURL" alt="Product Image" class="product-image" />
                    <div class="ml-2">{{ item.name }}</div>
                  </div>
                </div>
              </template>
              <template v-slot:price="{ item }">
                <div @click="navigateToViewProduct(item)" class="c-pointer">
                  {{ converter.numberWithCommas(item.price) }}
                </div>
              </template>
              <template v-slot:status="{ item }">
                <div @click="navigateToViewProduct(item)" class="c-pointer">
                  {{ item.status }}
                </div>
              </template>
              <template v-slot:productType="{ item }">
                <div @click="navigateToViewProduct(item)" class="c-pointer">
                  {{ productType[item.productType] }}
                </div>
              </template>
              <template v-slot:ecommerceCategoryID="{ item }">
                <div @click="navigateToViewProduct(item)" class="c-pointer">
                  {{ getProductCategoriesValue(item.ecommerceCategoryID) }}
                </div>
              </template>
            </StoreTable>
          </transition>
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
  </div>
</template>

<style setup>
.chart-bg {
  border: 1px solid rgba(206, 206, 206, 1);
  background-color: rgba(245, 245, 245, 1);
  padding: 60px;
  border-radius: 8px;
}

.product-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 3px;
}

.layerparent {
  position: relative;
}

.coverlayer {
  height: 200px;
  position: absolute;
  z-index: 10000000000;
  top: -178px;
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, #FFFFFF 100%);
}

.cardheader {
  background-color: #0745AF;
  border-radius: 20px 20px 0px 0px;
  padding: 10px;
}

.cardbody {
  background: linear-gradient(180deg, #EDEDED 0%, #FFFFFF 100%);
}

.get_started {
  background-color: #FF5906;
  padding: 20px;
  border-radius: 60px;
  color: white;
  border: 1px solid #FF5906
}

.get_started:hover,
.get_started:focus,
.get_started:active {
  background-color: #ff5906e3;
  padding: 20px;
  border-radius: 60px;
  color: white;
  border: 1px solid #FF5906
}

.faint_text {
  color: #C2C2C2
}

@media (max-width: 767px) {
  .chart-bg {
    padding: 10px;
  }
}
</style>