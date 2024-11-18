<script setup>
import router from '../../../../router';
import converter from '../../../../services/currency-converter/currencyConverter';

const { item } = defineProps(['item'])
</script>
<template>
    <div class="fit-content">
        <div class="card-bg" @click="router.push(`/tenant/store/product/${item.id}`)">
            <img :src="item.imageURL" class="product-image" />
        </div>
        <div class="mt-2 d-flex justify-content-between">
            <div class="stock-text">In-stock</div>
            <div class="d-flex gap-5">
                <img src="../../../../assets/starrating.svg" />
                <div class="s-14">{{ item.rating }}</div>
            </div>
        </div>
        <div class="weight-500 s-18 mt-1">{{ item.name }}</div>
        <div class="s-14">{{ converter.numberWithCommas(item.price) }}</div>
    </div>
</template>

<style scoped>
.fit-content {
    max-width: 230px;
}
.card-bg {
    background-color: rgba(235, 235, 235, 1);
    padding: 15px 30px;
    max-width: min-content;
    cursor: pointer;
}

.card-bg:hover {
    transform: scale(1.1);
    transition: all .4s cubic-bezier(0.23, 1, 0.320, 1)
}

.stock-text {
    color: rgba(125, 123, 123, 1);
    font-size: 13px;
}

.weight-500 {
    font-weight: 500;
}

.gap-5 {
    gap: 5px
}

.product-image {
  width: 150px;
  height: 200px;
  object-fit: cover;
  border-radius: 3px;
}
</style>