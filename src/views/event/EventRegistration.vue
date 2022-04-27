
<template>
  <div
    class="container-slim p-3 mb-5 mt-5"
  >
    <div class="row mt-2">
      <div class="col-md-6 offset-md-3 mb-3"></div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-5 offset-sm-4 p-0">
        <img :src="bannerUrl" class="w-100">
      </div>
    </div>

    <!-- top Address -->
    <div class="row mt-5">
      <div
        class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-1 font-weight-700"
      ></div>
      <div class="col-md-7 mb-3 text-center">
        <span class="font-weight-bold" style="font-size: 1.2em">
          {{ eventData.name }}
        </span>
        <span v-if="fullEventData.registrationAmount"> - {{ tenantCurrency }} {{ fullEventData.registrationAmount }}</span>
        <div class="">Event Registration</div>
        <div class="italicize">{{ eventData.date }}</div>
      </div>
    </div>

    <!--end top Address -->

    <!-- top area -->
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-7">
        <p
          class="font-weight-600 text-center primary-text"
          v-if="person.personId && loaded && !showLoading"
        >
          Your details were found, please confirm to register.
        </p>
        <p
          class="font-weight-600 text-center primary-text"
          v-if="!person.personId && !showLoading && loaded && !fetchingFailed"
        >
          Please fill the form and confirm the registration
        </p>
        <!-- v-if="autosearch && !person.name" -->
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-1 font-weight-700"
      >
        <label for="">Phone Number</label>
      </div>
      <div class="col-md-7">
        <span class="p-input-icon-left w-100">
          <i class="pi pi-phone icon" />
          <InputText
            @blur="checkCharacter"
            @input="CheckXterAfterEleven"
            class="w-100"
            type="text"
            v-model="enteredValue"
            aria-required=""
            placeholder="Enter your phone number"
          />
        </span>
        <!-- v-if="autosearch && !person.name" -->
      </div>
      <div class="col-3 offset-3 offset-sm-4 offset-md-5 mt-4" v-if="!names">
        <div class="default-btn primary-bg text-white border-0 text-center c-pointer">Register</div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-3"></div>
      <div class="col-md-5 offset-1">
        <div class="loading-div my-5" v-if="showLoading">
          <i
            class="pi pi-spin pi-spinner loading-indicator"
            style="fontsize: 2rem"
          ></i>
          <p>Fetching your details...</p>
        </div>
        <!-- v-if="autosearch && !person.name" -->
      </div>
    </div>
    <!-- end of top area -->

    <!--start of top area button -->
    <div class="row" :class="{ 'mb-4': showLoading }" v-if="false">
      <div class="col-md-3 text-md-right"></div>
      <div
        class="col-md-5 text-center col-sm-2"
        :class="{ 'mt-4': showLoading }"
      >
        <p
          class="text-danger"
          v-if="showNoPhoneError"
          :class="{ 'my-1': showLoading }"
        >
          Please enter your phone number
        </p>
        <button
          class="default-btn add-btn"
          @click="checkCharacter"
          ref="submitBtn"
          v-if="!appltoggle && !showLoading"
        >
          <!-- <i class="fas fa-circle-notch fa-spin" v-if="loading"></i> -->
          Submit
        </button>
      </div>
    </div>
    <!--end of top area button -->

    <!-- start of bottom area -->
    <div class="row" v-if="appltoggle && !showLoading">
      <div class="col-md-12">
        
        <div class="row mb-3 " v-if="selectedCustomField.find(i => i.toLowerCase() == 'card/checkin number')">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Card number</label>
          </div>
          <div class="col-md-7">
            <InputText
                class="w-100 border"
                placeholder="Card Number"
                type="text"
                aria-required=""
                v-model="checkinCode"
              />
          </div>
        </div>

        <div class="row mt-2  my-2">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Name</label>
          </div>
          <div class="col-md-7">
            <span class="p-input-icon-left w-100">
              <i class="pi pi-users icon" />
              <InputText
                class="w-100"
                placeholder="Name"
                type="text"
                aria-required=""
                v-model="person.name"
                :disabled="disabled"
              />
            </span>
          </div>
        </div>
        <div class="row">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Email</label>
          </div>
          <div class="col-md-7">
            <span class="p-input-icon-left w-100 my-md-3">
              <i class="pi pi-envelope icon" />
              <InputText
                class="w-100"
                placeholder="Email"
                type="text"
                aria-required=""
                v-model="person.email"
                :disabled="person.personId && personData.email || personData.email !== '' && personData.email !== null"
              />
            </span>
          </div>
        </div>

        <div class="row my-2" v-if="selectedCustomField.find(i => i.toLowerCase () == 'address')">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Address</label>
          </div>
          <div class="col-md-7">
            <span class="p-input-icon-left w-100">
              <i class="pi pi-map-marker icon" />
              <InputText
                class="w-100 border"
                placeholder="Address"
                type="text"
                aria-required=""
                v-model="person.address"
                :disabled="personHasAddress"
              />
            </span>
            <!-- <p
              class="font-weight-7 small-text text-danger mb-0"
              v-if="person.personId && !person.address"
            >
              school is required
            </p> -->
          </div>
        </div>

        <div class="row my-3" v-if="selectedCustomField.find(i => i.toLowerCase() == 'birthday')">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Birthday</label>
          </div>
          <div class="col-md-7">
            <div class="row">
              <div class="col-6">
                <Dropdown
                  v-model="birthDay"
                  :options="days"
                  style="width: 100%"
                  placeholder="Day"
                />
              </div>
              <div class="col-6">
                <Dropdown
                  v-model="birthMonth"
                  :options="months"
                  style="width: 100%"
                  placeholder="Month"   
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row my-3" v-if="selectedCustomField.find(i => i.toLowerCase() == 'wedding')">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Wedding</label>
          </div>
          <div class="col-md-7">
            <div class="row">
              <div class="col-4">
                <Dropdown
                  v-model="dayOfWedding"
                  :options="days"
                  style="width: 100%"
                  placeholder="Day"
                />
              </div>
              <div class="col-4">
                <Dropdown
                  v-model="monthOfWedding"
                  :options="months"
                  style="width: 100%"
                  placeholder="Month"   
                />
              </div>
              <div class="col-4">
                <Dropdown
                  v-model="yearOfWedding"
                  :options="weddingYearsArr"
                  style="width: 100%"
                  placeholder="Year"   
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row my-3" v-if="selectedCustomField.find(i => i.toLowerCase() == 'marital status')">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Marital Status</label>
          </div>
          <div class="col-md-7">
            <Dropdown
                  v-model="selectedMaritalStatus"
                  :options="maritalStatus"
                  optionLabel="value"
                  style="width: 100%"
                  placeholder="Marital Status"   
                />
            <!-- <InputText
                class="w-100 border"
                placeholder="Card Number"
                type="text"
                aria-required=""
                v-model="person.cardCode"
              /> -->
          </div>
        </div>

        <div class="row my-3" v-if="selectedCustomField.find(i => i.toLowerCase() == 'gender')">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Gender</label>
          </div>
          <div class="col-md-7">
            <Dropdown
                  v-model="selectedGender"
                  :options="gender"
                  optionLabel="value"
                  placeholder="Select gender"
                  style="width: 100%"  
                />
          </div>
        </div>
        
        
        <div class="row my-3" v-for="item in dynamicCustomFields" :key="item.id">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">{{ item.label }}</label>
          </div>
          <div class="col-md-7">
             <InputText
                v-if="item.controlType == 0"
                class="w-100 border"
                type="text"
                aria-required=""
                v-model="item.data"
              />
            <Dropdown
                  v-else-if="item.controlType == 1"
                  v-model="item.data"
                  :options="item.parameterValues.split(',')"
                  placeholder="Select option"
                  style="width: 100%"  
                />
            <Checkbox v-else-if="item.controlType == 2" v-model="item.data" :binary="true"/>
            <Calendar v-if="item.controlType == 3" id="time24" v-model="item.data" :showTime="true" :showSeconds="true" class="w-100" />
            <InputText
                v-if="item.controlType == 4"
                class="w-100 border"
                type="email"
                aria-required=""
                v-model="item.data"
              />
            <input 
                v-if="item.controlType == 5"
                class="w-100 border"
                type="file"
                aria-required=""
                
              />
              <!-- <InputNumber  id="integeronly" v-model="item.data" class="w-100"/> -->
              <input
                v-if="item.controlType == 6"
                class="w-100 border form-control"
                type="number"
                aria-required=""
                v-model="item.data"
              />
          </div>
        </div>
        <!-- <input type="date"> -->
        
        <div class="row">
          <div class="col-md-8 offset-md-3 mt-3 align-self-center"><Checkbox v-model="displayFamily" :binary="true" /> <span class="ml-3">Do you want to register your family for this event?</span></div>
        </div>

        <div class="row mt-4" v-if="displayFamily">
          <FamilyWards :family="familyWards" :memberRoles="memberRoles" :fullEventData="fullEventData" @newmember="setNewMember" @nofamilynewmember="setMemberDetails"/>
        </div>

        <div class="row my-2">
          <div class="col-md-3"></div>
          <div class="col-md-7 py-4 text-center">
            <button class="default-btn mr-3" @click="notme">Not Me</button>
            <button
              class="default-btn add-btn mt-3 mt-sm-0"
              @click="confirmToRegister"
              :disabled="
                !person.name || person.name.length < 1 || disableClick
              "
            >
              {{ fullEventData.paymentFormId ? 'Make payment to register' : 'Confirm to register' }}
            </button>
            <button ref="makePaymentRef" data-toggle="modal" data-target="#PaymentOptionModal" hidden>Toggle modal</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row">
      <div class="offset-5">
        <div ref="authorizebutton" style="display: none" class="default-btn text-center"><img src="../../assets/preview.jpeg" style="width: 30px"/>Add event to google calendar</div>
        <div ref="signout" style="display: none" class="default-btn">Sign Out</div>
      </div>
    </div> -->
    
    <div class="row">
      <div class="col-10 offset-1 col-md-3 offset-md-5">
        <!-- Button code -->
          <div title="Add to Calendar" class="addeventatc w-100">
              Add to Calendar
              <span class="start">{{ fullEventData.eventDate }}</span>
              <!-- <span class="end">2021-11-04T10:34:29.746Z</span> -->
              <span class="timezone">{{ Intl.DateTimeFormat().resolvedOptions().timeZone }}</span>
              <span class="title">{{ eventData.name }}</span>
              <span class="description">{{ fullEventData.eventDetails }}</span>
          </div>
      </div>
    </div>
    
    <div class="row mt-3">
      <div
        class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-3 font-weight-700"
      ></div>
      <div class="col-md-7 mt-2">
        <p class="text-center fw-normal" style="color: #136acd">
          Powered by CHURCHPLUS
        </p>
      </div>
       <!-- Modal -->
          <div class="modal fade" id="PaymentOptionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header bg-modal">
                  <h5 class="modal-title" id="exampleModalLongTitle">Payment methods</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" ref="close">&times;</span>
                  </button>
                </div>
                <div class="modal-body p-0 bg-modal pb-5">
                  <PaymentOptionModal :close="close" :donation="donationObj" @selected-gateway="setGateway" @donation-confirmed="setConfirmDonation" @set-props="setDonationProperties" :donorEmail="person.email"/>
                  <!-- :orderId="formResponse.orderId" :donation="donationObj"  :name="name" :amount="amount" :converted="convertedAmount" :email="email" @payment-successful="successfulPayment" :gateways="formResponse.paymentGateWays" :currency="dfaultCurrency.shortCode" @selected-gateway="gatewaySelected" -->
                </div>
                <!-- <div class="modal-footer bg-modal">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div> -->
                </div>
              </div>
            </div>
      <ConfirmDialog />
      <Toast />
    </div>
  </div>
   
  <pre ref="content" style="white-space: pre-wrap;"></pre>

  <!-- <div @click="callIt">edicaoc</div> -->
