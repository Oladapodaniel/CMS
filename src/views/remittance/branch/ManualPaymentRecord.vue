<script setup>
import { inject, ref, reactive } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';
import { GetRemittanceByCode, RecordPaymentManually } from '../../../services/remittance/branchremittance';
import CustomDatePicker from '../../../components/datetimepicker/CustomDatePicker.vue';

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');
const displayDialog = ref(false);
const code = ref("");
const loadingbycode = ref(false);
const manualrecordpayload = reactive({})
const fileList = ref()
const periodMonth = ref("")
const periodYear = ref("")
const tenantName = ref("")

const getRemmittanceByCode = async () => {
    loadingbycode.value = true;
    try {
        const response = await GetRemittanceByCode(code.value)
        console.log(response)
        tenantName.value = response?.tenant?.name
        periodMonth.value = response.periodMonth
        periodYear.value = response.periodYear
        Object.assign(manualrecordpayload, {
            remittanceCode: response.remittanceCode,
            remittanceId: response.id,
        })
        loadingbycode.value = false;
    } catch (error) {
        loadingbycode.value = false;
        console.error(error)
    }
}

const setSelectedDate = (payload) => {
    if (!payload?.toString()?.toLowerCase()?.includes("invalid date")) {
        Object.assign(manualrecordpayload, {
            datePaid: new Date(payload)?.toISOString()
        })
    }
}

const recordPaymentmanually = async() => {
    console.log(manualrecordpayload)
    try {
        const response = await RecordPaymentManually(manualrecordpayload);
        displayDialog.value = true
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="container-top">
            <section>
                <div class="text-head h2 font-weight-bold py-0 my-0 text-black">Manual Payment Record</div>
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
                        <div class="text_label">Remittance ID  
                            <el-icon class="is-loading" v-if="loadingbycode">
                                <Loading />
                            </el-icon>
                        </div>
                        <el-input type="text" placeholder="Enter remittance ID" @input="getRemmittanceByCode" v-model="code" />
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Branch Name</div>
                        <el-input type="text" placeholder="Branch name" v-model="tenantName" disabled />
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Amount</div>
                        <el-input type="text" placeholder="Enter amount" v-model="manualrecordpayload.amount" />
                    </div>
                    <div class="mt-4">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="text_label">Payment Channel</div>
                                <el-input type="text" placeholder="Enter means of payment. i.e Bank Transfer" v-model="manualrecordpayload.paymentChannel" />
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="text_label">Date paid</div>
                                <CustomDatePicker
                                    label="Date paid"
                                    class="w-100"
                                    size="large"
                                    @date="setSelectedDate($event, index)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="text_label">Remittance Year</div>
                                <el-input type="text" placeholder="Choose bank" v-model="periodYear" disabled />
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="text_label">Remittance Month</div>
                                <el-input type="text" placeholder="Choose bank" v-model="periodMonth" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="row mt-5">
                    <div class="col-12 col-md-6 offset-md-3">
                        <div class="text-head font-weight-bold py-0 my-0 text-black">Manual Payment Record</div>
                        <div class="card">
                            <div class="d-flex justify-content-center w-100">
                            <el-upload v-model:file-list="fileList" class="upload-demo d-flex flex-column align-items-center">
                                    <el-button class="upload_button px-4" size="large" round>Upload</el-button>
                                    <template #tip>
                                        <div class="el-upload__tip">
                                            jpg/png files with a size less than 500KB.
                                        </div>
                                    </template>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="d-flex justify-content-center mt-4">
                    <el-button :color="primarycolor" class="px-5" size="large" @click="recordPaymentmanually"
                        round>Save</el-button>
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
                                    Your remittance payment is recorded successfully
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 my-3 d-flex flex-column justify-content-center align-items-center">
                            <!-- <div class="col-md-6 border"> -->
                            <el-button @click="(displayDialog = !displayDialog),(router.go(-1))" :color="primarycolor" size="large"
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
    padding: 40px;
    border-radius: 8px;
}

.text_label {
    color: #1E1E1E;
    font-weight: 500;
    margin-bottom: 5px;
}

.upload_button {
    border: 1px dashed #0745AF;
    color: #0745AF;
}
</style>