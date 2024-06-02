<script>
import { ref, inject, computed } from "vue";
import VerifyOTPCode from "@/components/VerifyOTPCode.vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import axios from "@/gateway/backendapi";
import { ElMessage } from 'element-plus';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import setupService from '@/services/setup/setupservice';

export default {
    components: {
        VerifyOTPCode
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const primarycolor = inject('primarycolor')
        const deleteTermsDialog = ref(false)
        const terms = ref([
            'Data Deletion: By deleting your account, all your data associated with the account will be permanently removed from our system. This includes your profile information, preferences, and any content you\'ve created or shared.',
            'Irreversible Action: Deleting your account is irreversible. Once you confirm the deletion, there\'s no way to recover your account or any associated data. ',
            'Subscriptions and Purchases: Please note that deleting your account does not automatically cancel any active subscriptions or delete purchase history. If you have any subscriptions or outstanding purchases, you\'ll need to manage them separately.',
            'Feedback: We value your feedback. If there\'s anything specific that led you to delete your account, we\'d appreciate hearing about it. Your input helps us improve our service for others.'
        ])
        const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
        const loadingOTP = ref(false)
        const OTPtoken = ref("")

        const getUser = computed(() => {
            if (
                !store.getters.currentUser ||
                (store.getters.currentUser &&
                    Object.keys(store.getters.currentUser).length == 0)
            )
                return "";
            return store.getters.currentUser;
        });

        const sendCode = async () => {
            loadingOTP.value = true
            try {
                const res = await axios.get(`/mobile/v1/Account/SendOTP?phoneNumber=0000&email=${getUser.value.userEmail}&tenantId=176bb861-d22e-4598-b2fe-f877888d819c`)
                loadingOTP.value = false
                if (res.data.status) {
                    OTPtoken.value = res.data.returnObject.token
                    ElMessage({
                        type: "success",
                        message: "OTP sent",
                        duration: 5000,
                    });
                    deleteTermsDialog.value = true
                } else {
                    ElMessage({
                        type: "error",
                        message: "OTP not sent, please try again",
                        duration: 5000,
                    });
                }
            }
            catch (error) {
                console.log(error)
                loadingOTP.value = false
            }
        }

        const OTPVerifySuccessful = () => {
            deleteTermsDialog.value = false
            deleteAccount()
        }

        const deleteAccount = async () => {
            loadingOTP.value = true
            try {
                const res = await axios.delete(`/settings/deleteAndCloseAccount?tenantId=${getUser.value.tenantId}`)
                loadingOTP.value = false
                ElMessage({
                    type: "success",
                    message: "Account has been successfully deleted",
                    duration: 5000,
                });

                setTimeout(() => {
                    localStorage.clear()
                    router.push('/')
                    store.dispatch('clearCurrentUser', {})
                    setupService.clearStore();
                }, 3000);
            }
            catch (error) {
                console.log(error)
                loadingOTP.value = false
            }

        }

        return {
            terms,
            primarycolor,
            deleteTermsDialog,
            lgAndUp,
            xlAndUp,
            mdAndUp,
            sendCode,
            loadingOTP,
            getUser,
            OTPtoken,
            OTPVerifySuccessful
        }
    }
}
</script>

<template>
    <div>
        <div class="container">
            <div class="row d-md-flex justify-content-between mt-3 mb-5">
                <div class="col-md-12">
                    <h2 class="header">Delete Account</h2>
                </div>
            </div>
            <div>
                We're sorry to see you go. If you're sure about deleting your account, we want to make the process as
                simple as
                possible for you. Please take a moment to review the following information before proceeding.
            </div>
            <div class="font-weight-bold mt-5">
                Important Points to Consider:
            </div>
            <ol class="mt-4">
                <li v-for="(item, index) in terms" :keys="index" class="mt-3">{{ item }}</li>
            </ol>
            <el-button size="large" round class="w-100 mt-5" :color="primarycolor" :loading="loadingOTP"
                @click="sendCode">
                <span class="text-white">Delete Account</span>
            </el-button>
        </div>
        <el-dialog style="border-radius: 20px" v-model="deleteTermsDialog"
            :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" top>
            <div class="row justify-content-center" v-loading>
                <div class="col-md-12">
                    <VerifyOTPCode :OTPtoken="OTPtoken" @otpsuccessful="OTPVerifySuccessful" />
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
.header {
    text-align: left;
    color: #02172e;
    opacity: 1;
}
</style>