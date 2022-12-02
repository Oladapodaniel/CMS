<template>
  <div>
    <div class="container" @click="closeDropdownIfOpen">
          <!-- {{groupData}}groupData -->
      <!-- <div class="container" @click="closeDropdownIfOpen"> -->
      <div class="row">
        <div class="col-md-12 mb-3 mt-3 offset-3 offset-md-0">
          <h4 class="font-weight-bold">Compose Email</h4>
          <Toast />

          <Dialog
            header="Select Date and Time"
            v-model:visible="display"
            :style="{ width: '50vw', maxWidth: '600px' }"
            :modal="true"
          >
            <div class="row">
              <div class="col-md-12">
                <input
                  type="datetime-local"
                  id="birthdaytime"
                  class="form-control"
                  name="birthdaytime"
                  v-model="executionDate"
                />
              </div>
            </div>
            <template #footer>
              <Button
                label="Cancel"
                icon="pi pi-times"
                @click="() => (display = false)"
                class="p-button-raised p-button-text p-button-plain mr-3"
                style="
                  color: #136acd;
                  background: #fff !important;
                  border-radius: 22px;
                "
              />
              <Button
                label="Schedule"
                class="p-button-rounded"
                style="background: #136acd"
                @click="contructScheduleMessageBody(2)"
              />
            </template>
          </Dialog>
        </div>
      </div>
        <!-- {{ selectedGroupMembers  }} 'yytyytytyty' -->
      <!-- <div class="row">
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div> -->

      <!-- <div class="row">
        <div class="col-3 col-lg-2 align-self-center">
          <span class="small-text">Send to : </span>
        </div>
        <div class="col-9 col-lg-10 form-group mb-0">
          <div class="dropdown">
            <button
              class="btn btn-default dropdown-toggle small-text"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              @click="closeDropdownIfOpen"
            >
              Select Destination
            </button>
            <div
              class="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                class="dropdown-item c-pointer small-text"
                v-for="(destination, index) in possibleEmailDestinations"
                :key="index"
                @click="showSection(index)"
                >{{ destination }}</a
              >
            </div>
          </div>
        </div>
      </div> -->

      <div class="row mb-1">
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div>

      <div class="row" v-if="sendToAll">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0">
          <span>
            <input
              class="form-control dropdown-toggle my-1 px-1 small-text"
              type="text"
              id="dropdownMenu"
              value="All Contacts"
              disabled
            />
            <span class="close-allcontacts c-pointer" @click="() => sendToAll = false">x</span>
          </span>
        </div>
      </div>

      <!-- Start TEst -->
      <div class="row mb-2" v-if="groupSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0 grey-rounded-border">
          <ul
            class="d-flex flex-wrap pl-1 mb-0 dd-item"
            @click="() => groupSelectInput.focus()"
          >
            <li
              style="list-style: none; min-width: 100px"
              v-for="(group, index) in selectedGroups"
              :key="index"
              class="email-destination d-flex justify-content-between m-1 small-text"
            >
              <!-- <span
              class="email-destination m-1"
              
            > -->
              <span class="small-text">{{ group.name }}</span>
              <span class="ml-2 remove-email" @click="removeGroup(index)"
                >x</span
              >
              <!-- </span> -->
            </li>
            <li style="list-style: none" class="">
              <input
                type="text"
                class="border-0 dd-item"
                ref="groupSelectInput"
                :class="{
                  'w-100': selectedGroups.length === 0,
                  'minimized-input-width': selectedGroups.length > 0,
                }"
                @focus="showGroupList"
                @click="showGroupList"
                style="padding: 0.5rem"
                :placeholder="`${
                  selectedGroups.length > 0 ? '' : 'Select groups'
                }`"
              />
            </li>
          </ul>
          <div
            class="col-md-12 px-2 select-groups-dropdown dd-item pt-2"
            v-if="groupListShown"
          >
            <div class="row dd-item" v-if="categories.length === 0">
              <div class="col-md-12 dd-item">
                <p class="small-text">No groups yet</p>
              </div>
            </div>
            <div
              class="row dd-item"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div class="col-md-12 dd-item" v-if="allGroups[index].length > 0">
                <div class="row dd-item">
                  <div class="col-md-12 dd-item">
                    <h6 class="text-uppercase dd-item font-weight-bold px-14">
                      {{ category }}
                    </h6>
                    <a
                      class="dropdown-item px-1 c-pointer dd-item"
                      v-for="(group, indx) in allGroups[index]"
                      @click="
                        selectGroup(
                          group.category,
                          group.id,
                          group.name,
                          index,
                          indx
                        )
                      "
                      :key="indx"
                    >
                      {{ group.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End TEst -->

      <!-- Start member TEst -->
      <div class="row" v-if="membershipSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 pl-0 grey-rounded-border">
          <ul
            class="d-flex flex-wrap px-1 mb-0 m-dd-item small-text"
            @click="() => memberSelectInput.focus()"
          >
            <li
              style="list-style: none; min-width: 100px"
              v-for="(member, indx) in selectedMembers"
              :key="indx"
              class="email-destination d-flex justify-content-between m-1"
            >
              <!-- <span
              class="email-destination m-1"
              
            > -->
              <span>{{ member.name }}</span>
              <span class="ml-2 remove-email" @click="removeMember(indx)"
                >x</span
              >
              <!-- </span> -->
            </li>
            <li style="list-style: none" class="m-dd-item">
              <input
                type="text"
                class="border-0 m-dd-item text"
                ref="memberSelectInput"
                @input="searchForPerson"
                :class="{
                  'w-100': selectedMembers.length === 0,
                  'minimized-input-width': selectedMembers.length > 0,
                }"
                @focus="showMemberList"
                @click="showMemberList"
                v-model="searchText"
                style="padding: 0.5rem"
                :placeholder="`${
                  selectedMembers.length > 0 ? '' : 'Select from members'
                }`"
              />
            </li>
          </ul>
          <div
            class="col-md-12 px-0 select-groups-dropdown m-dd-item small-text"
            v-if="memberListShown"
          >
            <div class="dropdownmenu pt-0 w-100 m-dd-item">
              <a
                class="dropdown-item px-1 c-pointer m-dd-item"
                v-for="(member, index) in memberSearchResults"
                :key="index"
                @click="selectMember(member, index)"
                >{{ member.name }}</a
              >
              <p
                class="bg-secondary p-1 mb-0 disable m-dd-item"
                v-if="
                  searchText.length < 3 &&
                  loading == false &&
                  memberSearchResults.length === 0
                "
              >
                Enter 3 or more characters
              </p>
              <p
                aria-disabled="true"
                class="btn btn-default p-1 mb-0 disable m-dd-item"
                v-if="
                  memberSearchResults.length === 0 &&
                  searchText.length >= 3 &&
                  !loading
                "
              >
                No match found
              </p>
              <p
                class="btn btn-default p-1 mb-0 disable m-dd-item"
                v-if="loading && searchText.length >= 3"
              >
                <i class="fas fa-circle-notch fa-spin m-dd-item"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End member TEst -->

      <!-- Select Person from DB -->
      <div class="col-md-12 my-1 px-0" v-if="false">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0 grey-rounded-border">
            <span
              class="email-destination m-1"
              v-for="(member, indx) in selectedMembers"
              :key="indx"
            >
              <span class="small-text">{{ member.name }}</span>
              <span class="ml-2 remove-email" @click="removeMember(indx)"
                >x</span
              >
            </span>

            <div class="dropdown">
              <!-- <input
                placeholder="Select persons"
                class="border-none dropdown-toggle my-1 px-1"
                type="text"
                id="dropdownMenu"
                @input="searchForPerson"
                v-model="searchText"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              /> -->

              <div
                class="dropdown-menu pt-0 w-100"
                aria-labelledby="dropdownMenu"
              >
                <a
                  class="dropdown-item px-1 c-pointer small-text"
                  v-for="(member, index) in memberSearchResults"
                  :key="index"
                  @click="selectMember(member, index)"
                  >{{ member.name }}</a
                >
                <p
                  class="bg-secondary p-1 mb-0 disable small-text"
                  v-if="
                    searchText.length < 3 &&
                    loading == false &&
                    memberSearchResults.length === 0
                  "
                >
                  Enter 3 or more characters
                </p>
                <p
                  aria-disabled="true"
                  class="btn btn-default p-1 mb-0 disable small-text"
                  v-if="
                    memberSearchResults.length === 0 &&
                    searchText.length >= 3 &&
                    !loading
                  "
                >
                  No match found
                </p>
                <p
                  class="btn btn-default p-1 mb-0 disable"
                  v-if="loading && searchText.length >= 3"
                >
                  <i class="fas fa-circle-notch fa-spin"></i>
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-md-12 grey-rounded-border groups"
            :class="{ hide: !groupsAreVissible }"
          >
            <div
              class="row"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-12 small-text">
                    <h4>{{ category }}</h4>
                    <p
                      v-for="(group, indx) in allGroups[index]"
                      @click="selectGroup(group.category, group.id, group.name)"
                      :key="indx"
                    >
                      {{ group.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enter phone numbers -->
      <div class="col-md-12 my-1 px-0" v-if="phoneNumberSelectionTab">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0">
            <textarea
              class="form-control w-100 px-1 grey-rounded-border"
              placeholder="Enter phone number(s)"
              v-model="phoneNumber"
            ></textarea>
          </div>
          <div
            class="col-md-12 grey-rounded-border groups"
            :class="{ hide: !groupsAreVissible }"
          >
            <div
              class="row"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-12">
                    <h4>{{ category }}</h4>
                    <p
                      v-for="(group, indx) in allGroups[index]"
                      @click="selectGroup(group.category, group.id, group.name)"
                      :key="indx"
                    >
                      {{ group.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="row mt-1"
        v-if="
          phoneNumberSelectionTab || membershipSelectionTab || groupSelectionTab
        "
      >
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-2">
          <span class="font-weight-600 small-text">Subject: </span>
        </div>
        <div class="col-md-10 px-0">
          <input
            type="text"
            class="input p-0 mx-0 grey-rounded-border pl-2 px-14"
            style="border-radius: 4px"
            v-model="subject"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-2">
          <span class="font-weight-600 small-text">Message: </span>
        </div>
        <div class="col-md-10 px-0">
          <!-- <textarea
            rows="10"
            class="text-area my-2"
            v-model="editorData"
          ></textarea> -->

          <div class="row">
            <div class="col-md-12">
              <div id="app">
                <!-- <ckeditor
                  :editor="editor"
                  v-model="editorData"
                  :config="editorConfig"
                ></ckeditor> -->
                <!-- <Editor v-model="editorData" @input="changed" editorStyle="height: 320px" /> -->

                <!-- <ckeditor id="ckeditor"
                  :editor="editor"
                  @ready="onReady"
                  v-model="editorData"
                  :config="editorConfig">
                </ckeditor> -->
                
              </div>
              <DecoupledEditor v-model="editorData" :loadedMessage="loadedMessage" :label="'you find me'" />
            </div>
          </div>

          <!-- <div class="col-md-12 px-0">
            <p
              class="bg-success mb-0 p-1 text-white font-weight-700 small-text"
              v-if="editorData.length > 0"
              :class="{ amber: charactersCount > 160 }"
            >
              <span>Characters count {{ charactersCount }}</span>
              <span class="float-right">Page {{ pageCount }}</span>
            </p>
          </div> -->
        </div>
      </div>

      <div class="row my-3">
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
              <span class="hint small-text"
                >Insert #name# any where you want the contact name to appear in
                the message, it will be replaced by the actual name of the
                member when sending the message.</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4 mb-5">
        <div class="col-md-12">
          <p
            class="mb-1 text-danger text-right font-weight-700"
            v-if="invalidDestination"
          >
            Please select destination
          </p>
          <p
            class="mb-1 text-danger text-right font-weight-700"
            v-if="invalidMessage"
          >
            Enter your message
          </p>
        </div>
        <div class="col-md-12 d-flex justify-content-end">
          <span>
            <SplitButton
              label="Send"
              :model="sendOptions"
              @click="contructScheduleMessageBody(1)"
            ></SplitButton>
            <!-- <SplitButton
              label="Send"
              :model="sendOptions"
              data-toggle="modal"
              data-target="#sendsmsbtn"
            ></SplitButton> -->
          </span>
          <!-- <router-link
          to="/tenant/peoplegroups:actionType"
            class="default-btn d-flex justify-content-center short-btn align-items-center ml-3 text-decoration-none text-dark"
          > -->
            <span class="btn default-btn ml-3" @click="closeModal" >Discard</span>
          <!-- </router-link> -->
        </div>

        <div class="row">
          <div class="col-md-12">
            <div
              class="modal fade"
              id="sendsmsbtn"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header grey-background">
                    <h5 class="modal-title" id="exampleModalLabel">
                      <i class="pi pi-user mr-2"></i>
                      {{ sendModalHeader }}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row" v-if="!nigerian">
                      <div class="col-md-12 text-center">
                        <button
                          class="primary-btn default-btn border-0 px-4 my-2 primary-bg text-white outline-none extra-btn"
                          data-dismiss="modal"
                          @click="sendSMS('')"
                        >
                          Send SMS Now {{ `${nigerian}` }}
                        </button>
                      </div>
                    </div>

                    <div class="row" v-else>
                      <div class="col-md-12">
                        <div class="row">
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
                                  <label
                                    for=""
                                    class="small-text font-weight-600 py-2"
                                    >NEW** BULK SMS - 100% SMS DELIVERY</label
                                  >
                                </div>
                                <div
                                  class="col-md-12 send-now-div py-2 my-2 d-flex justify-content-center"
                                >
                                  <button
                                    class="primary-btn default-btn primary-bg border-0 px-4 my-2 font-weight-600 outline-none"
                                    data-dismiss="modal"
                                    @click="sendSMS('hostedsms')"
                                  >
                                    Send SMS Now
                                  </button>
                                </div>
                                <div class="col-md-12 px-0">
                                  <hr class="hr my-2" />
                                </div>
                                <div class="col-md-12 px-0 d-flex flex-column">
                                  <span>Please note:</span>
                                  <span
                                    >100% delivery to all valid phone
                                    numbers.</span
                                  >
                                  <span>Not Affected by DND.</span>
                                  <span
                                    >Dedicated phone number: No sender
                                    customization.</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6 px-1">
                            <div class="container">
                              <div class="row">
                                <div class="col-md-12">
                                  <label
                                    for=""
                                    class="small-text font-weight-600 py-2"
                                    >REGULAR BULK SMS- PROVIDER</label
                                  >
                                </div>
                                <div
                                  class="col-md-12 my-2 send-now-div py-2 d-flex justify-content-center"
                                >
                                  <!-- hostedsms_instant -->
                                  <button
                                    class="primary-btn default-btn border-0 px-4 my-2 grey-background text-grey outline-none"
                                    data-dismiss="modal"
                                    @click="sendSMS('')"
                                  >
                                    Send SMS Now
                                  </button>
                                </div>
                                <div class="col-md-12 px-0">
                                  <hr class="hr my-2" />
                                </div>
                                <div class="col-md-12 px-0 d-flex flex-column">
                                  <span>Please note:</span>
                                  <span>Uses the regular bulk sms engine</span>
                                  <span
                                    >Delivery rate varies and is affected by DND
                                    number.</span
                                  >
                                  <span>Sender Name can be customized.</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="modal-footer">
                    
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { computed, onMounted, ref, watchEffect} from "vue";
import composeService from "../../../services/communication/composer";
import composerObj from "../../../services/communication/composer";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import store from "../../../store/store";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../../services/progressbar/progress";
import communicationService from '../../../services/communication/communicationservice';
import dateFormatter from "../../../services/dates/dateformatter";
// import Editor from 'primevue/editor';

import swal from "sweetalert";
// import CKEditor from "@ckeditor/ckeditor5-vue";
import MyUploadAdapter from "../../../services/editor/editor_uploader"
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

import DecoupledEditor from '@/components/RichEditor';

export default {
props: ['selectedGroupMembers', 'groupData'],
emits: ['closesidemodal'],
  components: { 
    // Editor
    // ckeditor: CKEditor.component,
    DecoupledEditor,
  },
  setup(props, { emit }) {
    const router = useRouter()
    const toast = useToast();
    const editorData = ref("");
    const selectedMembers = ref([]);

    const onReady = (editor) => {
      // Customize upload picture plugin
      editor.plugins.get("FileRepository").createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      };
    }

    const possibleEmailDestinations = composeService.possibleEmailDestinations;
    const groupsAreVissible = ref(false);
    const groupSelectionTab = ref(false);
    const membershipSelectionTab = ref(false);
    const phoneNumberSelectionTab = ref(false);
    const selectedGroups = ref([]);
    const sendToAll = ref(false);
    const executionDate = ref('');
    const email = ref("");

    const toggleGroupsVissibility = () => {
      groupsAreVissible.value = !groupsAreVissible.value;
    };
     watchEffect( () => {
        // alert(props.phoneNumbers)
         if (props.selectedGroupMembers) selectedMembers.value = props.selectedGroupMembers
    })
     watchEffect( () => {
        // alert(props.phoneNumbers)
         if (props.groupData) selectedGroups.value = props.groupData
    } )
    const showSection = (index) => {
      if (index === 1) groupSelectionTab.value = true;
      if (index === 2) membershipSelectionTab.value = true;
      if (index === 3) phoneNumberSelectionTab.value = true;
      if (index === 0) {
        sendToAll.value = true;
        selectedGroups.value.push({ data: "membership_00000000-0000-0000-0000-000000000000", name: "All Contacts"
        })
      }
    };

    const sendOptionsIsShown = ref(false);
    const toggleSendOptionsDisplay = () =>
      (sendOptionsIsShown.value = !sendOptionsIsShown.value);

    const closeDropdownIfOpen = (e) => {
      if (!e.target.classList.contains("dd-item")) {
        sendOptionsIsShown.value = false;
        groupListShown.value = false;
      }

      if (!e.target.classList.contains("m-dd-item")) {
        memberListShown.value = false;
      }
    };

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


    const subject = ref("");
    const phoneNumber = ref("");
    const loading = ref(false);
    // const isPersonalized = ref(false);

    const isoCode = ref("");
    const isPersonalized = ref(false);
    const invalidMessage = ref(false);
    const invalidDestination = ref(false);

    const sendEmail = (data) => {
      console.log(data, "DATA");
      invalidDestination.value = false;
      invalidMessage.value = false;

      if (
        selectedGroups.value.length === 0 &&
        !phoneNumber.value &&
        selectedMembers.value.length === 0 &&
        !sendToAll.value
      ) {
        invalidDestination.value = true;
        return false;
      }

      if (!editorData.value) {
        invalidMessage.value = true;
        return false;
      }

      toast.add({
        severity: "info",
        summary: "Sending Email",
        detail: "Email is being sent....",
        life: 2500,
      });
      
      composeService
        .sendMessage("/api/Messaging/sendEmail", data)
        .then((res) => {
          if (res.status === 200) {
            store.dispatch('communication/addToSentEmail', res.data.mail)
             toast.add({
              severity: "success",
              summary: "Sent",
              detail: "Email sent successfully",
              life: 4000,
            }); 
          }          
        })
        .catch((err) => {
          stopProgressBar();
          if (err.toString().toLowerCase().includes('network error')) {
            toast.add({
              severity: "warn",
              summary: "You 're Offline",
              detail: "Please ensure you have internet access",
              life: 2500,
            });
          } else {
            toast.add({
              severity: "error",
              summary: "Not Sent",
              detail: "Email sending failed",
              life: 2500,
            });
            console.log(err)
          }
        });
    };

    const contructScheduleMessageBody = (sendOrSchedule) => {
      const data = {
        subject: subject.value,
        message: `<!DOCTYPE html>
        <html lang="en">
            <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
              <style>
                #email-body img {
                  width: 100% !important;
                  max-width: 1000px !important;
                  margin-left: auto;
                  margin-right: auto;
                  max-height: 300px;
                  object-fit: contain;
                  display: flex;
                  justify-content: center;
                }
                
                #email-body img {
                  display: flex;
                  justify-content: center;
                }
                
                #email-body figure {
                  margin: auto;
                }
              </style>
            </head>
            <body>
              <div id="email-body" style="max-width: 1000px; margin: auto"> ${editorData.value} </div>
            </body>
          </html>`,
        isPersonalized: isPersonalized.value,
        groupedContacts: selectedGroups.value.map((i) => i.data),
      };

      if (selectedMembers.value.length > 0) {
        data.ToContacts = data && data.ToContacts ? data.ToContacts.length > 0 ? "," : "" : "";
        data.ToContacts += selectedMembers.value
          .map((i) => {
            if (i.id) return i.id;
          })
          .join();
      }


      if (sendOrSchedule == 2) {
        data.executionDate = executionDate.value;
        scheduleMessage(data);
      } else {
        sendEmail(data);
      }
    };

    const showScheduleModal = () => {
      display.value = true;
    };

    const scheduleMessage = async (data) => {
      display.value = false;
      const formattedDate = dateFormatter.monthDayTime(data.executionDate);
      try {
        await composerObj.sendMessage(
          "/api/Messaging/saveEmailSchedule",
          data
        );
        toast.add({
          severity: "success",
          summary: "message Scheduled",
          detail: `Message scheduled for ${formattedDate}`,
        });
      } catch (error) {
        console.log(error);
        toast.add({
          severity: "error",
          summary: "Schedule Failed",
          detail: "Could not schedule message",
        });
      }
    };

    const draftMessage = async () => {
      try {
        await composerObj.saveDraft("/api/Messaging/saveEmaillDraft", {
          subject: subject.value,
          body: editorData.value,
          isDefaultBirthDayMessage: false,
        });
        store.dispatch("communication/getEmailDrafts");
        toast.add({
          severity: "success",
          summary: "Draft Saved",
          detail: "Message saved as draft",
          life: 2500,
        });
      } catch (error) {
        console.log(error, "drafting error");
        toast.add({
          severity: "warn",
          summary: "Error",
          detail: "Message not saved as draft",
          life: 2500,
        });
      }
    };

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

    

    const onEditorReady = () => {
      if (route.query.emaildraft) {
        communicationService.getEmailDraftById(route.query.emaildraft)
          .then(res => {
            console.log(res)
            if (res) {
              subject.value = res.subject;
              editorData.value = res.body;
            }
          })
      }
    }
    onEditorReady()

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

    const sendModalHeader = computed(() => {
      if (userCountry.value !== "Nigeria") return "Confirm Send";
      return "Send SMS Alternative";
    });

    const nigerian = computed(() => {
      if (userCountry.value === "Nigeria") return true;
      return false;
    });

    const sendOptions = [
      {
        label: "Schedule",
        icon: "pi pi-clock",
        command: () => {
          showScheduleModal();
        },
      },
      {
        label: "Save as Draft",
        icon: "pi pi-save",
        command: () => {
          draftMessage();
        },
      },
      // {
      //   label: "Upload",
      //   icon: "pi pi-upload",
      //   to: "/fileupload",
      // },
    ];

    const allGroups = ref([]);
    const categories = ref([]);
     const closeModal = () => {
            emit('closesidemodal')
            
        }
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
    });

    const display = ref(false);
    const showDateTimeSelectionModal = () => {
      display.value = !display.value;
    };

    const groupListShown = ref(false);
    const showGroupList = () => {
      groupListShown.value = true;
    };

    const memberListShown = ref(false);
    const showMemberList = () => {
      memberListShown.value = true;
    };
    const groupSelectInput = ref(null);
    const memberSelectInput = ref(null);

    const loadedMessage = ref("")
    const getMessage = async messageId => {
      try {
          const { message, subject: subj } = await composeService.getSMSById(messageId);
          loadedMessage.value = message;
          // console.log( loadedMessage.value, 'MESSAGESSS');
          subject.value = subj;
          //  console.log( subject.value, 'SUBJECTSS');
      } catch (error) {
          console.log(error)
          toast.add({
          severity: "error",
          summary: "Error",
          detail: "Could not load email!",
          });
      }
    }

    if (route.query.messageId) {
      getMessage(route.query.messageId);
    }

    return {
      loadedMessage,
      editorData,
      possibleEmailDestinations,
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
      sendEmail,
      phoneNumber,
      searchForPerson,
      loading,
      memberSearchResults,
      subject,
      sendOptionsIsShown,
      toggleSendOptionsDisplay,
      closeDropdownIfOpen,
      display,
      showDateTimeSelectionModal,
      scheduleMessage,
      sendOptions,
      draftMessage,
      groupListShown,
      showGroupList,
      groupSelectInput,
      memberListShown,
      showMemberList,
      memberSelectInput,
      invalidDestination,
      invalidMessage,
      sendToAll,
      sendModalHeader,
      nigerian,
      onEditorReady,
      contructScheduleMessageBody,
      executionDate,
      isPersonalized,
      email,
      onReady,
      closeModal
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
  -ms-overflow-style: none; /* IE and Edge */
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
</style>