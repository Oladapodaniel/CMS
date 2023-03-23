<template>
    <div>
        <div class="container-wide">
            <div class="row mt-4 ">
                <div class="col-md-12 col-sm-12 col-lg-12 my-3 pb-3 border-bottom">
                    <h5 class="page-header">Payment Options</h5>
                </div>
                <div class="col-sm-5 offset-1 header-contri mt-3">{{ paymentData.name ? paymentData.name : paymentData.title }}</div>
                <div class="col-10 offset-1 text-sm-right offset-sm-0 col-sm-4 edit mt-3" @click="editPayment"><i class="pi pi-edit"></i> Edit Payment Details</div>
                <!-- <div class="col-10 offset-1 mt-4" style="font-size: 1.1em">CONTRIBUTION ITEMS</div> -->
                <div class="col-8 offset-1 mt-3" v-for="item in paymentData.contributionItems" :key="item.id">
                        <div style="font-size: 1.1em"><i class="pi pi2 pi-check-circle"> &nbsp;&nbsp;</i>{{ item.name }}</div>
                </div>
            </div>




                <div class="row w-100">
                    <div class="col-md-6 offset-md-1 mt-5">
                        <h5 class="header-contri2 my-4">Available options for payment</h5>
                    </div>
                        <div class="col-md-10 offset-md-1 col-sm-11 offset-1  col-lg-9 border rounded cursor-pointer" @click="toggleLink">
                            <div class="row">
                            <div class="col-3 col-sm-2 image mt-3">
                                <img src="../../assets/link.svg" style="width:54px; height:54px" alt="marked Attendance image">

                            </div>
                            <div class="col-9 col-sm-10  mt-3">
                                <a class="c-pointer text-decoration-none"><h4 class="header4">Web Payment Link</h4></a>
                                <p class="para">Make your payment online via this link provided.</p>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-10 col-sm-11 offset-1  col-lg-9 d-flex align-items-center justify-content-center" :class="{ 'show' : displayLink, 'hide' : !displayLink }">
                            <p class="para"><span class="d-flex align-items-center"><input type="text" ref="paymentLink"  @click="copyLink" :value="`my.churchplus.co/give/${route.params.paymentId}`" class="form-control w-100"> <i class="pi pi-copy ml-2 c-pointer" @click="copyLink" style="font-size: 22px"></i></span></p>
                        </div>
                        <!-- <div class="col-md-10 col-sm-11 offset-1  col-lg-9 d-flex align-items-center justify-content-center" :class="{ 'show' : displayLink, 'hide' : !displayLink }">
                            <p class="para"><span class="d-flex align-items-center"><input type="text" ref="paymentLink"  @click="copyLink" :value="`https://give.churchplus.co/${route.params.paymentId}`" class="form-control w-100"> <i class="pi pi-copy ml-2 c-pointer" @click="copyLink" style="font-size: 22px"></i></span></p>
                        </div> -->


                </div>
                <div class="col-md-12 mb-3">
                </div>



                <div class="col-md-12 mb-3">
                </div>
                   <!-- <div class="row w-100">
                        <div class="col-md-10 offset-md-1 col-sm-11 offset-1  col-lg-7 offset-lg-2 border rounded" @click="toggleQr">
                            <div class="row">
                            <div class="col-md-2 col-sm-2 image mt-3">
                                <img src="../../assets/group2.svg" alt="marked Attendance image">

                            </div>
                            <div class="col-md-10 col-sm-10  mt-3">
                                <h4 class="header4"> QR </h4>
                                <p class="para">Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-10 offset-md-1 col-sm-11 offset-1  col-lg-7 offset-lg-2 d-flex align-items-center justify-content-center" :class="{ 'show-qr' : displayQr, 'hide' : !displayQr }">
                            <div><img src="../../assets/qrcode.png"></div>
                        </div>

                </div> -->
                 <div class="col-md-12 mb-3">
                </div>
                   <div class="row w-100">
                        <div class="col-md-10 offset-md-1 col-sm-11 offset-1  col-lg-9 border rounded cursor-pointer" @click="toggleIFrame">
                            <div class="row">
                            <div class="col-3 col-sm-2 col-sm-2 image mt-3">
                                <img src="../../assets/iframe.svg" style="width:45px; height:45px"  alt="marked Attendance image">

                            </div>
                            <div class="col-9  col-sm-10  mt-3">
                                <h4 class="header4">iFrame</h4>
                                <p class="para">Make your payment via this iFrame link provided below</p>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-10 offset-md-1 col-sm-11 offset-1  col-lg-9 d-flex align-items-center justify-content-center" :class="{ 'show-iFrame' : displayIFrame, 'hide' : !displayIFrame }">


                                <!-- <code class="text-dark text-center">{{iFrameLink}}</code> -->
                                <p class="para">
                                    <span class="d-flex align-items-center">
                                    <code class="w-100">
                                        <textarea rows="3" ref="iframeLink"  @click="copyIframeLink" :value="`${iFrameLink}`" class="form-control w-100 p-auto">
                                        </textarea>
                                    </code>
                                    <i class="pi pi-copy ml-2 c-pointer" @click="copyIframeLink" style="font-size: 22px"></i>
                                    </span>
                                </p>

                        </div>

                        </div>
                <div class="col-md-12 mb-3">
                </div>

                        <div class="row w-100">
                                <div class="col-md-10 offset-md-1 col-sm-11 offset-1  col-lg-9 border rounded cursor-pointer">
                                    <div class="row disabled">
                                    <div class="col-3 col-md-2 col-sm-2 image mt-3">
                                        <img src="../../assets/wordpress.svg" style="width:50px; height:50px" alt="marked Attendance image">

                                    </div>
                                    <div class="col-9 col-sm-10  mt-3">
                                        <h4 class="header4">Wordpress Plugin</h4>
                                        <p class="para">Lorem ipsum dolor sit amet consectetur.</p>
                                    </div>
                                    </div>
                                </div>

                        </div>

                <div class="col-md-12 mb-3">
                </div>

        </div>
    <Toast />
    </div>
