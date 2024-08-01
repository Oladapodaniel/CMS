<template>
  <div
    class="continer-fluid pb-4 h-100"
    style="background: #eaecf0"
    v-loading="loadingPage"
  >
    <div class="container" :class="{ 'container-slim': lgAndUp || xlAndUp }">
      <div class="row justify-content-center">
        <div class="col-md-6 col-sm-11 col-lg-4 pb-3 bg-white mt-0 mt-sm-5">
          <div class="row justify-content-center">
            <div class="col-md-12 px-0 image-upload" v-if="formLogo">
              <img
                v-if="formLogo"
                :src="formLogo"
                class="w-100"
                style="height: 9rem"
                alt=""
              />
            </div>
            <div class="col-md-11 col-lg-11 text-center h5 mt-3 font-weight-600">
              {{ singleFormData && singleFormData.name ? singleFormData.name : "" }}
            </div>
            <div class="col-md-11 col-lg-11 text-center">
              {{
                singleFormData && singleFormData.description === "null"
                  ? ""
                  : singleFormData.description
              }}
            </div>
          </div>
        </div>
        <!-- <div class="col-md-7 text-center d-flex justify-content-center">
                    
                </div> -->
      </div>
      <div
        class="row justify-content-center mt-3"
        v-if="
          singleFormData &&
          singleFormData.customAttributes &&
          singleFormData.customAttributes.length > 0 &&
          !networkError &&
          !disabledBtn &&
          !loadingPage
        "
      >
        <div class="col-md-6 col-sm-11 col-lg-4 py-4 rounded bg-white">
          <div class="row">
            <div
              class="col-md-12"
              v-for="(item, index) in singleFormData.customAttributes"
              :key="index"
            >
              <div class="row mt-3 justify-content-center">
                <div class="col-md-10" style="font-weight: 450; font-size: 14px">
                  <div for="">
                    {{ item.label }}
                    <span v-if="item.isRequired" style="color: red"> *</span>
                  </div>
                  <el-input
                    type="text"
                    class="w-100"
                    v-if="item.controlType === 0"
                    :placeholder="item.label"
                    v-model="item.data"
                  />
                  <!-- <el-select-v2
                    v-model="item.data"
                    v-if="item.controlType === 1"
                    :options="
                      item.parameterValues.split(',').map((i) => ({ label: i, value: i }))
                    "
                    :placeholder="item.label"
                    class="w-100"
                    size="large"
                  /> -->
                  <select
                    class="form-control text-small input-adjust"
                    v-model="item.data"
                    @change="setSelectedItem"
                    v-if="item.controlType === 1"
                  >
                  <option disabled value="" selected>{{ item.label }}</option>
                    <option
                      v-for="(itm, index) in item.parameterValues.split(',')"
                      :key="index"
                      :value="itm"
                    >
                      <p>{{ itm }}</p>
                    </option>
                  </select>
                  <el-checkbox
                    v-if="item.controlType === 2"
                    v-model="item.data"
                    size="large"
                  />
                  <el-date-picker
                    v-if="item.controlType === 3"
                    v-model="item.data"
                    class="w-100"
                    type="date"
                    :placeholder="item.label"
                    size="default"
                  />
                  <el-input
                    type="email"
                    v-if="item.controlType === 4"
                    class="w-100"
                    v-model="item.data"
                    :placeholder="item.label"
                  />
                  <el-input
                    type="number"
                    v-if="item.controlType === 5"
                    class="w-100"
                    v-model="item.data"
                    :placeholder="item.label"
                  />
                  <el-input
                    v-model="item.data"
                    v-if="item.controlType === 6"
                    :rows="2"
                    type="textarea"
                    :placeholder="item.label"
                  />
                  <el-input
                    v-model="item.data"
                    v-if="item.controlType === 7"
                    type="text"
                    :placeholder="item.label"
                  />
                  <el-input
                    v-model="item.data"
                    v-if="item.controlType === 8"
                    type="text"
                    :placeholder="item.label"
                  />
                  <span
                    class="w-100 small text-danger"
                    v-if="
                      filterIsRequired &&
                      filterIsRequired.isRequired &&
                      item.isRequired &&
                      !item.data
                    "
                    >Please fill in your {{ item.label }}
                  </span>
                  <!-- <span class="w-100 small text-danger" v-if="requiredField"
                    >Please fill in your {{ item.label }}
                  </span> -->
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row justify-content-center">
                <div class="col-md-10">
                  <div
                    v-if="
                      singleFormData &&
                      singleFormData.fillPaymentFormDTO &&
                      singleFormData.isAmountFIxed === true
                    "
                  >
                    <label style="font-weight: 450; font-size: 14px" for="">Amount</label>
                    <el-input
                      v-model="amountToPayNow"
                      type="number"
                      :disabled="true"
                      placeholder="Amount"
                    />
                  </div>
                  <div
                    v-if="
                      singleFormData &&
                      singleFormData.fillPaymentFormDTO &&
                      singleFormData.isAmountFIxed === false
                    "
                  >
                    <label style="font-weight: 450; font-size: 14px" for="">Amount</label>
                    <el-input
                      v-model="amountToPayNow"
                      type="number"
                      placeholder="Amount"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-4">
            <!-- <div class="col-md-3"></div> -->
            <div
              class="col-md-9"
              @click="triggerPayment"
              v-if="singleFormData && singleFormData.fillPaymentFormDTO"
            >
              <el-button
                class="w-100"
                size="large"
                :loading="loading"
                round
                :color="primarycolor"
              >
                Make Payment to Register
              </el-button>
            </div>
            <div class="col-md-9" @click="saveForm" v-else>
              <el-button
                class="w-100"
                size="large"
                :loading="loading"
                round
                :color="primarycolor"
              >
                Submit
              </el-button>
            </div>
          </div>
        </div>

        <div class="col-md-9 d-flex justify-content-center text-center mt-4">
          <a href="https://churchplus.co" class="text-decoration-none" target="_blank"
            >ChurchPlus</a
          >
        </div>
      </div>
      <div class="row justify-content-center mt-4" v-if="disabledBtn">
        <div class="col-md-4 text-center h3">Form Submitted Successfully</div>
      </div>
      <!-- <div class="row justify-content-center mt-4" v-if="disabledBtn">
        <div class="col-md-4 text-center h3">Form Submitted Successfully</div>
      </div> -->
      <div v-if="networkError && !loading" class="adjust-network">
        <img src="../../assets/network-disconnected.png" />
        <div>Opps, Your internet connection was disrupted</div>
      </div>
    </div>
    <el-dialog
      v-model="paymentDialog"
      style="border-radius: 20px"
      title="Payment methods"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-top
    >
      <div class="row">
        <div class="col-sm-12 p-2 text-center text-small continue-text">
          Continue payment with
        </div>
      </div>
      <div
        class="row row-button c-pointer"
        v-if="paystackGate"
        @click="initiatePayment(1)"
      >
        <div class="d-flex justify-content-center w-100">
          <img style="width: 150px" src="../../assets/4PaystackLogo.png" alt="paystack" />
        </div>
      </div>
      <div
        class="row row-button c-pointer mt-3"
        v-if="flutterwaveGate"
        @click="initiatePayment(2)"
      >
        <div class="d-flex justify-content-center w-100">
          <img
            style="width: 150px"
            src="../../assets/flutterwave_logo_color@2x.png"
            alt="flutterwave"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-11">
          <hr class="w-100" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <span class="notecolour text-small col-md-12 px-0 font-weight-bold">
            <span class="text-dark font-weight-bold">NB: </span>FlutterWave currently
            processes only Credit Cards</span
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="paymentSuccessfulDialog"
      style="border-radius: 20px"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center
    >
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <img
              src="../../assets/successful_payment.png"
              style="width: 250px; margin: auto"
            />
          </div>
          <h3 class="text-center mt-5 font-weight-bold success">Thank you</h3>
          <div class="text-center mt-2 font-weight-600 s-18">
            Payment completed successfully
          </div>
          <div class="d-flex justify-content-center mb-5">
            <el-button
              color="#70c043"
              class="text-white mt-2"
              @click="paymentSuccessfulDialog = false"
              round
              >Go back</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, inject, computed, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import { ElMessage} from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useRoute } from "vue-router";
