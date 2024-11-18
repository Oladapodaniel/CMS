<script setup>
import { inject, ref, computed, onMounted } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import HeaderSection from './component/HeaderSection.vue';
import ProductCard from './component/ProductCard.vue';
import router from '../../../router';
import store from '../../../store/store';
import groupResponse from '../../../services/groupArray/groupResponse';

const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject("primarycolor");
const products = ref(store.getters["ecommerce/getproducts"]);
const productCategories = ref(store.getters["ecommerce/getCategories"]);


const getCategories = async () => {
  store.dispatch("ecommerce/getProductCategory").then((response => {
    productCategories.value = response
  }))
}

onMounted(() => {
  if (productCategories.value.length === 0) {
    getCategories();
  }
})

const getProductCategoriesValue = (id) => productCategories.value.find(i => i.id === id)?.categoryName;

const allProducts = async () => {
  store.dispatch("ecommerce/getAllProducts").then((response => {
    products.value = response
  }))
}
if (products.value.length === 0) allProducts()

const groupedProducts = computed(() =>  {
    if (products.value.length === 0 && productCategories.length === 0) return []
    return groupResponse.groupListByKey(products.value, 'ecommerceCategoryID')
})

// const hardcopy = [
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img1.png")
//     },
//     {
//         name: 'The way of the Nameless',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img2.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img3.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img1.png")
//     },
//     {
//         name: 'The way of the Nameless',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img2.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img3.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img1.png")
//     },
//     {
//         name: 'The way of the Nameless',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img2.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img3.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img1.png")
//     },
//     {
//         name: 'The way of the Nameless',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img2.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img3.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img1.png")
//     },
//     {
//         name: 'The way of the Nameless',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img2.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img3.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img1.png")
//     },
//     {
//         name: 'The way of the Nameless',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img2.png")
//     },
//     {
//         name: '48 Laws of Power',
//         price: 'NGN 16,000',
//         instock: true,
//         rating: 4.5,
//         url: require("../../../assets/disposal/img3.png")
//     },
// ]
</script>

<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <HeaderSection title="Products" rightbuttontext="Filter Products"
            :breadcrumbs="{ name: 'Ecommerce > Products', route: '/tenant/store' }">
            <template #rightbutton>
                <div class="d-flex">
                    <el-button class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn secondary-button" size="large" @click="router.push('/tenant/store/archive')" round>
                        Archive
                    </el-button>
                    <el-button :color="primarycolor" class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn"
                        size="large" round>
                        Filter Products
                    </el-button>
                </div>
            </template>
        </HeaderSection>
        <div class="mt-5" v-for="(item, index) in groupedProducts" :key="index">
            <div class="mb-3">{{ getProductCategoriesValue(item.label) }}</div>
            <div class="d-flex flex-wrap rowgap-40 colgap-30">
                <div v-for="(item, index) in item.products" :key="index">
                    <ProductCard :item="item" />
                </div>
            </div>
        </div>
        <!-- <div class="mt-5">
            <div class="mb-3">Audio Books</div>
            <div class="d-flex flex-wrap rowgap-40 colgap-30">
                <div v-for="(item, index) in hardcopy" :key="index">
                    <ProductCard :item="item" />
                </div>
            </div>
        </div>
        <div class="mt-5">
            <div class="mb-3">E-Books</div>
            <div class="d-flex flex-wrap rowgap-40 colgap-30">
                <div v-for="(item, index) in hardcopy" :key="index">
                    <ProductCard :item="item" />
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
.rowgap-40 {
    row-gap: 40px;
}

.colgap-30 {
    column-gap: 30px;
}
</style>