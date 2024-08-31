<script setup>
import { inject } from 'vue';

const primarycolor = inject('primarycolor');
</script>

<template>
    <div>
        <div>
            <label class="text-head font-weight-700">Website Name</label>
            <el-input type="text" placeholder="Harverster Inc." />
            <p class="s-14">Legal and display name of the church.</p>
        </div>
        <div class="mt-4">
            <label class="text-head font-weight-700">Physical Address</label>
            <el-input type="textarea" rows="3" placeholder="Harverster Inc." />
            <p class="s-14">Physical address of the church for shipping and contct purposes.</p>
        </div>
        <div class="mt-4">
            <label class="text-head font-weight-700">Customer Service and Help Contact</label>
            <el-input type="text" placeholder="Email" />
            <el-input type="text" placeholder="Phone number" class="mt-3" />
            <el-input type="text" placeholder="Whatsapp message" class="mt-3" />
            <p class="s-14">Customers are more confident when they can reach you.</p>
        </div>
        <div class="d-flex justify-content-end">
            <el-button :color="primarycolor" size="large" round>Save & Proceed</el-button>
        </div>
    </div>
</template>