<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import HeaderSection from './component/HeaderSection.vue';
import { addProduct, addProductCategory, deleteProductCategory, getProductById, getProductCategories, productType, updateProduct, updateProductCategory } from '../../../services/ecommerce/ecommerceservice';
import { ElMessage, ElMessageBox } from "element-plus";
import media_service from '../../../services/media/media_service';
import router from '../../../router';
import store from '../../../store/store';
import { useRoute } from "vue-router";


const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');
const route = useRoute();
const categoryDialog = ref(false)
const category = ref({});
const categoryLoading = ref(false);
const productCategories = ref(store.getters["ecommerce/getCategories"] ?? []);
const selectedCategory = ref(null);
const selectedProductType = ref(null);
const coverurl = ref("");
const fileurl = ref("");
const loadingCoverImage = ref(false);
const loadingFile = ref(false);
const fileResponse = ref(null);
const coverImageResponse = ref(null);
const productName = ref("");
const description = ref("");
const price = ref("");
const createProductLoading = ref(false)

onMounted(() => {
    if (productCategories.value.length === 0) {
        getCategories();
    }
})

const getCategories = async () => {
    store.dispatch("ecommerce/getProductCategory").then((response => {
        productCategories.value = response
    }))
}

const displaNewCategoryDialog = () => {
    category.value = new Object();
    categoryDialog.value = true
}

const showConfirmModal = (item, index) => {
    ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "error",
        }
    )
        .then(() => {
            deleteCategory(item, index)
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "Rejected",
                duration: 5000,
            });
        });
};

