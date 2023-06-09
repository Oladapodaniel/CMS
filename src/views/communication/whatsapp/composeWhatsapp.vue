<template>
  <div>
    <div class="container">
      <!-- <div class="container" @click="closeDropdownIfOpen"> -->
      <div class="row">
        <div class="col-md-12 mb-3 mt-3 offset-3 offset-md-0">
          <h4 class="font-weight-bold">Compose Whatsapp Message</h4>
          <Toast />

          <!-- <Dialog header="Select Date and Time" v-model:visible="display" :style="{ width: '50vw', maxWidth: '600px' }"
            :modal="true">
            <div class="row">
              <div class="col-md-12">
                <input type="datetime-local" id="birthdaytime" class="form-control" name="birthdaytime"
                  v-model="executionDate" />
              </div>
            </div>
            <template #footer>
              <Button label="Cancel" icon="pi pi-times" @click="() => (display = false)" class="p-button-raised p-button-text p-button-plain mr-3" style="
                  color: #136acd;
                  background: #fff !important;
                  border-radius: 22px;
                " />
              <Button label="Schedule" class="p-button-rounded" style="background: #136acd"
                @click="contructScheduleMessageBody(2, '')" />
            </template>
          </Dialog> -->
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div>

      <div class="row">
        <div class="col-2 pr-md-0 col-lg-2 align-self-center">
          <span class="small-text">Send to: </span>
        </div>
        <div class="col-10 px-md-0 col-lg-10 form-group mb-0">
          <!-- <div class="dropdown">
            <button class="btn btn-default dropdown-toggle small-text pl-md-0" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="closeDropdownIfOpen">
              Select Destination
            </button>
            <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item c-pointer small-text" v-for="(destination, index) in possibleSMSDestinations"
                :key="index" @click="showSection(index)">{{ destination }}</a>
            </div>
          </div> -->
          <el-dropdown trigger="click" class="w-100">
            <div class="d-flex justify-content-between border-contribution text-dark w-100" size="large">
              <span>Select Destination</span>
              <div>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(destination, index) in possibleSMSDestinations" :key="index"
                  @click="showSection(index)">
                  <a class="no-decoration text-dark">
                    {{ destination }}
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="row mb-1">
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div>
      <!-- 
      <div class="row" v-if="sendToAll">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0">
          <span>
            <input class="form-control dropdown-toggle my-1 px-1 small-text" type="text" id="dropdownMenu"
              value="All Contacts" disabled />
            <span class="close-allcontacts c-pointer" @click="() => sendToAll = false"><i class="pi pi-times"></i></span>
          </span>
        </div>
      </div> -->

      <div class="row mb-2" v-if="groupSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0 grey-rounded-border">
          <ul class="d-flex flex-wrap pl-1 mb-0 dd-item small-text" @click="() => groupSelectInput.focus()">
            <li style="list-style: none; min-width: 100px" v-for="(group, index) in selectedGroups" :key="index"
              class="email-destination d-flex justify-content-between m-1">
              <span>{{ group.name }}</span>
              <span class="ml-2 remove-email" @click="removeGroup(index)">x</span>
            </li>
            <li style="list-style: none" class="">
              <input type="text" class="border-0 dd-item" ref="groupSelectInput" :class="{
                'w-100': selectedGroups.length === 0,
                'minimized-input-width': selectedGroups.length > 0,
              }" @focus="showGroupList" @click="showGroupList" style="padding: 0.5rem" :placeholder="`${selectedGroups.length > 0 ? '' : 'Select groups'
  }`" />
            </li>
          </ul>
          <div class="col-md-12 px-2 select-groups-dropdown dd-item pt-2" v-if="groupListShown">
            <div class="row dd-item" v-if="categories.length === 0">
              <div class="col-md-12 dd-item">
                <p class="small-text">No groups yet</p>
              </div>
            </div>
            <div class="row dd-item" v-for="(category, index) in categories" :key="index">
              <div class="col-md-12 dd-item" v-if="allGroups[index].length > 0">
                <div class="row dd-item">
                  <div class="col-md-12 dd-item">
                    <h6 class="text-uppercase dd-item font-weight-bold">
                      {{ category }}
                    </h6>
                    <a class="dropdown-item px-1 c-pointer dd-item small-text" v-for="(group, indx) in allGroups[index]"
                      @click="
                        selectGroup(
                          group.category,
                          group.id,
                          group.name,
                          index,
                          indx
                        )
                        " :key="indx">
                      {{ group.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-2" v-if="whatsappGroupSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0">
          <el-select-v2 v-model="userWhatsappGroupsId"
            :options="userWhatsappGroups.map(i => ({ value: i.id.user, label: i.formattedTitle }))"
            placeholder="Select whatsapp group" size="large" class="w-100" multiple />
            <el-icon class="is-loading" v-if="whatsappGroupsLoading">
              <Loading />
            </el-icon>
          <!-- <el-dropdown trigger="click" class="w-100">
            <div class="d-flex justify-content-between border-contribution text-dark w-100" size="large">
              <span>Select Whatsapp group</span>
              <div>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(group, index) in userWhatsappGroups" :key="index">
                  <a class="no-decoration text-dark">
                    {{ group.formattedTitle }}
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>
      </div>


      <div class="row mb-2" v-if="broadcastSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0">
          <el-dropdown trigger="click" class="w-100">
            <div class="d-flex justify-content-between border-contribution text-dark w-100" size="large">
              <span>Select broadcast list</span>
              <div>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(group, index) in userWhatsappGroups" :key="index">
                  <a class="no-decoration text-dark">
                    <!-- {{ group }} -->
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>


      <div class="row" v-if="membershipSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 pl-0 grey-rounded-border">
          <ul class="d-flex flex-wrap px-1 mb-0 m-dd-item" @click="() => memberSelectInput.focus()">
            <li style="list-style: none; min-width: 100px" v-for="(member, indx) in selectedMembers" :key="indx"
              class="email-destination d-flex justify-content-between m-1">
              <!-- <span
              class="email-destination m-1"
              
            > -->
              <span>{{ member.name }}</span>
              <span class="ml-2 remove-email" @click="removeMember(indx)">x</span>
              <!-- </span> -->
            </li>
            <li style="list-style: none" class="m-dd-item">
              <input type="text" class="border-0 m-dd-item text" ref="memberSelectInput" @input="searchForPerson" :class="{
                'w-100': selectedMembers.length === 0,
                'minimized-input-width': selectedMembers.length > 0,
              }" @focus="showMemberList" @click="showMemberList" v-model="searchText" style="padding: 0.5rem"
                :placeholder="`${selectedMembers.length > 0 ? '' : 'Select from members'
                  }`" />
            </li>
          </ul>
          <div class="col-md-12 px-0 select-groups-dropdown m-dd-item" v-if="memberListShown">
            <div class="dropdownmenu pt-0 w-100 m-dd-item">
              <a class="dropdown-item px-1 c-pointer m-dd-item" v-for="(member, index) in memberSearchResults"
                :key="index" @click="selectMember(member, index)">{{ member.name }}</a>
              <p class="bg-secondary p-1 mb-0 disable m-dd-item" v-if="searchText.length < 3 &&
                loading == false &&
                memberSearchResults.length === 0
                ">
                Enter 3 or more characters
              </p>
              <p aria-disabled="true" class="btn btn-default p-1 mb-0 disable m-dd-item" v-if="memberSearchResults.length === 0 &&
                searchText.length >= 3 &&
                !loading
                ">
                No match found
              </p>
              <p class="btn btn-default p-1 mb-0 disable m-dd-item" v-if="loading && searchText.length >= 3">
                <i class="fas fa-circle-notch fa-spin m-dd-item"></i>
              </p>
            </div>
          </div>
        </div>
      </div>




      <!-- Enter phone numbers -->
      <div class="col-md-12 my-1 px-0" v-if="phoneNumberSelectionTab">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0">
            <div class="d-flex flex-wrap">
              <div class="multiple_numbers mr-2 mt-2 flex" v-for="(item, index) in allSelectedNumbers" :key="index">
                {{ item }}
                <el-icon class="c-pointer ml-2" @click="allSelectedNumbers.splice(index, 1)">
                  <CircleClose />
                </el-icon>
              </div>
            </div>
            <vue-tel-input style="height: 40px" class="input-width mt-3" v-model="phoneNumber"
              mode="international"></vue-tel-input>
            <el-button class="mt-2" type="primary"
              @click="(allSelectedNumbers.push(phoneNumber.replaceAll(' ', '').trim())), (phoneNumber = '')"
              plain>add</el-button>
            <!-- <el-button class="mt-2" type="primary" plain>done</el-button> -->
            <!-- <textarea class="form-control w-100 px-1 grey-rounded-border" placeholder="Enter phone number(s)"
              v-model="phoneNumber"></textarea> -->
          </div>
          <!-- <div class="col-md-12 grey-rounded-border groups" :class="{ hide: !groupsAreVissible }">
            <div class="row" v-for="(category, index) in categories" :key="index">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-12">
                    <h4 class="px-14">{{ category }}</h4>
                    <p v-for="(group, indx) in allGroups[index]"
                      @click="selectGroup(group.category, group.id, group.name)" :key="indx" class="small-text">
                      {{ group.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <!-- Start upload contact -->
      <div v-if="contactUpload" class="row my-1">
        <div class="col-sm-2"></div>
        <div class="col-sm-10 px-0 grey-rounded-border p-2">
          <div class="d-flex justify-content-between">
            <input type="file" class="form-control-file" @change="uploadFile">
            <div><i class="pi pi-times mr-2 c-pointer" @click="() => contactUpload = false"></i></div>
          </div>
          <div class="mt-1"><a href="/files/Upload_Contact Template.csv"
              class="template-text text-decoration-none font-weight-bold" download>Download template</a></div>
        </div>
      </div>

      <div class="row mt-1" v-if="phoneNumberSelectionTab || membershipSelectionTab || groupSelectionTab
        ">
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div>


      <div class="row">
        <div class="col-md-2">
          <span class="font-weight-600 small-text">Message: </span>
        </div>
        <div class="col-md-10 px-0">
          <textarea rows="10" class="text-area my-2 small-text" v-model="editorData"></textarea>
          <div class="col-md-12 px-0 small-text">
            <p class="bg-success mb-0 p-1" v-if="editorData.length > 0" :class="{ amber: charactersCount > 160 }">
              <span>Characters count {{ charactersCount }}</span>
              <span class="float-right">Page {{ pageCount }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="row my-3">
        <div class="col-md-12 form-group">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-10 pl-0">
              <input type="checkbox" v-model="isPersonalized" class="mr-3" />
              <span class="font-weight-700 px-14">Personal Message</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-10 pl-0">
              <span class="hint">Insert #name# any where you want the contact name to appear in
                the message, it will be replaced by the actual name of the
                member when sending the message.</span>
            </div>
          </div>
        </div>
      </div> -->

      <div class="row mt-4 mb-5">
        <div class="col-md-12">
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidDestination">
            Please select destination
          </p>
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidMessage">
            Enter your message
          </p>
        </div>
        <div class="w-100 mt-3 d-flex justify-content-end">
          <span>
            <!-- <SplitButton label="Send" :model="sendOptions" :disabled="disableBtn" @click="data" data-toggle="modal"
              data-target="#sendsmsbtn"></SplitButton> -->
            <el-button :color="primarycolor" size="large" @click="sendWhatsappMessage" round>Send Whatsapp
              message</el-button>
          </span>
          <!-- <router-link
            :to="route.fullPath === '/tenant/sms/compose' ? '/tenant/sms/sent' : '/errorpage/expiredSubscription'"
            class="default-btn d-flex justify-content-center short-btn align-items-center ml-3 text-decoration-none text-dark">
            Discard
          </router-link> -->
        </div>
        <!-- <div class="row">
          <div class="col-md-12">
            <div class="modal fade" id="sendsmsbtn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header grey-background">
                    <h5 class="modal-title" id="exampleModalLabel">
                      <i class="pi pi-user mr-2"></i>
                      {{ sendModalHeader }}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row" v-if="!nigerian">
                      <div class="col-md-12 text-center">
                        <button
                          class="primary-btn default-btn border-0 px-4 my-2 primary-bg text-white outline-none extra-btn"
                          data-dismiss="modal" @click="contructScheduleMessageBody(1, '')">
                          Send SMS Now
                        </button>
                        
                      </div>
                    </div>

                    <div class="row" v-else>
                      <div class="col-md-12">
                        <div class="row">nige
                          <div class="col-md-12 px-1">
                            <p>
                              We are providing more options to reach and
                              communicate with your members
                            </p>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-12 px-1">
                            <hr class="hr" />
                          </div>
                        </div>

                        <div class="row d-flex justify-content-between">
                          <div class="col-md-6 px-1">
                            <div class="container">
                              <div class="row">
                                <div class="col-md-12">
                                  <label for="" class="small-text font-weight-600 py-2">NEW** BULK SMS - 100% SMS
                                    DELIVERY</label>
                                </div>
                                <div class="col-md-12 send-now-div py-2 my-2 d-flex justify-content-center">
                                  <button
                                    class="primary-btn default-btn primary-bg border-0 px-4 my-2 font-weight-600 outline-none"
                                    data-dismiss="modal" @click="
                                      contructScheduleMessageBody(
                                        1,
                                        'hostedsms'
                                      )
                                      ">
                                    Send SMS Now
                                  </button>
                                </div>
                                <div class="col-md-12 px-0">
                                  <hr class="hr my-2" />
                                </div>
                                <div class="col-md-12 px-0 d-flex flex-column">
                                  <span>Please note:</span>
                                  <span>100% delivery to all valid phone
                                    numbers.</span>
                                  <span>Not Affected by DND.</span>
                                  <span>Dedicated phone number: No sender
                                    customization.</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6 px-1">
                            <div class="container">
                              <div class="row">
                                <div class="col-md-12">
                                  <label for="" class="small-text font-weight-600 py-2">REGULAR BULK SMS- PROVIDER</label>
                                </div>
                                <div class="col-md-12 my-2 send-now-div py-2 d-flex justify-content-center">
                                  
                                  <button
                                    class="primary-btn default-btn border-0 px-4 my-2 grey-background text-grey outline-none"
                                    data-dismiss="modal" @click="contructScheduleMessageBody(1, '')">
                                    Send SMS Now
                                  </button>
                                </div>
                                <div class="col-md-12 px-0">
                                  <hr class="hr my-2" />
                                </div>
                                <div class="col-md-12 px-0 d-flex flex-column">
                                  <span>Please note:</span>
                                  <span>Uses the regular bulk sms engine</span>
                                  <span>Delivery rate varies and is affected by DND
                                    number.</span>
                                  <span>Sender Name can be customized.</span>
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
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect, inject } from "vue";
import composeService from "../../../services/communication/composer";
import composerObj from "../../../services/communication/composer";
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import store from "../../../store/store";
import axios from "@/gateway/backendapi";
// import stopProgressBar from "../../../services/progressbar/progress";
import communicationService from "../../../services/communication/communicationservice";
// import dateFormatter from "../../../services/dates/dateformatter";
import moment from 'moment'
import VueQrcode from 'vue-qrcode';
import swal from 'sweetalert';
// import io from "socket.io-client"

import { state } from "@/socket";
import { socket } from "@/socket";

export default {
  components: {
    VueQrcode
  },
  setup() {
    // const socket = io('https://whatsapp-web-server-production.up.railway.app');
    // const socket = io('https://whatsapp-web-server-q1wo.onrender.com');
    //  const socket = io('http://localhost:3001');
    const session = ref("")
    const qrCode = ref("")
    const sessionId = ref("")
    const getSessionId = ref("")
    const primarycolor = inject('primarycolor')
    const toast = useToast();
    // const router = useRouter()
    const editorData = ref("");
    // const disableBtn = ref(false)
    const editorConfig = {
      // The configuration of the editor.
      height: "800",
    };
    const userWhatsappGroupsId = ref(null)

    const possibleSMSDestinations = [
      // "All contacts", 
      // "Select group from database", 
      "Select person from membership database",
      "Phone numbers",
      // "Upload contacts", 
      "Select from Whatsapp groups",
      // "Select from Whatsapp broadcast list"
    ];
    const allSelectedNumbers = ref([])
    const groupsAreVissible = ref(false);
    const groupSelectionTab = ref(false);
    const membershipSelectionTab = ref(false);
    const phoneNumberSelectionTab = ref(false);
    const whatsappGroupSelectionTab = ref(false);
    const broadcastSelectionTab = ref(false);
    const selectedGroups = ref([]);
    // const sendToAll = ref(false);
    // const executionDate = ref("");
    const contactUpload = ref(false)
    const multipleContact = ref({})
    const userWhatsappGroups = computed(() => {
      if (store.getters["communication/allClientWhatsappChat"] && store.getters["communication/allClientWhatsappChat"].length > 0) return store.getters["communication/allClientWhatsappChat"].filter(i => i.isGroup)
      return []
    })
    const toggleGroupsVissibility = () => {
      groupsAreVissible.value = !groupsAreVissible.value;
    };

    const showSection = (index) => {
      // if (index === 1) groupSelectionTab.value = true;
      if (index === 0) membershipSelectionTab.value = true;
      if (index === 1) phoneNumberSelectionTab.value = true;
      // if (index === 4) contactUpload.value = true;
      // if (index === 0) {
      //   groupSelectionTab.value = true;
      //   selectedGroups.value.push({ data: "membership_00000000-0000-0000-0000-000000000000", name: "All Contacts" })
      // }
      if (index === 2) whatsappGroupSelectionTab.value = true
      // if (index === 6) broadcastSelectionTab.value = true
    };

    const allcountries = ref([])
    const tenantCountry = ref({})
    const whatsappGroupsLoading = ref(true)

    watchEffect(() => {
      socket.emit('connected', 'Hello From Client')
      socket.on('hello', (data) => {
        console.log('Hello Emittted from the server', data)
      })
      socket.on('qr', (data) => {
        console.log('QR RECEIVED', data)
        const { qr } = data
        console.log(qr, 'hweww')
        qrCode.value = qr
      })

      socket.on('ready', (data) => {
        console.log('READY', data)
        sessionId.value = data.id
      })

      socket.on('allchats', (data) => {
        whatsappGroupsLoading.value = false
        console.log(data, 'AllChats Here 🥰🎉')
      })

      socket.on('groupmessagesent', (data) => {
        console.log(data, 'grup message');
      })

    })

    const connected = computed(() => {
      return state.connected;
    })

    const connect = () => {
      socket.connect();
    }

    const disconnect = () => {
      socket.disconnect();
    }

    const createSessionForWhatsapp = () => {
      socket.emit('createsession', { id: session.value })
    }

    const getAllChats = () => {
      console.log('reaching')
      socket.emit('getAllChats', sessionId.value)
    }

    const getSessionForWhatsapp = () => {
      console.log('getting session')
      socket.emit('getsession', { id: getSessionId.value })
    }

    // const sendOptionsIsShown = ref(false);
    // const toggleSendOptionsDisplay = () =>
    //   (sendOptionsIsShown.value = !sendOptionsIsShown.value);

    // const closeDropdownIfOpen = (e) => {
    //   if (!e.target.classList.contains("dd-item")) {
    //     sendOptionsIsShown.value = false;
    //     groupListShown.value = false;
    //   }

    //   if (!e.target.classList.contains("m-dd-item")) {
    //     memberListShown.value = false;
    //   }
    // };

    const selectGroup = (
      category,
      id,
      name,
      indexInCategories,
      indexInGroup
    ) => {
      selectedGroups.value.push({ data: `${category}_${id}`, name });
      groupsAreVissible.value = false;
      allGroups.value[indexInCategories].splice(indexInGroup, 1);
      groupListShown.value = false;
      console.log(selectedGroups);
    };

    const removeGroup = (index) => {
      selectedGroups.value.splice(index, 1);
    };

    const members = [
      { name: "Me", id: 1 },
      { name: "You", id: 2 },
    ];
    const selectedMembers = ref([]);
    const selectMember = (selectedMember, index) => {
      selectedMembers.value.push(selectedMember);
      console.log(memberSearchResults.value, "search members");
      memberSearchResults.value.splice(index, 1);
      memberListShown.value = false;
      searchText.value = "";
      memberSearchResults.value = [];
      console.log(selectedMembers, "selected members");
    };
    const removeMember = (index) => {
      selectedMembers.value.splice(index, 1);
    };
    const searchText = ref("");
    const filteredMembers = computed(() => {
      if (!searchText.value) return [];
      const filtered = members.filter((i) => i.name.includes(searchText.value));
      return filtered;
    });
    const memberSearchResults = ref([]);
    const searchForPerson = (e) => {
      if (e.target.value.length >= 3) {
        memberSearchResults.value = [];
        loading.value = true;
        composerObj
          .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
          .then((res) => {
            loading.value = false;
            memberSearchResults.value = res.filter((i) => {
              const memberInExistingCollection = selectedMembers.value.find(
                (j) => j.id === i.id
              );
              console.log(memberInExistingCollection, "em");
              if (memberInExistingCollection && memberInExistingCollection.id)
                return false;
              return true;
            });
            console.log(memberSearchResults.value, "res");
          });
        console.log(memberSearchResults.value);
      } else {
        memberSearchResults.value = [];
      }
    };

    const charactersCount = computed(() => editorData.value.length);
    const pageCount = computed(() => {
      if (editorData.value.length <= 160) return 1;
      return Math.ceil(editorData.value.length / 153);
    });

    const phoneNumber = ref("");
    const loading = ref(false);
    // const isPersonalized = ref(false);

    const isoCode = ref("");
    const isPersonalized = ref(false);
    const invalidMessage = ref(false);
    const invalidDestination = ref(false);

    // const sendSMS = (data) => {
    //   invalidDestination.value = false;
    //   invalidMessage.value = false;

    //   if (
    //     selectedGroups.value.length === 0 &&
    //     !phoneNumber.value &&
    //     selectedMembers.value.length === 0 &&
    //     !multipleContact.value instanceof File
    //   ) {
    //     invalidDestination.value = true;
    //     return false;
    //   }

    //   if (!editorData.value) {
    //     invalidMessage.value = true;
    //     return false;
    //   }

    //   toast.add({
    //     severity: "info",
    //     summary: "Sending SMS",
    //     detail: "SMS is being sent....",
    //     life: 2500,
    //   });
    //   console.log(data)

    //   // if (selectedMembers.value.length > 0) data.contacts = selectedMembers.value;
    //   disableBtn.value = true
    //   composeService
    //     .sendMessage("/api/Messaging/sendSms", data)
    //     .then((res) => {
    //       disableBtn.value = false
    //       // if (res.status === 200) {
    //       if (res.data.message.includes("You do not have")) {
    //         toast.add({
    //           severity: "warn",
    //           summary: "Insufficient Unit",
    //           detail: `${res.data.message}`,
    //           life: 6000,
    //         });


    //       } else {
    //         toast.add({
    //           severity: "success",
    //           summary: "SMS Sent",
    //           detail: `SMS Sent successfully`,
    //           life: 6000,
    //         });

    //         store.dispatch("removeSMSUnitCharge", pageCount.value * 1.5);
    //         console.log(pageCount, "Page count ");

    //         console.log(res);
    //         // Save the res to store in other to get it in the view sent sms page
    //         let sentObj = {
    //           message: res.data.message,
    //           id: res.data.returnObjects ? res.data.returnObjects[0].communicationReportID : '',
    //           smsUnitsUsed: res.data.unitsUsed,
    //           dateSent: res.data.returnObjects ? `Today | ${moment.parseZone(new Date(res.data.returnObjects[0].communicationReport.date).toLocaleDateString(), 'YYYY MM DD HH ZZ')._i}` : "",
    //           deliveryReport: [{ report: res.data.messageStatus }]
    //         }
    //         console.log(sentObj)
    //         store.dispatch("communication/addSmsToSentList", sentObj)
    //         setTimeout(() => {
    //           router.push({ name: "SentMessages" })
    //         }, 3500)

    //       }

    //       // } else if (typeof res === "object") {
    //       //   toast.add({
    //       //     severity: "error",
    //       //     summary: "Failed operation",
    //       //     detail: typeof res === "object" ? "SMS sending failed" : res,
    //       //     life: 2500,
    //       //   });



    //       // }

    //     })
    //     .catch((err) => {
    //       stopProgressBar();
    //       disableBtn.value = false
    //       toast.removeAllGroups();
    //       console.log(err)
    //       if (err.toString().toLowerCase().includes("network error")) {
    //         toast.add({
    //           severity: "warn",
    //           summary: "You 're Offline",
    //           detail: "Please ensure you have internet access",
    //           life: 4000,
    //         });
    //       } else if (err.toString().toLowerCase().includes('timeout')) {
    //         toast.add({
    //           severity: "warn",
    //           summary: "Request Delayed",
    //           detail: "SMS took too long, please check your network and try again",
    //           life: 4000,
    //         });
    //       } else {
    //         toast.add({
    //           severity: "warn",
    //           summary: "Failed operation",
    //           detail: "SMS sending failed, Please try again",
    //           life: 400,
    //         });
    //       }
    //     });
    // };

    // const draftMessage = async () => {
    //   try {
    //     const response = await composerObj.saveDraft(
    //       {
    //         body: editorData.value,
    //         isDefaultBirthDayMessage: false,
    //       },
    //       "/api/Messaging/PostSmsDraft"
    //     );
    //     store.dispatch("communication/getSMSDrafts");
    //     console.log(response, "draft response");
    //     toast.add({
    //       severity: "success",
    //       summary: "Draft Saved",
    //       detail: "Message saved as draft",
    //       life: 2500,
    //     });
    //   } catch (error) {
    //     console.log(error, "drafting error");
    //     toast.add({
    //       severity: "warn",
    //       summary: "Failed",
    //       detail: "Message not saved as draft",
    //       life: 2500,
    //     });
    //   }
    // };

    // const contructScheduleMessageBody = (sendOrSchedule, gateway) => {
    //   const data = {
    //     subject: subject.value,
    //     message: editorData.value,
    //     contacts: [],
    //     isPersonalized: isPersonalized.value,
    //     groupedContacts: selectedGroups.value.map((i) => i.data),
    //     // toContacts: sendToAll./value ? "allcontacts_00000000-0000-0000-0000-000000000000" : "",
    //     isoCode: isoCode.value,
    //     category: "",
    //     emailAddress: "",
    //     emailDisplayName: "",
    //     gateWayToUse: gateway,
    //   };

    //   const numbers = [];
    //   phoneNumber.value.split(',').forEach(i => {
    //     i.split('\n').forEach(j => {
    //       if (j) numbers.push(j);
    //     })
    //   })

    //   data.toOthers = numbers.join();

    //   if (selectedMembers.value.length > 0) {
    //     data.ToContacts = data && data.ToContacts ? data.ToContacts.length > 0 ? "," : "" : "";
    //     data.ToContacts += selectedMembers.value
    //       .map((i) => {
    //         console.log(i, "person");
    //         if (i.id) return i.id;
    //       })
    //       .join();
    //   }

    //   if (multipleContact.value instanceof File) {
    //     sendSMSToUploadedContacts(gateway)
    //   } else if (sendOrSchedule == 2) {
    //     const dateToBeExecuted = executionDate.value
    //     data.executionDate = dateToBeExecuted.split("T")[0];
    //     data.date = dateToBeExecuted
    //     data.time = dateToBeExecuted.split("T")[1]
    //     scheduleMessage(data);
    //   } else {
    //     sendSMS(data);
    //   }
    // };

    // const showScheduleModal = () => {
    //   display.value = true;
    // };

    // const scheduleMessage = async (data) => {
    // display.value = false;
    //   const formattedDate = dateFormatter.monthDayTime(data.executionDate);
    //   console.log(formattedDate, "Formatted Date");
    //   console.log(data.executionDate)

    //   console.log(data)
    //   try {
    //     const response = await composerObj.sendMessage(
    //       "/api/Messaging/saveSmsSchedule",
    //       data
    //     );
    //     toast.add({
    //       severity: "success",
    //       summary: "message Scheduled",
    //       detail: `Message scheduled for ${data.time}`,
    //     });
    //     console.log(response, "Schedule response");
    //   } catch (error) {
    //     console.log(error);
    //     toast.add({
    //       severity: "error",
    //       summary: "Schedule Failed",
    //       detail: "Could not schedule message",
    //     });
    //   }
    // };

    const sendSMSToUploadedContacts = async (gateway) => {
      let formData = new FormData()
      formData.append("file", multipleContact.value)
      formData.append("message", editorData.value)
      formData.append('category', '')
      formData.append('gatewayToUse', gateway)
      formData.append('isoCode', isoCode.value)

      try {
        let { data } = await axios.post('/api/messaging/upload', formData)
        console.log(data)
        toast.add({
          severity: "success",
          summary: "Success",
          detail: data.response,
          life: 5000
        });
      }
      catch (err) {
        console.log(err);
        toast.add({
          severity: "error",
          summary: "Not sent",
          detail: "Sending failed, please try again",
          life: 5000
        });
      }
    }

    const userCountry = ref("");

    const route = useRoute();
    if (route.query.phone) {
      phoneNumber.value = route.query.phone;
      phoneNumberSelectionTab.value = true;
    }

    if (route.query.group) {
      groupSelectionTab.value = true;
      selectedGroups.value.push({
        data: `group_~${route.query.group}`,
        name: route.query.group,
      });
      phoneNumberSelectionTab.value = true;
    }

    if (route.query.draftId) {
      communicationService.getDraftsById(route.query.draftId).then((res) => {
        if (res) {
          console.log(res, "Draft");
          editorData.value = res.body;
        } else {
          console.log(res, "error response");
        }
      });
    }

    if (store.getters.currentUser && store.getters.currentUser.isoCode) {
      isoCode.value = store.getters.currentUser.isoCode;
      userCountry.value = store.getters.currentUser.country;
    } else {
      axios
        .get("/api/Membership/GetCurrentSignedInUser")
        .then((res) => {
          isoCode.value = res.data.isoCode;
          userCountry.value = res.data.country;
        })
        .catch((err) => console.log(err));
    }

    // const sendModalHeader = computed(() => {
    //   if (userCountry.value !== "Nigeria") return "Confirm Send";
    //   return "Send SMS Alternative";
    // });

    // const nigerian = computed(() => {
    //   if (userCountry.value === "Nigeria") return true;
    //   return false;
    // });

    // const sendOptions = [
    //   {
    //     label: "Schedule",
    //     icon: "pi pi-clock",
    //     command: () => {
    //       console.log("Hello");
    //       showScheduleModal();
    //     },
    //   },
    //   {
    //     label: "Save as Draft",
    //     icon: "pi pi-save",
    //     command: () => {
    //       draftMessage();
    //     },
    //   },
    //   // {
    //   //   label: "Upload",
    //   //   icon: "pi pi-upload",
    //   //   to: "/fileupload",
    //   // },
    // ];

    const allGroups = ref([]);
    const categories = ref([]);
    onMounted(() => {
      composeService
        .getCommunicationGroups()
        .then((res) => {
          for (let prop in res) {
            categories.value.push(prop);
            allGroups.value.push(res[prop]);
          }
        })
        .catch((err) => console.log(err));
    })

    // const display = ref(false);
    // const showDateTimeSelectionModal = () => {
    //   display.value = !display.value;
    // };

    const groupListShown = ref(false);
    const showGroupList = () => {
      groupListShown.value = true;
      console.log(groupSelectInput.value);
    };

    const memberListShown = ref(false);
    const showMemberList = () => {
      memberListShown.value = true;
    };
    const groupSelectInput = ref(null);
    const memberSelectInput = ref(null);


    const sendWhatsappMessage = () => {
      console.log(selectedMembers.value, 'selected memener');
      console.log(allSelectedNumbers.value, 'phnennumber');
      console.log(userWhatsappGroupsId.value)

      //   // Send to Whatsapp Groups
      if (userWhatsappGroupsId && userWhatsappGroupsId.value.length > 0) {
        socket.emit('sendtogroups', {
          groups: userWhatsappGroupsId.value,
          message: editorData.value
        })
      }

      // // Send to phoneNumbers
      if (allSelectedNumbers.value.length > 0) {
        socket.emit('sendwhatsappmessage', {
          phone_number: allSelectedNumbers.value.length > 0 ? allSelectedNumbers.value : phoneNumber.value.replaceAll(" ", "").trim(),
          message: editorData.value,
          type: 'multiple'
        })
      }
      // Send to selectedMembers
      if (selectedMembers.value.length > 0) {
        socket.emit('sendwhatsappmessage', {
          phone_number: selectedMembers.value.map(i => i.phone ? i.phone.substring(0, 1) == '0' ? `+${tenantCountry.value.phoneCode}${i.phone.substring(1)}` : `${i.phone}` : null).filter(i => i),
          message: editorData.value,
          type: 'multiple'
        })
      }
      swal({
        title: "Success",
        text: "Your Whatsapp message is being sent!",
        icon: "success",
      })
    }

    const getAllCountries = async () => {
      try {
        let { data } = await axios.get('/api/getallcountries');
        console.log(data)
        allcountries.value = data
      }
      catch (error) {
        console.error(error)
      }
    }
    getAllCountries();

    const getUser = computed(() => {
      if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
      return store.getters.currentUser
    })

    watchEffect(() => {
      if (allcountries.value.length > 0 && getUser.value && Object.keys(getUser.value).length > 0) {
        tenantCountry.value = allcountries.value.find(i => {
          return i.isoCode == getUser.value.isoCode
        })
      }
    })

    // const data = () => {
    //   const data = {
    //     subject: subject.value,
    //     message: editorData.value,
    //     contacts: [],
    //     isPersonalized: isPersonalized.value,
    //     groupedContacts: selectedGroups.value.map((i) => i.data),
    //     toContacts: sendToAll.value ? "allcontacts_00000000-0000-0000-0000-000000000000" : "",
    //     isoCode: isoCode.value,
    //     category: "",
    //     emailAddress: "",
    //     emailDisplayName: "",
    //     // gateWayToUse: gateway,
    //   };

    //   console.log(data)
    // }

    // const getDefaultMessage = async messageId => {
    //   try {
    //     const { returnObject: { message } } = await communicationService.getDefaultMessage(messageId);
    //     editorData.value = message;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // if (route.query.defaultId) getDefaultMessage(route.query.defaultId);

    // const getMessage = async messageId => {
    //   try {
    //     const { message, subject: subj } = await composeService.getSMSById(messageId);
    //     editorData.value = message;
    //     subject.value = subj;
    //   } catch (error) {
    //     console.log(error)
    //     toast.add({
    //       severity: "error",
    //       summary: "Error",
    //       detail: "Could not load message!",
    //     });
    //   }
    // }

    // if (route.query.messageId) {
    //   getMessage(route.query.messageId);
    // }

    const uploadFile = (e) => {
      multipleContact.value = e.target.files[0]
    }

    return {
      editorData,
      editorConfig,
      possibleSMSDestinations,
      groupsAreVissible,
      toggleGroupsVissibility,
      selectedGroups,
      selectGroup,
      removeGroup,
      showSection,
      groupSelectionTab,
      membershipSelectionTab,
      phoneNumberSelectionTab,
      categories,
      allGroups,
      selectedMembers,
      removeMember,
      selectMember,
      searchText,
      filteredMembers,
      charactersCount,
      pageCount,
      // sendSMS,
      phoneNumber,
      searchForPerson,
      loading,
      memberSearchResults,
      // sendOptionsIsShown,
      // toggleSendOptionsDisplay,
      // closeDropdownIfOpen,
      // display,
      // showDateTimeSelectionModal,
      // scheduleMessage,
      // sendOptions,
      // draftMessage,
      groupListShown,
      showGroupList,
      groupSelectInput,
      memberListShown,
      showMemberList,
      memberSelectInput,
      invalidDestination,
      invalidMessage,
      // sendToAll,
      // sendModalHeader,
      // nigerian,
      // contructScheduleMessageBody,
      // executionDate,
      moment,
      isPersonalized,
      route,
      // disableBtn,
      contactUpload,
      uploadFile,
      multipleContact,
      sendSMSToUploadedContacts,
      session,
      qrCode,
      createSessionForWhatsapp,
      sessionId,
      getAllChats,
      getSessionId,
      getSessionForWhatsapp,
      connected,
      connect,
      disconnect,
      userWhatsappGroups,
      primarycolor,
      whatsappGroupSelectionTab,
      broadcastSelectionTab,
      userWhatsappGroupsId,
      sendWhatsappMessage,
      allSelectedNumbers,
      allcountries,
      allcountries,
      getUser,
      tenantCountry,
      whatsappGroupsLoading
    };
  },
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  /* border: none; */
  /* transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out; */
}

input:focus {
  outline: none;
}

.send-btn,
.discard-btn {
  background: #136acd;
  border-radius: 111px;
  color: #fff;
  outline: transparent;
  max-height: 40px;
}

.send-btn {
  border-radius: 111px 0 0 111px;
}

.send-btn-options {
  border-radius: 0 111px 111px 0;
  height: 30px;
  background: #136acd;
  padding: 1px 10px 8px;
  font-size: 22px;
  border-left: 1px solid #80808069;
}

.discard-btn {
  background: #fff;
  border: 1px solid #002044;
  border-radius: 111px;
  color: #000;
}

.dropdown-toggle {
  width: 100%;
  text-align: left;
  outline: transparent !important;
}

.dropdown-menu {
  width: 98%;
}

.dropdown-toggle::after {
  margin-left: auto;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  text-align: right !important;
  right: 10px;
  top: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dropdown-toggle:focus {
  outline: none !important;
  border: none;
}

.inp:focus {
  outline: none;
  border: none;
}

.email-destination {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e0d;
  border-radius: 8px;
  background: #02172e14;
}


.close-allcontacts {
  position: absolute;
  font-size: 18px;
  z-index: 100;
  top: 0;
  right: 0;
  padding: 0 10px;
  font-weight: bold;
  padding-top: 7px;
}

.remove-email {
  color: #000;
  font-weight: bold;
}

.remove-email:hover {
  cursor: pointer;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

.groups {
  max-height: 165px;
  overflow: auto;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
}

.hide-dd {
  display: none !important;
}

.subject-text {
  width: 60px;
}

.subject-field {
  width: calc(100% - 70px);
  border: none;
  padding: 0.5rem;
  outline: transparent;
}

.text-area {
  width: 100%;
  border: 1px solid #02172e30;
  outline: none;
  padding: 0.5rem;
  margin-bottom: -5px !important;
}

.disable {
  pointer-events: none;
}

.c-pointer {
  cursor: pointer;
}

.dropdown-menu {
  max-height: 300px !important;
  overflow-y: auto;
}

.send-now-div {
  border: 1px solid #ddd;
}

.modal-lg {
  max-width: 680px;
}

.modal-body {
  padding: 2rem !important;
}

.grey-background {
  background: #ebeff4;
}

.text-grey {
  color: grey;
}

.send-dropdown {
  border: 1px solid #ddd;
  width: 124px;
  position: absolute;
  background: #fff;
}

.send-dropdown a {
  color: #190138;
  font-size: 14px;
  text-decoration: none;
}

.hide {
  display: none;
}

.dd-item:hover {
  cursor: pointer;
}

.hint {
  font-size: 13px;
}

.amber {
  background: #ffbf00 !important;
}

.extra-btn {
  width: 100%;
}

/* Start SplitButton */

/* End SplitButton */

@media screen and (max-width: 630px) {
  .send-btn-options {
    padding: 1px 10px 7px;
  }
}

@media screen and (min-width: 400px) {
  .extra-btn {
    width: 80%;
  }
}
</style>

<style>
.ck-editor__editable {
  min-height: 300px;
}

.cursor-close {
  cursor: not-allowed;
}

.template-text {
  color: rgb(15, 71, 134)
}

.multiple_numbers {
  padding: 10px;
  border-radius: 5px;
  background: #eee;
}
</style>