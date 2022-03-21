<template>
    <div class="container  container-top container-wide ">
        <div class="row d-flex justify-content-between px-3">
                <div class="heading-text"> Make a Pledge </div>
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
                                    <input type="text" v-model="selectedPledge.donorPaymentSpecificAmount" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-3">
                         <div class="col-md-10 offset-md-2 " v-if="selectedPledge.donorPaymentType == 2 "  >
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Pledge Amount </label>
                                </div>
                                <div class="col-12 col-sm-12  col-lg-4">
                                    <input type="text" v-model="selectedPledge.donorPaymentRangeFromAmount" class="form-control" placeholder="From" />
                                </div>
                                <div class="col-12 col-sm-12  col-lg-4 my-3 my-sm-0 my-md-0 text-left text-md-right ">
                                    <div ><span>To:</span> {{Math.abs(selectedPledge.donorPaymentRangeToAmount).toLocaleString()}}.00 </div>
                                </div>
                            </div>
                        </div>
                    </div>  

                     <div class="col-md-9 offset-md-5 mt-4">
                            <div class="row d-flex justify-content-center ">
                                <div class="mt-4 col-md-5">
                                    <button class="default-btn primary-bg border-0 text-white" type="button" data-toggle="modal" data-target="#exampleModalCenter" data-dismiss="modal" @click="savePledge">
                                        <i class="pi pi-spin pi-spinner" @click="makePledge" v-if="loading"></i> Save & Continue
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
                                    <div class="col-lg-10 col-sm-12 mt-3">
                                    <a href="">Send SMS</a>
                                    </div>
                                    <div class="col-sm-10 mt-3  pr-0">
                                        <a href="">Send Email</a>
                                    </div>
                                    
                                    
                                    <!-- <div class="col-sm-12 mt-3" v-if="applyRem">
                                        <hr class="hr"/>
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
    <Toast />
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
        const churchName = ref('');
        const Address = ref('');
        const loading = ref(false)
        const loadingCode = ref(false)
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const selectedPledge = ref('')
        const allPledgeList = ref([]);
        const amountFrom = ref('')
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



        const savePledge = async () => {

        }

        const makePayment = () =>{
            router.push('/pledge/pledgepayment')
        }

         const chooseContact = (payload) => {
            // contactRef.value.hide();
            selectedContact.value = payload
        }
        const active = (payload) => {
            isActive.value = payload
        }
        const getAllPledgeDefinition = async () =>{
                try{
                    const res = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
                    finish()
                    allPledgeList.value = res.data.returnObject
                    isActive.value = res.data.returnObject.map( i => {
                        return {
                            isActive : i.isActive
                        }
                    })
                    console.log(allPledgeList.value,'getPledgeList');
                }
                catch (error){
                    console.log(error)
                }
            }
            getAllPledgeDefinition()

            const makePledge = async () =>{

                 const makePledgeDetails = {
                    personID: selectedContribution.value.id,
                    id: selectedPledge.id,
                    totalTargetAmount: targetAmount.value,
                    donorPaymentType: pledgType.value,
                    name: PledgeName.value,
                    donorPaymentSpecificAmount: SpecificAmount.value,
                    donorPaymentRangeFromAmount: amountFrom.value,
                    donorPaymentRangeToAmount: amountTo.value,
                    // pledgeTypeFrequency: 
                    pledgeTypeFrequencyOneTimeStartDate: startDate.value,
                    pledgeTypeFrequencyOneTimeEndDate: endDate.value,
                    pledgeTypeFrequencyReOccuring: selectedRange.value.name,
                    currencyID: selectedCurrency.value.id,
                    // isActive: true
                    
                }

                try{
                    const res = await axios.get('api/Pledge/SavePledge', makePledgeDetails)
                    finish()
                    console.log(res,'getSinglePledge');
                }
                catch (error){
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
            makePledge,
            chooseContact,
            selectedPledge,
            makePayment,
            pledgeCategory,
            amountTo,
            amountFrom,
            savePledge,
            checkEmailValue,
            churchName,
            Address,
            value,
            loading,
            loadingCode,
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