const deleteCategory = async (item, index) => {
    try {
        let response = await deleteProductCategory(item.value);
        productCategories.value.splice(index, 1)
        getCategories();
        ElMessage({
            type: "success",
            message: "Category deleted successfully",
            duration: 5000
        });
        selectedCategory.value = null
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

const saveNewCategory = async () => {
    categoryLoading.value = true;
    if (!category.value?.id) {
        try {
            let response = await addProductCategory(category.value);
            categoryLoading.value = false;
            categoryDialog.value = false;
            productCategories.value.push(response);
            selectedCategory.value = response.id;
            getCategories();
            category.value = new Object();
            ElMessage({
                type: "success",
                message: "Category created successfully",
                duration: 5000
            });
        } catch (error) {
            console.error(error)
        }
    } else {
        editCategory();
    }
}

const displayCategoriesToUpdate = (item) => {
    category.value = productCategories.value.find(i => i.id === item.value)
    categoryDialog.value = true
}

const editCategory = async () => {

    delete category.value.products
    try {
        let response = await updateProductCategory(category.value);
        categoryLoading.value = false;
        categoryDialog.value = false;
        productCategories.value.push(response);
        selectedCategory.value = response.id;
        getCategories();
        category.value = new Object();
        ElMessage({
            type: "success",
            message: "Category updated successfully",
            duration: 5000
        });
    } catch (error) {
        console.error(error)
    }
}

const uploadImage = async (e, type) => {
    type == 1 ? loadingCoverImage.value = true : loadingFile.value = true;
    let formData = new FormData();
    formData.append("mediaFileImage", e.raw);
    type == 1 ? coverurl.value = URL.createObjectURL(e.raw) : fileurl.value = URL.createObjectURL(e.raw)
    try {
        let data = await media_service.uploadFileAndImage(formData);
        if (type == 1) {
            loadingCoverImage.value = false
            coverImageResponse.value = data
            console.log("uploading Cover Image")
        } else {
            console.log("uploading file")
            loadingFile.value = false;
            fileResponse.value = data;
        }
    } catch (error) {
        type == 1 ? loadingCoverImage.value = false : loadingFile.value = false;
        console.log(error);
    }
}

const isImage = (fileUrl) => {
    return fileUrl?.match(/\.(jpg|jpeg|png|gif)$/i);
};

const isAudio = (fileUrl) => {
    return fileUrl?.match(/\.(mp3|wav|ogg|m4a)$/i);
};

const isVideo = (fileUrl) => {
    return fileUrl?.match(/\.(mp4|webm|ogg)$/i);
};

const createProduct = async () => {
    createProductLoading.value = true;
    let payload = {
        name: productName.value,
        productName: productName.value,
        productType: selectedProductType.value,
        description: description.value,
        price: price.value,
        ecommerceCategoryID: selectedCategory.value,
        imageURL: coverImageResponse.value?.pictureUrl ?? "",
        imageURLBlobName: coverImageResponse.value?.imageBlobName ?? "",
        fileURL: fileResponse.value?.pictureUrl ?? "",
        fileURLBlobName: fileResponse.value?.imageBlobName ?? "",
    }

    if (!route.params.id) {
        try {
            const response = await addProduct(payload);
            console.log(response)
            createProductLoading.value = false;
            ElMessage({
                type: "success",
                message: "Product created successfully",
                duration: 5000
            });
            store.dispatch("ecommerce/getAllProducts").then((() => {
                router.push('/tenant/store/products')
            }))
        } catch (error) {
            createProductLoading.value = false;
            console.log(error);
        }
    } else {
        payload.id = route.params.id;
        try {
            const response = await updateProduct(payload);
            console.log(response)
            createProductLoading.value = false;
            ElMessage({
                type: "success",
                message: "Product updated successfully",
                duration: 5000
            });
            store.dispatch("ecommerce/getAllProducts").then((() => {
                router.push('/tenant/store/products')
            }))
        } catch (error) {
            createProductLoading.value = false;
            console.log(error);
        }
    }

}

const getSingleProduct = async () => {

    try {
        const response = await getProductById(route.params.id);
        console.log(response, 'single')
        selectedProductType.value = response.productType;
        selectedCategory.value = response.ecommerceCategoryID;
        productName.value = response.productName;
        description.value = response.description;
        price.value = response.price;
        coverurl.value = response.imageURL;
        coverImageResponse.value = new Object();
        coverImageResponse.value.pictureUrl = response.imageURL;
        coverImageResponse.value.imageBlobName = response.imageURLBlobName;
        fileurl.value = response.fileURL
        fileResponse.value = new Object();
        fileResponse.value.pictureUrl = response.fileURL;
        fileResponse.value.imageBlobName = response.fileURLBlobName
    } catch (error) {
        console.log(error);
    }
}
if (route.params.id) getSingleProduct()
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
                            <img :src="coverurl" class="w-100" v-if="coverurl" />
                            <img src="../../../assets/people/phone-import.svg" alt="Upload Image" v-else />
                        </div>
                        <el-upload class="upload-product w-100 mt-4" :auto-upload="false"
                            @change="uploadImage($event, 1)">
                            <el-button size="large" :loading="loadingCoverImage" class="upload-file">Upload cover
                                image</el-button>
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
                            placeholder="Choose category" size="large" class="w-100">
                            <template #default="{ item, index }">
                                <div class="d-flex justify-content-between">
                                    <span style="margin-right: 8px">{{ item.label }}</span>
                                    <span style="color: var(--el-text-color-secondary); font-size: 13px">
                                        <el-button type="primary" circle @click="displayCategoriesToUpdate(item)">
                                            <el-icon>
                                                <Edit />
                                            </el-icon>
                                        </el-button>
                                        <el-button type="danger" circle @click="showConfirmModal(item, index)">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                        </el-button>
                                        <!-- <el-button type="danger" :icon="Delete" circle /> -->
                                    </span>
                                </div>
                            </template>
                        </el-select-v2>
                        <div class="d-flex justify-content-end mt-2" @click="displaNewCategoryDialog">
                            <el-button text>+Add new Category</el-button>
                        </div>
                    </div>
                    <div class="mt-2">
                        <label>Product name</label>
                        <el-input type="text" placeholder="Enter Product name" v-model="productName" />
                    </div>
                    <div class="mt-4">
                        <label>Product Description</label>
                        <el-input type="textarea" rows="3" placeholder="Description" v-model="description" />
                    </div>
                    <el-collapse-transition>
                        <div class="mt-4"
                            v-show="selectedProductType !== 4 && selectedProductType !== 5 && selectedProductType !== 6">
                            <img :src="fileurl" class="w-50 mb-3 rounded-lg" v-if="fileurl && isImage(fileurl)" />
                            <div v-if="fileurl && isAudio(fileurl)">
                                <audio class="w-100" controls>
                                    <source :src="fileurl" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            <div v-if="fileurl && isVideo(fileurl)">
                                <video width="320" height="240" controls>
                                    <source :src="fileurl" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <el-upload class="upload-product w-100" :auto-upload="false"
                                @change="uploadImage($event, 2)">
                                <el-button size="large" :loading="loadingFile" class="upload-file">Click to upload {{
                                    productType[selectedProductType] }} file</el-button>
                            </el-upload>
                            <div v-if="!fileurl || !fileResponse">No file selected</div>
                        </div>
                    </el-collapse-transition>
                    <div class="mt-4">
                        <el-row :gutter="15">
                            <el-col :sm="24" :md="24" :lg="24" :xl="24">
                                <div>
                                    <label>Price</label>
                                    <el-input type="number" placeholder="20000" v-model="price" />
                                </div>
                            </el-col>
                            <!-- <el-col :sm="24" :md="12" :lg="12" :xl="12">
                                <div>
                                    <label>Discount</label>
                                    <el-input type="text" placeholder="5%" />
                                </div>
                            </el-col> -->
                        </el-row>
                        <div class="mt-4">
                            <el-button size="large" class="w-100" :color="primarycolor" :loading="createProductLoading"
                                :disabled="loadingCoverImage || loadingFile" round @click="createProduct">Save &
                                upload</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="image-thumbnail-parent mx-auto d-none d-lg-block">
                        <div class="image-thumbnail">
                            <img :src="coverurl" class="w-100" v-if="coverurl" />
                            <img src="../../../assets/people/phone-import.svg" alt="Upload Image" v-else />
                        </div>
                        <el-upload class="upload-product w-100 mt-4" :auto-upload="false"
                            @change="uploadImage($event, 1)">
                            <el-button size="large" :loading="loadingCoverImage" class="upload-file">Upload cover
                                image</el-button>
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