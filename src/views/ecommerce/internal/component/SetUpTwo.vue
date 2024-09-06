<script setup>
import { inject, ref } from 'vue';
import media_service from '../../../../services/media/media_service';

const primarycolor = inject("primarycolor")
const payload = ref({});
const loadingLogoImage = ref(false);
const loadingBanner = ref(false);
const logo = ref("");
const banner = ref("");
const emit = defineEmits(['onpayload'])

const uploadImage = async (e, type) => {
    type == 1 ? loadingLogoImage.value = true : loadingBanner.value = true;
    let formData = new FormData();
    formData.append("mediaFileImage", e.raw);
    type == 1 ? logo.value = URL.createObjectURL(e.raw) : banner.value = URL.createObjectURL(e.raw)
    try {
        let data = await media_service.uploadFileAndImage(formData);
        if (type == 1) {
            loadingLogoImage.value = false
            payload.value.headerLogoURL = data.pictureUrl
            payload.value.headerLogoBlobName = data.imageBlobName
        } else {
            loadingBanner.value = false;
            payload.value.bannerURL = data.pictureUrl
            payload.value.bannerBlobName = data.imageBlobName
        }
    } catch (error) {
        type == 1 ? loadingLogoImage.value = false : loadingBanner.value = false;
        console.log(error);
    }
}

</script>

<template>
    <div>
        <p class="font-weight-600 text-center">Upload High-resolution Website Header Logo</p>
        <div class="d-flex justify-content-center">
            <transition name="el-fade-in-linear">
                <img :src="logo" class="w-50" v-if="logo"/>
            </transition>
        </div>
        <div class="d-flex justify-content-center mt-4">
            <el-upload class="upload-demo" :limit="1" :auto-upload="false" @change="uploadImage($event, 1)">
                <el-button class="upload-button" size="large" :loading="loadingLogoImage" round>Upload website logo</el-button>
            </el-upload>
        </div>
        <el-divider />
        <p class="s-14 font-weight-500 text-center">Upload High-resolution Website Banner slides (Up to 3 - Size 1732 BY
            487) </p>
        <div class="p-3 bg-white rounded-lg" v-if="banner">
            <transition name="el-fade-in-linear">
                <img :src="banner" class="banner" />
            </transition>
        </div>
        <div class="d-flex justify-content-center mt-4">
            <el-upload class="upload-demo" :limit="1" :auto-upload="false" @change="uploadImage($event, 2)">
                <el-button class="upload-button" size="large" :loading="loadingBanner" round>Upload website logo</el-button>
            </el-upload>
        </div>
        <div class="d-flex justify-content-between flex-wrap mt-5">
            <el-button size="large" round text>Go back</el-button>
            <el-button :color="primarycolor" size="large" @click="emit('onpayload', { payload, type: 2  })" round>Save & Proceed</el-button>
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