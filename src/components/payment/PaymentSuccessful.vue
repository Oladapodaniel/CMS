<template>
    <div>
        <div class="container p-0 m-0 over-con">
            <div class="row main m-0">
                <div class="col-md-12 primary-bg py-5 main-top">
                    <p class="text-center"><i class="pi pi-check check-icon" style="fontSize: 2rem"></i></p>
                    <!-- <p class="text-center"><i class="pi pi-facebook check-icon"></i></p> -->
                    <p class="text-center font-weight-700 text-white mt-5">Payment was Successful</p>
                </div>
                <div class="col-md-12 py-5 main-bottom">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="text-center d-flex flex-column primary-text"><span class="stylish-text">Thank You!</span> <span class="font-weight-700">For Choosing Churchplus</span></p>
                        </div>
                    </div>
                    <div class="row action-message py-4">
                        <div class="col-md-12">
                            <p class="text-center">{{ currency }} {{ amount }} worth of SMS units have been succefully added to your SMS unit balance</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-center mt-5">
                            <router-link to="/tenant/sms/compose" class="default-btn primary-bg border-0 text-white text-decoration-none">Send SMS Now!</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import userService from "../../services/user/userservice"
import { useStore } from "vuex";
    export default {
        props: [ "amount" ],

        setup() {
            const store = useStore();
            const currency = ref(store.getters.currency);

            const getUserCurrency = async () => {
                try {
                    const user = await userService.getCurrentUser();
                    currency.value = user.currency;
                } catch (error) {
                    console.log(error);
                }
            }

            if (!currency.value) getUserCurrency();

            return {
                currency,

            }
        }
    }
</script>

<style scoped>
    .main {
        border: 1px solid #EBEFF4;
        border-radius: 20px;
    }

    .main-top {
        border-radius: 20px 20px 0 0;
    }

    .main-bottom {
        border-radius: 0 0 20px 20px;
        background: #fff;
    }

    .check-icon {
        background: #fff;
        padding: 10px;
        border-radius: 50%;
    }

    .action-message {
        background: #ebeff433;
    }

    .stylish-text {
        font-size: 55px;
        font-family: cursive;
    }

    .over-con {
        background: #797979;
    }
</style>