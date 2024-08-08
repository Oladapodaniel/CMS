<script setup>
const { title } = defineProps(['title'])
</script>

<template>
    <div class="chart-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="font-weight-500 s-20">{{ title }}</div>
            <img src="@/assets/infogray.svg" />
        </div>
        <slot name="chart" />
        
    </div>
</template>

<style scoped>
.chart-card {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 20px
}
</style>