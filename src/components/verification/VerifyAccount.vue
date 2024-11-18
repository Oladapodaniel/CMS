<script setup>
import { inject, onMounted, ref } from 'vue';
import axios from "@/gateway/backendapi";
import { useRoute } from 'vue-router';
import { GridLoader } from "vue3-spinner";
import router from '../../router';

const primarycolor = inject('primarycolor');
const route = useRoute();
const confirmed = ref(false);
const loading = ref(false);

onMounted(() => {
    verifyEmailAccount()
})

const verifyEmailAccount = async () => {
    loading.value = true;
    console.log(route.query, 'reachinggg ')

    const { ant, token } = route.query;
    try {
        loading.value = false;
        const { data } = await axios.post(`/TenantVerificationConfirmation?token=${token}&tenantID=${ant}`)
        if (data) {
            confirmed.value = true;
            localStorage.setItem('isVerified', true);
        }

    } catch (error) {
        console.log(error)
        loading.value = false;
    }
}
</script>
<template>
    <div class="vh-100 d-flex justify-content-center align-items-center p-3">
        <div class="card_wrapper" v-if="confirmed">
            <img src="../../assets/sent-mail.gif" alt="sent-mail" width="150" />
            <h3 class="card_message font-weight-500 text-center mt-4">Your Email address has been <br />Verified
                Successfully</h3>
            <el-button class="card_button mt-4" size="large" :color="primarycolor" @click="router.push('/tenant')" round>Proceed to
                Churchplus</el-button>
        </div>
        <div v-else>
            <GridLoader :loading="true" :color="primarycolor" size="20px" />
        </div>
    </div>
</template>

<style scoped>
.card_wrapper {
    border: 1px solid #0745AF;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center
}

.card_message {
    font-size: 26px;
}

@media (max-width: 767px) {
    .card_message {
        font-size: 16px;
    }
}
</style>