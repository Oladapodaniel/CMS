<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 mb-3 px-0">
        <div class="text-primary c-pointer px-0 col-md-2 mt-2" @click="previousPage">
          <el-button class="text-primary" plain>
            <el-icon>
              <DArrowLeft />
            </el-icon> Back
          </el-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 px-0 mt-3">
        <div v-if="workflows.length > 0">
          <Table :data="workflows" :headers="headers" :checkMultipleItem="false">
            <template v-slot:name="{ item }">
              <div class="c-pointer">
                <router-link class="text-decoration-none text-primary font-weight-700"
                  :to="`/tenant/workflow/add?workflowId=${item.id}&fw=true`">
                  {{ item.name }}
                </router-link>
              </div>
            </template>
            <template v-slot:isActive="{ item }">
              <div class="c-pointer">
                <router-link class="text-decoration-none text-primary font-weight-700"
                  :to="`/tenant/workflow/add?workflowId=${item.id}&fw=true`">
                  {{ item.isActive ? "Yes" : "No" }}
                </router-link>
              </div>
            </template>
            <template v-slot:action="{ item }">
              <div class="c-pointer">
                <el-icon class="text-danger" @click="confirmDelete(item.id)">
                  <Delete />
                </el-icon>
              </div>
            </template>
          </Table>
        </div>
        <div v-else>
          <div class="font-weight-700">No workflow created yet</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import workflowFunctions from "../utlity/workflow_service";
import axios from "@/gateway/backendapi";
import router from "../../../router";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  components: {
    Table,
  },

  setup() {

    const loading = ref(false);
    const workflows = ref([]);

    const previousPage = () => {
      router.push("/tenant/settings");
    };

    const headers = ref([
      { name: "NAME", value: "name" },
      { name: "ACTIVE", value: "isActive" },
      { name: "ACTION", value: "action" },
    ]);

    const getWorkflows = async () => {
      try {
        loading.value = true;
        const { returnObject: data } = await workflowFunctions.getWorkflows();
        workflows.value = data;
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };
    getWorkflows();

    const deleteWorkflow = (id) => {
      if (id) {
        loading.value = true
        axios.delete(`/api/workflow?id=${id}`).then((res) => {
          workflows.value = workflows.value.filter((i) => i.id !== id);
          loading.value = false
          ElMessage({
            type: "success",
            message: "Workflow deleted successfully",
            showClose: true,
            duration: 5000,
          });
        });
      }
    };

    const confirmDelete = (id) => {
      ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          deleteWorkflow(id);
        })
        .catch(() => {
          loading.value = false
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };

    return {
      workflows,
      previousPage,
      loading,
      confirmDelete,
      headers,
    };
  },
};
</script>

<style lang="scss" scoped></style>
