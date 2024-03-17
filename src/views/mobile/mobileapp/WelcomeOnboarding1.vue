<template>
    <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
        <div class="row" v-if="welcome">
            <div class="col-md-12" style="background: #F9FAFBE3;">
                <div class="row">
                    <div class="col-md-12  mt-3 d-flex justify-content-end">
                        <img src="../../../assets/mobileonboarding/progressicon.png" alt="">
                    </div>
                    <div class="col-md-6   d-flex justify-content-center col-12"
                        :class="{ 'welcomebox': welcome, 'welcomebox2': !welcome }">
                        <img class="w-100" src="../../../assets/mobileonboarding/phone-one.png" alt="">
                    </div>
                    <div class="col-md-6 mt-3 d-flex align-items-center  col-12 ">
                        <div class="row  align-items-center">
                            <div class="col-md-8 mb-5 text-center ">
                                <div class="h2 font-weight-600 text-head ">Welcome to Faith Connect!</div>
                                <div class="text-font">Join Your Church Community and Embrace Spiritual Growth Together.
                                </div>
                            </div>
                            <div class="col-md-11 mt-5 d-flex justify-content-end">
                                <el-button color="#120DFA" @click="next1" size="large" class="ml-2 pr-2 " round>Next
                                    <el-icon :size="30" class="d-flex ">
                                        <Right />
                                    </el-icon> </el-button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3" :class="{ 'box3': gateway, 'box4': !gateway }">
            <div class="col-md-12 " style="background: #F9FAFBE3;">
                <div class="row">
                    <div class="col-md-12  mt-3 d-flex justify-content-end">
                        <img src="../../../assets/mobileonboarding/progressicon2.png" alt="">
                    </div>
                    <div class="col-md-7   col-12" :class="{ 'box1': gateway, 'box2': !gateway }">
                        <img class="w-100" src="../../../assets/mobileonboarding/phone-two.png" alt="">
                    </div>
                    <transition name="el-fade-in-linear">
                        <div class="col-md-5 d-flex  align-items-center col-12 "
                            :class="{ 'GatewayText': gateway, 'GatewayText2': !gateway }">
                            <div class="row d-flex justify-content-end align-items-center">
                                <div class="col-md-9  text-center ">
                                    <div class="h2 font-weight-600">Gateway to Faithful Living Starts Here.</div>
                                    <div class="text-font">Explore Inspirational Media, Engage in Worship, and Give Back
                                        Online.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>

                    <div class="col-md-12 d-flex justify-content-end">
                        <el-button color="#120DFA" @click="next2" size="large" class="ml-2 pr-2 " round>Next <el-icon
                                :size="20">
                                <Right />
                            </el-icon> </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3" :class="{ 'yourFaith3': yourFaith, 'yourFaith4': !yourFaith }">
            <div class="col-md-12 " style="background: #F9FAFBE3;">
                <div class="row">
                    <div class="col-md-12  mt-3 d-flex justify-content-end">
                        <img src="../../../assets/mobileonboarding/progressicon3.png" alt="">
                    </div>
                    <div class="col-md-6 d-flex  align-items-center col-12 "
                        :class="{ 'yourFaithbox': yourFaith, 'yourFaithbox1': !yourFaith }">
                        <transition name="el-fade-in-linear" v-show="yourFaith">
                            <div class="row d-flex  align-items-center">
                                <div class="col-md-9  text-center ">
                                    <div class="h2 font-weight-600 text-head">Your Faith, Anytime, Anywhere.</div>
                                    <div class="text-font">Seamlessly receive donations tithes and offerings, Stay
                                        Connected,
                                        and Grow
                                        Spiritually with Faith Connect App.</div>
                                </div>
                                <div class="col-md-9 mt-4 d-flex  justify-content-center">
                                    <router-link :to="{ name: 'OnboardingProcess' }"
                                        class=" d-flex  justify-content-center"><el-button round color="#120DFA"
                                            size="large" class="btn default-btn  c-pointer">Start now for
                                            FREE</el-button></router-link>
                                </div>
                            </div>
                        </transition>

                    </div>
                    <div class="col-md-6 d-flex justify-content-center col-12"
                        :class="{ 'yourFaith': yourFaith, 'yourFaith2': !yourFaith }">
                        <img class="" src="../../../assets/mobileonboarding/phone-three.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { inject, ref } from 'vue'
// import router from '../../../router';
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
export default {
    setup() {
        const primarycolor = inject('primarycolor')
        const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
        const welcome = ref(true);
        const gateway = ref(false);
        const yourFaith = ref(false);
        const next1 = () => {
            welcome.value = false;
            gateway.value = true;
            yourFaith.value = false
        }
        const next2 = () => {
            welcome.value = false;
            gateway.value = false;
            yourFaith.value = true
        }

        return {
            primarycolor,
            yourFaith,
            gateway,
            welcome,
            next1,
            next2,
            mdAndUp, lgAndUp, xlAndUp, xsOnly
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@100..900&family=Roboto:wght@100&display=swap');

.text-head {
    font-family: Raleway !important;
}

.text-font {
    font-family: Poppins !important;
    ;
}

.box1 {
    transform: translateX(60%);
    transition: all 0.3s ease-in-out;
}


.box2 {
    transform: translateX(0%);
    width: 0 !important;
    height: 0;
    overflow: hidden;

    transition: all 0.3s ease-in-out;
}

.box3 {
    width: 100% !important;
}

.box4 {
    width: 0 !important;
    height: 0;
    overflow: hidden;
}

.yourFaith3 {
    width: 100% !important;
}

.yourFaith4 {
    width: 0 !important;
    height: 0;
    overflow: hidden;
}

.yourFaithbox {
    transform: translateX(105%);
    transition: all 0.3s ease-in-out;
}

.yourFaithbox1 {
    transform: translateX(0%);
    width: 0 !important;
    height: 0;
    overflow: hidden;
}

.GatewayText {
    transform: translateX(-140%);
    width: 100% !important;
    transition: all 0.3s ease-in-out;
}

.GatewayText2 {
    transform: translateX(60%);
    width: 0 !important;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}

.yourFaith {
    transform: translateX(-95%);
    width: 100% !important;
    transition: all 0.3s ease-in-out;
}

.yourFaith2 {
    transform: translateX(0%);
    width: 0 !important;
    height: 0;
    overflow: hidden;

    transition: all 0.3s ease-in-out;
    ;
}

.welcomebox {
    /* transform: translateX(40% - 60%); */
    transition: all 0.3s ease-in-out;
    /* width: 100% !important; */
}

.welcomebox2 {
    /* transform: translateX(0); */
    width: 0 !important;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}
</style>