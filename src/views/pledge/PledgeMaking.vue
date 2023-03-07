<template>
  <div class="container-fluid container-top">
    <div class="row">
      <div class="col-md-12 px-0">
        <div class="container">
          <div class="row mt-4">
            <div class="col-md-6">
              <h2 class="font-weight-bold page-hder">Pledge Overview</h2>
            </div>
            <div class="col-md-6 d-flex justify-content-md-end">
               <div
                    class="
                      cursor-pointer
                      grey-border
                      primary-btn
                      default-btn
                      primary-bg
                      border-0
                      text-white
                    "
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                  >
                    Record Payment
                  </div>
            </div>
            <Toast />
          </div>
          <hr class="mb-4" />
        </div>
        <div class="container">
          <div class="row mb-4 mt-3">
            <div class="col-md-4">
              <span class="theader"> Pledge Name </span>
              <div class="my-3">
                <span class="evt-name">
                  {{ pledgeName}}
                </span>
              </div>
            </div>
            <div class="col-md-4">
              <span class="theader"> Donor </span>
              <div class="my-3">
                <span class="evt-name">
                  {{ personName}}
                </span>
              </div>
            </div>
             <div class="col-md-4">
              <span class="theader">Date</span>
              <div class="my-3">
                <span class="evt-name"> {{ date(pledgeDate) }}</span>
              </div>
            </div>
            <div class="col-md-4">
              <span class="theader"> Pledge Amount</span>
              <div class="my-3">
                <span class="evt-name">
                  <!-- {{ pledgeAmount.toLocaleString() }} -->
                   {{
                          Math.abs(
                            pledgeAmount
                          ).toLocaleString()
                        }}.00
                </span>
              </div>
            </div>
            <div class="col-md-4">
              <span class="theader">Total payment</span>
              <div class="my-3">
                <span class="evt-name">
                  <!-- {{ pledgeAmount.toLocaleString() }} -->
                   {{
                          Math.abs(
                            pledgePaymentSum
                          ).toLocaleString()
                        }}.00
                </span>
              </div>
            </div>

            <div class="col-md-4">
              <span class="theader">Balance</span>
              <div class="my-3">
                <span class="evt-name">
                  {{
                          Math.abs(
                            pledgeBalance
                          ).toLocaleString()
                        }}.00</span
                >
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-md-12">
              <hr class="mb-0" />
              <div class="pg-content">
                <div class="row mb-3">
                  <div class="col-md-12">
                    <span class="attendance-header">Payment link</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-12 mb-5 mx-3 pt-1 border shadow rounded">
                        <div class="row">
                          <div
                            class="
                              col-md-2 col-sm-2
                              d-flex
                              justify-content-center
                              image
                              mt-2
                            "
                          >
                            <img
                              src="../../assets/link.svg"
                              class="w-100"
                              alt="marked Attendance image"
                              style="width: 60px; height: 60px"
                            />
                          </div>
                          <div class="col-md-10 col-sm-10 mt-3">
                            <a class="text-decoration-none"
                              ><h4
                                class="header4 link-color c-pointer"
                                @click="copyRegLink"
                              >
                                Online Payment Link
                              </h4></a
                            >
                            <p class="mb-4">
                              <span
                                class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                "
                                ><input
                                  type="text"
                                  ref="selectedLink"
                                  v-model="pledgePaymentLink"
                                  class="border-0"
                                  placeholder="Link"
                                  style="width: 80%"
                                />
                                <div>
                                  <i
                                    class="pi pi-copy ml-2 c-pointer"
                                    @click="copyLink"
                                    style="font-size: 22px"
                                  ></i>
                                </div>
                              </span>
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div
                            class="
                              col-md-2 col-sm-2
                              d-flex
                              mt-2
                              justify-content-center
                              image
                            "
                          >
                            <img
                              src="../../assets/link.svg"
                              class="w-100"
                              alt="marked Attendance image"
                              style="width: 60px; height: 60px"
                            />
                          </div>
                          <div class="col-md-10 col-sm-10 mt-3">
                            <a class="text-decoration-none"
                              ><h4
                                class="header4 link-color c-pointer"
                                @click="copyRegLink"
                              >
                                Virtual Account
                              </h4></a
                            >
                            <div
                              class="
                                align-item-center
                                justify-content-between
                                d-flex
                              "
                            >
                              <div class="mb-2">
                                <div class="p-2">
                                  <!-- <div class="font-weight-800 text-dark">
                                    GTB
                                  </div> -->
                                  <!-- <div class="font-weight-800 text-dark">
                                    0222909641
                                  </div> -->
                                  <!-- <div class="font-weight-800 text-dark">
                                    Sarah Church Account
                                  </div> -->
                                </div>
                              </div>
                              <div class="mt-4">
                                <i
                                  class="pi pi-copy ml-2 c-pointer"
                                  @click="copyLink"
                                  style="font-size: 22px"
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container-fluid">
              <div
                class="
                  row
                  d-flex
                  justify-content-between
                  align-items-center
                  mt-5
                "
              >
                <div>
                  <div class="evt-name text-dark">Payments</div>
                </div>
                <div>
                  <div
                    class="
                      cursor-pointer
                      grey-border
                      primary-btn
                      default-btn
                      primary-bg
                      border-0
                      text-white
                    "
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                  >
                    Record Payment
                  </div>
                </div>
                <div class="col-md-12 px-0">
                  <hr class="my-3" />
                </div>
              </div>
              <Table  :data="searchPledgePayment" :headers="pledgeHeaders" :checkMultipleItem="false" 
                  v-loading="loading">
                  <template v-slot:date="{ item }">
                    <div class="c-pointer" >{{ date(item.date) }}</div>
                  </template>
                  <template v-slot:channel="{ item }">
                    <div class="c-pointer" >{{ item.channel }}</div>
                  </template>
                  <template v-slot:amountPaid="{ item }">
                    <div class="c-pointer" > {{
                          Math.abs(
                           item.amount
                          ).toLocaleString()
                        }}.00</div>
                  </template>
                   <template v-slot:action="{ item }">
                      <el-dropdown trigger="click">
                        <el-icon>
                          <MoreFilled />
                        </el-icon>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item>
                              <!-- <router-link
                                  :to="`/tenant/pledge/makepledge?id=`"
                                  class="text-color"
                                  >Edit
                              </router-link> -->
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">Delete</div>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </template>
              </Table>
            </div>
            <!-- <PledgeTransaction /> -->
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade " 
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-bold">Record a payment for this pledge</h5>
              <div class="btn-close" data-dismiss="modal" aria-label="Close"><i class="pi pi-times"></i></div>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    Record a payment you've already recieved,such as cash, cheque, or bank payment
                  </div>
                  <div class="col-md-12 mt-4">
                    <div class="row my-1 mt-3">
                      <div class="col-md-10 ">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold"
                              >Payment date <sup class="text-danger">*</sup>
                            </label>
                          </div>
                          <div class="col-md-8">
                            <input
                              type="date"
                              v-model="pledgeTime"
                              :disabled="checking"
                              class="form-control w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row my-2 mt-3">
                      <div class="col-md-10 ">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold"
                              >Donor <sup class="text-danger">*</sup>
                            </label>
                          </div>
                          <div class="col-md-8">
                            <input
                              type="text"
                              v-model="personName"
                              :disabled="checking"
                              class="form-control w-100"
                            />
                            <!-- <h4 class="font-weight-600">{{ personName }}</h4> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row my-2 mt-3">
                      <div class="col-md-10 ">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold">
                              Pledge Name <sup class="text-danger">*</sup>
                            </label>
                          </div>

                          <div class="col-md-8">
                            <input
                              type="text"
                              v-model="pledgeName"
                              :disabled="checking"
                              class="form-control w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="row my-2 mt-3"
                    >
                      <div class="col-md-10 ">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold"> Pledge Amount </label>
                          </div>
                          <div class="col-md-8 d-flex">
                            <div class="col-8 col-lg-12 m-0 p-0 ">
                                 <input
                                  type="number"
                                  v-model="pledgeAmount"
                                  :disabled="false"
                                  class="form-control"
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row my-3 mt-3">
                      <div class="col-md-10 ">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold"
                              >Payment method <sup class="text-danger">*</sup>
                            </label>
                          </div>

                          <div class="col-md-8 d-flex flex-wrap" >
                            <button class="  btn d-flex justify-content-between  col-12 border  " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="ofering">
                                    &nbsp;&nbsp;&nbsp; {{ selectedChannel.name ?  selectedChannel.name : 'Select a payment method' }}
                                </span>
                                <span>
                                    <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                                </span>
                            </button>
                            <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" v-for="(itm, indx) in channel" :key="indx">
                                    <div class="cursor-pointer" @click="selectChannel(itm)"> {{itm.name}}</div> 
                                </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
                  <el-button  class="" data-dismiss="modal" round >Cancel</el-button>
                  <el-button  data-dismiss="modal" color="#136acd" class=" header-btn text-white" round  @click="recordPayment"> Save</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import ReportModal from "@/components/firsttimer/ReportModal.vue";
