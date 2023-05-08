<template>
  <div
    :class="{ 'container-slim': lgAndUp || xlAndUp }"
    class="container-top h-100"
  >
    <div class="d-flex flex-column flex-md-row justify-content-md-between">
      <div class="head-text">
        <div>New Convert</div>
      </div>
      <div class="mt-3 mt-md-0">
        <router-link :to="{ name: 'AddFirstTimer' }" class="text-decoration-none">
          <el-button :color="primarycolor" class="ml-2 header-btn" round
            >Add New Convert</el-button
          >
        </router-link>
      </div>
    </div>
    <div class="event-list container-fluid">
      <!-- <Table
          :data="searchNewConvert"
          :headers="NewConvertHeaders"
          :checkMultipleItem="false"
          v-if="searchNewConvert.length > 0"
        >
        <template v-slot:date="{ item }">
            <div class="c-pointer">
              {{ formatDate(item.dateCreated) }}
            </div>
          </template>
          <template v-slot:familyName="{ item }">
            <div class="c-pointer">
              {{ item.familyName }}
            </div>
          </template>

          <template v-slot:email="{ item }">
            <div class="c-pointer">
              {{ item.email }}
            </div>
          </template>

          <template v-slot:phone="{ item }">
            <div class="c-pointer">
              {{ item.homePhone }}
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
                      class="text-decoration-none text-color"
                      @click="showConfirmModal(item.id)"
                    >
                      Delete
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
      </Table> -->
    </div>
    <!-- <div
      v-if="firstTimersList.length === 0 && !loading && !networkError"
      class="no-person"
    >
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any first timer yet</p>
      </div>
    </div> -->
    <!-- <div v-else-if="networkError && !loading" class="adjust-network">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
    </div> -->

    <!-- <el-skeleton class="w-100" animated v-if="loading">
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
    </el-skeleton> -->
  </div>
</template>

<script>
import { ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Table from "@/components/table/Table";

export default {
  components: {
    Table
  },
  setup() {
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const primarycolor = inject('primarycolor')
    const loading = ref(false)
    const NewConvertHeaders = ref([
      { name: "DATE", value: "date" },
      { name: "FAMILY NAME", value: "familyName" },
      { name: "EMAIL", value: "email" },
      { name: "PHONE", value: "phone" },
      { name: "ACTION", value: "action" },
    ]);


    const getAllNewConvert = async () =>{

        try{
            const res = await axios.get('/api/People/GetAllNewConverts')
            console.log(res, "ttttt");
        }
        catch(err){
            console.log(err);

        }
    }
    getAllNewConvert()

    return {
    mdAndUp, lgAndUp ,xlAndUp, primarycolor, loading, NewConvertHeaders
    }
  },
};
</script>

<style scoped>
</style>