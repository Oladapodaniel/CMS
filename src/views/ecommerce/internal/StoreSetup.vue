<script setup>
import { onMounted, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import SlidedMenu from '../../../components/nav/SlidedMenu.vue';
import SetUpOne from './component/SetUpOne.vue';
import SetUpTwo from './component/SetUpTwo.vue';
import SetUpThree from './component/SetUpThree.vue';
import StepFour from './component/StepFour.vue';
import store from '../../../store/store';
import { createEcommerceSetup, getEcommerceSetup, UpdateEcommerceSetup } from '../../../services/ecommerce/ecommerceservice';
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';

const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
const stepMenu = [
    "Core Information", "Store Branding", "Return Policy", "Payments"
]

const setupone = ref(true);
const setuptwo = ref(false);
const setupthree = ref(false);
const setupfour = ref(false);
const contributionItems = ref(store.getters["contributions/contributionItem"] ?? []);
const setupPayload = ref({});
const displayStoreSetupSuccessDialog = ref(false);
const activeMenu = ref(0);
const storeSetup = ref(null);
const route = useRoute();

const setSelectedMenuValue = (payload) => {
    activeMenu.value = payload
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

const getContributionItems = () => {
    store.dispatch("contributions/setContributionItem")
        .then(response => {
            contributionItems.value = response
        })
        .catch(error => console.error(error))
}
getContributionItems();

const setPayload = async ({ payload, type, edit }) => {
    setupPayload.value = {
        ...setupPayload.value,
        ...payload
    }
    if (type === 4) {
        if (route.params.id) {
            try {
                await UpdateEcommerceSetup(setupPayload.value);
                displayStoreSetupSuccessDialog.value = true
                ElMessage({
                    type: "success",
                    message: "Setup update successful",
                    duration: 5000,
                });
            } catch (error) {
                console.error(error)
                ElMessage({
                    type: "error",
                    message: "Setup update not successful, please try again",
                    duration: 5000,
                });
            }
        } else {
            try {
                await createEcommerceSetup(setupPayload.value);
                displayStoreSetupSuccessDialog.value = true
                ElMessage({
                    type: "success",
                    message: "Store setup successful",
                    duration: 5000,
                });
            } catch (error) {
                console.error(error)
                ElMessage({
                    type: "error",
                    message: "Setup not successful, please try again",
                    duration: 5000,
                });
            }
        }
    } 
    else {
        if (!edit) {
            setSelectedMenuValue(type);
        }
    }
}

const perviousStep = () => {
    activeMenu.value -= 1
    setSelectedMenuValue(activeMenu.value)
}

const getStoreSetup = async () => {
//   dashboardLoading.value = true;
  try {
    let response = await getEcommerceSetup();
    console.log(response, 'setup here');
    storeSetup.value = response
    // dashboardLoading.value = false;
  } catch (error) {
    // dashboardLoading.value = false;
    console.error(error);
  }
}
if (route.params.id) getStoreSetup();

</script>
<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="text-head font-weight-bold text-black h2">Ecommerce Set-up</div>

        <div class="row mt-5">
            <div class="col-md-3 col-xl-2">
                <SlidedMenu :links="stepMenu" @index="setSelectedMenuValue" :activeMenu="activeMenu" />
            </div>
            <div class="col-md-6 col-xl-5 mt-3 mt-md-0">
                <div class="body-card">
                    <transition name="el-zoom-in-top">
                        <SetUpOne @onpayload="setPayload" v-show="setupone" :updateStoreSetup="storeSetup" />
                    </transition>
                    <transition name="el-zoom-in-top">
                        <SetUpTwo @onpayload="setPayload" @back="perviousStep" v-show="setuptwo" :updateStoreSetup="storeSetup" />
                    </transition>
                    <transition name="el-zoom-in-top">
                        <SetUpThree @onpayload="setPayload" @back="perviousStep" v-show="setupthree" :updateStoreSetup="storeSetup" />
                    </transition>
                    <transition name="el-zoom-in-top">
                        <StepFour :contributionItems="contributionItems" @back="perviousStep" @onpayload="setPayload"
                            v-show="setupfour" :updateStoreSetup="storeSetup" />
                    </transition>
                </div>
            </div>
        </div>
        <el-dialog v-model="displayStoreSetupSuccessDialog" title=""
            :width="mdAndUp || lgAndUp || xlAndUp ? `35%` : xsOnly ? `90%` : `70%`"
            class="QRCodeDialog border-radius-20" align-center>

            <div class="container-fluid">
                <div class="d-flex flex-column align-items-center">
                    <img src="@/assets/checked-success.svg" width="120" />
                    <h4 class="text-center success_text mt-4 font-weight-600">You have set up your <br />Ecommerce store
                        successfully</h4>
                    <router-link to="/tenant/store/add">
                        <el-button color="#FF5906" class="text-white mt-3 p-4" size="large" round>Add First Product
                            now</el-button>
                    </router-link>
                    <el-button color="#FF5906" class="mt-3 p-4" size="large"
                        @click="displayStoreSetupSuccessDialog = false" round text>Close</el-button>
                </div>
            </div>
        </el-dialog>
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