</template>


<script>
import { computed, ref } from "vue";
import axios from "@/gateway/backendapi";
// import router from "../../router/index";
import InputText from "primevue/inputtext";
import { useRoute } from "vue-router";
import dateFormatter from "@/services/dates/dateformatter";
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../services/progressbar/progress";
import swal from "sweetalert";
import Dropdown from "primevue/dropdown";
import PaymentOptionModal from "../../components/paymentoption/EventRegPayment.vue"
import finish from '../../services/progressbar/progress';
import store from '../../store/store';
import FamilyWards from './component/EventRegFamilyWards.vue'
import Calendar from "primevue/calendar";
// import Calendarjs from "../../services/google/calendarAPI"
// import Dialog from 'primevue/dialog';

export default {
  components: {
    Dropdown,
    PaymentOptionModal,
    FamilyWards,
    Calendar
  },
  setup() {
    const connectName = ref("");
    const yearOfWedding = ref(null)
    const monthOfWedding = ref(null)
    const dayOfWedding = ref(null)
    const selectedMaritalStatus = ref("");
    const selectedGender = ref("");
    const appltoggle = ref(false);
    const names = ref("");
    const emails = ref("");
    const address = ref("");
    const enteredValue = ref("");
    const loading = ref(false);
    const autosearch = ref(false);
    const noError = ref(true);
    const person = ref({});
    const maritalStatus = ref({})
    const checkedIn = ref(false);
    const route = useRoute();
    const toast = useToast();
    const submitBtn = ref(null);
    const loaded = ref(false);
    const close = ref("")
    const donationObj = ref({})
    const fullEventData = ref({})
    const selectedGateway = ref("")
    const currentUser = ref(store.getters.currentUser)
    const displayFamily = ref(false)
    const memberRoles = ref([])
    const familyWards = ref({ familyMembers: [] })
    const familyMembers = ref([])
    const authorizebutton = ref()
    const signout = ref()
    const content = ref()
    const disableClick = ref(false)
    const makePaymentRef = ref()
    const usedPaymentGateway = ref("")
    const donationNewProps = ref({})

    const birthMonth = ref("");

    const gender = ref({})
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const birthDay = ref("");
    const days = ref([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ]);

    // const controlType = ref(
    //       [
    //         { name:'Text', id: '0'},
    //         { name:'DropdownList', id: '1'}, 
    //         { name:'CheckBox', id: '2'},
    //         { name:'DateTime', id: '3'},
    //         { name:'Email', id: '4'},
    //         { name:'Image', id: '5'},
    //         { name:'Number', id: '6'}
            
    //       ] 
    //   )

    // const entityType = ref(
    //       [
    //         { name:'Member', id: '0'},
    //         { name:'FirstTimers', id: '1'},
    //         { name:'NewConverts', id: '2'},
    //         { name:'Activity', id: '3'},
    //         { name:'EventRegistrationForm', id: '4'},
    //       ]
    //   )

    const weddingYearsArr = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const toggleBase = () => {
      appltoggle.value = !appltoggle.value;
    };

    const email = computed(() => {
      if (person.value.email) return maskEmail(person.value.email);
      return "";
    });
    const name = computed(() => {
      if (person.value.name) return formatString(person.value.name);
      return "";
    });
    const userAddress = computed(() => {
      if (person.value.email) return formatString(address.value.name);
      return "";
    });

    // searching through the attendance details
    const showNoPhoneError = ref(false);
    const fetchingFailed = ref(false);
    const personHasAddress = ref(false);
    const personData = ref({});
    const bannerUrl = ref("")
    const tenantCurrency = ref("")
    const selectedCustomField = ref([])
    const checkinCode = ref("")
    const dynamicCustomFields = ref([])
    const date7 = ref()




    const getTenantCurrency = () => {
      axios.get(`/api/Lookup/TenantCurrency?tenantID=${fullEventData.value.tenantID}`)
        .then(res => {
          console.log(res)
          tenantCurrency.value = res.data.currency
        })
        .catch(err => console.log(err))
    }
   


    const checkCharacter = () => {
      // if (e.target.value.length < 11) {
      //   person.value = {};
      //   personHasAddress.value = false;
      //   return false;
      // }
      loaded.value = false;
      personHasAddress.value = false;
      fetchingFailed.value = false;
      showNoPhoneError.value = false;
      if (!enteredValue.value) {
        showNoPhoneError.value = true;
        return false;
      }

      console.log(route.params.checkinId)
      // if (e.target.value.length > 0) {
      loading.value = true;
      autosearch.value = true;
      axios
        .get(
          `/searchregistrationbyphone?searchtext=${enteredValue.value}&id=${route.params.checkinId}`
        )

        .then((res) => {
          const x = { ...res}
          console.log(x, "RESPONSE");
          loading.value = false;
          autosearch.value = false;
          loaded.value = true;
          names.value = res.data;
          personData.value.firstName = res.data[0] ? res.data[0].name : "";
          personData.value.email = res.data[0] ? res.data[0].email : "";
          personData.value.homeAddress = res.data[0] ? res.data[0].address : "";
          personData.value.personId = res.data[0] ? res.data[0].personId : "";
          personData.value.dayOfBirth = res.data[0] ? res.data[0].dayOfBirth : "";
          personData.value.monthOfBirth = res.data[0] ? res.data[0].monthOfBirth : "";
          personData.value.mobilePhone = enteredValue.value;
          person.value = res.data[0] ? res.data[0] : {};
          birthDay.value = res.data[0] && res.data[0].dayOfBirth ? Number(res.data[0].dayOfBirth) : 0;
          birthMonth.value = res.data[0] && res.data[0].monthOfBirth ? months[Number(res.data[0].monthOfBirth) - 1] : 0;

          getFamilyDetails(personData.value.personId)
          console.log(personData.value.personId)
          if (
            person.value.personId &&
            person.value.address &&
            person.value.address !== null &&
            person.value.address !== "" &&
            person.value.address.length >= 1
          )
          {
            personHasAddress.value = true;
          }
          populateInputfields(person.value);
          if (person.value) appltoggle.value = true;

          
        })
        .catch((err) => {
          fetchingFailed.value = true;
          person.value = {};
          loaded.value = true;
          loading.value = false;
          autosearch.value = false;

          if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "error",
              summary: "Checkin Error",
              detail: "Ensure you have internet access and try again",
              life: 3000,
            });
          } else if (err.message.includes("timeout")) {
            toast.add({
              severity: "error",
              summary: "Checkin Error",
              detail:
                "The request was taking too long, please reload and try again",
              life: 3000,
            });
          } else {
            toast.add({
              severity: "error",
              summary: "Checkin Error",
              detail: "An error occurred, reload and try again",
              life: 3000,
            });
          }
          // appltoggle.value = true;
          console.log(err);
        });
      // }
    };
    //end of searching through the attendance details

    const CheckXterAfterEleven = (e) => {
      if (e.target.value.length >= 11) {
        checkCharacter()
      }
    }


    // populate input fields
    const populateInputfields = (obj) => {
      person.value = obj;
      console.log(person);
    };

    const disabled = computed(() => {
      if (person.value.personId) return true;
      return false;
    });

    // function to disable edit
    const disableEdit = (e) => {
      e.preventDefault();
      console.log("hello there");
    };

    // confirm status
    const confirm = (idOfNewPerson) => {
      // person.value.attendanceCode = +route.params.code;
      let newPerson = {};
      if (person.value.personId) {
        newPerson = {

          person: {
            personId: personData.value.personId,
            mobilePhone: enteredValue.value,
            homeAddress: personData.value.homeAddress ? personData.value.homeAddress : '',
            email: personData.value.email ? person.value.email : '',
          },
          id: route.params.checkinId
        };
      } else {
        newPerson = {
          person: {
            firstName: person.value.name,
            email: person.value.email,
            homeAddress: person.value.address,
            mobilePhone: enteredValue.value,
          },
          id: route.params.checkinId
        };
        newPerson.person.personId = idOfNewPerson ? idOfNewPerson : ""
      }
      newPerson.person.monthOfBirth =  months.indexOf(birthMonth.value) + 1
      newPerson.person.dayOfBirth = birthDay.value
      newPerson.checkinCode = checkinCode.value
      newPerson.person.maritalStatusID = selectedMaritalStatus.value.id
      newPerson.person.genderID = selectedGender.value.id
      newPerson.person.yearOfWedding = yearOfWedding.value
      newPerson.person.monthOfWedding = monthOfWedding.value
      newPerson.person.dayOfWedding = dayOfWedding.value
      newPerson.customAttributeData = dynamicCustomFields.value.map(i => ({
        customAttributeID: i.id,
        data: i.data,
        entityID: person.value.personId ? person.value.personId : idOfNewPerson
      }))


      console.log(personData.value, "p data");
      console.log(newPerson);
      loading.value = true;
      autosearch.value = true;
      noError.value = true;
      axios
        .post("/EventRegistration", newPerson)
        .then((res) => {
          loading.value = false;
          autosearch.value = false;
          disableClick.value = false;
          console.log(res, "tosin");

          if (newPerson) checkedIn.value = true;
          swal(
            "Registration Successful!",
            "You have registered for this event successfully!",
            "success"
          );
          appltoggle.value = false;
          checkedIn.value = true;
          loaded.value = false;
        })
        .catch((err) => {
          stopProgressBar();
          loading.value = false;
          autosearch.value = false;
          console.log(err);
          noError.value = false;
          
          if (err.toString().toLowerCase().includes('network error')) {
            toast.add({
              severity: "error",
              summary: "Network Error",
              detail: "Please ensure you have a strong internet connection and try again",
              life: 4000,
            });
          } else if (err.toString().toLowerCase().includes('timeout')) {
            toast.add({
              severity:"warn",
              summary: "Request took too long",
              detail: "Please reload the page and try again",
              life: 4000,
            });
          }
        });
    };

    // confirm button check

    const confirmCheck = () => {
      
      donationObj.value = {
            name: person.value.name,
            email: person.value.email,
            phone: enteredValue.value,
            paymentFormId: fullEventData.value.paymentFormId,
            tenantID: fullEventData.value.paymentForm.tenantID,
            orderID: fullEventData.value.paymentFormOrderID,
            currencyID: fullEventData.value.currencyID,
            paymentGateway: fullEventData.value.paymentForm.paymentGateWays,
            usedPaymentGateway: usedPaymentGateway.value,
            contributionItems: fullEventData.value.paymentForm.contributionItems.map(i => {
              return {
                contributionItemId: i.financialContribution.id,
                contributionCurrencyId: fullEventData.value.currencyID,
                contributionItemName: i.financialContribution.name,
                amount: fullEventData.value.registrationAmount
              }
            }),

          }
          if (Object.keys(donationNewProps.value).length > 0) {
              donationObj.value.transactionReference = donationNewProps.value.transactionReference,
              donationObj.value.amount = donationNewProps.value.amount,
              donationObj.value.gateway = donationNewProps.value.gateway
          }
    };

    const initializePayment = async() => {
      try {
              let  res = await axios.post('/initailizedonationpayment', donationObj.value)
              console.log(res)
            
              finish()
            }
            catch (error) {
              finish()
              console.log(error)
            }
    }

    const confirmToRegister = () => {
      disableClick.value = true;
      if (!fullEventData.value.paymentFormId) {
        
        // Scenerio when the person exist and we want to create family
        if (personData.value.personId && !familyWards.value.id) {
          console.log('found in church but no family')
            if (displayFamily.value) {
              console.log('intends to add family')
              let familyDetails = {
                fatherId: personData.value.personId,
                familyName: personData.value.firstName,
                familyMembers: familyMembers.value.map(i => {
                  delete i.name
                  return i
                }),
                tenantId: fullEventData.value.tenantID
              }
              console.log(familyDetails)
              axios.post('/createFamily', familyDetails)
                .then(res => console.log(res))
                .catch(err => console.log(err))

                let newFamily = {
                  person: {
                    personId: personData.value.personId,
                    mobilePhone: enteredValue.value,
                    homeAddress: personData.value.homeAddress ? personData.value.homeAddress : '',
                    email: personData.value.email ? personData.value.email : person.value.email,
                  },
                  // familyMembers: familyWards.value.familyMembers.filter(i => {
                  //   return i.checkMember
                  // }).map(i => {
                  //   return { personId: i.person.id }
                  // }),
                  id: route.params.checkinId
                };
                console.log(newFamily)

                // Register Family members individually
                  familyWards.value.familyMembers.forEach(i => {
                    console.log(i)
                      if(i.checkMember) {
                        let regFamMembers = {
                          person: {
                            personId: i.person.id
                          },
                          id: route.params.checkinId
                        }
                        axios.post("/EventRegistration", regFamMembers).then(res => {
                          console.log(res)
                          disableClick.value = false;
                        })
                        .catch(err => {
                          console.log(err)
                        })
                      }
                    })

                registerMember(newFamily)

            } else {
              console.log('does not intend to add family')
              confirm()
            }
        } else if (personData.value.personId && familyWards.value.id) {
            console.log('found in church and a family')
            if (displayFamily.value) {
              console.log(' intends to add family')
                let newFamily = {
                  person: {
                    personId: personData.value.personId,
                    mobilePhone: enteredValue.value,
                    homeAddress: personData.value.homeAddress ? personData.value.homeAddress : '',
                    email: personData.value.email ? personData.value.email : person.value.email,
                  },
                  // familyMembers: familyWards.value.familyMembers.filter(i => {
                  //   return i.checkMember
                  // }).map(i => {
                  //   return { personId: i.person.id }
                  // }),
                  activityID: route.params.checkinId
                };
                console.log(newFamily)

                // Register Family members individually
                familyWards.value.familyMembers.forEach(i => {
                  console.log(i)
                    if(i.checkMember) {
                      let regFamMembers = {
                        person: {
                          personId: i.person.id
                        },
                        id: route.params.checkinId
                      }
                      axios.post("/EventRegistration", regFamMembers).then(res => {
                        console.log(res)
                        disableClick.value = false;
                      })
                      .catch(err => {
                        console.log(err)
                      })
                    }
                  })

                registerMember(newFamily)

            } else {
              console.log('does not intent to add family')
              confirm()
            }
          } else {
            console.log('not found in church and no family')
          createNewPerson()
        }

        


      } 
      if (fullEventData.value.paymentFormId) {
        makePaymentRef.value.click()
        confirmCheck()
      }
    }

    const createNewPerson = async() => {
      let createNewPerson = {
              firstName: person.value.name,
              email: person.value.email,
              homeAddress: person.value.address,
              mobilePhone: enteredValue.value,
              tenantId: fullEventData.value.tenantID
            }

          try {
            let { data } = await axios.post("/createPublicPerson", createNewPerson)
              console.log(data)
              if (displayFamily.value) {
                createNewFamily(data.returnObject.id)
              } else {
                confirm(data.returnObject.id)
              }
              
          }
          catch (error ) {
            console.log(error)
          }
    }

    const getGender = async () => {
            try {
                let { data } = await axios.get('/api/LookUp/GetAllLookUps')
                console.log(data,'jjhujwhuwhe')
                gender.value = data.find(i => i.type === "Gender").lookUps;
                console.log(gender.value, "jhjhjjhljjjj");
    
            }
            catch (err) {
                console.log(err)
            } console.log(route.fullPath)
    }
    getGender()

    const getMaritalStatus = async () => {
            try {
                let { data } = await axios.get('/api/LookUp/GetAllLookUps')
                console.log(data)
                maritalStatus.value = data.find(i => i.type === "MaritalStatus").lookUps;
                console.log(maritalStatus.value, "jhjhjjhljjjj");
    
            }
            catch (err) {
                console.log(err)
            } console.log(route.fullPath)
    }
    getMaritalStatus()

    const createNewFamily = (id) => {
      disableClick.value = true;
      let familyDetails = {
            fatherId: id,
            familyName: person.value.name,
            familyMembers: familyMembers.value.map(i => {
              delete i.name
              return i
            }),
            tenantId: fullEventData.value.tenantID
          }
          console.log(familyDetails)
          axios.post('/createFamily', familyDetails)
            .then(res => console.log(res))
            .catch(err => console.log(err))

            let newFamily = {
                  person: {
                    personId: id,
                    mobilePhone: enteredValue.value,
                    homeAddress: personData.value.homeAddress ? personData.value.homeAddress : '',
                    email: personData.value.email ? personData.value.email : person.value.email,
                  },
                  // familyMembers: familyWards.value.familyMembers.filter(i => {
                  //   return i.checkMember
                  // }).map(i => {
                  //   return { personId: i.person.id }
                  // }),
                  id: route.params.checkinId
                };
                // console.log(newFamily)

                // Register Family members individually
                familyWards.value.familyMembers.forEach(i => {
                  console.log(i)
                  if (i.checkMember) {
                    let regFamMembers = {
                      person: {
                        personId: i.person.id
                      },
                      id: route.params.checkinId
                    }
                    axios.post("/EventRegistration", regFamMembers).then(res => {
                      console.log(res)
                      disableClick.value = false;
                    })
                    .catch(err => {
                      console.log(err)
                    })
                  }
                })

                registerMember(newFamily)
    }


    const registerMember = async(registerData) => {
      disableClick.value = true;
      try {
        let res = await axios.post("/EventRegistration", registerData)
          console.log(res)
          disableClick.value = false;
          swal(
            "Registration Successful!",
            "You have registered for this event successfully!",
            "success"
          );
          displayFamily.value = false
          familyWards.value.familyMembers = []
      }
      catch (error) {
        console.log(error)
      }
    }

    // function to clear input
    const clearNames = () => {
      names.value = [];
    };

    const notme = () => {
      person.value = {};
      enteredValue.value = "";
    };

    // getting events and date
    const eventData = ref({});
    const getDateAndEvent = () => {
      axios
        .get(
          `/api/publiccontent/WebRegistrationEventDetails?id=${route.params.checkinId}`
        )
        .then((res) => {
          eventData.value.name = res.data.fullEventName;
          eventData.value.date = dateFormatter.monthDayYear(res.data.eventDate);
          bannerUrl.value = res.data.bannerUrl

          fullEventData.value = res.data
          console.log(eventData);
          console.log(res, "response");
           getTenantCurrency();
           getCustomFields();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getDateAndEvent();

    /* start masking functions */

    // function mask email
    const maskEmail = (str, numToShowInFront) => {
      if (str.length > 3) {
        const firstX = str.slice(0, numToShowInFront);
        const midPoint = str.split("").indexOf("@");
        let x = str.split("");
        x.forEach((i, j) => {
          if (j < midPoint) {
            x[j] = "*";
          }
        });
        x = x.join("");
        return firstX + x.slice(numToShowInFront);
      } else {
        return str[0] + "*" + str[2];
      }
    };

    const formatString = (str, numToShowInFront, numToHide) => {
      if (str.length > 3) {
        const firstX = str.slice(0, numToShowInFront);
        // const midPoint = str.split('').indexOf('@')
        const midPoint = numToShowInFront + numToHide;
        let x = str.split("");
        x.forEach((i, j) => {
          if (j < midPoint) {
            x[j] = "*";
          }
        });
        x = x.join("");
        return firstX + x.slice(numToShowInFront);
      } else {
        return str[0] + "*" + str[2];
      }
    };

    const showLoading = computed(() => {
      return autosearch.value && !person.value.name;
    });

    const setGateway = (payload) => {
      usedPaymentGateway.value = payload // Get the gateway used
      confirmCheck() // Update the donationObj with the used gateway
      initializePayment() // make initialize payment call
      
    }

    const setConfirmDonation = () => {
      confirm()
    }


    const getFamilyDetails = async(id) => {
      console.log(id)
     
      if (id) {
        try {
                    // const res = await axios.get(`/api/Family/family?personId=${id}`)
                    const res = await axios.get(`/family?tenantID=${fullEventData.value.tenantID}&&personId=${id}`)
                    console.log(res)
                    familyWards.value = res.data
                    if (familyWards.value) {
                      familyWards.value.familyMembers.map(i => {
                        i.checkMember = true
                        return i
                      })
                    }

                    console.log(familyWards.value.familyMembers)
                }
                catch (error) {
                    console.log(error)
                }
      } else {
        console.log('no id')
      }
    }

    const getFamilyRoles = async () => {
        try {
            let { data } = await axios.get('/getfamilyroles')
            console.log(data)
            memberRoles.value = data.result
            getFamilyDetails()
        }
        catch (err) {
            console.log(err)
        }
    }
    getFamilyRoles()

    const setNewMember = (payload) => {
      familyWards.value.familyMembers.push(payload)
    }

    const setMemberDetails = (payload) => {
      familyMembers.value.push(payload)
      console.log(payload)
      let pushMemberToView = {
        person: {
          firstName: payload.name,
          id: payload.personId,
        },
        familyRoleID: payload.familyRoleId,
        checkMember: payload.checkMember
      }
      // familyWards.value.familyMembers = new Array()
      familyWards.value.familyMembers.push(pushMemberToView)

    }

    const setDonationProperties = (payload) => {
      console.log(payload)
      donationNewProps.value = payload
      confirmCheck()
    }

    const getAllRouteQueries = () => {
      for (let i in route.query) {
        if(route.query[i] == 'true') {
          selectedCustomField.value.push(i)
        }
      }
    }
      getAllRouteQueries()

    const getCustomFields = async() => {
      try {
        let { data } = await axios.get(`/GetAllCustomFields?entityType=4&&tenantID=${fullEventData.value.tenantID}`);
        console.log(data)
        dynamicCustomFields.value = data
      }
      catch (err) {
        console.log(err)
      }
    }
    

    return {
      disableClick,
      toggleBase,
      checkCharacter,
      populateInputfields,
      CheckXterAfterEleven,
      InputText,
      appltoggle,
      names,
      emails,
      address,
      enteredValue,
      loading,
      person,
      autosearch,
      disableEdit,
      confirm,
      clearNames,
      getDateAndEvent,
      route,
      eventData,
      dateFormatter,
      checkedIn,
      confirmCheck,
      disabled,
      connectName,
      formatString,
      maskEmail,
      name,
      email,
      maritalStatus,
      userAddress,
      showNoPhoneError,
      notme,
      noError,
      submitBtn,
      showLoading,
      loaded,
      fetchingFailed,
      personHasAddress,
      months,
      gender,
      days,
      birthMonth,
      birthDay,
      personData,
      bannerUrl,
      close,
      fullEventData,
      donationObj,
      setGateway,
      selectedGateway,
      setConfirmDonation,
      confirmToRegister,
      currentUser,
      tenantCurrency,
      displayFamily,
      familyWards,
      getFamilyDetails,
      memberRoles,
      setNewMember,
      setMemberDetails,
      familyMembers,
      authorizebutton,
      signout,
      content,
      makePaymentRef,
      usedPaymentGateway,
      initializePayment,
      setDonationProperties,
      donationNewProps,
      selectedCustomField,
      checkinCode,
      selectedMaritalStatus,
      selectedGender,
      weddingYearsArr,
      dayOfWedding,
      monthOfWedding,
      yearOfWedding,
      // controlType,
      dynamicCustomFields,
      date7
      // callIt
    };
  },
};
</script>

<style scoped>
.add-btn {
  background: #136acd;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
}

.add-btn2 {
  background: none;
}

.loading-indicator {
  font-size: 76px;
  position: absolute;
  margin-top: 86px;
}

.loading-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.italicize {
  font-style: italic;
  font-size: 15px;
}
</style>