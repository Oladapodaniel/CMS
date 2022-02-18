<template>
    <div class="container  container-top  ">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8  ">
                    <div class="heading-text"> Pledge Payment </div>
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Select Person <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <MembersSearch />
                                    <!-- <Dropdown v-model="selectMember" class="w-100 font-weight-normal" :options="MembersType"  optionLabel="name" placeholder="Select Member" /> -->
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
                                    <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :options="pledgeCategory"  optionLabel="name" placeholder="Select Pledge" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2 " v-if="selectedPledge.name === 'Free will' ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="Amount" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2 " v-if="selectedPledge.name === 'Specific' ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="Amount" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-3">
                         <div class="col-md-10 offset-md-2 " v-if="selectedPledge.name === 'Range' "  >
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Pledge Amount </label>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" v-model="amountFrom" class="form-control" placeholder="From" />
                                </div>
                                <div class="col-md-4">
                                    <input type="text" v-model="amountTo" class="form-control" placeholder="To" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="heading-text"> Payment </div>
                     <div class="col-md-10  offset-md-2 mt-3 ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Amount <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8 d-flex flex-wrap">
                                    <div class="border col-2 bg-secondary  align-self-center py-1 ">NGN</div>
                                    <!-- <span class="border">NGN</span> -->
                                    <div class="col-10  m-0 p-0"><input type="text" v-model="targetAmount" class="form-control" placeholder=" Enter Amount" /></div>
                                    <!-- <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100"  /> -->
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Channel <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8 d-flex flex-wrap">
                                    <Dropdown v-model="selectedChannel" class="w-100 font-weight-normal" :options="channel"  optionLabel="name" placeholder="Select Channel" />
                                </div>
                            </div>
                        </div>
                    <div class="col-md-9 offset-md-5 mt-4">
                            <div class="row d-flex justify-content-center ">
                                <div class="mt-4 col-md-5">
                                    <button class="default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="savePledge">
                                        <i class="pi pi-spin pi-spinner" v-if="loading"></i> Save
                                    </button>
                                </div>
                            </div>
                    </div>
                    
                </div>
                <!-- <div class="row my-1 pt-4"> -->
                       
                    <!-- </div>  -->
            </div>
        </div>
    </div>
    <Toast />
</template>

<script>
// import axios from "@/gateway/backendapi";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue"
// import router from '../../router';
// import store from "../../store/store";
import CascadeSelect from 'primevue/cascadeselect';
export default {
    components: {
        MembersSearch,
        Dropdown,
        InputText,
        CascadeSelect
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
        const amountFrom = ref('')
        const amountTo = ref('')
        const selectedChannel = ref('')
        const pledgeCategory = ref(
            [
                {name: 'Free will'},
                {name: 'Specific'},
                {name: 'Range'}
            ]
        )
        const channel = ref(
            [
                {name: 'Bank Transfer'},
                {name: 'Cash'},
                {name: 'Online'},
                {name: 'POS'},
                {name: 'USSD'},
                {name: 'Cheque'},
            ]
        )



        const savePledge = async () => {

        }


        

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
            channel,
            selectedPledge,
            selectedChannel,
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
            isEmailValid
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}
</style>