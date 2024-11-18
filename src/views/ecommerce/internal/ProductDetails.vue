<script setup>
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';
import { deleteSingleProduct, getProductById } from '../../../services/ecommerce/ecommerceservice';
import HeaderSection from './component/HeaderSection.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute } from 'vue-router';
import store from '../../../store/store';
import { ref } from 'vue';

const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const route = useRoute();
const deleteLoading = ref(false);
const price = ref("");
const productName = ref("");
const description = ref("");
const reviews = ref([]);
const coverurl = ref("");
const productLoading = ref(false);

const showConfirmModal = (item) => {
    console.log(item, "nnjnnjnjk");
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
            deleteProduct()
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "Rejected",
                duration: 5000,
            });
        });
};

const deleteProduct = async () => {
    const id = route.params.id
    deleteLoading.value = true;
    try {
        let response = await deleteSingleProduct(id);
        ElMessage({
            type: "success",
            message: "Product deleted successfully",
            duration: 5000,
        });
        store.dispatch("ecommerce/getAllProducts").then((() => {
            router.push("/tenant/store/products")
        }))
        console.log(response, 'deleted')
        deleteLoading.value = false;
    }
    catch (error) {
        console.error(error)
        deleteLoading.value = false;
    }
}

// const reviews = [
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
//     {
//         text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
//         author: 'Sam Loko',
//         rating: '4.5'
//     },
// ]

const getSingleProduct = async () => {
    productLoading.value = true;
    try {
        const response = await getProductById(route.params.id);
        console.log(response, 'single')
        // selectedProductType.value = response.productType;
        // selectedCategory.value = response.ecommerceCategoryID;
        productName.value = response.productName;
        description.value = response.description;
        price.value = response.price;
        reviews.value = response.reviews ? response.reviews : [];
        coverurl.value = response.imageURL;
        // coverImageResponse.value = new Object();
        // coverImageResponse.value.pictureUrl = response.imageURL;
        // coverImageResponse.value.imageBlobName = response.imageURLBlobName;
        // fileurl.value = response.fileURL
        // fileResponse.value = new Object();
        // fileResponse.value.pictureUrl = response.fileURL;
        // fileResponse.value.imageBlobName = response.fileURLBlobName
        productLoading.value = false;
    } catch (error) {
        console.log(error);
        productLoading.value = false;
    }
}
if (route.params.id) getSingleProduct()

const updateProduct = () => {
    router.push(`/tenant/store/add/${route.params.id}`)
}
</script>

<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <HeaderSection title="Product Information"
            :breadcrumbs="{ name: 'Products > Product Information', route: '/tenant/store/products' }" />


        <el-skeleton animated v-if="productLoading" class="mt-5">
            <template #template>
                <div class="d-flex flex-column align-items-center flex-md-row justify-content-between w-100">
                    <el-skeleton-item variant="image" style="width: 240px; height: 240px; border-radius: 8px;" />
                    <div class="w-50 mt-3 mt-md-0">
                        <el-skeleton-item variant="p" class="w-25 d-block" />
                        <el-skeleton-item variant="text" class="w-50 block mt-3" />
                        <el-skeleton-item variant="text" class="w-100 d-block mt-3" />
                        <el-skeleton-item variant="text" class="w-100 d-block mt-3" />
                        <el-skeleton-item variant="text" class="w-100 d-block mt-3" />
                        <el-skeleton-item variant="text" class="w-100 d-block mt-3" />
                        <div class="d-flex mt-5">
                            <el-skeleton-item variant="text" style="height: 50px; margin-right: 10px" />
                            <el-skeleton-item variant="text" style="height: 50px; margin-right: 10px" />
                            <el-skeleton-item variant="text" style="height: 50px; margin-right: 10px" />

                        </div>
                    </div>
                </div>
            </template>
        </el-skeleton>
        <div class="row mt-5" v-else>
            <div class="col-12 col-md-4">
                <div class="image_thumbnail">
                    <img :src="coverurl" />
                </div>
            </div>
            <div class="col-12 col-md-6 offset-md-1">
                <div class="d-flex flex-column flex-md-row justify-content-md-between">
                    <div class="s-32 weight-500">{{ productName }}</div>
                    <div class="d-flex align-items-center gap">
                        <img src="../../../assets/starrating.svg" width="20" />
                        <div>4.8</div>
                    </div>
                </div>
                <div class="s-24">{{ price }}</div>
                <div class="s-20 mt-3 stock">In-stock</div>
                <div class="s-18">Mark as out of stock</div>
                <div class="mt-3 s-22 product-desc">Product Description</div>
                <div class="s-18 mt-1">{{ description }}</div>
                <div class="group-button">
                    <button class="button">
                        <img src="../../../assets/archive.svg" width="18" class="mr-1" />
                        Archive</button>
                    <button class="button" @click="showConfirmModal">
                        <el-icon class="is-loading mr-2" v-if="deleteLoading">
                            <Loading />
                        </el-icon>
                        <img src="../../../assets/delete.svg" width="18" class="mr-1" />
                        Delete</button>
                            <button class="button" @click="updateProduct">
                                <img src="../../../assets/edit.svg" width="18" class="mr-1" />
                                Update</button>
                </div>
            </div>
        </div>

        <h2 class="fw-500 s-24 mt-5 mb-3">
            {{ reviews.length > 0 ? "All reviews" : "No reviews yet" }}
        </h2>
        <div class="row">
            <div v-for="(review, index) in reviews" :key="index" class="col-md-6 mb-4">
                <div class="card-body card-bg border-radius-8 h-100">
                    <p class="mb-2">{{ review.text }}</p>
                    <div class="d-flex justify-content-between align-items-end">
                        <div>
                            <p class="font-weight-200 mb-0 mt-3">{{ review.author }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <img src="../../../assets/starrating.svg" width="18" />
                            <span class="text-dark h5 mb-0 ml-1 s-14">{{ review.rating }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image_thumbnail {
    padding: 50px;
    background-color: rgba(235, 235, 235, 1);
}

.image_thumbnail img {
    width: 100%
}

.weight-500 {
    font-weight: 500;
}

.stock {
    color: #0B55D4
}

.product-desc {
    color: #7D7B7B
}

.button {
    border-radius: 15px;
    padding: 13px 25px;
    font-weight: 500;
    display: flex;
    align-items: center;
}

.group-button {
    margin-top: 50px;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

/* .group-button button:not(button:first-child) {
    margin-left: 17px
} */

.group-button button:first-child {
    border: 1px solid #474545;
    background-color: #ffffff;
    color: #474545
}

.group-button button:focus {
    background-color: #f9f9f9;
    outline: none;
}

.group-button button:nth-child(2) {
    border: none;
    background-color: #FF0F00;
    color: #ffffff
}

.group-button button:nth-child(2):focus {
    background-color: #fe4639;
    outline: none;
}

.group-button button:nth-child(3) {
    border: none;
    background-color: #0B55D4;
    color: #ffffff
}

.group-button button:nth-child(3):focus {
    background-color: #2865ce;
    outline: none;
}

.gap {
    gap: 5px
}

.card-bg {
    background-color: #F4F2F2;
}

@media (max-width: 767px) {
    .image_thumbnail {
        padding: 20px;
    }
}
</style>
