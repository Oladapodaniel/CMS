<template>
    <div class="container  container-top container-wide ">
        <div class="row d-flex justify-content-between px-3">
                <div class="heading-text"> Make a Pledge </div>
                <Toast />
                <!-- <div><ToggleButton @is-active="isActive" :active="isActive" /></div> -->
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8  " >
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Select Person <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <MembersSearch @memberdetail="chooseContact" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Select Pledge <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :options="allPledgeList"  optionLabel="name" placeholder="Select Pledge" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2 " v-if="selectedPledge.donorPaymentType == 0 " >
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="freewillAmount" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2 " v-if="selectedPledge.donorPaymentType == 1 ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="selectedPledge.donorPaymentSpecificAmount" :disabled="checking" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-2  ">
                         <div class="col-md-10 offset-md-2 " v-if="selectedPledge.donorPaymentType == 2 "  >
                            <div class="row">
                                <div class="col-12 col-md-4 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Pledge Amount </label>
                                </div>
                                <div class="d-flex flex-wrap col-12  col-md-8 ">
                                    <div class=" col-sm-6 ">
                                        <div class="font-weight-bold" > <span>From:</span>  {{Math.abs(selectedPledge.donorPaymentRangeFromAmount).toLocaleString()}}.00 </div>
                                    <!-- <input type="text" v-model="selectedPledge.donorPaymentRangeFromAmount" class="form-control" :disabled="checking" placeholder="From" /> -->
                                    </div>
                                    <div class="col-12  col-sm-6   ">
                                        <div class="font-weight-bold  " ><span>To:</span> {{Math.abs(selectedPledge.donorPaymentRangeToAmount).toLocaleString()}}.00 </div>
                                    </div>

                                </div>
                                
                                <!-- <div class="col-12 d-flex justify-content-end mt-3 ">
                                    <div class="col-12 col-sm-12  col-lg-8  ">
                                        <input type="text" v-model="amountInRange" class="form-control" placeholder="Enter Amount" />
                                    </div>
                                </div> -->
                                
                            </div>
                        </div>
                    </div>  

                     <div class="col-md-9 offset-md-5 mt-4">
                            <div class="row  ">
                                <div class=" col-md-12 d-flex justify-content-center">
                                    <button class="default-btn primary-bg border-0 text-white" type="button" data-toggle="modal" data-target="#exampleModalCente" data-dismiss="modal" @click="makePledge">
                                        <i class="pi pi-spin pi-spinner"  v-if="loading"></i> Save and Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>

                <!-- Modal --->
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header" style="border: none">
                            <h5 class="modal-title" id="exampleModalLongTitle">Pledge Payment Link</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-10  pr-0 align-self-center">
                                    <a href="">Online Payment Link </a>
                                    </div>
                                    <div class="col-sm-10 mt-3  pr-0 align-self-center">
                                            <a href="">Virtual Account Link</a>
                                    </div>
                                    <!-- <div class="col-lg-10 col-sm-12 mt-3">
                                    <a href="">Send SMS</a>
                                    </div>
                                    <div class="col-sm-10 mt-3  pr-0">
                                        <a href="">Send Email</a>
                                    </div> -->
                                    
                                    
                                    
                                </div>
                        </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center mt-4  ml-5" style="border: none">
                                <button class="default-btn primary-bg border-0 text-white" @click="makePayment" type="button" data-dismiss="modal">Make payment</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue"
