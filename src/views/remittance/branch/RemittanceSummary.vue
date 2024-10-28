<script setup>
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';
import Table from "@/components/table/Table";
import { GetRemittanceById, LockRemittanceTransaction } from '../../../services/remittance/branchremittance';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import dateFormatter from '../../../services/dates/dateformatter';
import { ElMessage } from "element-plus";

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const route = useRoute();
const remittanceSummary = ref(null)
const paymentStatus = ['NotPaid', 'FullyPaid', 'PartialPayment']
const recordStatus = ['Pending', 'Editable', 'Locked']
const lockloading = ref(false);
const loading = ref(false);
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
const tableData2 = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
]

const paymentHeader = [
    { name: 'Collection Item', value: 'collection' },
    { name: 'Date', value: 'datePaid' },
    { name: 'Channel', value: 'paymentChannel' },
    { name: 'Amount', value: 'amount' },
    { name: 'Receipt', value: 'receipt' },
]

const body = []

const getRemittanceSummary = async () => {
    loading.value = true;
    try {
        const response = await GetRemittanceById(route.params.id)
        console.log(response)
        loading.value = false;
        remittanceSummary.value = response
    } catch (error) {
        loading.value = false;
        console.error(error)
    }
}
getRemittanceSummary();

const copylink = () => {
    const textarea = document.createElement("textarea");
    textarea.value = remittanceSummary.value?.remittanceCode;

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");
    document.body.removeChild(textarea)

    ElMessage({
        showClose: true,
        message: "Copied to Clipboard!",
        type: "success",
    });
};

const lockTransaction = async () => {
    lockloading.value = true
    const payload = { id: route.params.id }
    try {
        const response = await LockRemittanceTransaction(payload)
        console.log(response)
        remittanceSummary.value.recordStatus = 2;
        ElMessage({
            showClose: true,
            message: "This transaction is locked!",
            type: "success",
            duration: "5000"
        });
        lockloading.value = false;
    } catch (error) {
        lockloading.value = false;
        console.error(error)
    }
}


</script>

