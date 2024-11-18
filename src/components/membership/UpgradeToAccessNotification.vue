<script setup>
import { computed } from 'vue';
import router from '../../router';
import store from '../../store/store';

const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    const check = computed(() => {
        if (getUser.value?.subscriptionName?.toLowerCase() === 'free plan' || 
            getUser.value?.subscriptionName?.toLowerCase() === 'starter plan') return true
        return false
    })
</script>

<template>
    <div class="col-md-12 mb-1 verify_email" v-if="check">
        <div>
            <h4 class="font-weight-600 line-height">Limited feature</h4>
            <div class="s-14">Upgrade to access all features<span class="font-weight-600"> Today!</span></div>
        </div>
        <div class="cursor-pointer" @click="router.push('/tenant/subscription')">
            <el-button size="large" class="verify_button" round>Upgrade now</el-button>
        </div>
    </div>
</template>

<style scoped>
.verify_email {
    border-left: solid #FF4B4B 7px;
    border-top-left-radius: 5px 5px;
    border-bottom-left-radius: 5px 5px;
    background-color: #F8F0E7;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    color: #171717;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
}

.verify_button {
    background-color: #E93535;
    color: #FFFFFF;
    outline: #E93535;
}

.verify_button:active,
.verify_button:focus {
    outline: #E93535;
    border: 1px solid #e97e7e
}

.verify_button:hover {
    background-color: #e97e7e;
}

.line-height{
    line-height: 14px
}


/* .verify_text {
    color: "#000000" !important
} */
</style>