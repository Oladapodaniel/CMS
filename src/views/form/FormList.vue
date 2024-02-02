<template>
    <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
        <div  class="d-flex flex-wrap flex-column flex-sm-row mb-3 justify-content-between">
            <div class="">
                <div class="h2 font-weight-600">Forms</div>
            </div>
            <div class="d-flex flex-column flex-sm-row   link">
                <router-link class="" to="/tenant/createform">
                    <el-button :color="primarycolor" class="header-btn w-100 mt-3 mt-sm-0" round>
                        Create New Form
                    </el-button></router-link>
            </div>
        </div>
        <Table :data="formItems" :headers="formHeaders" v-if="(formItems && formItems.length > 0) && !loading && !networkError" :checkMultipleItem="false" v-loading="loading">
            <template v-slot:name="{ item }">
                <div class="c-pointer" @click="formListClick(item)">
                    {{ item.name }}
                </div>
            </template>
            <template v-slot:entries="{ item }">
                <div class="c-pointer" @click="formListClick(item)">
                    {{ item.entries }}
                </div>
            </template>
            <template v-slot:date="{ item }">
                <div class="c-pointer" @click="formListClick(item)">
                    {{ date(item.date) }}
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
                                <router-link :to="`/tenant/createform?formID=${item.id}`" class="text-color">Edit
                                    Form</router-link>
                            </el-dropdown-item>
                            <!-- <el-dropdown-item>
                                <router-link :to="`/tenant/singleformlist?id=${item.id}`" class="text-color">View
                                    Form</router-link>
                            </el-dropdown-item> -->
                            <el-dropdown-item>
                                <router-link :to="`/tenant/singleformlist?id=${item.id}&formName=${item.name}`"
                                    class="text-color">View
                                    Data</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">
                                    Delete
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </Table>
        <div class="row mt-4">
            <div v-if="(formItems && formItems.length === 0) && !loading && !networkError" class="no-person mt-4 col-md-12">
                <div class="empty-img">
                    <!-- <p><img src="../../assets/people/people-empty.svg" alt="" /></p> -->
                    <p class="tip">You haven't Created any Form yet </p>
                    <el-button :color="primarycolor" @click="createForm" class="ml-2 header-btn" round>Create a new Form
                    </el-button>
                </div>
            </div>
            <div v-else-if="networkError && !loading" class="adjust-network">
                <img src="../../assets/network-disconnected.png">
                <div>Opps, Your internet connection was disrupted</div>
            </div>
        </div>
    </div>

    <el-skeleton class="w-100" animated v-if="loading && formItems && formItems.length === 0">
        <template #template>
            <div style="display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
          ">
                <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
                <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
            </div>
            <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
            <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
        </template>
    </el-skeleton>
</template>

<script>
import { ref, computed, inject } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import monthDayYear from "../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import router from "../../router";
import Table from "@/components/table/Table";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
export default {
    components: {
        Table,
    },
    setup() {
        const loading = ref(false)
        const networkError = ref(false)
        const primarycolor = inject("primarycolor");
        const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

        const formHeaders = ref([
            { name: "FORM NAME", value: "name" },
            { name: "ENTRIES", value: "entries" },
            { name: "DATE", value: "date" },
            { name: "ACTION", value: "action" },
        ]);
        const formItems = ref([]);

        const createForm = () => {
            router.push('/tenant/createform')
        }

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
                    deleteForm(id, index);
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "Delete canceled",
                        duration: 5000,
                    });
                });
        };

        const formListClick = (item) => {
            router.push(`/tenant/singleformlist?id=${item.id}&formName=${item.name}`)
        }

        const deleteForm = (id) => {
            axios
                .delete(`/api/Forms/deleteform?Id=${id}`)
                .then((res) => {
                    console.log(res);
                    ElMessage({
                        type: "success",
                        message: "Form deleted successfully",
                        duration: 5000,
                    });
                    formItems.value = formItems.value.filter(
                        (formItems) => formItems.id !== id
                    );
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        ElMessage({
                            type: "error",
                            message: "Unable to delete",
                            duration: 5000,
                        });
                    } else {
                        ElMessage({
                            type: "error",
                            message: "Unable to delete",
                            duration: 5000,
                        });
                    }
                });
        };


        const getAllForms = async () => {
            loading.value = true
            try {
                const { data } = await axios.get('/api/Forms/getallforms')
                console.log(data, 'mmmn');
                formItems.value = data
                loading.value = false
            }
            catch (error) {
                if (error.toString().toLowerCase().includes("network error")) {
                    networkError.value = true
                } else {
                    networkError.value = false
                }
                loading.value = false
            }
        }
        getAllForms()

        const date = (offDate) => {
            return monthDayYear.monthDayYear(offDate);
        };


        return {
            formHeaders,
            formItems,
            loading,
            primarycolor,
            networkError,
            mdAndUp, lgAndUp, xlAndUp, xsOnly,
            createForm,
            date,
            showConfirmModal,
            deleteForm,
            formListClick
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap');

* {
    font-family: Poppins;
}

.no-person {
    height: 30vh;
    display: flex;
    text-align: center;
    margin: auto;
}

.empty-img {
    width: 30%;
    min-width: 397px;
    margin: auto;
}

.empty-img img {
    width: 100%;
    max-width: 200px;
}

.text-color {
    color: #212529;
    text-decoration: none;
}

.text-color:hover {
    color: #007bff;
}
</style>