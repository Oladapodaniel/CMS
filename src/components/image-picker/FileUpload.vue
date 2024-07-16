<script setup>
import { ref } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const emit = (['isEmit']);

const image = ref("");
const img = ref("");
const show = ref(false);

const change = ({ canvas }) => {
  image.value = canvas.toDataURL();
  show.value = true;
};

const onFileChange = (event) => {
  const files = event.target.files[0];
  if (files && files.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(files);
  }
};
const saveCroppedImage = () => {
  if (image.value === "") {
    alert("Please Select Image");
    return;
  }

  const arr = image.value.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const file = new File([u8arr], "filename.png", { type: mime });
  emit("isEmit", file);

  // Clear the original image after saving the cropped image
  image.value = "";
};
</script>
<template>
  <div class="container mx-auto p-4">
    <h1 class="s-18 font-weight-bold mb-4">Image Cropper</h1>
    <input ref="file" type="file" @change="onFileChange" class="mb-4" />
    <div v-if="img">
      <Cropper
        :src="img"
        class="w-100 h-100"
        :stencil-props="{ aspectRatio: 1 }"
        @change="change"
      />
    </div>
    <button @click="saveCroppedImage" class="mt-4 px-4 py-2 rounded">
      Save Cropped Image
    </button>
    <div v-if="image" class="mt-4">
      <img :src="image" alt="Cropped Image" class="border rounded" />
    </div>
  </div>
</template>
<style scoped>
.user {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 3px solid #2e7d32;
  position: relative;
}
.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  font-size: 14px;
  cursor: pointer;
}
</style>