import { ref, computed, onMounted } from "vue";
import Loading from "../../components/loading/LoadingComponent";
import router from "../../router";
import { useRoute } from "vue-router";
import finish from "../../services/progressbar/progress";
import ToggleButton from "../donation/toggleButton.vue";
import PledgeTransaction from "./PledgeTransaction.vue";
import monthDayYear from "../../services/dates/dateformatter";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  components: {
    ReportModal,
    Loading,
    ToggleButton,
    PledgeTransaction,
    Table
  },
  directives: {
  },
  setup() {
    const selectedLink = ref(null);
    const emaildata = ref(null);
    const tenantID = ref("");
    const selectedCurrency = ref("");
    const route = useRoute();
    const churchName = ref("");
    const Address = ref("");
    const loading = ref(false);
    const networkError = ref(false)
    const freewillAmount = ref("");
    const checking = ref(false);
    // const value = ref()
    const isNameValid = ref(true);
    const isEmailValid = ref(true);
    const selectedPledge = ref({});
    // const memberName = ref("");
    const allPledgeList = ref([]);
    const amountFrom = ref("");
    const selectedContact = ref({});
    const isActive = ref(null);
    const url = ref("");
    const amountTo = ref("");
    const selectedChannel = ref({});
    const allPledgePaymentList = ref([])
    const currencyList = ref([]);
    const searchText = ref("");
    const pledgeHeaders = ref([
      { name: 'DATE', value: 'date' },
      { name: 'CHANNEL', value: 'channel' },
      { name: 'AMOUNT PAID', value: 'amountPaid' },
      { name: 'ACTION', value: 'action' },
    ])
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);
    const personName = ref('');
    const pledgeName = ref('');
    const pledgeID = ref(route.query.pledgeTypeID);
    const pledgePaymentSum = ref('');
    const pledgeBalance = ref('');
    const pledgeDate = ref('');
    const pledgeAmount = ref('');
    const pledgePaymentID = ref('');
    const pledgeContactID = ref('');
    const pledgeCurrencyID = ref('');


    const getAllpaymentList =  async () => {
        try{
          const res = await axios.get(
          "/api/Pledge/GetAllPledgePayments"
        );
        console.log(res, "😂🤗❤😍😆😆😆");
        }
        catch (error){
          NProgress.done();
          console.log(error)
        }
    }

    getAllpaymentList()

     const pledgeTime = computed(() =>{
      return date(new Date())
    }) 

    const getSinglePledge = async () => {
      checking.value = false;
      try {
        const res = await axios.get(
          `/api/Pledge/GetOnePledge?ID=${route.query.pledgeTypeID}`
        );
        console.log(res);
        pledgeName.value = res.data.returnObject.pledgeItemName;
        personName.value = res.data.returnObject.contact;
        pledgePaymentSum.value = res.data.returnObject.totalPaymentSum;
        pledgeBalance.value = res.data.returnObject.balance;
        pledgeDate.value = res.data.returnObject.date;
        pledgeAmount.value = res.data.returnObject.amount;
        pledgeContactID.value = res.data.returnObject.contactID;
        pledgePaymentID.value = res.data.returnObject.pledgeType.id;
        pledgeCurrencyID.value = res.data.returnObject.currency.id;
        selectedPledge.value = res.data.returnObject;
        allPledgePaymentList.value = res.data.returnObject.pledgePayments;
        console.log(selectedPledge.value, "selected");
        console.log(allPledgePaymentList.value, "allPledgePaymentList");
        checking.value = true;
      } catch (error) {
        NProgress.done();
        console.log(error);
      }
    };
    if (route.query.pledgeTypeID) getSinglePledge();

    const searchPledgePayment = computed(() => {
          if (searchText.value !== "" && allPledgePaymentList.value.length > 0)  {
            return allPledgePaymentList.value.filter((i) => {
                  if (i.pledge.person.firstName || i.pledge.pledgeType.name ) return i.pledge.person.firstName.toLowerCase().includes(searchText.value.toLowerCase())
            })
          }  else {
            return allPledgePaymentList.value;
          }

          });

          const deletePledgePayment = (id) => {

            axios
                .delete(`/api/Pledge/DeletePledgePaymentPayment?ID=${id}`)
                .then((res) => {
                console.log(res);
                ElMessage({
                    type: 'success',
                    message: 'Pledge form deleted',
                    duration: 5000
                  })

                allPledgePaymentList.value = allPledgePaymentList.value.filter( (paymentlist) => paymentlist.id !== id
          );

                })
                .catch((err) => {
                finish()
                 if (err.response.status === 400) {
                      ElMessage({
                      type: 'error',
                      message: 'Unable to delete',
                      duration: 5000
                    })
                    } else {
                      ElMessage({
                      type: 'error',
                      message: 'Unable to delete, An error occurred, please try again',
                      duration: 5000
                    })
                    }
                  });
            };
             const showConfirmModal = (id, index) => {
              ElMessageBox.confirm(
                  "Are you sure you want to proceed?",
                  'Confirm delete',
                  {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'error',
                  }
                )
                  .then(() => {
                    deletePledgePayment(id, index);
                  })
                  .catch(() => {
                    ElMessage({
                      type: 'info',
                      message: 'Delete canceled',
                      duration: 5000
                    })
                  })
            };

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };

    const recordPayment = async () => {
      
      let paymentData = {
        id: route.query.pledgeTypeID,
        pledgeID:   route.query.pledgeTypeID,
        amount: pledgeAmount.value,
        channel: selectedChannel.value.name,
        currencyID: pledgeCurrencyID.value,
      };
      try {
        const res = await axios.post(
          "/api/Pledge/SavePledgePayment",
          paymentData
        );
        console.log(res, "paypledge");

        ElMessage({
                    type: 'success',
                    message: 'Pledge Payment successful',
                    duration: 5000
                  })
        getSinglePledge()
        router.push(`/tenant/pledge/pledgemaking?pledgeTypeID=${route.query.pledgeTypeID}`);
      } catch (error) {
        NProgress.done();
        console.log(error);
      }
    };
    const channel = ref([
      { name: "Bank Transfer" },
      { name: "Cash" },
      { name: "Online" },
      { name: "POS" },
      { name: "USSD" },
      { name: "Cheque" },
    ]);
    const shareableLinkField = ref(null);
    const locationTwo = ref(window.location);
    const willCopyLink = ref(false);

    const selectChannel = (item) =>{
        selectedChannel.value = item
        console.log(selectedChannel.value, "😂🤗🤗");
    }

    const copyLink2 = () => {
      try {
        willCopyLink.value = true;
        const a = shareableLinkField.value;
        a.select();
        a.setSelectionRange(0, 200); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        ElMessage({
                    type: 'info',
                    message: 'Shareable link copied to your clipboard',
                    duration: 5000
                  })
      } catch (error) {
        console.log(error);
      }
    };
    url.value = `my.churchplus.co/tenant/pledge/pledgemaking/pledgeTypeID=${route.query.pledgeTypeID}&pledgeType=${pledgeName.value}&id=${route.query.id}&name=${route.query.name}`;

    const chooseContact = (payload) => {
      // contactRef.value.hide();
      selectedContact.value = payload;
    };

    const pledgePaymentLink = computed(() => {
      if (!route.query.pledgeTypeID) return "";
      return `${window.location.origin}/partnership/pay?pledgeID=${route.query.pledgeTypeID}`;
    });

    const copyLink = () => {
      selectedLink.value.setSelectionRange(
        0,
        selectedLink.value.value.length
      ); /* For mobile devices */
      selectedLink.value.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
                type: 'info',
                message: 'copied to your clipboard"',
                duration: 5000
              })
    };
    const sendReport = (messageObj) => {
      const emailData = ref(emaildata.value.innerHTML);
      const message = `
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" style="box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">
                  <head>
                    <meta name="viewport" content="width=device-width"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                    <title>#title#</title>
                    <style>
                      .topmost {
                        display: flex;
                      }

                      .topmost-box1 {
                        width: 70%;
                        height:133px;
                        display:flex;
                        align-items:center;
                        padding:10px
                      }

                      .topmost-box2{
                        width: 30%;display:flex; flex-direction:column; height:133px; align-items:center; justify-content:center
                      }
                    </style>
                  </head>
                  <body style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; background: #f6f6f6; box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100%; line-height: 1.6; margin: 0; padding: 0; width: 100% !important;">
                  
                  ${`${messageObj.data.message}`} <br>

                  ${emailData.value}
                  </body>
                  `;
      const body = {

        ispersonalized: false,
        contacts: messageObj.data.contacts,
        subject: messageObj.data.subject,
        // user: "+2349086767765",
      };
      if (messageObj.medium === "sms") {
        body.gateWayToUse = "hostedsms";
        body.category = "";
        body.emailAddress = "";
        body.emailDisplayName = "";
        body.isoCode = messageObj.data.isoCode;
        body.toOthers = messageObj.data.toOthers;
      }

      body.message =
        messageObj.medium === "sms" ? messageObj.data.message : message;

      const url =
        messageObj.medium === "sms"
          ? "/api/Messaging/sendSms"
          : "/api/Messaging/sendEmail";

      composerObj
        .sendMessage(url, body)
        .then((res) => {
          btnState.value = "";
          console.log(res, "report response");
          if (res.status === false) {
            ElMessage({
                type: 'error',
                message: 'Sending Failed"',
                duration: 5000
              })
          } else {
            ElMessage({
                type: 'success',
                message: 'Your report has been sent',
                duration: 5000
              })
            markAsSent();
          }
        })
        .catch((err) => {
          btnState.value = "";
          console.log(err);
          stopProgressBar();
          ElMessage({
                type: 'error',
                message: 'Sending Failed"',
                duration: 5000
              })
        });
      btnState.value = "modal";
    };
    const active = (payload) => {
      isActive.value = payload;
    };

    const checkNameValue = () => {
      if (churchName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    const checkEmailValue = () => {
      if (pastorEmail.value.length == 0) {
        isEmailValid.value = false;
      } else {
        isEmailValid.value = true;
      }
    };

    return {
      showConfirmModal,
      pledgeHeaders,
      pledgeTime,
      networkError,
      date,
      pledgePaymentID,
      pledgeContactID,
      pledgeCurrencyID,
      pledgeDate,
      pledgeBalance,
      pledgePaymentSum,
      selectedCurrency,
      allPledgePaymentList,
      searchText,
      searchPledgePayment,
      recordPayment,
      currencyList,
      url,
      channel,
      selectedChannel,
      selectChannel,
      allPledgeList,
      locationTwo,
      shareableLinkField,
      copyLink2,
      willCopyLink,
      emaildata,
      sendReport,
      pledgeID,
      personName,
      pledgeName,
      // memberName,
      tenantID,
      checking,
      chooseContact,
      selectedPledge,
      pledgeCategory,
      amountTo,
      amountFrom,
      freewillAmount,
      pledgePaymentLink,
      // savePledge,
      checkEmailValue,
      churchName,
      selectedContact,
      Address,
      // value,
      loading,
      checkNameValue,
      isNameValid,
      isEmailValid,
      selectedLink,
      isActive,
      active,
      copyLink,
      pledgeAmount,
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.email-data {
  height: 0 !important;
  overflow: hidden !important;
}

.info-div {
  background: #f9f8db;
  border: 1px solid #dde2e6;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
}
.file-icon {
  color: #136acd;
  border: 1px solid #136acd;
  padding: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
}
* {
  color: #1c252c;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.def-btn {
  height: 40px;
  border-radius: 22px;
  /* padding: 0 24px; */
  padding: 8px 10px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dde2e6;
}

.def-btn:hover {
  cursor: pointer;
}

.resend-btn {
  background: transparent !important;
  color: #4d6676 !important;
  border: 1px solid #dde2e6 !important;
}

.approve-btn {
  background: #136acd;
  color: white;
}

.edit-btn {
  border: 1px solid #dde2e6;
}

.unapproved {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

/* .analytics-container {
  
  width: 90%;
  margin: auto;
}

.first-con {
  margin-top: 50px;
} */

.theader {
  font-size: 14px;
  font-weight: 800;
  color: #0f0220;
}
.evt-name {
  color: #136acd;
  font-weight: 800;
  font-size: 22px;
}

.evt-report {
  font-size: 25px;
}
.grey-text {
  color: #8296ae;
}

.date {
  font-size: 20px;
  font-weight: 600;
  color: #1d262d;
}

.draft {
  border: 0.5px solid #252a2f;
  padding: 10px;
  border-radius: 22px 0 0 22px;
  background: grey;
}

.genarationg-report {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
}

.analytics,
.attendance-header {
  background: #1c252c;
  color: #fff;
  width: 155px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.hr-dark {
  border: 1px solid #000;
}

.header4 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/24px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}

.recieve {
  font-size: 20px;
}
.bold-700 {
  font-weight: 700;
}

.dark-red-section {
  /* background: #980404; */
  background: #ff0000b5;
  color: #fff;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
}
.bottom-section {
  box-shadow: 0px 3px 10px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.light-red-section {
  /* background: #ff0000b5; */
  background: #980404;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 0px 0px;
}

.dark-red-section h2,
.light-red-section span {
  color: #fff;
  font-weight: 800;
}

@media screen and (max-width: 1000px) {
  .container {
    width: 100% !important;
  }

  .def-btn {
    max-width: 280px;
  }
}
</style>