<script setup>
const dataset = [
    {
        icon: require('@/assets/MoneyIcon.svg'),
        type: 'Total sales',
        performance: '-',
        value: '-',

    },
    {
        icon: require('@/assets/ShoppingCart.svg'),
        type: 'Total orders',
        performance: '-',
        value: '-'
    },
    {
        icon: require('@/assets/Cube.svg'),
        type: 'All Products',
        performance: '-',
        value: '-'
    },
    {
        icon: require('@/assets/Bank.svg'),
        type: 'Revenue',
        performance: '-',
        value: '-'
    },
]
</script>

<template>
    <div class="row mt-2">
        <div class="col-12 col-sm-6 col-md-3 mt-4" v-for="(item, index) in dataset" :key="index">
            <div class="cards">
                <div class="d-flex justify-content-between">
                    <div class="icon-bg" :class="{
                        'icon-bg-yellow': item.type.toLowerCase().includes('total sales'),
                        'icon-bg-blue': item.type.toLowerCase().includes('total order'),
                        'icon-bg-red': item.type.toLowerCase().includes('all product'),
                        'icon-bg-green': item.type.toLowerCase().includes('revenue')
                    }">
                        <img :src="item.icon" width="20" />
                    </div>
                    <div :class="{
                        'performance-up': index % 2 == 0,
                        'performance-down': index % 2 !== 0,
                    }">{{ item.performance }}</div>
                </div>
                <div class="card-type">{{ item.type }}</div>
                <div class="font-weight-bold s-24 mt-n1">{{ item.value }}</div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.cards {
    border: 1px solid #C1C1C1;
    background: #F8F8F8;
    border-radius: 15px;
    padding: 20px
}

.icon-bg {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-bg-yellow {
    background-color: #FFC700;
}

.icon-bg-blue {
    background-color: #155CD7;
}

.icon-bg-red {
    background-color: #FF001F;
}

.icon-bg-green {
    background-color: #05AC34;
}

.performance-up {
    color: #08A53D;
    font-size: 18;
}

.performance-down {
    color: #FF5C00;
    font-size: 18;
}

.card-type {
    color: #555555;
    font-size: 15;
    margin-top: 30px
}
</style>