<template>
    <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="container-top">
            <section class="d-flex justify-content-between">
                <div>
                    <div class="text-head h2 font-weight-bold py-0 my-0 text-black">Remittance Summary</div>
                    <div class="col-12 mt-1 px-0">
                        <div @click="router.go(-1)">
                            <span class="s-18 fw-400 cursor-pointer text-black">
                                <img src="../../../assets/goback.png" alt="" /> Go back</span>
                        </div>
                    </div>
                </div>
                <el-dropdown trigger="click"
                    class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
                    style="height: 2.2rem">
                    <span class="el-dropdown-link w-100 primary--text text-center font-weight-600">
                        Export
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item class="text-black">
                                pdf
                            </el-dropdown-item>
                            <el-dropdown-item class="text-black">
                                excel
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </section>
            <section class="d-flex align-items-center justify-content-end">
                <div class="font-weight-600 text-dark">Remittance ID: {{ remittanceSummary?.remittanceCode }}</div>
                <el-button text @click="copylink">
                    <img class="ml-2" src="../../../assets/copyurl-icon.png" alt="" />
                </el-button>
            </section>
            <el-progress :percentage="100" :indeterminate="true" :duration="1" v-if="loading">
                <div></div>
            </el-progress>
            <section class="wrapper mt-4">
                <div class="top-summary px-5">
                    <div class="d-flex justify-content-between align-items-center flex-wrap py-3">
                        <div>
                            <div class="title">Period</div>
                            <div class="value">{{ remittanceSummary?.periodMonth }} {{ remittanceSummary?.periodYear }}
                            </div>
                        </div>
                        <el-divider class="divider" direction="vertical" />
                        <div>
                            <div class="title">Remittable</div>
                            <div class="value">NGN {{ remittanceSummary?.totalRemittableAmount?.toLocaleString() }}
                            </div>
                        </div>
                        <el-divider class="divider" direction="vertical" />
                        <div>
                            <div class="title">Amount Paid</div>
                            <div class="value">NGN {{ remittanceSummary?.amountPaid?.toLocaleString() }}</div>
                        </div>
                        <el-divider class="divider" direction="vertical" />
                        <div>
                            <div class="title">Payment date</div>
                            <div class="value">{{ dateFormatter.monthDayYear(remittanceSummary?.lastPaymentDate) }}
                            </div>
                        </div>
                        <el-divider class="divider" direction="vertical" />
                        <div>
                            <div class="title">Status</div>
                            <div class="value">{{ remittanceSummary?.paymentStatus &&
                                paymentStatus[remittanceSummary?.paymentStatus] }}</div>
                        </div>
                        <el-divider class="divider" direction="vertical" />
                        <div>
                            <div>
                                <el-button size="large" color="#0745AF" style="min-width: 100px"
                                    :disabled="remittanceSummary?.paymentStatus === 1"
                                    @click="router.push('/tenant/branchremittance/remittancesummary/recordpayment')"
                                    round>Record
                                    Payment</el-button>
                            </div>
                            <div class="mt-2">
                                <el-button size="large" color="#939393" class="text-white w-100" :loading="lockloading"
                                    style="min-width: 100px" round v-if="remittanceSummary?.recordStatus === 2">
                                    <el-icon :size="18">
                                        <Lock />
                                    </el-icon>&nbsp;
                                    Locked</el-button>

                                <el-button size="large" color="#08A53D" @click="lockTransaction" round v-else>
                                    <el-icon :size="18">
                                        <Unlock />
                                    </el-icon>&nbsp;
                                    Lock Transaction</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-5" style="overflow: scroll;">
                    <el-auto-resizer>
                        <template #default="{ height, width }">
                            <el-table :data="remittanceSummary?.remittanceItems" style="width: 100%; min-width: 800px;"
                                class="remittancesummary">
                                <el-table-column prop="date" label="Remittance item">
                                    <template #default="scope">
                                        <div class="value-wrapper1">
                                            <div>{{ scope.row?.remittableItem?.name }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="amount" label="Amount">
                                    <template #default="scope">
                                        <div class="value-wrapper2">
                                            <div style="color: #949494; font-size: 13px">NGN</div>&nbsp;
                                            <div style="color: #646464; font-weight: 600">{{ scope.row?.amount?.toLocaleString() }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="Remittable amount">
                                    <template #default="scope">
                                        <div class="value-wrapper3">
                                            <div style="color: #646464; font-weight: 600">NGN {{
                                                scope.row?.remittableAmount?.toLocaleString() }}</div>
                                            <div style="color: #B5B5B5">{{ scope.row.remittableItem?.percentage }}%
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="netAmount" label="Net amount">
                                    <template #default="scope">
                                        <div class="value-wrapper1">
                                            <div>NGN {{ scope.row?.netAmount?.toLocaleString() }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-auto-resizer>
                </div>
                <div class="p-5" style="overflow: scroll;">
                    <el-auto-resizer>
                        <template #default="{ height, width }">
                            <el-table :data="tableData2" style="width: 100%; min-width: 800px;"
                                class="remittancesummary">
                                <el-table-column>
                                    <template #default="scope">

                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template #default="scope">
                                        <div class="total-value-wrapper2">
                                            <div style="color: #949494; font-size: 13px">NGN</div>&nbsp;
                                            <div style="color: #646464; font-weight: 600">{{
                                                remittanceSummary?.totalCollection?.toLocaleString() }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template #default="scope">
                                        <div class="total-value-wrapper3">
                                            <div style="color: #646464; font-weight: 600">NGN {{
                                                remittanceSummary?.totalRemittableAmount?.toLocaleString() }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template #default="scope">
                                        <div class="total-value-wrapper1">
                                            <div>NGN {{ remittanceSummary?.totalNetAmount?.toLocaleString() }}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-auto-resizer>
                </div>
            </section>
            <section class="mt-5">
                <div class="row">
                    <div class="col-12 col-md-6 offset-md-3">
                        <h3 class="font-weight-600 mb-2">Payment history</h3>
                        <Table :data="remittanceSummary?.remittancePayments" :headers="paymentHeader"
                            :checkMultipleItem="false" class="border">
                            <template v-slot:collection="{ item }">
                                <div class="c-pointer fw-500 s-16">
                                    {{ item.collection }}
                                </div>
                            </template>
                            <template v-slot:datePaid="{ item }">
                                <div class="c-pointer transform_none fw-500 s-16">
                                    {{ dateFormatter.monthDayYear(item.datePaid) }}
                                </div>
                            </template>
                            <template v-slot:paymentChannel="{ item }">
                                <div class="c-pointer transform_none fw-500 s-16">
                                    {{ item.paymentChannel }}
                                </div>
                            </template>
                            <template v-slot:amount="{ item }">
                                <div class="c-pointer transform_none fw-500 s-16">
                                    {{ item.amount }}
                                </div>
                            </template>
                            <template v-slot:receipt>
                                <div class="c-pointer">
                                    <div>
                                        {{ receipt ? 'View' : '-' }}
                                    </div>
                                </div>
                            </template>
                        </Table>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
.wrapper {
    border: 1px solid #C7C7C7;
    border-radius: 10px;
    padding-bottom: 30px;
}

.top-summary {
    border-bottom: 1px solid #C9C9C9;
}

.top-summary>div {
    gap: 6px;
}

.value-wrapper1 {
    background-color: #ECECEC;
    border-radius: 8px;
    padding: 10px;
    color: #646464;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
}

.value-wrapper2 {
    background-color: #ECECEC;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.value-wrapper3 {
    background-color: #ECECEC;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.total-value-wrapper1 {
    background-color: #EBEDFF;
    border: 1px solid #AEAEAE;
    border-radius: 8px;
    padding: 10px;
    color: #646464;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
}

.total-value-wrapper2 {
    background-color: #EBEDFF;
    border: 1px solid #AEAEAE;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.total-value-wrapper3 {
    background-color: #EBEDFF;
    border: 1px solid #AEAEAE;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.title {
    font-size: 14px;
    color: black;
    text-align: center
}

.value {
    font-size: 20px;
    color: black;
    text-align: center;
    font-weight: 600;
}

.divider {
    height: 50px
}
</style>