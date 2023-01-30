<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-2 mb-4">
                <div class="col-md-12">
                  <router-link to="/tenant/sms/addgroup" class="create-btn font-weigth-bold border-0">
                    <span class="mr-2 font-weight-700" style="font-size: 22px">+</span>
                    Create new group
                  </router-link>
                </div>
              </div>
              <div>
              </div>
              <div class="row table-box" v-loading="loading">
                <div class="col-md-12">
                  <div class="row header-row">
                    <div class="col-md-12">
                      <el-icon class="text-danger" v-if="markedContact.length > 0" @click="showConfirmModal1">
                        <Delete />
                      </el-icon>
                      <div class="row light-grey-bg py-2 font-weight-600 small-text">
                        <div class="col-md-1" v-if="groups.length > 0">
                          <input type="checkbox" name="all" id="all" @change="markAllContact"
                            :checked="markedContact.length === groups.length" />
                        </div>
                        <div class="col-md-4">
                          <span class="th small-text">Name</span>
                        </div>
                        <div class="col-md-3">
                          <span class="th small-text">Total Numbers</span>
                        </div>
                        <div class="col-md-3">
                          <span class="th small-text">Date Created</span>
                        </div>
                        <div class="col-md-1">
                          <span class="th small-text"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 gName px-0">
                      <hr class="hr" />
                    </div>
                  </div>
                  <div class="row" v-for="(group, index) in groups" :key="index">
                    <div class="col-md-12 border-bottom">
                      <div class="row">
                        <div class="col-md-1 py-2">
                          <input type="checkbox" name="" id="" @change="markAcontact(group)" :checked="
                            markedContact.findIndex(
                              (i) => i.id === group.id
                            ) >= 0
                          " />
                        </div>

                        <div class="col-md-4 d-flex justify-content-between align-items-center">
                          <span class="hidden-header">NAME: </span>
                          <span>
                            <router-link class="small-text brief-message" :to="{
                              name: 'EditContactList',
                              params: { groupId: group.id },
                            }">{{ group.name }}</router-link>
                          </span>
                        </div>

                        <div class="col-md-3 col-ms-12 d-flex justify-content-between align-items-center">
                          <span class="hidden-header font-weight-bold">Total Numbers:
                          </span>
                          <span class="small-text">{{ group.numbers }}</span>
                        </div>

                        <div class="col-md-3 col-ms-12 d-flex justify-content-between align-items-center">
                          <span class="hidden-header font-weight-bold">Date Created
                          </span>
                          <span class="small-text">{{
                            formatDate(group.dateEntered)
                          }}</span>
                        </div>

                        <div class="col-md-1 col-ms-12 d-flex align-items-center">
                          <span @click="showConfirmModal(group.id, index)">
                            <el-icon class="text-danger">
                              <Delete />
                            </el-icon>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="groups.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center align-items-center">
                      <span class="my-4 font-weight-bold">No groups</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../services/dates/dateformatter"
