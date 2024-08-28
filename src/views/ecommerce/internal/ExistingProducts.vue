<script setup>
import { inject } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import HeaderSection from './component/HeaderSection.vue';
import ProductCard from './component/ProductCard.vue';
import router from '../../../router';

const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject("primarycolor");
const hardcopy = [
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img1.png")
    },
    {
        name: 'The way of the Nameless',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img2.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img3.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img1.png")
    },
    {
        name: 'The way of the Nameless',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img2.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img3.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img1.png")
    },
    {
        name: 'The way of the Nameless',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img2.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img3.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img1.png")
    },
    {
        name: 'The way of the Nameless',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img2.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img3.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img1.png")
    },
    {
        name: 'The way of the Nameless',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img2.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img3.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img1.png")
    },
    {
        name: 'The way of the Nameless',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img2.png")
    },
    {
        name: '48 Laws of Power',
        price: 'NGN 16,000',
        instock: true,
        rating: 4.5,
        url: require("../../../assets/disposal/img3.png")
    },
]
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
        <div class="mt-5">
            <div class="mb-3">Hardcopy & Physical items</div>
            <div class="d-flex flex-wrap rowgap-40 colgap-30">
                <div v-for="(item, index) in hardcopy" :key="index">
                    <ProductCard :item="item" />
                </div>
            </div>
        </div>
        <div class="mt-5">
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
        </div>
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