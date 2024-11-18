<script setup>
const emit = defineEmits(['closestatusdialog'])
const { paymentStatusMessage } = defineProps(['paymentStatusMessage'])
</script>

<template>
    <div>
        <div class="row">
            <div class="bg-status">
                <img alt="success" src="../../assets/checked-success.png" width="100" v-if="paymentStatusMessage.toLowerCase() === 'success'"/>
                <img alt="success" src="../../assets/cancel-error.png" width="100" v-else-if="paymentStatusMessage.toLowerCase() === 'failed'"/>
                <h5 class="font-weight-700 text-dark mt-3">{{ paymentStatusMessage.toLowerCase() === 'success' ? 'Payment is successful' : paymentStatusMessage.toLowerCase() === 'failed' ? 'Payment failed' : ''  }}</h5>
            </div>
        </div>
        <div class="mt-4 d-flex justify-content-center">
            <el-button @click="emit('closestatusdialog')" size="large" class="text-underline text-dark" round
                text>Close</el-button>
        </div>
    </div>
</template>

<style scoped>
.bg-status {
  background: #EDEDED;
  border-radius: 8px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
}
</style>