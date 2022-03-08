<template>
    <div class="container container-top  ">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8  ">
                    <div class="heading-text"> Pledge Definition </div>
                     <div class="row my-2 mt-3">
                        <div class="col-md-10 offset-md-2">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Name <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8">
                                    <input type="text" v-model="PledgeName" class="form-control" :class="{ 'is-invalid' : !isNameValid }" @blur="checkNameValue"/>
                                    <div class="invalid-feedback">
                                        Please enter your name.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Contribution <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8">
                                    <Dropdown v-model="selectedContribution" class="w-100 font-weight-normal" :options="contributionItems"  optionLabel="name" placeholder="Select Contribution" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-10  offset-md-2 mt-3 ">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Total target amount <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8 d-flex flex-wrap align-self-center">
                                    <span class="border bg-secondary pt-1 col-2 ">NGN</span>
                                    <!-- <span class="border">NGN</span> -->
                                    <div class="col-10  m-0 p-0"><input type="text" v-model="targetAmount" class="form-control" placeholder=" Enter Amount" /></div>
                                    <!-- <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100"  /> -->
                                </div>
                            </div>
                        </div>
                        <div class="col-md-10  offset-md-2 mt-3 ">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Currency  <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8">
                                     <Dropdown v-model="selectedCurrency" class="w-100  font-weight-normal" :options="currencyList" optionLabel="name" :filter="true" placeholder="Select Currency" >
                                        <template #value="slotProps">
                                            <div class="country-item country-item-value" v-if="slotProps.value">
                                                <div>{{slotProps.value.name}}</div>
                                                <!-- <div>{{slotProps.placeholder}}</div> -->
                                            </div>
                                            <span v-else>
                                                {{slotProps.placeholder}}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="country-item">
                                                <div>{{slotProps.option.name}} - {{slotProps.option.country}}</div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Pledge type </label>
                                </div>
                                <div class="col-12 col-sm-12  col-lg-8 d-flex justify-content-between flex-wrap">
                                    <div class="col-md-4 mt-2 mt-md-0  border py-2 c-pointer free-will " :class="{ 'show-free-will' : pledgeCategory == 'freewill' }" @click="freeWill">
                                        Free Will
                                    </div>
                                    <div class="col-md-4 border py-2 c-pointer" :class="{ 'show-specific' : pledgeCategory == 'specific' }"  @click="specific" >
                                        Specific
                                    </div>
                                    <div class="col-md-4 mt-2 mt-md-0 border py-2 c-pointer" :class="{ 'show-range' : pledgeCategory == 'range' }" @click="range">
                                        Range
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3 " v-if="pledgeCategory == 'specific' " >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class=""> Amount </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8">
                                            <input type="text" v-model="SpecificAmount" class="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3" v-if="pledgeCategory == 'range' "  >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class=""> Amount </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-4">
                                            <input type="text" v-model="amountFrom" class="form-control" placeholder="From" />
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-4">
                                            <input type="text" v-model="amountTo" class="form-control" placeholder="To" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class=""> Frequency <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8 d-flex flex-wrap">
                                    <div class="col-12 col-sm-12  col-lg-6 mt-2 mt-md-0  border py-2 c-pointer  " :class="{ 'show-one-time' : pledgeFrequency == 'onetime' }" @click="oneTime">
                                        One time
                                    </div>
                                    <div class="col-12 col-sm-12  col-lg-6 border py-2 c-pointer" :class="{ 'show-reoccuring' : pledgeFrequency == 'reoccuring' }"  @click="reOccuring" >
                                        Reoccuring
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3 " v-if="pledgeFrequency == 'onetime' " >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class=""> Start Date </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8">
                                            <Calendar dateFormat="dd/mm/yy" class="w-100" id="icon" v-model="startDate" :showIcon="true" />
                                        </div>
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right mt-2 align-self-center">
                                            <label for="" class=""> End Date </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8 mt-2 ">
                                            <Calendar dateFormat="dd/mm/yy" class="w-100" id="icon" v-model="endDate" :showIcon="true" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3 " v-if="pledgeFrequency == 'reoccuring' " >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class=""> Range </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8">
                                            <Dropdown v-model="selectedRange" class="w-100 font-weight-normal" :options="reOccuringRange"  optionLabel="name" placeholder="Range" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <!-- <div class="row my-1 pt-4"> -->
                        <div class="col-md-9   offset-md-5   mt-4">
                                <div class="row d-flex justify-content-center ">
                                    <!-- <div class="col-md-2"></div> -->
                                    <!-- <div class=" col-md-5 ">
                                        <button class="default-btn" data-dismiss="modal">Pay now</button>
                                    </div> -->
                                    <div class=" col-md-5 mt-2 mt-md-0 ">
                                        <button class="default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="savePledge">
                                            <i class="pi pi-spin pi-spinner" v-if="loading"></i> Save
                                        </button>
                                    </div>
                                </div>
                        </div>
                    <!-- </div>  -->
                </div>
                
                        
                   
            </div>
            <Toast />
        </div>
    </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import { useStore } from 'vuex'
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import Calendar from "primevue/calendar";
import finish from '../../services/progressbar/progress';
// import router from '../../router';
// import store from "../../store/store";
import CascadeSelect from 'primevue/cascadeselect';
export default {
    components: {
        Dropdown,
        Calendar,
        InputText,
        CascadeSelect
    },
    setup() {
        const toast = useToast()
        const startDate = ref("");
        const endDate = ref("");
        const Address = ref('');
        const loading = ref(false)
        const value = ref()
        const pledgeCategory = ref("freewill")
        const pledgeFrequency = ref("")
        const showRange = ref(false)
        const showFreeWill = ref(false)
        const selectedRange = ref({})
        const selectedContribution = ref("")
        const selectedCurrency = ref("")
        const isNameValid = ref(true)
        const PledgeName = ref('')
        const amountFrom = ref('')
        const amountTo = ref('')
        const SpecificAmount = ref('')
        const currencyList = ref([])
        const contributionItems = ref([])
        const targetAmount = ref("")
        const reOccuringRange = ref([
            {name: 'Daily'},
            {name: 'Weekly'},
            {name: 'Monthly'},
            {name: 'Six Monthly'}
        ])
        // const ContributionType = ref([
        //     {name: 'Church Service'},
        //     {name: 'Building'},
        //     {name: 'Concert'},
        //     {name: 'Children Program'}
        // ])

     const getContributionCategory = () => {
            let store = useStore()
            console.log(store.getters['contributions/contributionItems'])
            if (store.getters['contributions/contributionItems'].length > 0) {
                contributionItems.value = store.getters['contributions/contributionItems']
            } else {
                // loading.value = true
                axios
                    .get("/api/financials/contributions/items")
                    .then((res) => {
                        loading.value = false
                    contributionItems.value = res.data.map(i =>{
                        return {
                            name: i.name,
                            id: i.id
                        }
                    });
                    console.log(res.data, '🎁🍾🍾s');
                    })
                    .catch((err) => {
                      finish()
                        loading.value = false
                        if(err.toString().toLowerCase().includes("network error")) {
                          networkError.value = true
                        } else {
                          networkError.value = false
                        }
                        console.log(err)
                    });
            }

    // get from  to store

    // savev to sstore
    // store.dispatch('contributions/contributionList')
    };
    getContributionCategory();

   

        const savePledge = async () => {
            const pledgeDetails = {
                    contributionID: selectedContribution.value.id,
                    totalTargetAmount: targetAmount.value,
                    // donorPaymentType: 0,
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
                console.log(pledgeDetails, 'pledgedetails')
            try{
                const res = await axios.post('/api/Pledge/CreatePledgeDefinition', pledgeDetails)
                finish()
                console.log(res,'PledgeDefinition')
                loading.value = false
                

                toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Pledge definition created successfully",
                life: 2000,
              });
              
            }
            catch (error){
                console.log(error)
            }

        }
        const getAllCurrencies = () => {
          axios.get('/api/lookup/getallcurrencies')
            .then(res => {
              currencyList.value = res.data.map(i => {
                return {
                  name:  i.shortCode,
                  id: i.id,
                  country: i.country
                }
              })
              console.log(currencyList.value, "all currency");
              
            })
            .catch(err => console.log(err))
      }
      getAllCurrencies()

        const specific = () =>{
            pledgeCategory.value = "specific"
        }
        const range = () =>{
            pledgeCategory.value = "range"
        }
        const freeWill = () =>{
            pledgeCategory.value = "freewill"
        }
        const oneTime = () =>{
            pledgeFrequency.value = "onetime"
        }
        const reOccuring = () =>{
            pledgeFrequency.value = "reoccuring"
        }

        const checkNameValue = () => {
            if(PledgeName.value.length == 0) {
                isNameValid.value = false
            }   else {
                isNameValid.value = true
            }
        }


        return {
            currencyList,
            contributionItems,
            targetAmount,
            isNameValid,
            PledgeName,
            amountFrom,
            amountTo,
            SpecificAmount,
            checkNameValue,
            selectedCurrency,
            // ContributionType,
            selectedContribution,
            startDate,
            endDate,
            showRange,
            showFreeWill,
            freeWill,
            oneTime,
            reOccuring,
            range,
            specific,
            pledgeCategory,
            pledgeFrequency,
            savePledge,
            Address,
            value,
            loading,
            reOccuringRange,
            selectedRange
        }
    },
}
</script>

<style scoped>
        .p-dropdown {
    width: 14rem;
}

.country-item {
    
        width: 17px;
        margin-right: 0.5rem;

}
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}
        .show-specific{  
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        .show-range{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        .show-free-will{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        .show-one-time{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        .show-reoccuring{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        /* .free-will:hover{
            background-color: #d4dce6;
        } */
</style>