<script setup>
import { inject, ref } from 'vue';
import router from '../../../router';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';

const selectedBank = ref(null)
const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject("primarycolor");
const integration = ref([
    { name: 'Remita', selected: true },
    { name: 'paystack', selected: false },
    { name: 'paystack', selected: false },
    { name: 'paystack', selected: false },
]);
const displayDialog = ref(false)

const choosePayment = (index) => {
    integration.value.forEach(i => i.selected = false);
    integration.value[index].selected = true
    displayDialog.value = true;
}
</script>

<template>
    <div class="container-fluid">
        <div class="row flex-column flex-sm-row justify-content-sm-between">
            <div>
                <h2 class="text-head font-weight-bold py-0 my-0 text-black">
                    Continue to payment
                </h2>
                <div @click="router.go(-1)">
                    <span class="s-18 fw-400 cursor-pointer text-black">
                        <img src="../../../assets/goback.png" alt="" /> Go back</span>
                </div>
            </div>
        </div>
        <div class="offset-md-3 col-md-6 mt-4 card_wrapper">
            <label class="s-16 text-dark" style="font-weight: 500">Select Bank Account to receive remittance</label>
            <el-select-v2 v-model="selectedBank" class="w-100 font-weight-normal" :options="[]
                " placeholder="Select bank account" size="large" />
        </div>
        <div class="offset-md-3 col-md-6 mt-4 card_wrapper">
            <label class="s-16 text-dark mb-1" style="font-weight: 500">Choose a Payment method</label>
            <div class="inner_card mt-3" v-for="(item, index) in integration" :key="index">
                <div class="d-flex justify-content-between align-items-start align-items-sm-center" @click="choosePayment(index)">
                    <div class="d-flex flex-column flex-sm-row">
                        <img src="../../../assets/remita.png" width="100" />
                        <div class="ml-md-2">
                            <div style="font-weight: 500">Bank Branch Payment</div>
                            <div class="s-14">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="radio_button_wrapper">
                        <div :class="{ 'radio_button': item.selected }"></div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog class="" style="border-radius: 25px;" v-model="displayDialog" title=""
            :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
            <div class="p-md-4">
                <div class="d-flex flex-column align-items-center">
                    <img src="../../../assets/remita.png" width="150" />
                    <h6 class="text-dark text-center">Kindly walk into any Bank Branch and Pay<br />
                        this amount using Remitta</h6>
                    <h3 class="s-22 text-dark text-center font-weight-600 mt-2">NGN 40,000</h3>
                    <div class="mt-3 code_wrapper">
                        <div class="text-dark s-18 text-center">Use Remitta Remittance Number (RRN)</div>
                        <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center mt-2">
                            <h3 class="s-20 text-dark text-center font-weight-600 mb-0">awweA45GTH</h3>&nbsp;&nbsp;
                            <el-button class="copy_btn" color="#E4FFFC">Copy &nbsp;
                                <img src="../../../assets/copyurl-icon.png" />
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="col-12 offset-md-3 col-md-6">
                    <el-button :color="primarycolor" class="w-100 confirmed_btn" size="large" round>Ok, i got
                        this</el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<style scoped>
.card_wrapper {
    border: 1px solid #D8D8D8;
    background-color: #EEEEEEAB;
    border-radius: 8px;
    padding: 20px
}

.inner_card {
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 15px;
}

.inner_card:hover {
    transform: scale(1.02);
    transition: transform .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.radio_button_wrapper {
    border: 2px solid #ACACAC;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.radio_button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #0B55D4;
}

.code_wrapper {
    background-color: #F9F9F9;
    padding: 20px;
}

.copy_btn {
    color: #171717;
    font-weight: 400;
    border-radius: 7px
}

.confirmed_btn {
    margin-top: 30px;
    box-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -webkit-box-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -moz-box-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -moz-o-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -moz-ms-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
}
</style>