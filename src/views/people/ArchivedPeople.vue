<template>
<div class="container container-top container-wide">
  <div class="row">
    <div class="col-12 my-2 heading-text">Archived People</div>
  </div>
   <ConfirmDialog />
      <Toast />
      <div class="row table    ">
        <div class="container-fluid  d-none d-md-block">
          <div class="row t-header mt-5   font-weight-bold">
            <div class="col-md-1 " ></div>
            <div class="col-2 d-none d-md-block small-text text-dark font-weight-bold" >NAME</div>
            <div class="col-2 d-none d-md-block small-text text-dark font-weight-bold" >PHONE</div>
            <div class="col-3 d-none d-md-block small-text text-dark font-weight-bold" >EMAIL</div>
            <div class="col-3 d-none d-md-block small-text text-dark font-weight-bold" >HOME ADDRESS</div>
            <div class="col-1 d-none d-md-block small-text text-dark font-weight-bold" >ACTION</div>
            <!-- <div class="col-1 d-none d-md-block small-text text-dark font-weight-bold" style="font-size:16px;">Action</div> -->
                          <!-- <div class="col-2 d-none d-md-block">NEW CONVERTS</div> -->
          </div>
        </div>
        <div class="container-fluid">
            <div class="row  ">
              <div class=" col-12 py-2 tr-border-bottom hover  c-pointer " v-for="(archived,index) in archivedMember" :key="index" >
                <div class="row w-100 " style="margin: 0">
                    <div class="col-md-1 d-flex d-md-block  justify-content-end" ></div>
                    <div class="desc-head col-md-2">
                        <div class="d-flex justify-content-between">
                          <span
                            class="
                              text-dark
                              font-weight-bold
                              d-flex d-md-none
                              fontIncrease
                            "
                            > Name</span
                          >
                          <div>
                            <div class="desc small-text font-weight-bold text-right itemroute-color text-md-left">
                              <!-- <router-link :to="{ name: 'AddPerson', params: { personId: item.id } }" class="itemroute-color"> -->
                            {{archived.firstName}} {{archived.lastName}}
                              <!-- </router-link> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="desc-head col-md-2">
                        <div class="d-flex justify-content-between">
                          <span
                            class="
                              text-dark
                              font-weight-bold
                              d-flex d-md-none
                              fontIncrease
                            "
                            > PHONE</span
                          >
                          <div>
                            <div class="desc small-text font-weight-bold text-right text-md-left itemroute-color">
                              <!-- <router-link :to="{ name: 'AddPerson', params: { personId: item.id } }" class="itemroute-color"> -->
                            {{archived.mobilePhone}}
                              <!-- </router-link> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="desc-head col-md-3">
                        <div class="d-flex justify-content-between">
                          <span
                            class="
                              text-dark
                              font-weight-bold
                              d-flex d-md-none
                              fontIncrease
                            "
                            > Email</span
                          >
                          <div>
                            <div class="desc small-text font-weight-bold text-right itemroute-color text-md-left">
                              <!-- <router-link :to="{ name: 'AddPerson', params: { personId: item.id } }" class="itemroute-color"> -->
                            {{archived.email}}
                              <!-- </router-link> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="desc-head col-md-3">
                        <div class="d-flex justify-content-between">
                          <span
                            class="
                              text-dark
                              font-weight-bold
                              d-flex d-md-none
                              fontIncrease
                            "
                            > Home Address</span
                          >
                          <div>
                            <div class="desc small-text font-weight-bold itemroute-color text-right text-md-left">
                              <!-- <router-link :to="{ name: 'AddPerson', params: { personId: item.id } }" class="itemroute-color"> -->
                            {{archived.homeAddress}}
                              <!-- </router-link> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="col-md-1" >

                        <div class="dropdown  ">
                          <span class="d-flex justify-content-between">
                              <span class="d-md-none d-sm-flex"></span>
                              <span class="d-sm-flex small ml-2 ">
                                    <i
                                  class="fas fa-ellipsis-v cursor-pointer ml-3 fontIncrease"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></i>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a class="dropdown-item cursor-pointer elipsis-items"
                                  @click="showConfirmModall(archived.id, index)"
                                  >
                                    Unarchive
                                  </a>
                                  <div class="dropdown-item cursor-pointer  elipsis-items">
                                            <router-link
                                            class="text-dark text-decoration-none"
                                              :to="{
                                                name: 'AddPerson',
                                                params: { personId: archived.id },
                                              }"
                                            >
                                              Edit
                                            </router-link>
                                    <!-- Edit -->
                                  </div>
                                  <a
                                    class="
                                      dropdown-item
                                      elipsis-items
                                      text-color
                                      cursor-pointer
                                    "
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
            <!-- <div class="col-1 d-none d-md-block small-text text-dark font-weight-bold" style="font-size:16px;">Action</div> -->
                          <!-- <div class="col-2 d-none d-md-block">NEW CONVERTS</div> -->
        </div>
        </div>
         <div class="col-12">
          <div class="table-footer">
            <!-- <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="50"
              :currentPage="currentPage"
     
            /> -->
          </div>
        </div>
      </div>
  
