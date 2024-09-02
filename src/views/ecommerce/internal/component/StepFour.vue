<script setup>
import { ref } from 'vue';

const gateways = ref([
    {
        name: 'Alat',
        icon: require('../../../../assets/alat_logo.png'),
        selected: false
    },
    {
        name: 'Flutterwave',
        icon: require('../../../../assets/flutterwave_logo.png'),
        selected: false
    },
    {
        name: 'Paystack',
        icon: require('../../../../assets/paystack_logo.png'),
        selected: false
    }
])

const selectGateway = (item, index) => {
    gateways.value[index].selected = !gateways.value[index].selected
    console.log(item)
}
</script>

<template>
    <div>
        <div>
            <p class="text-head font-weight-700">Payment Setup</p>
            <p>Receiving payment for goods and services should be easier, Choose your most means to achieve this.</p>
        </div>
        <div>
            <div class="bank_info">Bank Account Info</div>
            <label class="text-head font-weight-700 s-14">Bank Name</label>
            <el-select-v2 :options="[1, 2, 3, 4].map((i, index) => ({ label: i, value: index }))"
                placeholder="Choose product type" size="large" class="w-100" />
            <label class="text-head font-weight-700 s-14 mt-4">Account Number</label>
            <el-input type="text" aria-placeholder="Account number" placeholder="Account Number" />
            <p class="s-14 text-right mt-1 font-weight-600 account_name">Account Name: Our Church</p>
        </div>
        <div>
            <div class="bank_info mb-2 mt-2">Payment Gateway</div>
            <p>Select from the available Payment gateways. Note that this will require a Verified Merchant account with
                API Keys.</p>
            <div class="d-flex flex-wrap">
                <div class="gateways mr-2 mt-2" @click="selectGateway(item, index)" :class="{ 'selected_gateway': item.selected, 'deselected_gateway': !item.selected }"
                    v-for="(item, index) in gateways" :key="index">
                    <img :src="item.icon" :class="{ 'w-50': index == 0, 'w-75': index == 1, 'w-75': index == 2 }" />
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between flex-wrap mt-5">
            <el-button size="large" round text>Go back</el-button>
            <el-button type="success" size="large" round>Complete Setup</el-button>
        </div>
    </div>
</template>

<style scoped>
.bank_info {
    color: #737373;
}

.account_name {
    color: #0D5EBD
}

.gateways {
    background-color: white;
    width: 100px;
    height: 44px;
    padding: 4px;
    display: flex;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all .09s ease-in-out;
}

.gateways:hover {
    transform: scale(1.1);
}

.deselected_gateway {
    border: 1px solid #DBDBDB;
}

.selected_gateway {
    border: 1.5px solid #00FBBF;
}
</style>