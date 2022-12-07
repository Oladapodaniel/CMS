<template>
  <div class="my-con">
    <div class="summary px-3">
      <p class="summary-header">Summary</p>

      <div class="boards">
        <div class="board">
          <div class="board-top">
            <p class="total-text mb-0">TOTAL MEMBERS</p>
            <img class="trend-icon" src="../../assets/dashboardlinks/trend-icon.svg" alt="" />
          </div>
          <h4 class="total">{{ membershipSummary.totalMember }}</h4>
          <p>
            <span class="primary--text">+{{ membershipSummary.percentageGrowth }}%
            </span>
            <span> Since last month</span>
          </p>
        </div>
        <div class="chart-con">
          <div style="width: 45%" class="ml-md-4 chart1">
            <ByGenderChart domId="chart" title="By Gender" distance="5" :titleMargin="10"
              :summary="membershipSummary.genders" />
          </div>
          <div style="width: 45%" class="chart2">
            <ByMaritalStatusChart domId="second" title="By Marital Status" :titleMargin="5"
              :summary="membershipSummary.maritalStatus" />
          </div>
        </div>
      </div>
    </div>


    <el-dialog v-model="addToGroupDialog" title="Add all Members To Group"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center>
      <el-select-v2 v-model="chooseGrouptoMoveAllMembers" :options="getAllGroups" label="Select a group"
        placeholder="Select a group" size="large" class="w-100" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addToGroupDialog = false" color="#136acd" round plain>Cancel</el-button>
          <el-button type="primary" color="#136acd" :loading="allGroupLoading" @click="getAllMembersAndAddToGroup"
            round>
            Add to group
          </el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog v-model="addToGroupSingle" title="Add Member(s) To Group"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center>
      <el-select-v2 v-model="chooseGrouptoMoveto" :options="getAllGroups" label="Select a group"
        placeholder="Select a group" size="large" class="w-100" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addToGroupSingle = false" color="#136acd" round plain>Cancel</el-button>
          <el-button type="primary" color="#136acd" :loading="singleGroupLoading" @click="moveMemberToGroup" round>
            Add to group
          </el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog v-model="displayPositionArchive" title="Archive member(s)"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center>
      <p class="p-m-0">You are about to archive your member(s). Do you want to continue ?</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="displayPositionArchive = false" color="#136acd" round plain>No</el-button>
          <el-button type="primary" color="#136acd" :loading="archiveLoading" @click="archive('', 'multiple')" round>
            Yes
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="table-top p-3 mt-5">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
          <el-tooltip class="box-item" effect="dark" content="Add all members to group" placement="top-start">
            <el-icon :size="20" class="c-pointer" @click="addToGroupDialog = true">
              <CirclePlus />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" v-if="marked.length > 0" content="Add to group"
            placement="top-start">
            <el-icon class="ml-2 c-pointer" :size="20" @click="(addToGroupSingle = true)">
              <User />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" v-if="marked.length > 0" content="Archive member(s)"
            placement="top-start">
            <el-icon class="ml-2 c-pointer" :size="20" @click="(displayPositionArchive = true)"
              v-if="marked.length > 0">
              <DocumentRemove />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" v-if="marked.length > 0" content="Delete member(s)"
            placement="top-start">
            <el-icon :size="20" class="ml-2 c-pointer" v-if="marked.length > 0" @click="showConfirmModal1">
              <Delete />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" v-if="marked.length > 0" content="Send SMS" placement="top-start">
            <el-icon :size="20" class="ml-2 c-pointer" v-if="marked.length > 0" @click="sendMarkedMemberSms">
              <Message />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" v-if="marked.length > 0" content="Send Email"
            placement="top-start">
            <el-icon :size="20" class="ml-2 c-pointer" v-if="marked.length > 0" @click="sendMarkedMemberEmail">
              <MessageBox />
            </el-icon>
          </el-tooltip>
        </div>
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
          <div>
            <p @click="toggleFilterFormVissibility" class="mb-0 mr-3 d-flex my-3 my-sm-0 c-pointer">
              <el-icon :size="13">
                <Filter />
              </el-icon>
              <span class="ml-1"> FILTER</span>
            </p>
          </div>
          <el-input size="small" v-model="searchText" placeholder="Search..."
            @keyup.enter.prevent="searchPeopleInDB($event)" class="input-with-select">
            <template #append>
              <el-button @click.prevent="searchPeopleInDB($event)">
                <el-icon :size="13">
                  <Search />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="filter-options" :class="{ 'filter-options-shown': filterFormIsVissible }">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-9">
            <div class="row">
              <div class="
                    col-12 col-sm-6
                    offset-sm-3 offset-md-0
                    form-group
                    inp
                    w-100
                  ">
                <el-input placeholder="First name" class="w-100" v-model="filter.name" @input="setFilteredValue" />
              </div>
              <div class="col-12 col-sm-6 form-group d-none d-md-block">
                <el-input placeholder="Phone number" class="w-100" v-model="filter.phoneNumber" />
              </div>
            </div>
          </div>

          <div class="col-md-3 d-flex flex-column align-items-center">
            <el-button color="#136acd" @click="applyFilter" :loading="applyLoading" :disabled="disableBtn"
              round>Apply</el-button>
            <span class="mt-2">
              <el-button @click="clearAll" class="mr-2" text>Clear all</el-button>
              <el-button @click="hide" class="mx-2" text>Hide</el-button>
            </span>
          </div>
        </div>
      </div>
    </div>


    <EasyDataTable v-model:items-selected="marked" v-model:server-options="serverOptions" :rowsPerPage="100"
      :loading="paginatedTableLoading" :server-items-length="serverItemsLength" :headers="memberHeaders"
      :items="searchMember" buttons-pagination alternating>
      <template #item-pictureurl="{ pictureUrl }">
        <div>
          <el-card shadow="hover" class="c-pointer person-image" v-if="pictureUrl"
            style="border-radius: 50%; height: 26px; width: 26px;">
            <el-tooltip class="box-item" effect="dark" content="Click to view" placement="top-start">
              <img :src="pictureUrl" alt="" @click="(selectedImageUrl = pictureUrl), (imageDialog = true)"
                style="border-radius: 50%; height: 26px; width: 26px; object-fit: cover" />

              <!-- @click-row="showMemberRow" -->
            </el-tooltip>
          </el-card>
          <el-avatar :size="25" v-else><el-icon color="#000000">
              <UserFilled />
            </el-icon></el-avatar>
        </div>
      </template>
      <template #item-firstname="item">
        <div class="c-pointer" @click="showMemberRow(item)">
          {{ item.firstName }}
        </div>
      </template>
      <template #item-lastname="item">
        <div class="c-pointer" @click="showMemberRow(item)">
          {{ item.lastName }}
        </div>
      </template>
      <template #item-mobilephone="item">
        <div class="c-pointer" @click="showMemberRow(item)">
          {{ item.mobilePhone }}
        </div>
      </template>
      <template #item-action="item">
        <div>
          <el-dropdown trigger="click">
            <el-icon>
              <MoreFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link :to="
                    item.mobilePhone
                      ? `/tenant/sms/compose?phone=${item.mobilePhone}`
                      : ''
                  " :class="{ 'fade-text': !item.mobilePhone, 'text-color': item.mobilePhone }">Send
                    SMS</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="
                    item.email
                      ? `/tenant/email/compose?phone=${item.email}`
                      : ''
                  " :class="{ 'fade-text': !item.email, 'text-color': item.email }">Send Email</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click="archive(item.id, 'single')">
                  <div class="text-color">Archive</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="`/tenant/firsttimermanagement/${item.id}?memberType=1`" class="text-color">
                    Follow Up
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item><router-link :to="`/tenant/people/add/${item.id}`"
                    class="text-color">Edit</router-link></el-dropdown-item>
                <el-dropdown-item>
                  <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">Delete</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </EasyDataTable>

    <el-dialog v-model="imageDialog" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center>
      <el-image class="w-100" :src="selectedImageUrl" fit="contain" />
      <template #footer>
        <span class="dialog-footer">
          <el-button color="#136acd" @click="imageDialog = false" round>
            Done
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <SideBar :show="showSMS" :title="'Compose SMS'" @closesidemodal="() => showSMS = false">
    <div class="m-wrapper" :class="{ 'm-wrapper': showSMS, 'no-show': !showSMS }">
      <smsComponent :phoneNumbers="contacts" @closesidemodal="() => showSMS = false" />
    </div>
  </SideBar>
  <SideBar :show="showEmail" :title="'Compose Email'" @closesidemodal="() => showEmail = false">
    <div class="m-wrapper2">
      <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" />
    </div>
  </SideBar>

