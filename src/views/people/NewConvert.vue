<template>
  <div
    class="container-fluid px-0"
  >
    <div class="d-flex flex-column flex-md-row justify-content-md-between">
      <div class="head-text">
        <div>New Convert</div>
      </div>
      <div class="mt-3 mt-md-0">
        <!-- <router-link :to="{ name: 'AddFirstTimer' }" class="text-decoration-none">
          <el-button :color="primarycolor" class="ml-2 header-btn" round
            >Add New Convert</el-button
          >
        </router-link> -->
      </div>
    </div>
    <div class="">
      <div class="top-con">
          <div class="">
            <div class="table-top p-3 mt-5">
              <div class="col-md-5 justify-content-flex-end">
                <el-input
                  size="small"
                  v-model="searchText"
                  placeholder="Search..."
                  class="input-with-select"
                >
                  <template #suffix>
                    <el-button
                      style="padding: 5px; height: 22px"
                      @click.prevent="searchText = ''"
                    >
                      <el-icon :size="13">
                        <Close />
                      </el-icon>
                    </el-button>
                  </template>
                  <template #append>
                    <el-button>
                      <el-icon :size="13">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
      <Table
          :data="searchNewConvert"
          :headers="NewConvertHeaders"
          :checkMultipleItem="false"
          v-if="searchNewConvert.length > 0 "
        >
          <template v-slot:fullname="{ item }">
            <div class="c-pointer">
              {{ item.fullName }}
            </div>
          </template>

          <template v-slot:phone="{ item }">
            <div class="c-pointer">
              {{ item.phoneNumber }}
            </div>
          </template>

          <template v-slot:date="{ item }">
            <div class="c-pointer">
              {{ formatDate(item.date) }}
            </div>
          </template>
          <template v-slot:howDidYouAboutUsName="{ item }">
            <div class="c-pointer">
              {{ item.howDidYouAboutUsName }}
            </div>
          </template>
          <template v-slot:interactions="{ item }">
            <div class="c-pointer">
              {{ item.interactions }}
            </div>
          </template>

          <!-- <template v-slot:action="{ item }">
            <el-dropdown trigger="click">
              <el-icon>
                <MoreFilled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <div
                      class="text-decoration-none text-color"
                      @click="showConfirmModal(item.id)"
                    >
                      Delete
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template> -->
      </Table>
    </div>
    <div
      v-if="allNewConvert.length ===  0  && !loading && !networkError"
      class="no-person"
    >
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any first timer yet</p>
      </div>
    </div>
    <div v-else-if="networkError && !loading" class="adjust-network">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
    </div>

    <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
          "
        >
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
        </div>
        <el-skeleton
          class="w-100 mt-5"
          style="height: 25px"
          :rows="20"
          animated
        />
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { ref, inject, computed, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../services/dates/dateformatter";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Table from "@/components/table/Table";
import finish from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  props: ['newConvertList'],
  components: {
    Table
  },
  setup(props) {
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const primarycolor = inject('primarycolor')
    const loading = ref(false)
    const networkError = ref(false)
    const searchText = ref('')
    const allNewConvert = ref([])
    const NewConvertHeaders = ref([
      { name: "NAME", value: "fullname" },
      { name: "PHONE", value: "phone" },
      { name: "DATE", value: "date" },
      { name: "SOURCE", value: "howDidYouAboutUsName" },
      { name: "INTERESTED", value: "interestedInJoining" },
      { name: "INTERACTIONS", value: "interactions" },
      // { name: "ACTION", value: "action" },
    ]);

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };
    const searchNewConvert = computed(() => {
      if (allNewConvert.value === 0 && searchText.value === "")
        return allNewConvert.value;
      return allNewConvert.value.filter((i) =>
        i.fullName.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    // const getAllNewConvert = async () =>{
    //   loading.value = true

    //     try{
    //         const res = await axios.get('api/People/GetAllNewConverts?page=1')
    //         allNewConvert.value = res.data.response
    //         console.log(allNewConvert.value, "hhhh");
    //         loading.value = false
    //     }
    //     catch(err){
    //         finish();
    //     loading.value = false;
    //     loading.value = false;
    //     if (err.toString().toLowerCase().includes("network error")) {
    //       networkError.value = true;
    //     } else {
    //       networkError.value = false;
    //     }

    //     }
    // }
    // getAllNewConvert()

    const showConfirmModal = (id) => {
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
          deleteNewConvert(id);
          
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };
    const deleteNewConvert = (id) => {
      axios
        .delete(`/api/Family/deleteFamily?id=${id}`)
        .then((res) => {
          console.log(res);

          ElMessage({
            type: "success",
            message: "New Convert Deleted",
            duration: 3000
          });
          allNewConvert.value.filter((i) => i.id !== id);
          // emit("list-filtered", listFiltered);
          //  store.dispatch('family/removeFamilyFromStore', id)
        })
        .catch((err) => {
          console.log(err);
          finish();
        });
    };

    watchEffect(() => {
      if (props.newConvertList) {
        allNewConvert.value = props.newConvertList
      }
    })

    return {
    mdAndUp, lgAndUp ,xlAndUp, primarycolor, loading, NewConvertHeaders, formatDate, networkError, 
    showConfirmModal,
    deleteNewConvert,
    allNewConvert,
    searchNewConvert,
    searchText
    }
  },
};
</script>

<style scoped>
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  justify-content: flex-end;
  display: flex;
}
</style>