import router from '../../router';
import finish from '../../services/progressbar/progress';
// import store from "../../store/store";
import CascadeSelect from 'primevue/cascadeselect';
import ToggleButton from '../donation/toggleButton.vue'
export default {
    components: {
        MembersSearch,
        Dropdown,
        InputText,
        CascadeSelect,
        ToggleButton
    },
    setup() {
        const toast = useToast()
        // const route = useRoute();
        const churchName = ref('');
        const Address = ref('');
        const loading = ref(false)
        const loadingCode = ref(false)
        const freewillAmount = ref('');
        const checking = ref(false);
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const selectedPledge = ref('')
        const allPledgeList = ref([]);
        const amountFrom = ref('')
        const makePledgeData = ref('')
        const selectedContact = ref({})
        const isActive = ref(null)
        const amountTo = ref('')
        const pledgeCategory = ref(
            [
                {name: 'Free will'},
                {name: 'Specific'},
                {name: 'Range'}
            ]
        )



        // const savePledge = async () => {

        // }

        const makePayment = () =>{
            router.push('/pledge/pledgepayment')
        }

         const chooseContact = (payload) => {
            // contactRef.value.hide();
            selectedContact.value = payload

            // console.log(payload, 'my allll')
         }
        

        const active = (payload) => {
            isActive.value = payload
        }
        const getAllPledgeDefinition = async () =>{
                try{
                    checking.value = false;
                    const res = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
                    finish()
                    allPledgeList.value = res.data.returnObject
                    isActive.value = res.data.returnObject.map( i => {
                        return {
                            isActive : i.isActive
                        }
                    })
                    console.log(allPledgeList.value,'getPledgeList');
                    checking.value = true;
                }
                catch (error){
                    console.log(error)
                }
            }
            getAllPledgeDefinition()

            const makePledge = async () =>{
                let donorAmountBase = '';
                 if(selectedPledge.value.donorPaymentType == 0 ){
                     donorAmountBase = freewillAmount.value 
                 } else if(selectedPledge.value.donorPaymentType == 1){
                     donorAmountBase = selectedPledge.value.donorPaymentSpecificAmount
                 }else if(selectedPledge.value.donorPaymentType == 2){
                     donorAmountBase = selectedPledge.value.donorPaymentRangeFromAmount
                 }else{
                     return donorAmountbase;
                 }

                 const makePledgeDetails = {
                    personID: selectedContact.value.id,
                    pledgeTypeID: selectedPledge.value.id,
                    amountBase: donorAmountBase,
                    amountTop: selectedPledge.value.donorPaymentRangeToAmount
                    // amountBase: selectedPledge.value.donorPaymentSpecificAmount,
                    // amountBase:  freewillAmount.value                  
                }
                // selectedPledge.value.donorPaymentType == 0 ? makePledgeDetails.
                console.log(makePledgeDetails, "makepledgeObject");

                try{
                    const res = await axios.post('api/Pledge/SavePledge', makePledgeDetails)
                    finish()
                    console.log(res.data,'getSinglePledge');
                    makePledgeData.value = res.data.returnObject

                     toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "You are successfully make a Pledge",
                        life: 2000,
                    });
                    
                    router.push({  
                        name: 'PledgeMaking',
                        query: {
                            id: makePledgeData.value.pledgeTypeID,
                            pledgeTypeID: makePledgeData.value.id,
                            name: selectedContact.value.name
                        }
                    })
                    
                }
                catch (error){
                    if (error.response) {
                        toast.add({
                        severity: "warn",
                        summary: 'Not successful',
                        detail: `${error.response.data}`,
                        life: 8000,
                        });
                    } else {
                        toast.add({
                        severity: "error",
                        summary: "Network Error",
                        detail: `Please ensure you have a strong internet  connection`,
                        life: 4000,
                        });
                    }
                    console.log(error)
                }
            }

        // const getSinglePledgeDefinition = async () =>{
        //         try{
        //             const res = await axios.get(`/api/Pledge/GetSinglePledgeDefinitions?ID${allPledgeList.value.id}`)
        //             finish()
        //             console.log(res,'getSinglePledge');
        //         }
        //         catch (error){
        //             console.log(error)
        //         }
        //     }
        //     getSinglePledgeDefinition()


        

        const checkNameValue = () => {
            if(churchName.value.length == 0) {
                isNameValid.value = false
            }   else {
                isNameValid.value = true
            }
        }
        
        const checkEmailValue = () => {
            if(pastorEmail.value.length == 0) {
                isEmailValid.value = false
            }   else {
                isEmailValid.value = true
            }
        }

        return {
            allPledgeList,
            checking,
            makePledge,
            chooseContact,
            selectedPledge,
            makePayment,
            pledgeCategory,
            amountTo,
            amountFrom,
            freewillAmount,
            // savePledge,
            checkEmailValue,
            churchName,
            selectedContact,
            Address,
            value,
            loading,
            loadingCode,
            makePledgeData,
            checkNameValue,
            isNameValid,
            isEmailValid,
            isActive,
            active
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}
</style>