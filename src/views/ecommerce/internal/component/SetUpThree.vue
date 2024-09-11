<script setup>
import { inject, ref, watchEffect } from 'vue';

const primarycolor = inject('primarycolor');
const payload = ref({});
const emit = defineEmits(['onpayload', 'back']);
const props = defineProps({
    updateStoreSetup: {
        type: Object,
        required: false
    }
})

watchEffect(() => {
        if (props.updateStoreSetup) {
            payload.value.returnPolicy = props.updateStoreSetup?.returnPolicy;
            emit('onpayload', { payload: payload.value, type: 3, edit: true })
        }
    })
</script>
<template>
    <div>
        <p class="font-weight-500">Return Policy</p>
        <p>To keep Customers’ right protected we request Detailed outline of the church's return policy of your products or services.</p>
        <el-input type="textarea" placeholder="Return Policy" v-model="payload.returnPolicy" rows="10" />
        <div class="d-flex justify-content-between flex-wrap mt-5">
            <el-button size="large" round text @click="emit('back')">Go back</el-button>
            <el-button :color="primarycolor" size="large" @click="emit('onpayload', { payload, type: 3  })" round>Save & Proceed</el-button>
        </div>
    </div>
</template>