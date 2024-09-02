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

const setupone = ref(true);
const setuptwo = ref(false);
const setupthree = ref(false);
const setupfour = ref(false);

const setSelectedMenuValue = (payload) => {
    console.log(payload)
    switch (payload) {
        case 0:
            setuptwo.value = false;
            setupthree.value = false;
            setupfour.value = false;
            setTimeout(() => {
                setupone.value = true;
            }, 400);
            break;
        case 1:
            setupone.value = false;
            setupthree.value = false;
            setupfour.value = false;
            setTimeout(() => {
                setuptwo.value = true;
            }, 400);
            break;
        case 2:
            setupfour.value = false;
            setupone.value = false;
            setuptwo.value = false;
            setTimeout(() => {
                setupthree.value = true;
            }, 400);
            break;
            default:
                setupone.value = false;
                setuptwo.value = false;
                setupthree.value = false;
                setTimeout(() => {
                setupfour.value = true;
                
            }, 400);
            break;
    }
}

</script>
<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="text-head font-weight-bold text-black h2">Ecommerce Set-up</div>

        <div class="row mt-5">
            <div class="col-md-3 col-xl-2">
                <SlidedMenu :links="stepMenu" @index="setSelectedMenuValue" />
            </div>
            <div class="col-md-6 col-xl-5 mt-3 mt-md-0">
                <div class="body-card">
                    <transition name="el-zoom-in-top">
                        <SetUpOne v-show="setupone" />
                    </transition>
                    <transition name="el-zoom-in-top">
                        <SetUpTwo v-show="setuptwo" />
                    </transition>
                    <transition name="el-zoom-in-top">
                        <SetUpThree v-show="setupthree" />
                    </transition>
                    <transition name="el-zoom-in-top">
                        <StepFour v-show="setupfour" />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.body-card {
    background-color: #F2F4F7;
    border-radius: 8px;
    padding: 20px;
    min-height: 500px;
    transition: min-height .2s ease-in-out;
}
</style>