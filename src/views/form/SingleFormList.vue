<template>
    <div v-if="!loading && formItems && formItems.length > 0" class=" container-top"
        :class="{ 'container-slim': lgAndUp || xlAndUp }">
        <div class="d-flex flex-wrap flex-column flex-sm-row mb-3 justify-content-between">
            <div class="">
                <div class="h2 font-weight-600">{{ route.query.formName }}</div>
            </div>
            <div class=" d-flex px-0 mt-3 justify-content-center  align-items-center mt-2">
                <el-button class="d-flex " @click="copylink" size="large" round>
                    <span class="mr-2">Copy link</span>
                    <img src="../../assets/form/copyIcon.png" style="width: 25px" alt="">
                </el-button>
                <el-button class="d-flex " @click="previewForm" size="large" round>
                    <el-icon>
                        <View />
                    </el-icon>
                    <span>Preview Form</span>
                </el-button>
            </div>

            <!-- <div class="d-flex flex-column flex-sm-row   link">
                <router-link class="" to="/tenant/pledge/makepledge">
                    <el-button :color="primarycolor" class="header-btn w-100 mt-3 mt-sm-0" round>
                        Manage Form
                    </el-button></router-link>
            </div> -->
        </div>
        <div class="row">
            <div class="col-md-12 ">
                <div class="border d-flex justify-content-center  col-md-1  rounded pr-5 pl-5 py-3 ">
                    <img @click="getQrCode" class="cursor-pointer " src="../../assets/form/QrCodeImage.png" alt="">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-1 px-0">
                <div class="text-primary c-pointer col-md-2" @click="previousPage">
                    <el-icon>
                        <DArrowLeft />
                    </el-icon> Back
                </div>
            </div>
        </div>
        <div class="d-flex flex-wrap flex-column flex-sm-row row"
            v-if="route.fullPath == `/tenant/singleformlist?id=${route.query.id}&formName=${route.query.formName}`">
            <div class="col-md-9 pt-md-2 pb-1  d-flex  rounded mt-3">
                <!-- <div class="font-weight-bold">Copy and Share the link</div> -->
                <!-- <div class=" mt-2 mr-2 image" @click="getQrCode">
                    <img src="../../assets/group2.svg" alt="Member image" />
                </div> -->
                <!-- <div >{{ formlink }}</div>
                <el-button @click="copylink">
                    <el-icon>
                        <CopyDocument />
                    </el-icon>
                </el-button> -->
                <!-- <div class="p-inputgroup form-group mt-2 ">
                    <el-input v-model="formlink" placeholder="Click the copy button when the link appears"
                        ref="selectedLink" class="border-0">
                        <template #append>
                            <el-button @click="copylink">
                                <el-icon>
                                    <CopyDocument />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </div> -->
            </div>
            <!-- <div class="col-md-3 d-flex px-0 justify-content-center  align-items-center mt-2">
                <el-button class="d-flex " @click="previewForm" size="large" round>
                    <el-icon>
                        <View />
                    </el-icon>
                    <span>Preview Form</span>
                </el-button>
            </div> -->
        </div>
        <div class="row">
            <div class="col-md-12 d-flex">
                <div class="col-md-6 border py-3 tab-color  text-center" :class="{ 'showedColor': showSummary }"
                    @click="summary">
                    Analytics
                </div>
                <div class="col-md-6 border py-3 tab-color text-center" :class="{ 'showedColor': showIndividual }"
                    @click="individual">
                    Grid
                </div>
            </div>
        </div>
        <!-- <div class="col-md-12 p-0 scroll-table">
            <table class="table table-hover" style="border-radius: 0" id="table">
                <thead>
                    <tr class="table-row-bg font-weight-600">
                        <th class="">Name</th>
                        <th class="">Phone</th>
                        <th class="">Email</th>
                        <th class="">Group</th>
                    </tr>
                </thead>
            </table>
        </div> -->
        <div class="col-md-12 p-0 scroll-table">
            <table class="table table-hover table" id="table">
                <thead>
                    <tr class=" table-row-bg ">
                        <th v-for="(label, index) in labels" :key="index">
                            {{ label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in sortedData" :key="index">
                        <td v-for="(value, label) in item" :key="label">
                            {{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div class="row justify-content-center  mt-4 pb-5 rounded" v-if="formItems && formItems.length > 0">
            <div class=" rounded col-md-9 border mt-5 shadow-sm py-3 " v-for="(item, index) in formItems" :key="index">
                <div v-for="(itm, indx) in item.data" :key="indx" class=" row justify-content-center border-remove   "
                    id="table">
                    <div class="col-md-11   py-3 ">
                        <div class="row text-capitalize justify-content-between">
                            <div class=" col-md-6 primary-text ">{{ itm.customAttribute.label }}</div>
                            <div class="col-md-6 font-weight  ">{{ itm.data }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div> -->

        <div class="row justify-content-center mt-5" v-if="formItems && formItems.length === 0">
            <div class="col-md-6 text-center  mt-5" style="font-size: 23px ">
                No entries have been submitted in the form yet. Please copy and share the link above to make an entry
            </div>
        </div>
        <el-dialog v-model="QRCodeDialog" title="" :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`"
            class="QRCodeDialog" align-center>

            <div class="d-flex align-items-center flex-column">
                <h4 class="text-capitalize font-weight"> Form QR Code For Registration</h4>
            </div>
            <div class=" d-flex justify-content-center ">
                <div class="img-wrapper  ">
                    <img v-if="qrCode" :src="qrCode" class="image-wrapper w-100" />
                </div>
            </div>
        </el-dialog>
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
            <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
        </template>
    </el-skeleton>
</template>

<script>
import { ref, computed, onMounted, watch, inject } from "vue";
import Table from "@/components/table/Table";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "../../router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useRoute } from "vue-router";
export default {
    components: {
        Table,
    },
    setup() {
        const loading = ref(false)
        const showIndividual = ref(false)
        const showSummary = ref(true)
        const selectedLink = ref(null)
        const QRCodeDialog = ref(false)
        const qrCode = ref('')
        const tenantID = ref('')
        const primarycolor = inject("primarycolor");
        const route = useRoute();
        const formlink = ref(`${window.location.origin}/createpublicform?id=${route.query.id}`)
        const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

        const formHeaders = ref([
            { name: "NAME", value: "name" },
            { name: "Age", value: "age" },
            { name: "INCOME RANGE", value: "incomerange" },
            { name: "ACTION", value: "action" },
        ]);
        const formItems = ref([]);
        const sortedData = ref([]);
        const labels = ref([]);

        const getFormData = async () => {
            loading.value = true
            try {
                const { data } = await axios.get(`/api/Forms/getformdata?Id=${route.query.id}`)
                formItems.value = data

                labels.value = formItems.value && formItems.value[0] ? formItems.value[0].data.map(
                    (dataItem) => dataItem.customAttribute.label
                ) : '';
                // labels.value.push('Date')
                loading.value = false;
                console.log(formItems.value, 'form');

            } catch (error) {
                console.log(error);
                loading.value = false;
            }
        }
        getFormData()

        const sortData = () => {
            sortedData.value = formItems.value.map((item) => {
                const sortedItem = {};
                item.data.forEach((dataItem) => {
                    const { label, data } = dataItem.customAttribute;
                    sortedItem[label] = dataItem && dataItem.data ? dataItem.data : "";
                });
                return sortedItem;
            });
        };

        onMounted(() => {
            sortData();
        });

        watch(formItems, () => {
            sortData();
        });

        const previousPage = () => {
            router.push('/tenant/formlist')
        }

        const summary = () => {
            showSummary.value = true
            showIndividual.value = false
        }
        const individual = () => {
            showSummary.value = false
            showIndividual.value = true
        }

        const getCurrentlySignedInUser = async () => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                tenantID.value = res.data.tenantId;
            } catch (err) {
                console.log(err);
            }
        };

        getCurrentlySignedInUser();


        const previewForm = () => {
            router.push(`/createpublicform?id=${route.query.id}`)
        }

        const getQrCode = async () => {
            try {
                const res = await axios.get(`/api/Settings/GetQRCode?link=${window.location.origin}/createpublicform?id=${route.query.id}`)
                QRCodeDialog.value = true
                qrCode.value = res.data
                console.log(qrCode.value, 'hhhh');
            }
            catch (error) {
                console.log(error);
            }
        }


        const copylink = () => {
            const textarea = document.createElement("textarea");
            textarea.value = formlink.value;

            document.body.appendChild(textarea);

            textarea.select();
            textarea.setSelectionRange(0, 99999);

            document.execCommand("copy");
            document.body.removeChild(textarea)

            ElMessage({
                showClose: true,
                message: "Copied to clipboard",
                type: "success",
            });
        };


        return {
            formHeaders,

            sortedData,
            labels,
            QRCodeDialog,
            qrCode,
            getQrCode,
            previousPage,
            mdAndUp, lgAndUp, xlAndUp, xsOnly,
            formlink,
            formItems,
            loading,
            primarycolor,
            route,
            selectedLink,
            tenantID,
            copylink,
            showIndividual,
            showSummary,
            individual,
            summary,
            previewForm
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap');

* {
    font-family: Poppins;
}

.table-row-bg {
    background: #ebeff4;
}

.table-row-bg th {
    font-weight: 600 !important;
}

.font-weight {
    font-weight: 500;
}

.scroll-table {
    overflow-x: auto;
}

.image img {
    height: 2.5rem;
}

.text-color {
    color: #212529;
    text-decoration: none;
}

.border-remove {
    border-bottom: 1px solid rgb(189, 189, 189) !important;
}

.border-remove:last-child {
    border: none !important;
}

.showedColor {
    background-color: #0B55D4 !important;
    /* background-color: #CAF5FF !important; */
    font-weight: bold;
    color: white;
}


.tab-color {
    background-color: #F4F4F4;
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
    /* opacity: 50% !important; */
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