</template>

<script>
// import Button from 'primevue/button';
// import Dropdown from 'primevue/dropdown';
// import MultiSelect from 'primevue/multiselect';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
// import { useStore } from 'vuex';
import router from '../../router';
import { useToast } from "primevue/usetoast";
import axios from "@/gateway/backendapi";


    export default {


        setup() {
            const route = useRoute();
            const toast = useToast()
            const paymentData = ref({})

            const displayLink = ref(false)
            const displayQr = ref(false)
            const displayIFrame = ref(false)
            // const contributionItems = ref([])
            const iFrameLink = ref(`<iframe loading="lazy" src="https://my.churchplus.co/iframe/${route.params.paymentId}" style="border:0px #f4f4f4 dashed;" name="online-giving" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="1190px" width="720px" allowfullscreen></iframe>`)
            const paymentLink = ref("")
            const iframeLink = ref("")
            const title = ref("")


            const toggleLink = () => {
                displayLink.value = !displayLink.value
                displayQr.value = false
                displayIFrame.value = false
            }

            const toggleQr = () => {
                displayQr.value = !displayQr.value
                displayLink.value = false
                displayIFrame.value = false
            }

            const toggleIFrame = () => {
                displayIFrame.value = !displayIFrame.value
                displayLink.value = false
                displayQr.value = false
            }

            // if (route.query.activityID) {
            //     events.value.push({ name: route.query.activityName, id: route.query.activityID })
            //     selectedEvent.value = { name: route.query.activityName, id: route.query.activityID }
            // }

            // if (route.query.groupId) {
            //     groups.value.push({ name: route.query.groupName, id: route.query.groupId })
            //     selectedGroups.value.push({ name: route.query.groupName, id: route.query.groupId })
            // }

            onMounted(async() => {
                // let store = useStore()
                // console.log(route.params, "userouteeeee")

                // let storedData = store.getters['contributions/paymentData']
                // Check if the Object is empty
                // if (Object.keys(storedData).length === 0) {
                    try {
                        const res = await axios.get(`/api/PaymentForm/GetOne?paymentFormID=${route.params.paymentId}`);
                        console.log(res, 'dataaaaaaaa')
                        paymentData.value.title = res.data.name
                        paymentData.value.contributionItems = res.data.contributionItems.map(i => i.financialContribution)
                    }
                    catch (err) {
                        console.log(err)
                    }
                // }  else {
                //     paymentData.value.title = store.getters['contributions/paymentData'].name
                //     paymentData.value.contributionItems = store.getters['contributions/paymentData'].contributionItems.map(i => i.financialContribution)
                //     console.log(store.getters['contributions/paymentData'], 'yeaaaa')
                // }


            })
            const editPayment = () => {
                router.push(`/tenant/payments/${route.params.paymentId}`)
            }

            const copyLink = () => {
                paymentLink.value.select();
                paymentLink.value.setSelectionRange(0, paymentLink.value.value.length); /* For mobile devices */

                /* Copy the text inside the text field */
                document.execCommand("copy");
                toast.add({
                    severity: "info",
                    summary: "Link Copied",
                    detail: "Payment link copied to your clipboard",
                    life: 3000,
                });
            }

            const copyIframeLink = () => {
                iframeLink.value.select();
                iframeLink.value.setSelectionRange(0, iframeLink.value.value.length); /* For mobile devices */

                /* Copy the text inside the text field */
                document.execCommand("copy");
                toast.add({
                    severity: "info",
                    summary: "Link Copied",
                    detail: "Payment link copied to your clipboard",
                    life: 3000,
                });
            }



            return {
                displayLink, route, toggleLink, displayQr, toggleQr, toggleIFrame, displayIFrame, paymentData, iFrameLink, editPayment, copyLink,  paymentLink, copyIframeLink, iframeLink, title
            }
        }

    //  data() {



    //     return {
    //         selectedCity1: null,
    //         selectedCity2: null,
    //         selectedCountry: null,
    //         countries: [
    //             // {name: 'workers meeting(12th Oct, 2020)'},
    //             // {name: 'Sunday service (12th Oct, 2020)'},
    //             // {name: 'Create New Event'},
    //             {name: 'choir', code: 'NY', id: 1},
    //             {name: 'Prayer', code: 'RM', id: 2},
    //         ],
    //         selectedGroup: [
    //             {name: 'choir', code: 'NY', id: 1},
    //             {name: 'Prayer', code: 'RM', id: 2},
    //         ],
    //         selectedCountries: null,
    //         groups: [
    //             {name: 'choir', code: 'NY', id: 1},
    //             {name: 'Prayer', code: 'RM', id: 2},
    //             {name: 'Thankgiving', code: 'LDN', id: 3},
    //             {name: 'song', code: 'IST', id: 4},
    //             {name: 'Giving', code: 'PRS', id: 5}
    //         ],

    //     }
    // },

    }

