<script setup>
import { inject, ref } from 'vue';

const emit = defineEmits(['onpayload']);
const primarycolor = inject('primarycolor');
const payload = ref({})

</script>

<template>
    <div>
        <div>
            <label class="text-head font-weight-700">Website Name</label>
            <el-input type="text" placeholder="Website name" v-model="payload.websiteName" />
            <p class="s-14">Legal and display name of the church.</p>
        </div>
        <div class="mt-4">
            <label class="text-head font-weight-700">Physical Address</label>
            <el-input type="textarea" rows="3" placeholder="Physical address" v-model="payload.physicalAddress" />
            <p class="s-14">Physical address of the church for shipping and contct purposes.</p>
        </div>
        <div class="mt-4">
            <label class="text-head font-weight-700">Customer Service and Help Contact</label>
            <el-input type="text" placeholder="Email" v-model="payload.customerServiceEmail" />
            <el-input type="number" placeholder="Phone number" class="mt-3" v-model="payload.customerServicePhone" />
            <el-input type="number" placeholder="Whatsapp number" class="mt-3" v-model="payload.customerServiceWhatsapp" />
            <p class="s-14">Customers are more confident when they can reach you.</p>
        </div>
        <div class="d-flex justify-content-end">
            <el-button :color="primarycolor" size="large" @click="emit('onpayload', { payload, type: 1  })" round>Save & Proceed</el-button>
        </div>
    </div>
</template>