<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <router-view />
    </div>
</template>
<script setup>
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";

const { lgAndUp, xlAndUp } = deviceBreakpoint();
</script>