<script setup>
import { inject, ref } from 'vue';
import deviceBreakpoint from '../../mixins/deviceBreakpoint';
import transaction_service from '../../services/financials/transaction_service';
import { ConnectWithPaymentProvider, GetAllProviders } from '../../services/settings/integrations';
import { ElMessage } from 'element-plus';

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const displayDialog = ref(false);
const currencies = ref([]);
const selectedCurrency = ref(null);
const primarycolor = inject('primarycolor')
const paymentProviders = ref([])
const businessName = ref("");
const email = ref("");
const connectionResponse = ref(null);
const loadingproviders = ref(false)
const connecting = ref(false)

const getCurrencies = async () => {
    try {
        const response = await transaction_service.getCurrencies();
        currencies.value = response
    } catch (error) {
        console.error(error)
    }
}
getCurrencies();

const getProviders = async () => {
    loadingproviders.value = true;
    try {
        const response = await GetAllProviders();
        paymentProviders.value = response;
        loadingproviders.value = false;
    } catch (error) {
        console.error(error)
        loadingproviders.value = false;
    }
}
getProviders();

const connectProvider = async () => {

    if (!businessName.value || !email.value || !selectedCurrency.value) {
        ElMessage({
            type: 'warning',
            message: 'Please fill all fields.',
            duration: 4000
        })
        return;
    }
    connecting.value = true;
    let payload = {
        business_name: businessName.value,
        currency: selectedCurrency.value,
        emails: [
            email.value
        ]
    }

    try {
        const { status, data } = await ConnectWithPaymentProvider(payload);
        connecting.value = false;
        if (status) {
            connectionResponse.value = data;
        }
        getProviders();
    } catch (error) {
        connecting.value = false;
        console.error(error)
    }
    console.log(payload)
}
</script>

<template>
    <div>
        <div class="container">
            <div class="row d-md-flex justify-content-between mt-3 mb-5">
                <div class="col-md-12">
                    <div class="d-flex justify-content-between">
                        <h2 class="header">Integration</h2>
                        <div class="d-flex">
                            <div class="input-wrapper">
                                <input class="search_input" placeholder="Find an integration" type="text" />
                                <el-icon color="#888888" class="input-icon">
                                    <Search />
                                </el-icon>
                            </div>
                            <el-button :color="primarycolor" size="large" round>Add new</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row table_header">
                <div class="col-md-4">
                    <div>
                        Payments
                    </div>
                </div>
                <div class="col-md-4">Status</div>
                <div class="col-md-4">Actions</div>
            </div>
            <el-progress :percentage="100" :indeterminate="true" :duration="1" v-if="loadingproviders">
                <div></div>
            </el-progress>
            <div class="row" v-for="(item, index) in paymentProviders" :key="index">
                <div class="col-md-4 table_body">
                    <div class="d-flex align-items-center">
                        <img src="../../assets/paystack_white-bg.png" width="40"
                            v-if="item.name.toLowerCase() === 'paystack'" />
                        <div class="body_text ml-1">{{ item.name }}</div>
                        <div class="ml-2" v-if="item.status.toLowerCase() === 'connected'">
                            <img src="../../assets/blue_tick.png" width="13" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 align-self-center body_text">{{ item.status }}</div>
                <div class="col-md-4 align-self-center">
                    <!-- <el-button class="success_connect" @click="displayDialog = true">Connect</el-button> -->
                    <el-button class="success_connect" v-if="item.status.toLowerCase() === 'connected'" @click="displayDialog = true">Disconnect</el-button>
                    <el-button class="disconnect_btn" @click="displayDialog = true" v-else>Connect</el-button>
                </div>
                <el-divider class="m-0" />
            </div>
        </div>
        <el-dialog class="" style="border-radius: 25px;" v-model="displayDialog" title=""
            :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
            <div class="p-md-4" v-if="connectionResponse">
                <div class="d-flex flex-column align-items-center">
                    <img src="../../assets/7efs.gif" width="150" />
                    <h2 class="font-weight-600 text-dark">Great work</h2>
                    <div class="s-18 text-dark text-center">Click this <a :href="connectionResponse?.setup_link"
                            target="_blank">link</a> to complete account Linking
                        or Check
                        your email</div>
                    <div class="mt-5 row">
                    </div>
                </div>
                <div class="col-12 offset-md-3 col-md-6">
                    <el-button :color="primarycolor" class="w-100 confirm_button" size="large" @click="displayDialog = false" round>Close</el-button>
                </div>
            </div>
            <div class="p-md-4" v-else>
                <div class="d-flex justify-content-end">
                    <img src="../../assets/paystack.png" width="120" />
                </div>
                <div class="mt-3">
                    <label class="s-18 text-dark" style="font-weight: 500">Ministry / Business name</label>
                    <el-input type="text" placeholder="Enter name" v-model="businessName" />
                </div>
                <div class="mt-3">
                    <label class="s-18 text-dark" style="font-weight: 500">Currency</label>
                    <el-select-v2 v-model="selectedCurrency" filterable class="w-100 font-weight-normal" :options="currencies.map((i) => ({
                        label: i.name,
                        value: i.shortCode,
                        symbol: i.symbol
                    }))
                        " placeholder="Select currency" size="large">
                        <template #default="{ item }">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <span>{{ item.value }} &nbsp; - &nbsp;</span>
                                    <span>{{ item.label }}</span>
                                </div>
                                <span class="text-primary">{{ item.symbol }}</span>
                            </div>
                        </template>
                    </el-select-v2>
                </div>
                <div class="mt-3">
                    <label class="s-18 text-dark" style="font-weight: 500">Email</label>
                    <el-input type="email" placeholder="Enter email" v-model="email" />
                </div>
                <div class="mt-5 row">
                    <div class="col-12 offset-md-3 col-md-6">
                        <el-button :color="primarycolor" class="confirm_button w-100" size="large" :loading="connecting"
                            @click="connectProvider" round>Integrate</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
.table_header {
    background-color: #F6F6F6;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    /* padding: 10px 5px */
}

.table_header div:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    font-weight: 600;
    padding-left: 0;
    font-size: 20px;
}

.table_header div:first-child>div {
    padding: 10px 15px;
    width: 80%;
    background-color: #EFF7FF;
}

.table_header :not(div:first-child) {
    color: #5F5B5B;
    align-self: center;
}

.body_text {
    color: #071B31;
    font-size: 14px;
    font-weight: 500;
}

.table_body {
    padding: 10px;
}

.success_connect {
    background-color: #D8FFF8;
    color: #05C747;
    border: none;
    font-weight: 400
}

.disconnect_btn {
    background-color: #FFEDED;
    color: #AC0B0B;
    border: none;
    font-weight: 400
}

.search_input {
    border: 1px solid #C9C9C9;
    border-radius: 25px;
    height: 41px;
    padding: 10px;
    margin-right: 10px;
    min-width: 260px;
    padding-left: 40px;
    font-size: 12px
}

.search_input:focus {
    outline: 1px solid #136acd;
    border: none
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    top: 12px;
    left: 17px;
}

.confirm_button {
    box-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -webkit-box-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -moz-box-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -moz-o-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
    -moz-ms-shadow: 10px 7px 27px -8px rgba(0, 0, 0, 0.61);
}

div.text-dark.text-center > a {
    text-decoration: underline;
}
</style>