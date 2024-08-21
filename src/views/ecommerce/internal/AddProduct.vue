<script setup>
import { inject, onMounted } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import HeaderSection from './component/HeaderSection.vue';
import { getProductCategories } from '../../../services/ecommerce/ecommerceservice';

const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');

onMounted(() => {
    getCategories()
})

const getCategories = async() => {
    try {
        let response = await getProductCategories();
        console.log(response, 'response here')
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <HeaderSection title="Upload New Products"
            :breadcrumbs="{ name: 'Ecommerce > Add Product', route: '/tenant/store' }" @handleClick="handleClick" />

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
                        <!-- v-model="maritalStatusId"  -->
                        <!-- @change="setSelectedMaritalStatus"  -->
                        <el-select-v2 :options="[1, 2, 3].map((i) => ({ label: i, value: i }))"
                            placeholder="Choose product type" size="large" class="w-100 mr-1" />
                    </div>
                    <div class="mt-4">
                        <label>Category</label>
                        <el-select-v2 :options="[1, 2, 3].map((i) => ({ label: i, value: i }))"
                            placeholder="Choose product type" size="large" class="w-100" />
                        <div class="d-flex justify-content-end mt-2">
                            <el-button type="button" text>+Add new Category</el-button>
                        </div>
                    </div>
                    <div class="mt-2">
                        <label>Product name</label>
                        <el-input type="text" placeholder="Enter Product name" />
                    </div>
                    <div class="mt-4">
                        <label>Product Description</label>
                        <el-input type="textarea" rows="5" placeholder="Description" />
                    </div>
                    <div class="mt-4">
                        <el-upload class="upload-product w-100" :auto-upload="false">
                            <el-button size="large" class="upload-file">Click to upload</el-button>
                        </el-upload>
                        <div>No file selected</div>
                    </div>
                    <div class="mt-4">
                        <el-row gutter="15">
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
                            <img src="../../../assets/people/phone-import.svg" alt="Upload Image" />
                        </div>
                        <el-upload class="upload-product w-100 mt-4" :auto-upload="false">
                            <el-button size="large" class="upload-file">Upload cover image</el-button>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
        </div>
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