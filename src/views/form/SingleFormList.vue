<template>
    <div class="container-fluid container-top">
        <div class="d-flex flex-wrap flex-column flex-sm-row mb-3 justify-content-between">
            <div class="">
                <div class="head-text">{{ route.query.formName }}</div>
            </div>
            <!-- <div class="d-flex flex-column flex-sm-row   link">
                <router-link class="" to="/tenant/pledge/makepledge">
                    <el-button :color="primarycolor" class="header-btn w-100 mt-3 mt-sm-0" round>
                        Manage Form
                    </el-button></router-link>
            </div> -->
        </div>
        <div class="d-flex flex-wrap flex-column flex-sm-row row"
            v-if="route.fullPath == `/tenant/singleformlist?id=${route.query.id}&formName=${route.query.formName}`">
            <div class="col-12 py-md-4 mt-3">
                <div class="font-weight-bold">Copy and Share the link</div>
                <div class="p-inputgroup form-group mt-2">
                    <el-input v-model="formlink" placeholder="Click the copy button when the link appears"
                        ref="selectedLink" class="input-with-select">
                        <template #append>
                            <el-button @click="copylink">
                                <el-icon>
                                    <CopyDocument />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 d-flex">
                <div class="col-md-6 border py-3 text-center" style="background-color: #F4F4F4;">
                    Summary
                </div>
            <div class="col-md-6 border py-3 text-center">
                Individual
            </div>
            </div>
        </div>
        <div class="row">
            <div class="mt-3 col-md-12 ">
                <table class="table table-borderlesst  remove-styles mt-0" id="table">
                    <thead class="border font-weight-700">
                        <tr class="small-text text-capitalize text-nowrap font-weight-700" style="border-bottom: 0">
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody class=" font-weight-550 text-nowrap " style="font-size: 15px">
                        <tr class="border">
                            <td class="font-weight-550">Tope James</td>
                        </tr>
                        <tr class="border">
                            <td>Daniel Oladapo</td>
                        </tr>
                        <tr class="border">
                            <td>Joseph Oladipo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <!-- <Table :data="formItems" :headers="formHeaders" :checkMultipleItem="false" v-loading="loading">
            <template v-slot:name="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.name }}
                </div>
            </template>
            <template v-slot:age="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.age }}
                </div>
            </template>
            <template v-slot:incomerange="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.incomerange }}
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
                                <router-link :to="`/tenant/pledge/makepledge?id=${item.id}`"
                                    class="text-color">Edit</router-link>
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
        </Table> -->
    </div>
</template>

<script>
import { ref, computed, inject } from "vue";
import Table from "@/components/table/Table";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
// import router from "../../router";
import { useRoute } from "vue-router";
export default {
    components: {
        Table,
    },
    setup() {
        const loading = ref(false)
        const selectedLink = ref(null)
        const tenantID = ref('')
        const primarycolor = inject("primarycolor");
        const route = useRoute();

        const formHeaders = ref([
            { name: "NAME", value: "name" },
            { name: "Age", value: "age" },
            { name: "INCOME RANGE", value: "incomerange" },
            { name: "ACTION", value: "action" },
        ]);
        const formItems = ref([
            { name: "Sam loko", age: "29", incomerange: "200k", id: 1 },
            { name: "James Ibori", age: "30", incomerange: "200k", id: 2 },
            { name: "Adams Lawmon", age: "89", incomerange: "200k", id: 3 },
            { name: "Samson lawnrence", age: "76", incomerange: "200k", id: 4 },
            { name: "Stephen Brown", age: "40", incomerange: "200k", id: 5 },
        ]);

        const getFormData = async () => {
            try {
                const { data } = await axios.get(`/api/Forms/getformdata?Id=${route.query.id}`)
                console.log(data, 'hdjdjj');
            } catch (error) {
                console.log(error);
            }
        }
        getFormData()

        const getCurrentlySignedInUser = async () => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                tenantID.value = res.data.tenantId;
            } catch (err) {
                console.log(err);
            }
        };

        getCurrentlySignedInUser();

        const formlink = computed(() => {
            if (!tenantID.value) return "";
            return `${window.location.origin}/createpublicform?id=${route.query.id}&tenantID=${tenantID.value}`;
        });


        const copylink = () => {
            selectedLink.value.input.setSelectionRange(
                0,
                selectedLink.value.input.value.length
            ); /* For mobile devices */
            selectedLink.value.input.select();

            /* Copy the text inside the text field */
            document.execCommand("copy");
            ElMessage({
                showClose: true,
                message: "Copied to clipboard",
                type: "success",
            });
        };


        return {
            formHeaders,
            formlink,
            formItems,
            loading,
            primarycolor,
            route,
            selectedLink,
            tenantID,
            copylink
        }
    },
}
</script>

<style scoped>
.text-color {
    color: #212529;
    text-decoration: none;
}

.text-color:hover {
    color: #007bff;
}

.remove-border {
    box-shadow: none !important;
}

.responsiveness {
    max-width: 100%;
    /* overflow-y: scroll; */
}

.table {
    width: 100% !important;
    box-shadow: none !important;
    border: none !important;
    text-align: left;
    margin-bottom: auto !important;
    padding-bottom: 0.5rem;
}

.table thead th {
    font-weight: 550;
    opacity: 50% !important;
}

/* .table thead {
    border:  1px solid black;
} */

.table-header-area-main {
    /* background-color: #ebeff4; */
    color: #334D6E !important;
    font-weight: 500 !important;
    font-size: 13px !important;

}

.table-main {
    width: 100% !important;
    text-align: left !important;
    margin-bottom: auto !important;
    padding-bottom: 0.5rem !important;
}

.responsiveness {
    max-width: 100%;
    /* overflow-y: scroll; */
}

.table-main {
    width: 100% !important;
    text-align: left !important;
    margin-bottom: auto !important;
    padding-bottom: 0.5rem !important;
}

.remove-styles2 {
    padding-right: 0;
    padding-left: 0;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    overflow-x: scroll;
}

.remove-styles {
    border: none !important;
    border-top: none !important;
    box-shadow: none !important;
    border-bottom: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}
</style>