import { ElLoading } from "element-plus";
import swal from "sweetalert";
export default {
  setup() {
    const formName = ref("");
    const description = ref("");
    const cutomFieldData = ref([{ parameterValues: [] }]);
    const route = useRoute();
    const loading = ref(false);
    const loadingPage = ref(false);
    const networkError = ref(false);
    const paymentDialog = ref(false);
    const disabledBtn = ref(false);
    const publicPaymentForm = ref({});
    const paymentFormCurrency = ref({});
    const singleFormData = ref([]);
    const formLogo = ref("");
    const churchName = ref("");
    const churchLogo = ref("");
    const required = ref(false);
    const centerDialogVisible = ref(false);
    const paymentSuccessfulDialog = ref(false);
    const currentInput = ref("");
    const amountToPayNow = ref("");
    const dropdownItem = ref("");
    const dropdownList = ref([]);
    const { xsOnly, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");

    const responseType = ref([
      { name: "Text", id: "0" },
      { name: "DropdownList", id: "1" },
      { name: "CheckBox", id: "2" },
      { name: "DateTime", id: "3" },
      { name: "Email", id: "4" },
      { name: "Image", id: "5" },
      { name: "Number", id: "6" },
    ]);

    const saveChip = (index) => {
      cutomFieldData.value[index].currentInput
        ? cutomFieldData.value[index].parameterValues.push(
            cutomFieldData.value[index].currentInput
          )
        : null;

      // ((dropdownList.value.indexOf(currentInput.value) === -1)) && dropdownList.value.push(currentInput.value);
      cutomFieldData.value[index].currentInput = "";
    };
    const backspaceDelete = ({ which }, index) => {
      which == 8 &&
        cutomFieldData.value[index].currentInput === "" &&
        cutomFieldData.value[index].parameterValues.splice(
          cutomFieldData.value[index].parameterValues.length - 1
        );
    };
    const checkComma = (e) => {
      if (e.data == ",") {
        saveChip();
      }
    };

    const getSingleForm = async () => {
      loadingPage.value = true;
      try {
        const { data } = await axios.get(
          `/api/public/getsinglepublicform?Id=${route.params.id}`
        );
        singleFormData.value = data;
        formLogo.value = data.pictureUrl;
        publicPaymentForm.value = singleFormData.value.fillPaymentFormDTO;
        churchLogo.value =
          singleFormData.value.fillPaymentFormDTO &&
          singleFormData.value.fillPaymentFormDTO.churchLogo
            ? singleFormData.value.fillPaymentFormDTO.churchLogo
            : "";
        churchName.value =
          singleFormData.value.fillPaymentFormDTO &&
          singleFormData.value.fillPaymentFormDTO.churchName
            ? singleFormData.value.fillPaymentFormDTO.churchName
            : "";
        amountToPayNow.value = singleFormData.value.amount;
        loadingPage.value = false;
        GetAllCurrencies();
      } catch (error) {
        // finish()
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
        loadingPage.value = false;
        console.log(error);
      }
    };
    getSingleForm();

    const triggerPayment = () => {
      paymentDialog.value = true;
    };

    const getFlutterwaveModules = () => {
      let isProduction = true;
      const script = document.createElement("script");
      script.src = !isProduction
        ? "https://ravemodal-dev.herokuapp.com/v3.js"
        : "https://checkout.flutterwave.com/v3.js";
      document.getElementsByTagName("head")[0].appendChild(script);
    };
    getFlutterwaveModules();

    const initiatePayment = async (gatewayType) => {
      paymentDialog.value = false;
      const loading = ElLoading.service({
        lock: true,
        text: "Please wait...",
        background: "rgba(255, 255, 255, 0.9)",
      });
      let gatewayService =
        gatewayType === 1 ? "Paystack" : gatewayType == 2 ? "Flutterwave" : null;

      let payload = {
        data: singleFormData.value.customAttributes.map((i) => ({
          customAttributeID: i.id,
          data: i.data ? i.data : dropdownItem.value,
          isRequired: i.isRequired ? i.isRequired : false,
        })),
      };
      if (singleFormData.value.isAmountFIxed) {
        payload.isFreeWill = false;
      } else {
        payload.isFreeWill = true;
        payload.amount = amountToPayNow.value ? amountToPayNow.value : "";
      }

      try {
        let { data } = await axios.post(
          `/InitializeFormPayment?formID=${route.params.id}&gateway=${gatewayService}`,
          payload
        );
        loading.close();
        if (data.status) {
          if (gatewayType == 1) {
            payWithPaystack(data);
          } else if (gatewayType == 2) {
            payWithFlutterwave(data);
          } else {
            ElMessage({
              type: "success",
              showClose: true,
              message: "Congrats, Your Form saved successfully",
              duration: 10000,
            });
          }
          // else if (gatewayType == 2) {
          //   payWithFlutterwave(data)
          // }

          // else {
          //   // Block for users that pledges only
          //   ElMessage({
          //     type: 'success',
          //     showClose: true,
          //     message: 'Congrats, Your Form saved successfully',
          //     duration: 10000
          //   })
          //   paymentSuccessfulDialog.value = true;
          //   personToggle.value = false;
          //   userSearchString.value = "";
          //   if (route.query.tenantID) {
          //     selectPledgeItemID.value = null;
          //   }
          //   contactDetail.value = new Object();
          //   newContact.value = new Object();
          //   maxName.value = "";
          //   maxEmail.value = ""
          // }
        } else {
          ElMessage({
            type: "warning",
            showClose: true,
            message: data.statusMessage,
            duration: 8000,
          });
        }
      } catch (error) {
        console.error(error);
        // paymentDialog.value = true
        loading.close();
        ElMessage({
          type: "error",
          showClose: true,
          message: "Couldn't initialise payment service, please try again",
          duration: 5000,
        });
      }
    };

    const payWithPaystack = (responseObject) => {
      console.log(responseObject, "hhjjj");
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: responseObject.giverEmail,
        amount: amountToPayNow.value * 100,
        currency: paymentFormCurrency.value.shortCode,
        channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
        subaccount: publicPaymentForm.value.paymentGateWays.find(
          (i) => i.paymentGateway.name === "Paystack"
        ).subAccountID,
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
          confirmPayment(tx_ref, trans_id);
        },
      });
      handler.openIframe();
    };

    const payWithFlutterwave = (responseObject) => {
      window.FlutterwaveCheckout({
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,
        tx_ref: responseObject.transactionReference,
        amount: amountToPayNow.value,
        email: responseObject.giverEmail,
        currency: paymentFormCurrency.value.shortCode,
        // country: country,
        payment_options: "card,ussd",
        subaccounts: [
          {
            id: publicPaymentForm.value.paymentGateWays.find(
              (i) => i.paymentGateway.name === "FlutterWave"
            ).subAccountID,
          },
        ],
        customer: {
          // name:
          //   contactDetail.value && Object.keys(contactDetail.value).length > 0
          //     ? `${contactDetail.value.firstName} ${contactDetail.value.lastName}`
          //     : `${newContact.value.firstName} ${newContact.value.lastName}`,
          // phone_number: userSearchString.value,
          email: responseObject.giverEmail,
        },
        callback: (response) => {
          let trans_id = response.transaction_id;
          let tx_ref = response.tx_ref;
          confirmPayment(trans_id, tx_ref);
        },
        onclose: () => console.log("Payment closed"),
        customizations: {
          title: churchName.value,
          description: ` payment to ${churchName.value}`,
          logo: churchLogo.value,
        },
      });
    };

    const confirmPayment = async (trans_id, tx_ref) => {
      try {
        const res = await axios.post(
          `/ConfirmFormsPayment?id=${trans_id}&txnref=${tx_ref}`
        );
        console.log(res.data, "nnn");
        if (res.data) {
          paymentSuccessfulDialog.value = true;
          disabledBtn.value = true;
          // personToggle.value = false;
          // userSearchString.value = "";
          // if (route.query.tenantID) {
          //   selectPledgeItemID.value = null;
          // }
          // contactDetail.value = new Object();
          // newContact.value = new Object();
          // maxName.value = "";
          // maxEmail.value = "";
        } else {
          swal({
            title: "Oops",
            text: res.data.statusMessage,
            icon: "error",
            dangerMode: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const paystackGate = computed(() => {
      if (
        !publicPaymentForm.value ||
        !publicPaymentForm.value.paymentGateWays ||
        (paymentFormCurrency.value && paymentFormCurrency.value.shortCode !== "NGN")
      )
        return false;
      return publicPaymentForm.value.paymentGateWays.find(
        (i) => i.paymentGateway.name === "Paystack"
      );
    });

    const flutterwaveGate = computed(() => {
      if (!publicPaymentForm.value || !publicPaymentForm.value.paymentGateWays)
        return false;
      return publicPaymentForm.value.paymentGateWays.find(
        (i) => i.paymentGateway.name === "FlutterWave"
      );
    });

    const GetAllCurrencies = () => {
      axios
        .get("/api/LookUp/GetAllCurrencies")
        .then((res) => {
          // Get the payment form currency
          paymentFormCurrency.value = res.data.find(
            (i) => i.id == singleFormData.value.fillPaymentFormDTO.currencyId
          );

          console.log(paymentFormCurrency.value);
        })
        .catch((err) => console.log(err.response));
    };

    const addNewField = () => {
      // centerDialogVisible.value = true
      cutomFieldData.value.push({ parameterValues: [] });
    };
    const saveCustomField = () => {
      centerDialogVisible.value = false;
    };

    const allTrueRequired = ref([]);

    watchEffect(() => {
      if (singleFormData.value && singleFormData.value.pictureUrl) {
        formLogo.value = singleFormData.value.pictureUrl;
      }
    });

    const filterIsRequired = ref({});
    const requiredField = ref(false);

    const setSelectedItem = (event) => {
      console.log("Selected item:", event.target.value);
      dropdownItem.value = event.target.value; // Update item.data with the selected value
    };

    const saveForm = async () => {
      //   let isRequiredFalse = singleFormData.value.customAttributes.find(i => i.isRequired === false)
      //   let isRequiredNull = singleFormData.value.customAttributes.find(i => i.isRequired === null)
      filterIsRequired.value = singleFormData.value.customAttributes.find(
        (i) => i.isRequired === true
      );
      let allRequiredFieldsFilled = true;
      loading.value = false;

      // Iterate over the custom attributes
      for (const attribute of singleFormData.value.customAttributes) {
        // Check if the attribute is required and if its data is empty
        if (attribute.isRequired && !attribute.data) {
          // If a required field is not filled, set the flag to false and show an alert
          allRequiredFieldsFilled = false;

          //   alert(`${attribute.label} is required.`);
          requiredField.value = true;
          // Break out of the loop since we only need to show one alert
          break;
        }
      }

      if (allRequiredFieldsFilled) {
        loading.value = true;
        try {
          const { data } = await axios.post(
            `/api/public/saveformdata?formID=${route.params.id}`,
            singleFormData.value.customAttributes.map((i) => ({
              customAttributeID: i.id,
              data: i.data ? i.data : dropdownItem.value,
              isRequired: i.isRequired,
            }))
          );
          console.log(data, "1");
          swal({
            title: "Success!",
            text: "Form Successfully Submitted ",
            icon: "success",
            confirmButtonColor: "#8CD4F5",
            dangerMode: true,
          });
          disabledBtn.value = true;
          required.value = false;
          loading.value = false;
        } catch (error) {
          console.log(error);
          loading.value = false;
        }
      }
      // console.log(allTrueRequired, 'jjhhdhd');
      // console.log(singleFormData.value.customAttributes, 'jjhhdhd');

      // if (isRequiredFalse && filterIsRequired.value === undefined) {
      //     try {
      //         const { data } = await axios.post(`/api/public/saveformdata?formID=${route.params.id}`, singleFormData.value.customAttributes.map((i) => ({
      //             customAttributeID: i.id,
      //             data: i.data,
      //             isRequired: i.isRequired
      //         })))
      //         console.log(data, '1')
      //         swal({
      //             title: "Success!",
      //             text: 'Form Successfully Submitted ',
      //             icon: "success",
      //             confirmButtonColor: '#8CD4F5',
      //             dangerMode: true,
      //         })
      //         disabledBtn.value = true
      //         loading.value = false
      //     }
      //     catch (error) {
      //         console.log(error);
      //         loading.value = false
      //     }
      // } else if (filterIsRequired.value && filterIsRequired.value.data && filterIsRequired.value.isRequired === true && allTrueRequired.value && allTrueRequired.value.length > 0) {
      //     try {
      //         const { data } = await axios.post(`/api/public/saveformdata?formID=${route.params.id}`, singleFormData.value.customAttributes.map((i) => ({
      //             customAttributeID: i.id,
      //             data: i.data,
      //             isRequired: i.isRequired
      //         })))
      //         console.log(data, '2')
      //         swal({
      //             title: "Success!",
      //             text: 'Form Successfully Submitted ',
      //             icon: "success",
      //             confirmButtonColor: '#8CD4F5',
      //             dangerMode: true,
      //         })
      //         disabledBtn.value = true
      //         loading.value = false
      //     }
      //     catch (error) {
      //         console.log(error);
      //         loading.value = false

      //     }
      // } else if (isRequiredNull && isRequiredNull.data && filterIsRequired.value === undefined) {
      //     try {
      //         const { data } = await axios.post(`/api/public/saveformdata?formID=${route.params.id}`, singleFormData.value.customAttributes.map((i) => ({
      //             customAttributeID: i.id,
      //             data: i.data,
      //             isRequired: i.isRequired
      //         })))
      //         console.log(data, '3')
      //         swal({
      //             title: "Success!",
      //             text: 'Form Successfully Submitted ',
      //             icon: "success",
      //             confirmButtonColor: '#8CD4F5',
      //             dangerMode: true,
      //         })
      //         disabledBtn.value = true
      //         loading.value = false
      //     }
      //     catch (error) {
      //         console.log(error);
      //         loading.value = false

      //     }

      // } else {
      //     loading.value = false
      //     disabledBtn.value = false
      // }
      // }
    };

    return {
      formName,
      primarycolor,
      cutomFieldData,
      dropdownList,
      required,
      description,
      responseType,
      centerDialogVisible,
      currentInput,
      route,
      disabledBtn,
      singleFormData,
      paymentSuccessfulDialog,
      xsOnly,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      loading,
      loadingPage,
      formLogo,
      networkError,
      filterIsRequired,
      requiredField,
      allTrueRequired,
      paymentDialog,
      flutterwaveGate,
      churchLogo,
      churchName,
      paystackGate,
      publicPaymentForm,
      paymentFormCurrency,
      dropdownItem,
      payWithPaystack,
      payWithFlutterwave,
      amountToPayNow,
      initiatePayment,
      addNewField,
      saveForm,
      checkComma,
      saveChip,
      backspaceDelete,
      saveCustomField,
      triggerPayment,
      setSelectedItem,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap");

* {
  font-family: Poppins;
}

.image-upload img {
  object-fit: cover;
  object-position: center;
}

.image-upload img {
  object-fit: cover;
  object-position: center;
}

.chip-container {
  /* width: 425px; */
  border: 1px solid #ccc;
  background: #ffffff;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.inputt {
  /* flex: 1 1 auto;
    width: 30px; */
  border: none;
  outline: none;
  padding: 4px;
}

.continue-text {
  /* font-family: Nunito Sans !important; */
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.chip {
  padding: 0.3rem 0.3rem;
  border: 1px solid #02172e0d;
  border-radius: 25px;
  background: #02172e14;
  /* margin:4px;
    background: #e0e0e0;
    padding:0px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display:flex;
    align-items: center; */
}
.row-button {
  padding: 5px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  background: #fff;
  margin: 12px 20px;
  transition: all 0.4s ease-in-out;
  max-height: 40px;
}

.row-button:hover {
  cursor: pointer;
  transform: scale(1.05, 1.05);
}

@media (max-width: 500px) {
  .row-button {
    margin: 12px 10px;
  }
}
</style>
