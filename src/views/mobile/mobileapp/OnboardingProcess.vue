<template>
    <!-- v-if="churchSetupSaved -->
    <div class=" container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
        <div class="container-fluid" style="background: #F9FAFBE3;">
            <div class="row justify-content-center ">
                <div class="col-md-9 mt-4">
                    <div class="row justify-content-center">
                        <div class="col-6 px-0 col-md-3" @click="showChurchSetup">
                            <div
                                class="mt-2 col-md-12 px-0 d-flex justify-content-center align-items-center cursor-pointer">
                                <div  class="text-font" v-if="churchSetup" :class="{ 'active-tab': churchSetup, 'circle': !churchSetup }">1
                                </div>
                                <div v-else-if="churchSetupSaved" class="success-bg"><i class="pi pi-check"
                                        style="font-weight: 900"></i></div>
                                <div class="text-font" v-else :class="{ 'active-tab': churchSetup, 'circle': !churchSetup }">1</div>
                                <hr class="hr w-100">
                            </div>
                            <div class=" mt-2">
                                <div v-if="churchSetupSaved" class="success text-font">Church setup</div>
                                <div v-else-if="churchSetup" style="color: #136ACD" >Church setup</div>
                                <div v-else class="text-font">Church setup</div>
                            </div>


                        </div>
                        <div class="col-6 px-0 col-md-3 " @click="showSocialMedia">
                            <div
                                class="mt-2 col-md-12 px-0  d-flex justify-content-between align-items-center cursor-pointer">
                                <div v-if="socialMedia" class="text-font" :class="{ 'active-tab': socialMedia, 'circle': !socialMedia }">2
                                </div>
                                <div v-else-if="socialMediaSaved" class="success-bg"><i class="pi pi-check"
                                        style="font-weight: 900"></i>
                                </div>
                                <div v-else class="text-font" :class="{ 'active-tab': socialMedia, 'circle': !socialMedia }">2</div>
                                <hr class="hr w-100">
                            </div>
                            <div class=" mt-2">
                                <div v-if="socialMediaSaved" class=" text-font success">Integrations</div>
                                <div v-else-if="socialMedia" style="color: #136ACD!important" >Integrations</div>
                                <div v-else class=" text-font ">Integrations</div>
                            </div>

                        </div>
                        <div class="col-6  px-0 col-md-3" @click="showAppBranding">
                            <div
                                class="mt-2 col-md-12 px-0  d-flex justify-content-between align-items-center cursor-pointer">
                                <div v-if="appBranding" class="text-font" :class="{ 'active-tab': appBranding, 'circle': !appBranding }">3
                                </div>
                                <div v-else-if="appBrandingSaved" class="success-bg"><i class="pi pi-check"
                                        style="font-weight: 900"></i>
                                </div>
                                <div v-else class="text-font" :class="{ 'active-tab': appBranding, 'circle': !appBranding }">3</div>
                                <hr class="hr w-100">
                            </div>
                            <div class="mt-2">
                                <div v-if="appBrandingSaved" class=" text-font success">App Branding</div>
                                <div v-else-if="appBranding" style="color: #136ACD">App Branding</div>
                                <div v-else class=" text-font ">App Branding</div>
                            </div>
                        </div>
                        <div class="col-6 px-0 col-md-3  " @click="showOnlineDonation">
                            <div
                                class="mt-2 col-md-12 px-0 d-flex justify-content-between align-items-center cursor-pointer">
                                <div v-if="donationForm" class="text-font" :class="{ 'active-tab': donationForm, 'circle': !donationForm }">4
                                </div>
                                <div v-else-if="donationSaved"  class="success-bg"><i class="pi pi-check"
                                        style="font-weight: 900"></i>
                                </div>
                                <div v-else class="text-font" :class="{ 'active-tab': donationForm, 'circle': !donationForm }">4</div>
                                <!-- <hr class="hr w-100"> -->
                            </div>
                            <div class="mt-2">
                                <div v-if="donationSaved" class=" text-font  ">Giving & Bank Details</div>
                                <div v-else-if="donationForm" style="color: #136ACD!important"  >Giving & Bank Details</div>
                                <div v-else class="text-font">Giving & Bank Details</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12" v-if="churchSetup">
                    <ChurchSetup @saved-churchsetup="setChurchSuccessState" />
                </div>
                <div class="col-12" v-if="socialMedia">
                    <SocialMedia @saved-socialmedia="setSocialMediaSuccessState" />
                </div>
                <div class="col-12" v-if="appBranding">
                    <AppBranding @saved-appbranding="setAppBrandingSuccessState" />
                </div>
                <div class="col-12" v-if="donationForm">
                    <DonationForm @saved-donation="setDonationSuccessState" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import ChurchSetup from "./ChurchSetUp"
