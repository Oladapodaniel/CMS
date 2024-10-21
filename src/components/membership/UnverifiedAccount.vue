<script setup>
import { computed, inject, ref, watchEffect } from 'vue';
import deviceBreakpoint from '../../mixins/deviceBreakpoint';
import router from '../../router';
import axios from '@/gateway/backendapi';
import store from '../../store/store';

const primarycolor = inject('primarycolor');
const displayDialog = ref(false);
const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
const sent = ref(false);
const verifying = ref(false);

const toggleDialog = () => displayDialog.value = !displayDialog.value;
const updateProfile = () => router.push('/tenant/settings/profile');
const email = computed(() => {
    if (localStorage.getItem('email')) return localStorage.getItem('email')
    return "";
})

const { triggerDialog } = defineProps(['triggerDialog']);
const emit = defineEmits(['cleartrigger'])

const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });
const verifyEmail = async () => {
    console.log(`/InitiateTenantVerification?tenantId=${getUser.value.tenantId}`);
    verifying.value = true;
    try {
        const response = await axios.post(`/InitiateTenantVerification?tenantId=${getUser.value.tenantId}`);
        verifying.value = false;
        sent.value = true
        console.log(response, 'email verificaion snet')
        
    } catch (error) {
        verifying.value = false;
        console.error(error)
    }
}

watchEffect(() => {
    console.log(triggerDialog, 'ee')
    if (triggerDialog) {
        displayDialog.value = true;
        emit('cleartrigger')
    }
})
</script>

<template>
    <div class="col-md-12 mb-1 verify_email">
        <div>
            <h4 class="font-weight-600 line-height">Your email is not verified yet</h4>
            <div class="s-14">Limited feature use, <span class="font-weight-600">Verify to go unlimited!</span></div>
        </div>
        <div class="cursor-pointer" @click="toggleDialog">
            <el-button size="large" class="verify_button" round>Verify now</el-button>
        </div>
    </div>
    <el-dialog v-model="displayDialog" title="" class="pastorsDialog "
        :width="mdAndUp || lgAndUp || xlAndUp ? `40%` : `90%`" align-center>
        <div class="d-flex justify-content-between px-4">
            <h4 class="font-weight-700 verify_text" style="color: #1E1E1E">Verify email</h4>
            <div class="s-16">{{ email }}</div>
        </div>
        <div class="px-5 mt-4 mb-4" v-if="!sent">
            <div class="s-16 text-center" style="color: #171717">By Verifying this email, you confirm
                that your ChurchPlus Account be linked to it.
            </div>
            <div>
                <el-button class=" border-0 text-white mt-3 w-100" :color="primarycolor" size="large" @click="verifyEmail" :loading="verifying" round>Verify email now</el-button>
            </div>
            <el-button class="w-100 secondary-button mt-4" size="large" @click="updateProfile" round>Update email address</el-button>
        </div>
        <div class="px-5 mt-4 mb-4" v-else>
            <div class="s-16 text-center" style="color: #171717">A link to verify your account has been sent to your email
            </div>
            <div>
                <el-button class="w-100 secondary-button mt-4" size="large" @click="displayDialog = false" round>Close</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<style scoped>
.verify_email {
    border-left: solid #FF4B4B 7px;
    border-top-left-radius: 5px 5px;
    border-bottom-left-radius: 5px 5px;
    background-color: #F8F0E7;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    color: #171717;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
}

.verify_button {
    background-color: #E93535;
    color: #FFFFFF;
    outline: #E93535;
}

.verify_button:active,
.verify_button:focus {
    outline: #E93535;
    border: 1px solid #e97e7e
}

.verify_button:hover {
    background-color: #e97e7e;
}

.line-height{
    line-height: 14px
}


/* .verify_text {
    color: "#000000" !important
} */
</style>