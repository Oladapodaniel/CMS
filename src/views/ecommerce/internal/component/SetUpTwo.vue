<script setup>
import { inject, ref } from 'vue';

const primarycolor = inject("primarycolor")
</script>

<template>
    <div>
        <p class="font-weight-600 text-center">Upload High-resolution Website Header Logo</p>
        <div class="d-flex justify-content-center">
            <img src="../../../../assets/3MasterCard500.png" class="w-50" />
        </div>
        <div class="d-flex justify-content-center mt-4">
            <el-upload class="upload-demo" :limit="1" :auto-upload="false">
                <el-button class="upload-button" size="large" round>Upload website logo</el-button>
            </el-upload>
        </div>
        <el-divider />
        <p class="s-14 font-weight-500 text-center">Upload High-resolution Website Banner slides (Up to 3 - Size 1732 BY
            487) </p>
        <div class="p-3 bg-white rounded-lg">
            <img src="../../../../assets/3MasterCard500.png" class="banner" />
            <div class="d-flex justify-content-between align-items-center">
                <p class="mt-3 s-14">webBanner.jpeg</p>
                <el-icon color="red">
                    <Delete />
                </el-icon>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
            <el-upload class="upload-demo" :limit="1" :auto-upload="false">
                <el-button class="upload-button" size="large" round>Upload website logo</el-button>
            </el-upload>
        </div>
        <div class="d-flex justify-content-between flex-wrap mt-5">
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