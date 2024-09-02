<script setup>
import { inject } from 'vue';

const primarycolor = inject('primarycolor');

</script>
<template>
    <div>
        <p class="font-weight-500">Return Policy</p>
        <p>To keep Customers’ right protected we request Detailed outline of the church's return policy of your products or services.</p>
        <el-input type="textarea" placeholder="Return Policy" rows="10" />
        <div class="d-flex justify-content-between flex-wrap mt-5">
            <el-button size="large" round text>Go back</el-button>
            <el-button :color="primarycolor" size="large" round>Save & Proceed</el-button>
        </div>
    </div>
</template>