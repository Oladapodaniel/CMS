<template>
  <div>
    <div size="120" class="user">
      <v-img :src="image_name" class="profile-img"></v-img>
      <v-icon class="icon primary white--text" @click="$refs.FileInput.click()"
        >mdi-upload</v-icon
      >
      <input ref="FileInput" type="file" style="display: none" @change="onFileSelect" />
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text>
          <VueCropper
            v-show="selectedFile"
            ref="cropper"
            :src="selectedFile"
            alt="Source Image"
          ></VueCropper>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="primary"
            @click="
              () => {
                saveImage();
                dialog.value = false;
              }
            "
            >Crop</v-btn
          >
          <v-btn
            color="primary"
            text
            @click="
              () => {
                dialog.value = false;
              }
            "
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
// import VueCropper from "vue-cropperjs";
// import "cropperjs/dist/cropper.css";
// import { VDialog, VCard, VCardText, VCardActions, VBtn, VImg, VIcon } from "vuetify/lib";

export default {
//   components: { VueCropper },
//   components: { VueCropper, VDialog, VCard, VCardText, VCardActions, VBtn, VImg, VIcon },
  props: ["image_name"],
  setup(props) {
    const store = useStore();
    const route = useRoute();

    const mime_type = ref("");
    const cropedImage = ref("");
    const autoCrop = ref(false);
    const selectedFile = ref("");
    const dialog = ref(false);
    const cropperRef = ref(null);
    const FileInput = ref(null);

    const user = computed(() => store.state.user);

    const saveImage = () => {
      const userId = route.params.user_id;
      const cropper = cropperRef.value.getCroppedCanvas();
      if (!cropper) {
        console.error("Failed to get cropped canvas");
        return;
      }
      cropedImage.value = cropper.toDataURL();
      cropper.toBlob((blob) => {
        const formData = new FormData();
        formData.append("profile_photo", blob, "name.jpeg");
        axios
          .post(`/api/user/${userId}/profile-photo`, formData)
          .then((response) => {
            console.log("Image uploaded successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      }, mime_type.value);
    };

    const onFileSelect = (e) => {
      const file = e.target.files[0];
      mime_type.value = file.type;
      console.log(mime_type.value);
      if (typeof FileReader === "function") {
        dialog.value = true;
        const reader = new FileReader();
        reader.onload = (event) => {
          selectedFile.value = event.target.result;
          if (cropperRef.value) {
            cropperRef.value.replace(selectedFile.value);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    };

    return {
      mime_type,
      cropedImage,
      autoCrop,
      selectedFile,
      dialog,
      FileInput,
      user,
      saveImage,
      onFileSelect,
      cropperRef,
    };
  },
};
</script>

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