</div>
</template>

<script>
import  { ref } from "vue";
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
// import { useRoute } from "vue-router";
export default {

  setup() {
      // const ArchivedMember = ref([]);
      const archivedMember = ref([]);
      const churchMembers = ref([]);
      const unarchiveMembers = ref([]);
      const membershipSummary = ref([]);

      const getArchivedPeople = () => {
        axios
        .get('/api/People/archivedmembers')
        .then((res) => {
          archivedMember.value = res.data;
          console.log(res.data, "🎄🎄🎄");
        })
        .catch((err) => {
          console.log(err);
        });
      }
      getArchivedPeople()

      const confirm = useConfirm();
      let toast = useToast();

      const showConfirmModall = (id, index) => {
      confirm.require({
        message: "Are you sure you want to Unarchive people?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          unarchiveMember(id, index);
        },
        reject: () => {
          toast.add({
            severity: "info",
            summary: "Rejected",
            detail: "Delete discarded",
            life: 3000,
          });
        },
      });
    };
      const showConfirmModal = (id, index) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteMember(id, index);
        },
        reject: () => {
          toast.add({
            severity: "info",
            summary: "Rejected",
            detail: "Delete discarded",
            life: 3000,
          });
        },
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
            let disRes = res.data.response.split("@")
            toast.add({
              severity: "info",
              summary: "Info",
              detail: disRes[0],
              life: 10000,
            });
          } else {
            toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: "Member Deleted",
              life: 5000,
            });
          }
          store.dispatch("membership/removeMember", id);
          axios
            .get(`/api/People/GetMembershipSummary`)
            .then((res) => {
              console.log(res, "new chart");
              membershipSummary.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          stopProgressBar();
          toast.add({
            severity: "error",
            summary: "Delete Error",
            detail: "Deleting member failed",
            life: 3000,
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
          // if (res.data.response.includes("@")) {
          //   let disRes = res.data.response.split("@")
          //   toast.add({
          //     severity: "info",
          //     summary: "Info",
          //     detail: disRes[0],
          //     life: 10000,
          //   });
          // } else {
            toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: "Member Unarchive",
              life: 5000,
            });
          // }
          // store.dispatch("membership/removeMember", id);
          // axios
          //   .get(`/api/People/GetMembershipSummary`)
          //   .then((res) => {
          //     console.log(res, "new chart");
          //     membershipSummary.value = res.data;
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        })
        // .catch((err) => {
        //   stopProgressBar();
        //   toast.add({
        //     severity: "error",
        //     summary: "Delete Error",
        //     detail: "Deleting member failed",
        //     life: 3000,
        //   });
        //   console.log(err);
        // });
    };

    return{
      showConfirmModall,
      unarchiveMembers,
      unarchiveMember,
      deleteMember,
      churchMembers,
      showConfirmModal,
      archivedMember,
      membershipSummary
      // ArchivedMember,
    }
  },
}
</script>

<style scoped>
.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}
  .table-header{

    background: #f1f3f9!important;
    color: #8898aa!important;
    font-size: 11px!important;
    text-align: left!important;
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
