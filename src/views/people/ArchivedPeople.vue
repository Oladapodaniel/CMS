<template>
  <div class="container-fluid container-top">
    <div class="row">
      <div class="col-12 my-2 head-text">Archived People</div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Table
          :data="archivedMember"
          :headers="archivedHeaders"
          :checkMultipleItem="true"
          @checkedrow="handleSelectionChange"
          v-loading="paginatedTableLoading"
          v-if="archivedMember.length > 0"
        >
          <template v-slot:name="{ item }">
            <div class="c-pointer">
              {{ item.firstName }} {{ item.lastName }}
            </div>
          </template>
          <template v-slot:phoneNumber="{ item }">
            <div class="c-pointer">
              {{ item.mobilePhone }}
            </div>
          </template>
          <template v-slot:email="{ item }">
            <div class="c-pointer">
              {{ item.email }}
            </div>
          </template>
          <template v-slot:homeAddress="{ item }">
            <div class="c-pointer">
              {{ item.homeAddress }}
            </div>
          </template>
          <template v-slot:action="{ item }">
            <el-dropdown trigger="click">
              <el-icon>
                <MoreFilled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <div
                      class="text-color"
                      @click="showConfirmModall(item.id, index)"
                    >
                      Unarchive
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      class="text-color text-decoration-none"
                      :to="{
                        name: 'AddPerson',
                        params: { personId: item.id },
                      }"
                    >
                      Edit
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div
                      @click.prevent="showConfirmModal(item.id, index)"
                      class="text-color"
                    >
                      Delete
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </Table>
      </div>

      <!-- <div class="container-fluid  d-none d-md-block">
          <div class="row t-header mt-5   font-weight-bold">
            <div class="col-md-1 " ></div>
            <div class="col-2 d-none d-md-block small-text text-dark font-weight-bold" >NAME</div>
            <div class="col-2 d-none d-md-block small-text text-dark font-weight-bold" >PHONE</div>
            <div class="col-3 d-none d-md-block small-text text-dark font-weight-bold" >EMAIL</div>
            <div class="col-3 d-none d-md-block small-text text-dark font-weight-bold" >HOME ADDRESS</div>
            <div class="col-1 d-none d-md-block small-text text-dark font-weight-bold" >ACTION</div>
          </div>
        </div> -->
      <!-- <div class="container-fluid">
        <div class="row">
          <div
            class="col-12 py-2 tr-border-bottom hover c-pointer"
            v-for="(archived, index) in archivedMember"
            :key="index"
          >
            <div class="row w-100" style="margin: 0">
              <div class="col-md-1 d-flex d-md-block justify-content-end"></div>
              <div class="desc-head col-md-2">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    Name</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold text-right itemroute-color text-md-left"
                    >
                      {{ archived.firstName }} {{ archived.lastName }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="desc-head col-md-2">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    PHONE</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold text-right text-md-left itemroute-color"
                    >
                      {{ archived.mobilePhone }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="desc-head col-md-3">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    Email</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold text-right itemroute-color text-md-left"
                    >
                      {{ archived.email }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="desc-head col-md-3">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    Home Address</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold itemroute-color text-right text-md-left"
                    >
                      {{ archived.homeAddress }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-md-none d-sm-flex"></span>
                    <span class="d-sm-flex small ml-2">
                      <i
                        class="fas fa-ellipsis-v cursor-pointer ml-3 fontIncrease"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          class="dropdown-item cursor-pointer elipsis-items"
                          @click="showConfirmModall(archived.id, index)"
                        >
                          Unarchive
                        </a>
                        <div class="dropdown-item cursor-pointer elipsis-items">
                          <router-link
                            class="text-dark text-decoration-none"
                            :to="{
                              name: 'AddPerson',
                              params: { personId: archived.id },
                            }"
                          >
                            Edit
                          </router-link>
                      
                        </div>
                        <a
                          class="dropdown-item elipsis-items text-color cursor-pointer"
                          @click.prevent="showConfirmModal(archived.id, index)"
                          >Delete</a
                        >
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div> -->
      <!-- <div class="col-12">
        <div class="table-footer">
          <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="50"
              :currentPage="currentPage"
     
            />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/gateway/backendapi";
import store from "../../store/store";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";
// import { useRoute } from "vue-router";
export default {
  components: {
    Table,
  },
  setup() {
    // const ArchivedMember = ref([]);
    const archivedMember = ref([]);
    const churchMembers = ref([]);
    const unarchiveMembers = ref([]);
    const membershipSummary = ref([]);
    const paginatedTableLoading = ref(false);
    const archivedHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "PHONE", value: "phoneNumber" },
      { name: "EMAIL", value: "email" },
      { name: "HOME ADDRESS", value: "homeAddress" },
      { name: "ACTION", value: "action" },
    ]);

    const handleSelectionChange = (val) => {
      // checkedFirstTimer.value = val
    };

    const getArchivedPeople = () => {
      paginatedTableLoading.value = true;
      axios
        .get("/api/People/archivedmembers")
        .then((res) => {
          archivedMember.value = res.data;
          paginatedTableLoading.value = false;
          console.log(res.data, "🎄🎄🎄");
        })
        .catch((err) => {
          paginatedTableLoading.value = false;
          console.log(err);
        });
    };
    getArchivedPeople();

    const showConfirmModall = (id, index) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          unarchiveMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };
    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    const deleteMember = (id) => {
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then((res) => {
          console.log(res);
          churchMembers.value = churchMembers.value.filter(
            (item) => item.id !== id
          );
          if (res.data.response.includes("@")) {
            let disRes = res.data.response.split("@");
            ElMessage({
              type: "info",
              message: disRes[0],
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "success",
              message: "Member Deleted",
              duration: 5000,
            });
          }
          store.dispatch("membership/removeMember", id);
          store.dispatch("membership/setMembershipSummary").then((response) => {
            membershipSummary.value = response;
          });
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: "Deleting member failed",
            duration: 5000,
          });
          console.log(err);
        });
    };
    const unarchiveMember = (id) => {
      axios
        .post(`/api/People/unarchive/${id}`)
        .then((res) => {
          console.log(res);
          unarchiveMembers.value = unarchiveMembers.value.filter(
            (item) => item.id !== id
          );
          ElMessage({
            type: "success",
            message: "Member Unarchive",
            duration: 5000,
          });
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: "Delete Error",
            duration: 5000,
          });
          console.log(err);
        });
    };

    return {
      showConfirmModall,
      unarchiveMembers,
      paginatedTableLoading,
      archivedHeaders,
      unarchiveMember,
      deleteMember,
      churchMembers,
      showConfirmModal,
      archivedMember,
      membershipSummary,
      handleSelectionChange,
      // ArchivedMember,
    };
  },
};
</script>

<style scoped>
.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}
.table-header {
  background: #f1f3f9 !important;
  color: #8898aa !important;
  font-size: 11px !important;
  text-align: left !important;
  /* box-shadow: 0px 3px 6px #2c28281c!important; */
}

.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.itemroute-color {
  color: #136acd;
  cursor: pointer;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}
.hover:hover {
  background: #eee;
}
</style>
