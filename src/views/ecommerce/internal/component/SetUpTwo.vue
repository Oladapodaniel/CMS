<script setup>
import { inject, ref } from 'vue';

const primarycolor = inject("primarycolor")
</script>

<template>
    <div>
        <p class="font-weight-600 text-center">Upload High-resolution Website Header Logo</p>
        <img src="../../../../assets/3MasterCard500.png" class="banner" />
        <div class="d-flex justify-content-center mt-4">
            <el-upload class="upload-demo" :limit="1" :auto-upload="false">
                <el-button class="upload-button" size="large" round>Upload website logo</el-button>
            </el-upload>
        </div>
        <el-divider />
        <p class="s-14 font-weight-500 text-center">Upload High-resolution Website Banner slides (Up to 3 - Size 1732 BY 487) </p>
        <div class="p-3 bg-white rounded-lg">
            <img src="../../../../assets/3MasterCard500.png" class="banner" />
        </div>
        <div class="d-flex justify-content-center mt-4">
            <el-upload class="upload-demo" :limit="1" :auto-upload="false">
                <el-button class="upload-button" size="large" round>Upload website logo</el-button>
            </el-upload>
        </div>
        <div class="d-flex justify-content-between mt-5">
            <el-button size="large" round text>Go back</el-button>
            <el-button :color="primarycolor" size="large" round>Save & Proceed</el-button>
        </div>
    </div>
</template>

<style scoped>
.upload-button {
    border: 1px dashed #0745AF;
    color: #12346F;
    background-color: white;
}
.upload-button:hover {
    background-color: #0745afd5;
}

.banner {
    width: 100%
}
</style>