import finish from "../../services/progressbar/progress"
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  setup() {
    const groups = ref([]);
    const loading = ref(false);

    const getGroups = async () => {
      try {
        loading.value = true;
        const res = await axios.get("/api/Messaging/getPhoneGroups");
        finish()
        loading.value = false;
        groups.value = res.data;
      } catch (error) {
        finish()
        console.log(error);
      }
    };

    const deletePhoneGroup = async (id, index) => {
      try {
        await axios.delete(`/api/Messaging/DeletePhoneGroup?phoneGroupIdList=${id}`);
        groups.value.splice(index, 1)
        ElMessage({
          type: 'success',
          message: 'Phone group deleted',
          duration: 5000
        })
      }
      catch (err) {
        finish()
        console.log(err)
        if (err.toString().toLowerCase().includes('network error')) {
          ElMessage({
            type: 'error',
            message: 'Network error, please ensure you have a strong internet',
            duration: 5000
          })
        } else if (err.toString().toLowerCase().includes('timeout')) {
          ElMessage({
            type: 'warning',
            message: 'Response took too long to respond',
            duration: 5000
          })
        }
      }
    }

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        'This delete action cannot be reversed. do you want to continue?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          deletePhoneGroup(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    }

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date)
    }

    onMounted(() => {
      getGroups();
    });

    // Function to delete contact groups
    const remy = (v) => {
      return v.map((i) => i.id).join(",");
    };
    const deleteContactList = () => {
      let rem = remy(markedContact.value);
      axios
        .delete(`/api/Messaging/DeletePhoneGroup?PhoneGroupIdList=${rem}`)
        .then(() => {
          groups.value = groups.value.filter((item) => {
            const w = markedContact.value.findIndex((i) => i.id === item.id);
            if (w >= 0) return false;
            return true;
          });
          markedContact.value = []
          ElMessage({
            type: 'success',
            message: 'Phone group deleted',
            duration: 5000
          })

        })
        .catch((err) => {
          ElMessage({
            type: 'error',
            message: 'Phone group delete failed, please try again',
            duration: 5000
          })
          console.log(err);
        });
    };


    // code to mark single contact in group
    const markedContact = ref([]);
    const markAcontact = (contactid) => {
      const contactIndex = markedContact.value.findIndex(
        (i) => i.id === contactid.id
      );
      if (contactIndex < 0) {
        markedContact.value.push(contactid);
      } else {
        markedContact.value.splice(contactIndex, 1);
      }
    };

    // code to mark all contacts in group
    const markAllContact = () => {
      if (markedContact.value.length < groups.value.length) {
        groups.value.forEach((i) => {
          const contactInMarked = markedContact.value.findIndex(
            (c) => c.id === i.id
          );
          if (contactInMarked < 0) {
            markedContact.value.push(i);
          }
        });
      } else {
        markedContact.value = [];
      }
    };


    const showConfirmModal1 = () => {
      ElMessageBox.confirm(
        'This delete action cannot be reversed. do you want to continue?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          deleteContactList();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    return {
      groups,
      loading,
      deletePhoneGroup,
      showConfirmModal,
      formatDate,
      markedContact,
      markAcontact,
      markAllContact,
      deleteContactList,
      showConfirmModal1,
    };
  },
};
</script>

<style scoped>
.table-box {
  border: 1px solid #4762f01f;
}

.brief-message {
  color: #4762f0;
}

.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

#groupName:focus {
  border: none;
}

.inputWithDisable {
  /* background-color: rgba(252, 252, 252, 0.932); */
  border: none;
  outline: transparent;
}

.inputWithDisable:disabled {
  background: transparent;
}

h1,
h3,
h4 {
  font-family: "Nunito Sans";
  color: var(--font-color);
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

h4 {
  font-size: 16px;
}

.hr {
  color: #708eb15c;
}

.addContent {
  border: 1px solid #02172e30;
  border-radius: 5px;
  height: 40px;
}

.menu-item-con {
  color: #002044;
  opacity: 0.5;
}

.menu-item-con.active {
  background: rgba(19, 106, 205, 0.05);
  border-left: 2px solid #136acd;
  opacity: 1;
}

.buy-btn {
  background: rgb(112, 142, 177, 0.33);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
}

.timestamp {
  font-size: 14px;
  color: #333333;
  opacity: 0.5;
}

.create-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-decoration: none;
}

.link {
  text-decoration: none;
  color: #136acd !important;
}

.amazingG {
  width: 50%;
  margin-top: 0.5rem;
}

.amazingE {
  padding: 0;
  width: 50%;
  margin-left: 1rem;
  /* display: flex; */
  justify-content: flex-end;
}

.spanArea1 {
  position: relative;
  margin-top: 1rem;
  display: flex;
}

.spanArea2 {
  position: absolute;
  top: 0;
  right: -13.5rem;
}

.spanArea {
  width: 40%;
  position: absolute;
}

.addIconarea {
  padding: 0;
}

.basebtns {
  margin: 2.5rem auto;
  width: 40%;
}

#groupName {
  margin-left: 1rem;
}

.hidden-header {
  display: none;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  /* #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  } */
}

/* } */
</style>