<script setup>
import HeaderSection from './component/HeaderSection.vue';

const reviews = [
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
    {
        text: 'Best Book I have come across so far, I recommend you get own a copy in your Library,  I recommend you get own a copy in your Library.',
        author: 'Sam Loko',
        rating: '4.5'
    },
]
</script>

<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <HeaderSection title="Product Information" @handleClick="handleClick"
            :breadcrumbs="{ name: 'Products > Product Information', route: '/tenant/store/products' }" />

        <div class="row mt-5">
            <div class="col-12 col-md-4">
                <div class="image_thumbnail">
                    <img src="../../../assets/disposal/img1.png" />
                </div>
            </div>
            <div class="col-12 col-md-6 offset-md-1">
                <div class="d-flex flex-column flex-md-row justify-content-md-between">
                    <div class="s-32 weight-500">48 Laws of Power</div>
                    <div class="d-flex align-items-center gap">
                        <img src="../../../assets/starrating.svg" width="20" />
                        <div>4.8</div>
                    </div>
                </div>
                <div class="s-24">NGN 16,000</div>
                <div class="s-20 mt-3 stock">In-stock</div>
                <div class="s-18">Mark as out of stock</div>
                <div class="mt-3 s-22 product-desc">Product Description</div>
                <div class="s-18 mt-1">This book is not for the faint of heart. It delves into the darker aspects of
                    human nature and
                    provides strategies for success that can be ruthless at times. However, for those seeking a
                    realistic and insightful guide to power, The 48 Laws of Power is an invaluable resource.</div>
                <div class="group-button">
                    <button class="button">
                        <img src="../../../assets/archive.svg" width="18" class="mr-1" />
                        Archive</button>
                    <button class="button">
                        <img src="../../../assets/delete.svg" width="18" class="mr-1" />
                        Delete</button>
                    <button class="button">
                        <img src="../../../assets/edit.svg" width="18" class="mr-1" />
                        Update</button>
                </div>
            </div>
        </div>

        <h2 class="fw-500 s-24 mt-5 mb-3">
            All reviews
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