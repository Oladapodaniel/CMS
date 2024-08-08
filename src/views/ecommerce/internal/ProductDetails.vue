<script setup>
import HeaderSection from './component/HeaderSection.vue';
</script>

<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <HeaderSection title="Product Information" @handleClick="handleClick"
            :breadcrumbs="{ name: 'Products > Product Information', route: '/tenant/store/products' }" />
        </div>
</template>