</script>

<style scoped>
.aten{
text-align: left;
font: normal 800 30px Nunito Sans !important;
letter-spacing: 0px;
color: #02172E;
opacity: 1;

}

.event{
 font: var(--unnamed-font-style-normal) normal normal 16px/22px var(--unnamed-font-family-nunito-sans);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal normal 16px/22px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 1;
}
.check{
font: var(--unnamed-font-style-normal) normal 600 16px/22px var(--unnamed-font-family-nunito-sans);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal 600 16px/22px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 1;
}
.header4{
font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 18px/24px var(--unnamed-font-family-nunito-sans);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal bold 18px/24px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 0.8;
}
.para{
font: var(--unnamed-font-style-normal) normal normal 14px/19px var(--unnamed-font-family-nunito-sans);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal normal 14px/19px Nunito Sans;
letter-spacing: 0px;

}

.container{
    margin-bottom: 40px;
}

.contri-type {
    font-size: 1.7em;
}

.page-header {
  font: normal normal 800 29px Nunito sans;
}

.hide {
    height: 0;
    overflow: hidden;
    border: 0px solid #dee2e6;
    transition: all 0.5s ease-in-out;
}

.show {
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    padding: 10px;
    transition: all 0.5s ease-in-out;
    height: 100px;
    overflow: hidden;
}

.show-qr {
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    padding: 10px;
    transition: all 0.5s ease-in-out;
    height: 300px;
    overflow: hidden;

}

.show-iFrame {
    border: 1px solid #dee2e6;
    border-radius: .25rem;
    padding: 10px;
    transition: all 0.5s ease-in-out;
    height: 200px;
    overflow: hidden;

}

.header-contri {
     font-size: 25px;
     font-weight: 600;
}
.header-contri2 {
     font-size: 20px;
     font-weight: 600;
}

.para {
    width: 95%;

}
.para input {
    color: black;
}

.pi2 {
  color: #54E38A;
}


.para textarea  {
    color: black;
    /* font-family: 'Comic Sans Ms'; */
}

.edit {
    color: #0b71d6;
    cursor: pointer;
}

.disabled {
    background: rgb(240, 239, 239);
    opacity: 0.5;
}


</style>