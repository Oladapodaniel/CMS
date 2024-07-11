<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8 col-12">
        <div class="row my-3">
          <div class="col-md-12 py-4 pl-md-0">
            <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
              Create Post Category
            </div>
            <div @click="goBack">
              <span class="s-18 fw-400 cursor-pointer text-black">
                <img src="../../../assets/goback.png" alt="" />
                Go back
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 bordered1  p-4 ">
            <div class="row my-3">
              <div class="col-md-12">
                <label class="fw-500" for="">Name</label>
              </div>
              <div class="col-md-12">
                <input type="text" class="form-control input-border" v-model="category.name" />
              </div>
              <div class="col-md-2"></div>
            </div>

            <div class="row my-3">
              <div class="col-md-12">
                <label class="fw-500" for="">Image</label>
              </div>
              <div class="col-md-12">
                <button
                  class="text-decoration-none input-border text-left w-100 c-pointer text-dark border w-100 bg-white p-2"
                  @click="chooseImage"
                >
                  Choose category image
                </button>
              </div>
            </div>

            <div class="row my-4">
              <div class="col-md-12 text-center">
                <span
                  ><img
                    style="border-radius: 15px; max-width: 100%; max-height: 200px"
                    class="mx-auto h-100"
                    :src="fileUrl"
                    alt=""
                /></span>
              </div>
            </div>

            <div class="row my-3">
              <div class="col-md-12 text-center">
                <el-button
                  class="w-100 text-white py-4 border-0"
                  :disabled="!category.name"
                  @click="createCategory"
                  :color="primarycolor"
                  round
                >
                  Create Category
                </el-button>
              </div>
              <div class="col-md-2"></div>
            </div>
            <Dialog
              header="Image Picker"
              v-model:visible="display"
              :style="{ width: '70vw', maxWidth: '600px' }"
              :modal="true"
              position="top"
            >
              <ImagePicker @uploaded="fileUploaded" />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useStore } from "vuex";
import membershipService from "../../../services/membership/membershipservice";
import social_service from "../../../services/social/social_service";
import router from "../../../router";
import { ElMessage } from "element-plus";
import ImagePicker from "@/components/image-picker/ImagePicker";
// import Dialog from "primevue/dialog";

export default {
  components: { ImagePicker },
  setup() {
    const store = useStore();
    const primarycolor = inject("primarycolor");
    const display = ref(false);
    const category = ref({});
    const tenantId = ref("");
    console.log(tenantId.value, "outside");
    const categoryImageUrl = ref("");

    const createCategory = async () => {
      try {
        const formData = new FormData();

        if (file.value) {
          formData.append("categoryImage", file.value ? file.value : "");
        }

        if (categoryImageUrl.value) {
          formData.append(
            "categoryImageUrl",
            categoryImageUrl.value ? categoryImageUrl.value : ""
          );
        }
        formData.append("name", category.value.name);
        formData.append("tenantId", tenantId.value);

        const response = await social_service.createPostCategory(formData);
        console.log(response);
        ElMessage({
            type: "success",
            message: `${category.value.name} category has been created`,
            duration: 5000,
          });
      } catch (error) {
        ElMessage({
            type: "error",
            message: "Category was not created",
            duration: 5000,
          });
        console.log(error);
      }
    };
    const goBack = () => {
      router.go(-1);
    };

    const getTenantId = async () => {
      if (store.getters && store.getters.currentUser) {
        tenantId.value = store.getters.currentUser.tenantId;
      } else {
        try {
          const response = await membershipService.getSignedInUser();
          tenantId.value = response.tenantId;
        } catch (error) {
          console.log(error);
        }
      }
    };

    const chooseImage = () => {
      display.value = true;
    };

    const fileUrl = ref("");
    const file = ref("");
    const fileUploaded = (payload) => {
      if (payload.isUrl) {
        fileUrl.value = payload.data;
        categoryImageUrl.value = payload.data;
        file.value = "";
      } else {
        file.value = payload.data;
        fileUrl.value = URL.createObjectURL(payload.data);
        categoryImageUrl.value = "";
      }
      display.value = false;
    };

    if (!tenantId.value) getTenantId();

    return {
      category,
      createCategory,
      display,
      chooseImage,
      fileUploaded,
      fileUrl,
      goBack,
      primarycolor,
    };
  },
};
</script>

<style scoped>
.bordered1 {
  border: 1px solid #E1E1E1;
  border-radius: 8px;
  background: #F9F9F9;
}
</style>
