<script setup>
import { ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import SlidedMenu from '../../../components/nav/SlidedMenu.vue';
import SetUpOne from './component/SetUpOne.vue';
import SetUpTwo from './component/SetUpTwo.vue';
import SetUpThree from './component/SetUpThree.vue';
import StepFour from './component/StepFour.vue';

const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
const stepMenu = [
    "Core Information", "Store Branding", "Return Policy", "Payments"
]
const activeMenu = ref(0)

</script>
<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="text-head font-weight-bold text-black h2">Ecommerce Set-up</div>

        <div class="row mt-5">
            <div class="col-md-3 col-xl-2">
                <SlidedMenu :links="stepMenu" />
            </div>
            <div class="col-md-6 col-xl-5 mt-3 mt-md-0">
                <div class="body-card">
                    <!-- <SetUpOne /> -->
                    <!-- <SetUpTwo /> -->
                     <!-- <SetUpThree /> -->
                      <StepFour />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.body-card {
    background-color: #F2F4F7;
    border-radius: 8px;
    padding: 20px
}
</style>