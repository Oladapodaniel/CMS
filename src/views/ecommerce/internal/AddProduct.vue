<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import HeaderSection from './component/HeaderSection.vue';
import { addProductCategory, getProductCategories, productType } from '../../../services/ecommerce/ecommerceservice';
import { ElMessage } from "element-plus";
import media_service from '../../../services/media/media_service';

const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');
const categoryDialog = ref(false)
const category = reactive({});
const categoryLoading = ref(false);
const productCategories = ref([]);
const selectedCategory = ref(null);
const selectedProductType = ref(null);
const coverurl = ref("");
const loadingCoverImage = ref(false);

onMounted(() => {
    getCategories();
})

const getCategories = async () => {
    try {
        let response = await getProductCategories();
        productCategories.value = response
    } catch (error) {
        console.error(error)
    }
}

const displaNewCategoryDialog = () => categoryDialog.value = true

const saveNewCategory = async () => {
    categoryLoading.value = true;
    try {
        let response = await addProductCategory(category);
        categoryLoading.value = false;
        categoryDialog.value = false;
        productCategories.value.push(response);
        selectedCategory.value = response.id;
        category = new Object();
        ElMessage({
            type: "success",
            message: "Category created successfully",
            duration: 5000
        });
    } catch (error) {
        console.error(error)
    }
}

const uploadCoverImage = async (e) => {
    loadingCoverImage.value = true;
    let formData = new FormData();
    formData.append("mediaFileImage", e.raw);
    coverurl.value = URL.createObjectURL(e.raw);
    try {
        let data = await media_service.uploadImage(formData);
        console.log(data)
        loadingCoverImage.value = false;
    } catch (error) {
        loadingCoverImage.value = false;
        console.log(error);
    }
}

const createProduct = () => {
    let payload = {
        "id": "00000000-0000-0000-0000-000000000000",
        "name": null,
        "productName": null,
        "ProductType": 0,
        "description": null,
        "price": 0.0,
        "stockQuantity": 0,
        "ecommerceCategoryID": null,
        "ecommerceBrandID": null,
        "imageURL": null,
        "imageURLBlobName": null,
        "fileURL": null,
        "fileURLBlobName": null,
        "isArchived": false,
        "dateAdded": "0001-01-01T00:00:00",
        "tenantID": "00000000-0000-0000-0000-000000000000"
    }
}
</script>

<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <HeaderSection title="Upload New Products"
            :breadcrumbs="{ name: 'Ecommerce > Add Product', route: '/tenant/store' }" />

        <div class="mt-5">
            <el-row>
                <el-col :sm="24" :md="16" :lg="16" :xl="16">
                    <div class="image-thumbnail-parent mx-auto d-lg-none">
                        <div class="image-thumbnail">
                            <img src="../../../assets/people/phone-import.svg" alt="Upload Image" />
                        </div>
                        <el-upload class="upload-product w-100 mt-4" :auto-upload="false">
                            <el-button size="large" class="upload-file">Upload cover image</el-button>
                        </el-upload>
                    </div>
                    <div>
                        <label>Product Type</label>
                        <el-select-v2 :options="productType.map((i, index) => ({ label: i, value: index }))"
                            v-model="selectedProductType" placeholder="Choose product type" size="large"
                            class="w-100 mr-1" />
                    </div>
                    <div class="mt-4">
                        <label>Category</label>
                        <el-select-v2 v-model="selectedCategory"
                            :options="productCategories.map((i) => ({ label: i.categoryName, value: i.id }))"
                            placeholder="Choose category" size="large" class="w-100" />
                        <div class="d-flex justify-content-end mt-2" @click="displaNewCategoryDialog">
                            <el-button text>+Add new Category</el-button>
                        </div>
                    </div>
                    <div class="mt-2">
                        <label>Product name</label>
                        <el-input type="text" placeholder="Enter Product name" />
                    </div>
                    <div class="mt-4">
                        <label>Product Description</label>
                        <el-input type="textarea" rows="3" placeholder="Description" />
                    </div>
                    <el-collapse-transition>
                        <div class="mt-4" v-show="selectedProductType !== 4 && selectedProductType !== 5 && selectedProductType !== 6">
                            <el-upload class="upload-product w-100" :auto-upload="false">
                                <el-button size="large" class="upload-file">Click to upload {{ productType[selectedProductType] }} file</el-button>
                            </el-upload>
                            <div>No file selected</div>
                        </div>
                    </el-collapse-transition>
                    <div class="mt-4">
                        <el-row :gutter="15">
                            <el-col :sm="24" :md="12" :lg="12" :xl="12">
                                <div>
                                    <label>Amount</label>
                                    <el-input type="text" placeholder="NGN 20,000" />
                                </div>
                            </el-col>
                            <el-col :sm="24" :md="12" :lg="12" :xl="12">
                                <div>
                                    <label>Discount</label>
                                    <el-input type="text" placeholder="5%" />
                                </div>
                            </el-col>
                        </el-row>
                        <div class="mt-4">
                            <el-button size="large" class="w-100" :color="primarycolor" round>Save & upload</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="image-thumbnail-parent mx-auto d-none d-lg-block">
                        <div class="image-thumbnail">
                            <img :src="coverurl" class="w-100" v-if="coverurl" />
                            <img src="../../../assets/people/phone-import.svg" alt="Upload Image" v-else />
                        </div>
                        <el-upload class="upload-product w-100 mt-4" :auto-upload="false" @change="uploadCoverImage">
                            <el-button size="large" :loading="loadingCoverImage" class="upload-file">Upload cover image</el-button>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog v-model="categoryDialog" title=""
            :width="mdAndUp || lgAndUp || xlAndUp ? `35%` : xsOnly ? `90%` : `70%`"
            class="QRCodeDialog border-radius-20" align-center>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 text-center text-black h2 fw-500">
                        Add new category
                    </div>
                    <div class="col-md-12 text-center text-black s-20">
                        Enter the product category name and description below
                    </div>
                    <div class="col-md-12 mt-3">
                        <div class="row justify-content-center">
                            <div class="col-md-11 form-group">
                                <div class="text-black">Category name</div>
                                <el-input placeholder="Category name" class="w-100" v-model="category.categoryName" />
                            </div>
                            <div class="col-md-11 form-group">
                                <div class="text-black">Description</div>
                                <el-input type="textarea" :rows="3" placeholder="Description" class="w-100"
                                    v-model="category.description" />
                            </div>
                            <div class="col-md-12 d-flex pb-3 justify-content-center">
                                <el-button class="col-md-11" size="large" :color="primarycolor" @click="saveNewCategory"
                                    :loading="categoryLoading" round>Save</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
.upload-file {
    border: 1px dashed rgba(7, 69, 175, 1);
    width: 100%;
    height: 50px;
    border-radius: 30px;
    color: rgba(7, 69, 175, 1);
}

.image-thumbnail {
    padding: 20px;
    background-color: rgba(242, 244, 247, 1);
    /* max-width: 300px; */
    /* margin: auto; */
    border-radius: 8px
}

.image-thumbnail-parent {
    max-width: 200px;
}
</style>