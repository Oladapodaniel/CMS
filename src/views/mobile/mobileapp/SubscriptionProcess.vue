<template>
    <div class="container-fluid mt-4">
        <div class="row justify-content-center">
            <div class="col-md-10" v-if="monthRemaining < 10 || Plans.membershipSize < 500 && !paymentDone">
                <div class="row">
                    <div class="col-md-12 text-center text-head h2 font-weight-bold  ">
                        Payment (Subscription)
                    </div>
                    <div class="col-md-12 text-center text-font">
                        Confirm your Subscription to complete the Setup
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12 bg-white py-5 my-5">
                        <div class="row">
                            <div class="col-md-12 text-center text-head font-weight-bold">
                                Choose Preferred Plan
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="row justify-content-center">
                                    <div class="col-md-5 col-sm-6">
                                        <el-dropdown trigger="click" class="w-100">
                                            <span class="el-dropdown-link w-100">
                                                <div class="d-flex justify-content-between border-contribution px-3   w-100"
                                                    style="background: #F2F4F7; border-radius: 20px" size="large">
                                                    <span class="text-font font-weight-600">{{
                selectedSubscriptionPlan && selectedSubscriptionPlan.description
                    ? selectedSubscriptionPlan.description
                    : "Select plan"
            }}</span>
                                                    <div>
                                                        <el-icon class="el-icon--right">
                                                            <arrow-down />
                                                        </el-icon>
                                                    </div>
                                                </div>
                                            </span>

                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-for="(itm, indx) in UserSubscriptionPlans"
                                                        :key="indx" @click="setSubscriptionPlan(itm)">{{ itm.description
                                                        }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item class="text-center" divided></el-dropdown-item>

                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                        <!-- <div class="col-md-12 d-flex justify-content-end">
                                            <span class=" upgrade ">upgrade</span>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="row justify-content-center">
                                    <div class="col-md-8 mb-3 text-font text-center">You must have at least 12 months (1
                                        year)
                                        active subscription</div>
                                    <hr class="col-md-8 my-3 hr">
                                    <div class="col-md-8 mt-3 text-font font-weight-600 text-center">One year Churchplus
                                        Subscription</div>
                                    <div class="col-md-12 mt-2">
                                        <div class="row justify-content-center">
                                            <div class="col-md-3 text-head font-weight-500 text-right">Amount</div>
                                            <div class="col-md-8  ">
                                                <div style="background: #EBEDFF; border-radius: 20px"
                                                    class=" text-center text-font  font-weight-bold col-md-7  py-2">
                                                    <!-- NGN 180.000 -->
                                                    {{
                selectedSubscriptionPlan &&
                    Object.keys(selectedSubscriptionPlan).length > 0 &&
                    selectedSubscriptionPlan.currency
                    ? selectedSubscriptionPlan.currency.symbol : ""
            }}
                                                    {{ (subselectedDuratn).toLocaleString() }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8 mt-5" data-toggle="modal" data-target="#PaymentOptionModal">
                                        <el-button :color="primarycolor" size="large" class="w-100" round
                                            :disabled="!selectedSubscriptionPlan.id">
                                            Pay Now
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="PaymentOptionModal" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered " role="document">
                        <div class="modal-content " style="border-radius: 25px !important;">
                            <div class="modal-header bg-modal">
                                <div class="modal-title text-head font-weight-bold h3 pl-2" id="exampleModalLongTitle">
                                    Payment methods
                                </div>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" ref="close">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body p-0 bg-modal pb-5">
                                <div class="row">
                                    <div class="col-sm-12 p-4 text-center continue-text">
                                        <!-- Continue payment with -->
                                        How would you like to pay ?
                                    </div>
                                </div>
                                <div class="row justify-content-center c-pointer   " @click="initializePayment(0)" v-if="currentUser.currency == 'NGN' || currentUser.currency == 'GHS'
                ">
                                    <div class="col-md-8 border py-3  row-button ">
                                        <div class="row  c-pointer justify-content-center">
                                            <div class="col-md-6">
                                                <img class="w-100" src="../../../assets/mobileonboarding/paystack.png"
                                                    alt="paystack" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row c-pointer mt-3 justify-content-center" @click="initializePayment(1)">
                                    <div class="col-md-8 border py-2  row-button ">
                                        <div class="row  c-pointer justify-content-center">
                                            <div class="col-md-7">
                                                <img class="w-100"
                                                    src="../../../assets/mobileonboarding/flutterwave.png"
                                                    alt="flutterwave" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3 c-pointer  justify-content-center">
                                    <div class="col-md-8 border  py-2 row-button ">
                                        <div class="row  c-pointer justify-content-center">
                                            <a href="https://www.paypal.me/GeorgeOnyeama?locale.x=en_GB"
                                                class="col-md-6" target="_blank">

                                                <img class="w-100" src="../../../assets/PayPal2.png" alt="paypal" />

                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-md-10 mt-4 h-100 bg-white mb-5"> -->
                <div class="col-md-10 mt-4 h-100 bg-white mb-5"
                v-if="monthRemaining >= 12 && Plans.membershipSize >= 500 && !paymentDone">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-10 d-flex justify-content-center">
                        <div class="col-md-6 ">
                            <img class="w-100 " src="../../../assets/mobileonboarding/sub-successful.gif" alt="">
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                        <div class="col-md-6 col-8">
                            <div class="text-head font-weight-bold px-0 col-md-12 h2 text-center"
                                style="color: #78B348;">
                                Your Subscription is up to date
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 d-flex my-5 justify-content-center">
                        <div class="col-md-8 ">
                            <el-button @click="finishSetup" :color="primarycolor" size="large" class="w-100"
                                round>Finish setup and
                                Activate</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-md-10 mt-4 h-100 bg-white mb-5"> -->
                <div class="col-md-10 mt-4 h-100 bg-white mb-5" v-if="paymentDone">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-10 d-flex justify-content-center">
                        <div class="col-md-6 ">
                            <img class="w-100 " src="../../../assets/mobileonboarding/sub-successful.gif" alt="">
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                        <div class="col-md-6 col-8">
                            <div class="text-head font-weight-bold col-md-12 px-0 h2 text-center"
                                style="color: #78B348;">
                                Your Subscription is Successful!
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 d-flex my-5 justify-content-center">
                        <div class="col-md-8 ">
                            <el-button @click="finishSetup" :color="primarycolor" size="large" class="w-100"
                                round>Finish setup and
                                Activate
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog class="" style="border-radius: 25px;" v-model="paymentFailed" title=""
            :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
            <div class="row justify-content-center ">
                <div class="col-md-10 mt-4 h-100 bg-white mb-5">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-10 d-flex justify-content-center">
                            <div class="col-md-6 ">
                                <img class="w-100 " src="../../../assets/mobileonboarding/sub-failed.png" alt="">
                            </div>
                        </div>
                        <div class="col-md-12 d-flex justify-content-center">
                            <div class="col-md-6 col-8">
                                <div class="text-head font-weight-bold col-md-12 px-0 h2 text-center"
                                    style="color: #D21615;">
                                    Your Subscription failed!
                                </div>
                            </div>
                        </div>
                        <div class="col-md-10 d-flex my-5 justify-content-center">
                            <div class="col-md-8 ">
                                <el-button @click="tryAgain" :color="primarycolor" size="large" class="w-100" round>Try
                                    again</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { ref, computed, inject } from "vue"
import { useStore } from "vuex";
import router from "../../../router";
import axios from "@/gateway/backendapi";
import formatDate from "../../../services/dates/dateformatter";
import { ElLoading } from 'element-plus';
import membershipService from "../../../services/membership/membershipservice";
import productPricing from "../../../services/user/productPricing";
import { ElMessage, ElMessageBox } from "element-plus";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import swal from "sweetalert";
export default {
    setup(props, { emit }) {
        const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
        const selectedSubscriptionPlan = ref({})
        const primarycolor = inject("primarycolor");
        const store = useStore();
        const productsList = ref([]);
        const existingPlan = ref({});
        const currentAmount = ref("");
        const currentPlan = ref("");
        const churchLogo = ref("");
        const expiryDate = ref("");
        const notifiedDays = ref("");
        const monthRemaining = ref("");
        const close = ref(null);
        const paymentDone = ref(false);
        const paymentFailed = ref(false);
        const display = ref(false);
        const Plans = ref({});
        const isProduction = true;
        const daysToEndOfSubscription = ref(0);
        const UserSubscriptionPricing = ref([]);
        const UserSubscriptionPlans = ref([]);
        const selectedPlanId = ref(null);

        const selectEmailUnit = ref([
            { name: "1000-2000", constValue: 2 },
            { name: "2000-3000", constValue: 4 },
            { name: "3000-4000", constValue: 6 },
            { name: "4000-5000", constValue: 8 },
        ]);

        const finishSetup = async () => {
            try {
                const res = await axios.post('mobile/v1/Profile/ActivateMobileApp')
                if (res.data) {
                    swal({
                        title: "Success!",
                        text: 'Congrats,  Your Account is Activated  ',
                        icon: "success",
                        confirmButtonColor: '#8CD4F5',
                        dangerMode: true,
                    })
                    let changeState = {
                        tab: true,
                        churchSetup: false,
                        socialMedia: false,
                        appBranding: false,
                        subsciption: false,
                        donationForm: false,
                        subscription: true
                    };
                    emit("saved-sub", changeState);
                    setTimeout(() => {
                        router.push({ name: "OnboardingSuccessful" });
                    }, 1000);
                } else {
                    swal({
                        title: "Activation  Failed!",
                        text: 'Please upgrade ur plan or make full year payment',
                        icon: "error",
                        confirmButtonColor: '#8CD4F5',
                        dangerMode: true,
                    })
                    paymentDone.value = false
                    paymentFailed.value = false
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        const tryAgain = () => {
            paymentFailed.value = false
        }



        const currentUser = computed(() => {
            if (
                !store.getters.currentUser ||
                (store.getters.currentUser &&
                    Object.keys(store.getters.currentUser).length == 0)
            )
                return "";
            return store.getters.currentUser;
        });

        const selectedCurrency = computed(() => {
            if (
                selectedSubscriptionPlan.value &&
                Object.keys(selectedSubscriptionPlan.value).length > 0 &&
                selectedSubscriptionPlan.value.currency
            )
                return selectedSubscriptionPlan.value.currency;
            return "";
        });

        const subselectedDuratn = computed(() => {
            let multiValue = 1;
            if (selectedSubscriptionPlan.value && selectedSubscriptionPlan.value.amount)
                multiValue *= selectedSubscriptionPlan.value.amount;
            if (selectedSubscriptionPlan.value && selectedSubscriptionPlan.value.name) multiValue *= +selectedSubscriptionPlan.value.name;
            return multiValue * 12;
        });

        const TotalAmount = computed(() => {
            let sum = 0;
            if (subselectedDuratn.value)
                return sum += subselectedDuratn.value;
            // if (smsValue.value) sum += smsValue.value * 2;
            // sum += emailAmount.value;
            // return sum + +sumCheckboxItem.value.toFixed(2);
        });

        const initializePayment = (paymentGateway) => {
            const loading = ElLoading.service({
                lock: true,
                text: "Please wait...",
                background: "rgba(255, 255, 255, 0.9)",
            });

            const payload = {
                subscriptionPlanID: selectedSubscriptionPlan.value.id,
                paymentGateway: paymentGateway === 0 ? "Paystack" : "Flutterwave",
                totalAmount: TotalAmount.value,
                durationInMonths: "12",
                currencyId: selectedCurrency.value.id,
            };
            axios
                .post("/api/Payment/InitializeSubscription", payload)
                .then(({ data }) => {
                    console.log(data);
                    close.value.click();
                    // initializedOrder.value = res.data;
                    loading.close();
                    if (data.status) {
                        if (paymentGateway == 0) {
                            payWithPaystack(data);
                        } else {
                            payWithFlutterwave(data);
                        }
                    }
                });
        };
        const subscriptionPayment = async (trans_id, tx_ref) => {
            try {
                await axios
                    .post(
                        `/api/Payment/ConfirmSubscriptionPayment?id=${trans_id}&txnref=${tx_ref}`
                    )
                    .then((res) => {
                        console.log(res);
                        display.value = true;
                        if (res.data) {
                            paymentFailed.value = false;
                            paymentDone.value = true;
                        } else {
                            paymentFailed.value = true;
                        }


                    })
                    .catch((err) => {
                        console.log(err);
                        display.value = true;
                        paymentFailed.value = true;
                        paymentDone.value = false;
                    });
            } catch (error) {
                console.log(error);
                paymentDone.value = false;
                paymentFailed.value = true;
                ElMessage({
                    type: "error",
                    showClose: true,
                    message: "Your Subscription Failed",
                    duration: 5000,
                });
            }
        };

        const payWithPaystack = (responseObject) => {
            let handler = PaystackPop.setup({
                key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
                // key: process.env.VUE_APP_PAYSTACK_API_KEY,
                email: "info@churchplus.co",
                amount: TotalAmount.value * 100,
                currency: selectedCurrency.value.shortCode,
                channels: [
                    "card",
                    "bank",
                    "ussd",
                    "qr",
                    "mobile_money",
                    "bank_transfer",
                ],
                ref: responseObject.transactionReference,
                onClose: function () {
                    ElMessage({
                        type: "info",
                        showClose: true,
                        message: "You have cancelled the transaction",
                        duration: 5000,
                    });
                },
                callback: function (response) {
                    let trans_id = response.trxref;
                    let tx_ref = response.trxref;
                    subscriptionPayment(tx_ref, trans_id);
                },
            });
            handler.openIframe();
        };

        const getFlutterwaveModules = () => {
            const script = document.createElement("script");
            script.src = !isProduction
                ? "https://ravemodal-dev.herokuapp.com/v3.js"
                : "https://checkout.flutterwave.com/v3.js";
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        getFlutterwaveModules();

        const payWithFlutterwave = (responseObject) => {
            console.log(responseObject, "flutterwave");

            let country = "";

            switch (selectedCurrency.value.shortCode) {
                case "KES":
                    country = "KE";
                    break;
                case "GHS":
                    country = "GH";
                    break;
                case "ZAR":
                    country = "ZA";
                    break;
                case "TZS":
                    country = "TZ";
                    break;

                default:
                    country = "NG";
                    break;
            }

            window.FlutterwaveCheckout({
                // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY,
                public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
                tx_ref: responseObject.transactionReference,
                amount: TotalAmount.value,
                currency: selectedCurrency.value.shortCode,
                country: country,
                payment_options: "card,ussd",
                customer: {
                    name: currentUser.value.churchName,
                    email: currentUser.value.userEmail,
                },
                callback: (response) => {
                    let trans_id = response.transaction_id;
                    let tx_ref = response.tx_ref;
                    subscriptionPayment(trans_id, tx_ref);
                },
                onclose: () => console.log("Payment closed"),
                customizations: {
                    title: "Subscription",
                    description: "Payment for Subcription ",
                    logo: churchLogo.value,
                },
            });
        };

        const setSubscriptionPlan = (item) => {
            selectedSubscriptionPlan.value = item
        }


        const calculatedProductPrice = (price) => {
            if (daysToEndOfSubscription.value < 1)
                return selectMonth.value.name ? price * +selectMonth.value.name : 0;
            return (
                (selectMonth.value.name ? price * +selectMonth.value.name : 0) +
                (price / 30) * daysToEndOfSubscription.value
            );
        };
        const calculateRemomainingMonthsOfSubscription = (expiryDate) => {
            const endDate = new Date(expiryDate);
            const startDate = new Date(Date.now());

            const differenceInTime = Math.abs(endDate - startDate);
            const differenceInDays = Math.ceil(
                differenceInTime / (1000 * 60 * 60 * 24)
            );

            return differenceInDays;

        };

        const countDownDate = (expiryDate) => {

            let countDownDates = new Date(expiryDate).getTime();

            // Get today's date and time
            let nowTime = new Date().getTime();
            // Find the distance between now and the count down date
            let distance = countDownDates - nowTime

            notifiedDays.value = Math.floor(distance / (1000 * 60 * 60 * 24));


            const expiry = new Date(expiryDate);
            const now = new Date();
            // Handle cases where expiry date has already passed
            if (expiry < now) {
                return 0;
            }
            // Calculate remaining years (if any)
            const remainingYears = expiry.getFullYear() - now.getFullYear();
            // Calculate remaining months considering year difference
            let remainingMonths = expiry.getMonth() - now.getMonth() + remainingYears * 12;
            // Handle cases where expiry month has already passed in the current year
            if (remainingMonths < 0) {
                remainingMonths += 12;
            }
            monthRemaining.value = remainingMonths;
        }

        const getProductPricing = async (id) => {
            let { data } = await productPricing.getProductPricing(id);
            data.forEach((i) => {
                if (i.product.name.toLowerCase() === "subscription") {
                    UserSubscriptionPricing.value.push(i);
                }
            });
            getTenantSubscription();
            UserSubscriptionPlans.value = UserSubscriptionPricing.value
                .sort((a, b) => a.order - b.order)
                .map((i) => {
                    i.subscriptionPlan.amount = i.price;
                    i.subscriptionPlan.currency = i.currency;
                    return i.subscriptionPlan;
                })


            if (Plans.value && Plans.value.id == 1 || Plans.value.id == 2) {
                selectedSubscriptionPlan.value = UserSubscriptionPlans.value.find((i) => i.id === 3)
            } else {
                selectedSubscriptionPlan.value = UserSubscriptionPlans.value.find((i) => i.id === Plans.value.id)

            }
        };

        const getTenantSubscription = async () => {
            try {
                const res = await axios.get("/api/Subscription/subscriptions");
                Plans.value = res.data;
                existingPlan.value.id = Plans.value.id;
                existingPlan.value.amount = Plans.value.amount;
                existingPlan.value.description = Plans.value.description;
                existingPlan.value.amountInDollar = Plans.value.amountInDollar;
                existingPlan.value.membershipSize = Plans.value.membershipSize;

                UserSubscriptionPlans.value = UserSubscriptionPlans.value.filter((i) => i.id !== 2 && i.id !== 1);

                if (selectedSubscriptionPlan.value == null) {
                    ElMessageBox.confirm(
                        "Subscription pricing is currently not available in your country, we will make it available as soon as possible, you can reach out to us by sending an email to info@churchplus.co for us to address your specific needs. Thank you for choosing Churchplus",
                        "Notice",
                        {
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            type: "warning",
                        }
                    )
                        .then(() => {
                            ElMessage({
                                type: "warning",
                                message: "We await your feedback. Thank you",
                            });
                        })
                        .catch(() => {
                            ElMessage({
                                type: "warning",
                                message: "We await your feedback. Thank you",
                            });
                        });
                }

                currentAmount.value = res.data.amountInNaira;
                currentPlan.value = existingPlan.value.description;
                productsList.value = res.data.productsList;
                expiryDate.value = formatDate.monthDayYear(
                    Plans.value.subscriptionExpiration
                );
                countDownDate(res.data.subscriptionExpiration)
                // emailPrice.value =
                //     productsList.value && productsList.value.length > 0
                //         ? productsList.value.find((i) => i.name === "Email").price
                //         : [];
                // smsPrice.value =
                //     productsList.value && productsList.value.length > 0
                //         ? productsList.value.find((i) => i.name === "SMS").price
                //         : [];

                daysToEndOfSubscription.value =
                    calculateRemomainingMonthsOfSubscription(
                        res.data.subscriptionExpiration
                    );
            }
            catch (error) {
                console.log(error);
            }

        };
        getTenantSubscription()
        const getChurchProfile = async () => {
            try {
                let res = await axios.get(
                    `/GetChurchProfileById?tenantId=${currentUser.value.tenantId}`
                );
                // churchLogo.value = res.data.returnObject.logo;
                getProductPricing(res.data.returnObject.countryID);
            } catch (err) {
                console.log(err);
            }
        };
        if (currentUser.value && Object.keys(currentUser.value).length > 0)
            getChurchProfile();

        const setCurrentUser = async () => {
            membershipService.getSignedInUser().then((res) => {
                store.dispatch("setCurrentUser", res);
                getChurchProfile();
            });
        };
        if (
            !currentUser.value ||
            (currentUser.value && Object.keys(currentUser.value).length == 0)
        )
            setCurrentUser();


        return {
            mdAndUp, lgAndUp, xlAndUp, xsOnly, selectedSubscriptionPlan, currentUser, primarycolor, setSubscriptionPlan,
            initializePayment,
            selectEmailUnit,
            currentAmount,
            productsList,
            subselectedDuratn,
            finishSetup,
            paymentDone,
            close,
            display,
            paymentFailed,
            // subscriptionDuration,
            calculatedProductPrice,
            churchLogo,
            selectedCurrency,
            calculateRemomainingMonthsOfSubscription,
            existingPlan,
            daysToEndOfSubscription,
            UserSubscriptionPricing,
            UserSubscriptionPlans,
            selectedPlanId,
            Plans,
            currentPlan,
            TotalAmount,
            expiryDate,
            countDownDate,
            tryAgain,
            notifiedDays,
            monthRemaining
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@100..900&family=Roboto:wght@100&display=swap');

/* * {
    font-family: Poppins;
} */

.text-head {
    font-family: Raleway !important;
}

.text-font {
    font-family: Poppins !important;
}

.upgrade {
    background: #32D583;
    border-radius: 20px;
    color: white;
    padding: 0 3px 0 3px;

}

.continue-text {
    font-family: Nunito Sans !important;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
}

.row-button {
    /* padding: 10px; */
    /* padding: 10px 0; */
    border-radius: 50px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    background: #F3F3F3;
    /* background: #fff; */
    /* margin: 12px 70px 15px 70px; */
    transition: all 0.4s ease-in-out;
    border: 1px solid #0000002B;
    /* max-height: 45px; */
}
</style>