</template>

<script>
import { ref, computed, watch, watchEffect } from "vue";
import ByGenderChart from "@/components/charts/PieChart.vue";
import ByMaritalStatusChart from "@/components/charts/PieChart.vue";
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
import store from "../../store/store";
import stopProgressBar from "../../services/progressbar/progress";
import membershipservice from "../../services/membership/membershipservice";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";
import SideBar from "../groups/sidemodal/SideModal.vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage, ElMessageBox } from 'element-plus'
import router from "../../router/index"

export default {
  props: ["list", "peopleCount"],
  components: {
    ByGenderChart,
    ByMaritalStatusChart,
    smsComponent,
    emailComponent,
    SideBar
  },

  setup(props) {
    const addClass = ref(false)
    const churchMembers = ref([]);
    const filterFormIsVissible = ref(false);
    const filter = ref({});
    const searchIsVisible = ref(false);
    const filterResult = ref([]);
    const selectAll = ref(false);
    const noRecords = ref(false);
    const searchText = ref("");
    const showSMS = ref(false)
    const showEmail = ref(false)
    const contacts = ref([])
    const markedMembers = ref([])
    const chooseGrouptoMoveAllMembers = ref("")
    const currentUser = ref({})
    const route = useRoute();
    const displayPositionArchive = ref(false);
    const filtered = ref(false);
    const memberHeaders = ref([
      { text: 'PICTURE', value: 'pictureUrl' },
      { text: 'FIRSTNAME', value: 'firstName' },
      { text: 'LASTNAME', value: 'lastName' },
      { text: 'PHONE', value: 'mobilePhone' },
      { text: 'Action', value: 'action' },
    ])
    const serverItemsLength = ref(0);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 100,
    });
    const paginatedTableLoading = ref(false)
    const selectedImageUrl = ref("")
    const imageDialog = ref(false)
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
    const addToGroupDialog = ref(false)
    const allGroupLoading = ref(false)
    const addToGroupSingle = ref(false)
    const singleGroupLoading = ref(false)
    const archiveLoading = ref(false)
    const applyLoading = ref(false)

    watch(serverOptions, () => {
      getPeopleByPage();
    },
      { deep: true }
    );

    const showMemberRow = (item) => {
      router.push(`/tenant/people/add/${item.id}`)
    }

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const membershipSummary = ref([]);

    const deleteMember = (id) => {
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then((res) => {
          churchMembers.value = churchMembers.value.filter(
            (item) => item.id !== id
          );
          if (res.data.response.includes("@")) {
            let disRes = res.data.response.split("@")

            ElMessage({
              type: 'info',
              message: disRes[0],
            })
          } else {
            ElMessage({
              type: 'success',
              message: 'Member deleted successfully',
            })
          }
          store.dispatch("membership/removeMember", id);
          axios
            .get(`/api/People/GetMembershipSummary`)
            .then((res) => {
              membershipSummary.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });

          if (filterResult.value.length > 0 && filtered.value && filter.value.name) {
            filterResult.value = filterResult.value.filter(
              (item) => item.id !== id
            );
          }

          if (searchText.value !== "" && searchPeopleNamesInDB.value.length > 0) {
            searchPeopleNamesInDB.value = searchPeopleNamesInDB.value.filter(
              (item) => item.id !== id
            );
          }
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage.error('Delete failed, please try again')
          console.log(err);
        });
    };

    const hide = () => {
      filterFormIsVissible.value = false;
    };

    const disableBtn = computed(() => {
      if (!filter.value.name && !filter.value.phoneNumber) return true;
      return false;
    });

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          deleteMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    const getPeopleByPage = async () => {
      paginatedTableLoading.value = true
      try {
        const { data } = await axios.get(
          `/api/People/GetPeopleBasicInfo?page=${serverOptions.value.page}`
        );
        churchMembers.value = data;
        paginatedTableLoading.value = false
      } catch (error) {
        paginatedTableLoading.value = false
        console.log(error);
      }
    };

    const getMemberSummary = () => {
      axios
        .get(`/api/People/GetMembershipSummary`)
        .then((res) => {
          membershipSummary.value = res.data;
        })
        .catch((err) => console.log(err));

    }
    getMemberSummary()

    const marked = ref([]);
    const mark = (member) => {
      const memberIndex = marked.value.findIndex((i) => i.id === member.id);
      if (memberIndex < 0) {
        marked.value.push(member);
      } else {
        marked.value.splice(memberIndex, 1);
      }
    };

    //function to mark all item
    const markAll = () => {
      if (marked.value.length < churchMembers.value.length) {
        churchMembers.value.forEach((i) => {
          const memberInmarked = marked.value.findIndex((j) => j.id === i.id);
          if (memberInmarked < 0) {
            marked.value.push(i);
          }
        });
      } else {
        marked.value = [];
      }
    };

    const markOne = (person) => {
      const msgIndex = marked.value.findIndex((i) => i.id === person.id);
      if (msgIndex < 0) {
        marked.value.push(person);
      } else {
        marked.value.splice(msgIndex, 1);
      }
    };

    // Delete item
    const deleteMarked = async () => {
      try {
        // const IDs = marked.value.map((i) => i.id).join();
        const IDs = marked.value.map((i) => i.id);
        const response = await membershipservice.deletePeople(IDs);

        if (response && response.response && response.response.toString().toLowerCase().includes("all")) {
          ElMessage({
            type: 'success',
            message: 'Delete successfully',
          })

          churchMembers.value = churchMembers.value.filter((item) => {
            const y = marked.value.findIndex((i) => i.id === item.id);
            if (y >= 0) return false;
            return true;
          });
        } else {
          let displayRes = response && response.response ? response.response.split("@") : "";
          ElMessage({
            type: 'info',
            message: `${displayRes[0]}`,
          })

          if (displayRes[1] !== "") {
            if (!displayRes[1].includes(",")) {
              churchMembers.value = churchMembers.value.filter((item) => {
                return !item.id.includes(displayRes[1]);
              });
            } else {
              let IDs = displayRes[1].split(",");
              churchMembers.value = churchMembers.value.filter((item) => {
                const y = IDs.findIndex((i) => i === item.id);
                if (y >= 0) return false;
                return true;
              });
            }
          }
        }
        marked.value = [];
        store.dispatch("membership/removeMember");
        getMemberSummary();
      } catch (error) {
        console.log(error);
        ElMessage({
          type: 'warning',
          message: 'Delete failed, please try again',
        })
        // }
      }
    };

    const showConfirmModal1 = () => {
      ElMessageBox.confirm(
        'This action will permanently delete the member(s). Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          deleteMarked();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };


    watchEffect(() => {
      churchMembers.value = props.list
      serverItemsLength.value = membershipSummary.value.totalMember
    })

    const toggleSelect = () => {
      selectAll.value = !selectAll.value;
    };

    const setFilteredValue = (e) => {
      if (e.length == 0) {
        filtered.value = false
      }
    }

    const applyFilter = () => {
      applyLoading.value = true
      filter.value.name =
        filter.value.name == undefined ? "" : filter.value.name;
      filter.value.phoneNumber =
        filter.value.phoneNumber == undefined ? "" : filter.value.phoneNumber;

      let url =
        "/api/People/FilterMembers?firstname=" +
        filter.value.name +
        "&lastname=" +
        filter.value.name +
        "&phone_number=" +
        filter.value.phoneNumber +
        "&page=1";
      axios
        .get(url)
        .then((res) => {
          filtered.value = true
          noRecords.value = true;
          filterResult.value = res.data;
          applyLoading.value = false
        })
        .catch((err) => {
          applyLoading.value = false
          console.log(err)
        });
    };

    const clearAll = () => {
      filter.value.name = "";

      filter.value.filterDate = "";
      filter.value.phoneNumber = "";
    };

    const searchPeopleNamesInDB = ref([]);
    const searchPeopleInDB = (e) => {
      e.preventDefault();
      paginatedTableLoading.value = true;
      let url =
        `/api/Membership/GetSearchedUSers?searchText=${searchText.value}`;
      axios
        .get(url)
        .then((res) => {
          paginatedTableLoading.value = false;
          searchPeopleNamesInDB.value = res.data.map((i) => {
            return {
              firstName: i.name.split(" ")[0],
              lastName: i.name.split(" ")[1],
              mobilePhone: i.phone,
              email: i.email,
              id: i.id
            }
          })
        })
        .catch((err) => {
          paginatedTableLoading.value = false;
          console.log(err);
        });
    };

    const listOfPeople = computed(() => {
      if (searchText.value !== "") return searchPeopleNamesInDB.value;
      return churchMembers.value;
    });
    // Tosin

    const searchMember = computed(() => {
      if (searchText.value !== "" && searchPeopleNamesInDB.value.length > 0) {
        return searchPeopleNamesInDB.value;
      } else if (searchText.value !== "" && searchPeopleNamesInDB.value.length == 0 && paginatedTableLoading.value) {
        return []
      } else if (filterResult.value.length > 0 && filtered.value && filter.value.name) {
        return filterResult.value;
      } else if (filterResult.value.length == 0 && filtered.value && filter.value.name) {
        return []
      } else {
        return churchMembers.value;
      }
    });

    const membersCount = computed(() => {
      if (membershipSummary.value.totalMember > 100)
        return Math.ceil(membershipSummary.value.totalMember / 100);
      return 1;
    });

    const clearInput = () => {
      searchText.value = "";
    };

    const getAllGroups = ref([]);
    const getGroups = () => {
      axios
        .get(`/api/GetAllGroupBasicInformation`)
        .then((res) => {
          getAllGroups.value = res.data.map((i) => {
            return {
              label: i.name,
              value: i.id
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getGroups();

    const chooseGrouptoMoveto = ref("");
    const moveMemberToGroup = () => {
      singleGroupLoading.value = true
      let peopleMoved = marked.value.map((i) => {
        return {
          groupId: chooseGrouptoMoveto.value,
          position: "member",
          personId: i.id,
        };
      });
      axios
        .put(`/api/AssignPeopleToGroup/${chooseGrouptoMoveto.value}`, {
          people: peopleMoved,
        })
        .then(() => {
          singleGroupLoading.value = false
          addToGroupSingle.value = false

          ElMessage({
            message: "Member added successfully",
            type: 'success',
          })

          store.dispatch("groups/updateGroupPeopleCount", {
            groupId: chooseGrouptoMoveto.value,
            count: marked.value.length,
            operation: "add",
          });

          marked.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            message: "Adding Member(s) failed, please try again",
            type: 'error',
          })
          singleGroupLoading.value = false
          addToGroupSingle.value = false
        });
    };

    const sendMarkedMemberSms = () => {
      contacts.value = marked.value.filter((i) => i.mobilePhone).map((i) => i.mobilePhone).join()
      showSMS.value = true;
    }

    const sendMarkedMemberEmail = () => {
      showEmail.value = true;
      markedMembers.value = marked.value.map((i) => {
        i.id = i.id
        return i
      });

    }

    const getAllMembersAndAddToGroup = () => {
      allGroupLoading.value = true
      axios
        .post(`/api/Group/AddAllMembersToGroup?groupId=${chooseGrouptoMoveAllMembers.value}&tenantId=${currentUser.value.tenantId}`)
        .then(() => {
          ElMessage({
            message: 'All members have been added successfully',
            type: 'success',
          })
          addToGroupDialog.value = false
          allGroupLoading.value = false
        })
        .catch((err) => {
          allGroupLoading.value = false
          addToGroupDialog.value = false
          console.log(err);
        });
    }
    // const getCurrentlySignedInUser = async () => {
    //   if (!store.getters.currentUser) {
    //     axios
    //       .get("/api/Membership/GetCurrentSignedInUser")
    //       .then((res) => {
    //         currentUser.value = res.data
    //         console.log('from backend')
    //       })
    //       .catch((err) => console.log(err.response));
    //     } else {
    //       console.log('From store')
    //       currentUser.value = store.getters.currentUser
    //     }
    // }
    // getCurrentlySignedInUser()

    // const getUser = computed(() => {
    //   if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
    //   return store.getters.currentUser
    // })

    // watchEffect(() => {
    //   if (getUser.value) {
    //     currentUser.value = getUser.value
    //   }
    // })

    const openPositionArchive = () => {
      displayPositionArchive.value = true;
    };

    const archive = async (id, type) => {
      archiveLoading.value = true
      let archiveBody = type == 'single' ? [id] : marked.value.map(i => i.id)
      try {
        const { data } = await axios.post("/api/People/archive", archiveBody);
        archiveLoading.value = false
        displayPositionArchive.value = false
        if (data && type == 'single') {
          churchMembers.value = churchMembers.value.filter((item) => {
            return item.id !== id
          });
          ElMessage({
            message: 'Member archived succesfully',
            type: 'success',
          })
        }
        if (data && type == 'multiple') {
          churchMembers.value = churchMembers.value.filter((item) => {
            let y = marked.value.findIndex(j => j.id == item.id)
            if (y >= 0) return false
            return true
          });
          ElMessage({
            message: 'Members archived succesfully',
            type: 'success',
          })
        }
      } catch (err) {
        archiveLoading.value = false
        displayPositionArchive.value = false
        console.log(err);
      }
    }

    return {
      churchMembers,
      getAllMembersAndAddToGroup,
      getPeopleByPage,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      membershipSummary,
      deleteMember,
      filter,
      applyFilter,
      clearAll,
      hide,
      disableBtn,
      toggleSearch,
      searchIsVisible,
      showConfirmModal,
      filterResult,
      selectAll,
      toggleSelect,
      noRecords,
      searchText,
      membersCount,
      marked,
      mark,
      markAll,
      markOne,
      deleteMarked,
      clearInput,
      showConfirmModal1,
      getGroups,
      getAllGroups,
      chooseGrouptoMoveto,
      moveMemberToGroup,
      searchPeopleInDB,
      listOfPeople,
      searchMember,
      sendMarkedMemberSms,
      showSMS,
      sendMarkedMemberEmail,
      showEmail,
      contacts,
      markedMembers,
      chooseGrouptoMoveAllMembers,
      route,
      currentUser,
      addClass,
      archive,
      openPositionArchive,
      displayPositionArchive,
      filtered,
      setFilteredValue,
      memberHeaders,
      serverItemsLength,
      serverOptions,
      paginatedTableLoading,
      selectedImageUrl,
      imageDialog,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      showMemberRow,
      addToGroupDialog,
      allGroupLoading,
      addToGroupSingle,
      singleGroupLoading,
      archiveLoading,
      applyLoading
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.m-wrapper {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  padding: 70px;
  transition: all 3s ease-out;
}

.m-wrapper2 {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  /* height: 100%; */
  padding: 70px;
}

.no-show {
  width: -875px;
  transition: all 3s ease-out;
  /* transition: all  8s cubic-bezier(0.645, 0.045, 0.355, 1); */
}

.summary {
  /* border-radius: 30px; */
  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 2px 7.5px rgb(0 0 0 / 6%);
  /* border: 1px solid #00204424; */
}

.summary-header {
  margin: -0.8rem 10px 0.5rem 10px;
  color: #136acd;
  opacity: 0.8;
  font-size: 22px;
  font-weight: 600;
}

.boards {
  display: flex;
}

.board {
  width: 28%;
  border-radius: 10px;
  padding: 0 8px;
}

.chart-con {
  width: 70%;
  display: flex;
  justify-content: space-between;
}

.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 4px;
}

.total {
  margin-bottom: 40px;
  font-size: 37px;
}

.total-text {
  font-size: 15px;
  font-weight: 700;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #E0E0E0;
  border-bottom: none;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  background: #ffffff;
  border-right: 1px solid #E0E0E0;
  border-left: 1px solid #E0E0E0;
}

.filter-options-shown {
  height: 80px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}


.text-color:hover {
  color: #007bff;
}

.color-deleteicon {
  color: rgba(184, 5, 5, 0.726);
}

.fade-text {
  color: #a8a8a8;
  cursor: not-allowed;
}

.text-color {
  color: #212529;
}

@media screen and (max-width: 500px) {

  .chart1,
  .chart2,
  .board,
  .chart-con {
    width: 100% !important;
  }


  .data-text {
    display: inline-block;
  }


  
}

@media screen and (min-width: 500px) {
  .picture>p {
    margin-left: 43px;
  }

  .table-body .check {
    width: 4%;
  }

  .action {
    width: 20%;
  }
}

@media (max-width: 767px) {
  .filter-options-shown {
    height: 150px;
  }

  .data-text {
    display: none;
  }

  .alignLeft {
    float: right;
  }
}

@media screen and (max-width: 768px) {
  .board-top {
    margin-bottom: 10px;
  }

  .total {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }

  .summary-header {
    width: 50%;
    margin-left: 26.5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
}

.row-divider {
  border: 1px solid #0020440a;
  margin: 0;
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

@media screen and (max-width: 947px) {

  .m-wrapper,
  .m-wrapper2 {
    width: 700px;
    padding: 50px;
  }
}

@media screen and (max-width: 767px) {

  .m-wrapper,
  .m-wrapper2 {
    width: 400px;
    padding: 40px;
  }
}

@media screen and (max-width: 575px) {

  .m-wrapper,
  .m-wrapper2 {
    width: 350px;
    padding: 20px;
  }
}

.fa-ellipsis-v {
  padding: 10px
}
</style>