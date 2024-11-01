<script setup>
import { inject, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';
import lookupService from '../../../services/lookup/lookupservice';
import axio from 'axios';
import { ElMessage } from 'element-plus';

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');
const displayDialog = ref(false);
const allbanks = ref([]);
const selectedBank = ref(null);
const accountNumber = ref("");
const accountName = ref("");
const loading = ref(false);
const savingbank = ref(false);


const getbanks = async () => {
    try {
        const response = await lookupService.getAllBanks();
        allbanks.value = response
    } catch (error) {
        console.error(error)
    }
}
getbanks();

const createbank = async () => {
    savingbank.value = true;
    const payload = {
        bankName: allbanks.value?.find(i => i.code === selectedBank.value)?.name,
        accountName: accountName.value,
        accountNumber: accountNumber.value,
        bank: {code: selectedBank.value}
    }
    try {
        await lookupService.createTenantBanks(payload);
        savingbank.value = false;
        ElMessage({
            type: "success",
            message: "Bank account saved successfully",
            duration: 5000,
        });
    } catch (error) {
        savingbank.value = false;
        console.error(error)
    }
}

const resolveCustomerDetail = async () => {
    loading.value = true;
    try {
        let { data } = await axio.post(
            `https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account`,
            {
                recipientaccount: accountNumber.value,
                destbankcode: selectedBank.value,
                PBFPubKey: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
            }
        );
        console.log(data);
        accountName.value = data.data.data.accountname;

        loading.value = false;

        if (data.data.data.responsemessage.toLowerCase().includes("sorry")) {
            ElMessage({
                type: "warning",
                message: data.data.data.responsemessage,
                duration: 3000,
            });
        } else {
            ElMessage({
                type: "success",
                message: "Account Check Successful",
                duration: 3000,
            });
        }
    } catch (error) {
        console.log(error);
        loading.value = false;
        if (!accountNumber.value || accountNumber.value === "") {
            ElMessage({
                type: "warning",
                message: "Please enter your account number",
                duration: 3000,
            });
        } else if (!accountName.value || accountName.value === "") {
            ElMessage({
                type: "error",
                message: "Your detail were not found",
                duration: 3000,
            });
        } else {
            ElMessage({
                type: "error",
                message: "Please check your banks details again",
                duration: 3000,
            });
        }
    }
}


const checkNumLength = () => {
    if (accountNumber.value.length >= 10) {
        resolveCustomerDetail()
    }
}
</script>

<template>
    <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="container-top">
            <section>
                <div class="text-head h2 font-weight-bold py-0 my-0 text-black">Bank info setup</div>
                <div class="col-12 mt-1 px-0">
                    <div @click="router.go(-1)">
                        <span class="s-18 fw-400 cursor-pointer text-black">
                            <img src="../../../assets/goback.png" alt="" /> Go back</span>
                    </div>
                </div>
            </section>
            <section class="mt-4">
                <div class="col-12 col-md-6 offset-md-3 card">
                    <div>
                        <div class="text_label">Select bank</div>
                        <el-select-v2 v-model="selectedBank" filterable class="w-100 font-weight-normal" :options="allbanks.map((i) => ({
                            label: i.name,
                            value: i.code,
                        }))" 
                        placeholder="Select bank" size="large" />
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Account number</div>
                        <el-input type="text" placeholder="Enter account number" @input="checkNumLength"
                            v-model="accountNumber" />
                    </div>
                    <div class="mt-4">
                        <div class="d-flex align-items-center">
                            <div class="text_label">Account name</div>
                            <el-icon class="is-loading ml-2" v-if="loading">
                                <Loading />
                            </el-icon>
                        </div>
                        <el-input type="text" v-model="accountName" disabled />
                        <div class="small-text mt-1">Account name is auto generated.</div>
                    </div>
                    <div class="d-flex justify-content-center mt-4">
                        <el-button :color="primarycolor" :loading="savingbank" class="px-5" size="large" @click="createbank"
                            round>Save</el-button>
                    </div>
                </div>
            </section>
        </div>
        <el-dialog class="" style="border-radius: 25px;" v-model="displayDialog" title=""
            :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
            <div class="row justify-content-center ">
                <div class="col-md-10 col-11  mt-4 h-100 bg-white mb-5">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-10 d-flex justify-content-center">
                            <div class=" col-10 col-sm-8">
                                <img class="w-100 " src="../../../assets/7efs.gif" alt="success-gif">
                                <!-- <img class="w-100 " src="../../../assets/errorIcon.png" alt=""> -->
                            </div>
                        </div>
                        <div class="col-md-12  mt-2 d-flex justify-content-center">
                            <div class="col-12 col-sm-8">
                                <div class="text-font font-weight-600 col-md-12 col-12 px-0 h4 text-center"
                                    style="color: #111111;">
                                    You successfully saved a Remittance offering
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 my-3 d-flex flex-column justify-content-center align-items-center">
                            <!-- <div class="col-md-6 border"> -->
                            <el-button @click="displayDialog = !displayDialog" :color="primarycolor" size="large"
                                class="text-dark" style="text-decoration: underline;" text round>Close</el-button>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </main>
</template>

<style scoped>
.card {
    background-color: #EBEDFF;
    padding: 40px
}

.text_label {
    color: #1E1E1E;
    font-weight: 500;
    margin-bottom: 5px;
}
</style>