<template>
    <div class="container  container-top  ">
        <div class="row d-flex justify-content-between px-3">
                <div class="heading-text"> Pledge Payment </div>
                <!-- <div><ToggleButton @is-active="isActive" :active="isActive" /></div> -->
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8  ">
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Person <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="memberName"  :disabled="checking"  class="form-control w-100" />
                                    <!-- <MembersSearch /> -->
                                    <!-- <Dropdown v-model="selectMember" class="w-100 font-weight-normal" :options="MembersType"  optionLabel="name" placeholder="Select Member" /> -->
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Type <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <Dropdown v-model="selectedPledge" :disabled="checking"  class="w-100 font-weight-normal" :options="allPledgeList"  optionLabel="name" placeholder="Select Pledge" />
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
                            </div>
                        </div>
                    </div> 
                    <div class="heading-text"> Payment </div>
                    <div class="row  mt-1">
                        <div class="col-md-10  offset-md-2 mt-2 ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Amount <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8 d-flex flex-wrap">
                                    <div class="border col-2 bg-secondary  align-self-center py-1 ">NGN</div>
                                    <!-- <span class="border">NGN</span> -->
                                    <div class="col-10  m-0 p-0"><input type="text" v-model="paymentAmount" class="form-control" placeholder=" Enter Amount" /></div>
                                    <!-- <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100"  /> -->
                                </div>
                            </div>
                         </div>
                    </div>
                    <div class="row  mt-3"> 
                            <div class="col-md-10  offset-md-2  ">  
                                <div class="row   mt-3">
                                    <div class="col-md-4 text-md-right align-self-center">
                                        <label for="" class="">Channel <sup class="text-danger">*</sup> </label>
                                    </div>
                            
                                    <div class="col-md-8 d-flex flex-wrap">
                                        <Dropdown v-model="selectedChannel" class="w-100 font-weight-normal" :options="channel"  optionLabel="name" placeholder="Select Channel" />
                                    </div>
                                </div>
                            </div>  
                    </div>
                    <div class="col-md-9 offset-md-5 mt-4">
                            <div class="row d-flex justify-content-center ">
                                <div class="mt-4 col-md-5">
                                    <button class="default-btn  " data-dismiss="modal" data-toggle="modal" data-target="#PaymentOptionModal" @click="payPledge">
                                        <i class="pi pi-spin pi-spinner" v-if="loading"></i> Pay Now
                                    </button>
                                </div>
                                <div class="mt-4 col-md-5">
                                    <button class="default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="savePayment">
                                        <i class="pi pi-spin pi-spinner" v-if="loading"></i> Save
                                    </button>
                                </div>
                            </div>
                    </div>
                    
                </div>

                 <!-- Modal -->
      <div
        class="modal fade"
        id="PaymentOptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-modal">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Payment methods
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" ref="close">&times;</span>
              </button>
            </div>
            <div class="modal-body p-0 bg-modal pb-5">
              <div class="row">
                <div class="col-sm-12 p-4 text-center continue-text">
                  Continue payment with
                </div>
              </div>
              <div class="row row-button c-pointer" @click="payWithPaystack">
                <div class="col-12 col-md-4 col-sm-7 offset-1">
                  <img
                    style="width: 150px"
                    src="../../assets/4PaystackLogo.png"
                    alt="paystack"
                  />
                </div>
              </div>
              <div class="row row-button c-pointer" @click="payWithFlutterwave">
                <div class="col-12 col-md-4 col-sm-7 offset-1">
                  <img
                    style="width: 150px"
                    src="../../assets/flutterwave_logo_color@2x.png"
                    alt="flutterwave"
                  />
                </div>
              </div>
              <!-- <div class="row row-button c-pointer" @click="makePayment">
                <div class="col-4 col-sm-7 offset-2">
                  <img
                    class="w-100"
                    src="../../assets/flutterwave_logo_color@2x.png"
                    alt="flutterwave"
                  />
                </div>

                <div class="col-7 col-sm-4 option-text">Flutterwave</div>
                <div class="row">
                  <div class="col-1 mt-n1 d-none d-sm-block">
                    <i class="fas fa-circle circle"></i>
                  </div>
                  <div class="col-8 pl-0 d-none d-sm-block">Nigeria</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>

                <!-- <div class="row my-1 pt-4"> -->
                       
                    <!-- </div>  -->
            </div>
            <Toast />
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
import { useRoute } from "vue-router"
import { useStore } from "vuex";
// import router from '../../router';
// import store from "../../store/store";
import CascadeSelect from 'primevue/cascadeselect';
import finish from '../../services/progressbar/progress';
import ToggleButton from '../donation/toggleButton.vue';
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
        const store = useStore();
        const currentUser = ref(store.getters.currentUser);
        const tenantId = ref(currentUser.tenantId);
        const route = useRoute();
        const churchName = ref('');
        const memberName = ref('');
        const Address = ref('');
        const loading = ref(false)
        const freewillAmount = ref('');
        const checking = ref(false);
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const selectedPledge = ref('')
        const allPledgeList = ref([]);
        const amountFrom = ref('')
        const paymentAmount = ref('')
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

        const payPledge = async () => {
            
        }
        const getAllPledgeDefinition = async () =>{
                try{
                    checking.value = false;
                    const res = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
                    finish()
                    allPledgeList.value = res.data.returnObject

                    getDetails()
                    
                    // isActive.value = res.data.returnObject.map( i => {
                    //     return {
                    //         isActive : i.isActive
                    //     }
                    // })
                    console.log(allPledgeList.value,'getPledgeList');
                    checking.value = true;
                    
                }
                catch (error){
                    console.log(error)
                }
            }
            getAllPledgeDefinition()

            const getDetails = () =>{
            selectedPledge.value = allPledgeList.value.find(i => i.id === route.query.id)
            // console.log(selectedPledge.value, 'jnjhkjhajkshkjashkhahk');
            memberName.value = route.query.name

                }

            const payWithPaystack = () => {
                // initializePayment(0);
                /*eslint no-undef: "warn"*/
                let handler = PaystackPop.setup({
                    key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
                    // key: process.env.VUE_APP_PAYSTACK_API_KEY,

                    email: "info@churchplus.co",
                    amount: TotalAmount.value * 100,
                    ref: `${formattedDate.substring(0, 4)}${uuidv4().substring(0, 4)}sub`,
                    currency: Plans.value.paymentCurrency,
                    onClose: function() {
                    // swal("Transaction Canceled!", { icon: "error" });
                    toast.add({
                        severity: "info",
                        summary: "Transaction cancelled",
                        detail: "You have cancelled the transaction",
                        life: 3000,
                    });
                    },
                    callback: function(response) {
                    subscriptionPayment(response, 0);
                    //Route to where you confirm payment status
                    },
                });
                handler.openIframe();
        };

        const initializePayment = (paymentGateway) => {
            const payload = {
            gateway: paymentGateway === 0 ? 'paystack' : 'flutterwave',
            totalAmount: TotalAmount.value,
            tenantId: currentUser.value.tenantId,
            orderId: uuidv4()
            }
            axios
            .post('/api/payment/initializesubscription',payload)
            .then((res) => {
            close.value.click();
            initializedOrder.value = res.data;
            })
        }

        const payWithFlutterwave = () => {
      console.log(TotalAmount.value, 'total amount calculated')
      initializePayment(1)

      let country = "";

      switch (selectedCurrency.value) {
            case 'KES':
             country = 'KE';
              break;
            case 'GHS':
              country = 'GH';
              break;
            case 'ZAR':
              country = 'ZA';
              break;
            case 'TZS':
              country = 'TZ';
              break;
            
            default:
              country = 'NG';
              break;
        }
  
      window.FlutterwaveCheckout({
                public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
                tx_ref: uuidv4().substring(0,8),
                amount: paymentAmount.value,
                // amount: TotalAmount.value,
                currency: selectedCurrency.value,
                country: country,
                payment_options: 'card,ussd',
                customer: {
                  email: currentUser.value.userEmail
                },
                callback: (response) => {
                  console.log("Payment callback", response)
                    subscriptionPayment(response, 1)
                  },
                onclose: () => console.log('Payment closed'),
                customizations: {
                  title: 'Subscription',
                  description: "Payment for Subcription ",
                  logo: logoUrl,
                },
              });
    }

        const savePayment = async () => {
            let paymentData = {
                id: route.query.id,
                pledgeID: route.query.pledgeTypeID,
                amount: paymentAmount.value,
                channel: selectedChannel.value.name,
                currencyID: selectedPledge.value.currencyID
            }
            try {
                const res = await axios.post('/api/Pledge/SavePledgePayment', paymentData)
                    console.log(res,'paypledge');

                    toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Pledge Payment created successfully",
                        life: 2000,
                    });

            } catch (error) {
                console.log(error);
            }
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
            currentUser,
            tenantId,
            payPledge,
            selectedPledge,
            allPledgeList,
            selectedChannel,
            pledgeCategory,
            payWithPaystack,
            amountTo,
            amountFrom,
            savePayment,
            paymentAmount,
            checkEmailValue,
            initializePayment,
            churchName,
            Address,
            value,
            loading,
            checking,
            freewillAmount,
            checkNameValue,
            isNameValid,
            isEmailValid,
            memberName,
            payWithFlutterwave
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}

.continue-text {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.row-button {
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  background: #fff;
  margin: 12px 70px 15px 70px;
  transition: all 0.4s ease-in-out;
  max-height: 45px;
}

</style>