import SocialMedia from "./SocialMedia"
import AppBranding from "./AppBranding"
import DonationForm from "./DonationSetup"
import axios from "@/gateway/backendapi";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
export default {
    components: {
        ChurchSetup, SocialMedia, AppBranding, DonationForm
    },
    setup() {
        const churchSetup = ref(true)
        const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
        const socialMedia = ref(false)
        const appBranding = ref(false)
        const donationForm = ref(false)
        const churchSetupSaved = ref(false)
        const socialMediaSaved = ref(false)
        const appBrandingSaved = ref(false)
        const donationSaved = ref(false)


        const showChurchSetup = () => {
            churchSetup.value = true
            socialMedia.value = false
            appBranding.value = false
            donationForm.value = false
        }
        const showSocialMedia = () => {
            churchSetup.value = false
            socialMedia.value = true
            appBranding.value = false
            donationForm.value = false
        }
        const showAppBranding = () => {
            churchSetup.value = false
            socialMedia.value = false
            appBranding.value = true
            donationForm.value = false
        }
        const showOnlineDonation = () => {
            churchSetup.value = false
            socialMedia.value = false
            appBranding.value = false
            donationForm.value = true
        }

        const setChurchSuccessState = (payload) => {
            churchSetupSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const setSocialMediaSuccessState = (payload) => {
            socialMediaSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const setAppBrandingSuccessState = (payload) => {
            appBrandingSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const setDonationSuccessState = (payload) => {
            donationSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const getChurchProfile = () => {
            axios
                .get("/mobile/v1/Profile/GetChurchProfile")
                .then((response) => {
                    console.log(response);
                    if (response.data.returnObject.churchName && response.data.returnObject.phoneNumber && response.data.returnObject.address && response.data.returnObject.pastors.length > 0 && response.data.returnObject.customAbouts.length > 0) {
                        churchSetupSaved.value = true
                    }


                    if (response.data.returnObject.churchSocialMedia.length > 0) {
                        socialMediaSaved.value = true
                    }

                    if (response.data.returnObject.churchAppBackgroundColor) {
                        appBrandingSaved.value = true
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getChurchProfile()

        const getPaymentForm = () => {
            axios
                .get("/api/PaymentForm/GetAll")
                .then((res) => {
                    console.log(res);
                    if (res.data.length > 0) {
                        donationSaved.value = true
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getPaymentForm();
        return {
            showChurchSetup, showSocialMedia, showAppBranding, showOnlineDonation, mdAndUp, lgAndUp, xlAndUp, xsOnly, churchSetup, socialMedia, appBranding, donationForm, churchSetupSaved, setChurchSuccessState, socialMediaSaved, setSocialMediaSuccessState, appBrandingSaved, setAppBrandingSuccessState, donationSaved, setDonationSuccessState
        }
    }
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
    ;
}

.font {
    color: #031c39;
    font: normal normal normal 20px/27px Nunito Sans;
}

.circle {
    /* background: rgba(175, 216, 238, 0.481); */
    background: #CAD1D9;
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 50%;
    padding: 0.6rem 2rem 1rem 1.3rem;
    outline: transparent !important;
    height: 50px;
    width: 50px;
    /* color: rgb(20, 74, 253); */
    color: white
}

.active-tab {
    /* background: rgb(0, 106, 220); */
    background: #136ACD;
    padding: 0.6rem 2rem 1rem 1.3rem;
    color: #eee;
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    outline: transparent !important;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}

.success-bg {
    /* background: rgba(0, 220, 51, 0.201); */
    /* color: rgba(3, 120, 31, 0.729); */
    background: #32D583;
    color: white;
    padding: 0.8rem 2.2rem 1rem 1.2rem;
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 50%;
    outline: transparent !important;
    width: 50px;
    height: 50px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}

.success {
    color: #32D583
}

.hr {
    width: 20%
}</style>