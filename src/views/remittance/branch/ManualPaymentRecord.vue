<script setup>
import { inject, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');
const displayDialog = ref(false);
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
                        <div class="text_label">Remittance ID</div>
                        <el-input type="text" placeholder="Offering" />
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Branch Name</div>
                        <el-input type="text" placeholder="10%" />
                    </div>
                    <div class="mt-4">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="text_label">Remittance Year</div>
                                <el-input type="text" placeholder="Choose bank" disabled />
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="text_label">Remittance Month</div>
                                <el-input type="text" placeholder="Choose bank" disabled />
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="text_label">Account received</div>
                            <el-input type="text" placeholder="NGN" />
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
                    <el-button :color="primarycolor" class="px-5" size="large" @click="() => displayDialog = true"
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