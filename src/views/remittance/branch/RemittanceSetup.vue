<script setup>
import { inject } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';
import Table from "@/components/table/Table";

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');
const header = [
    { name: 'Collection Item', value: 'collection' },
    { name: 'Remittable', value: 'remittable' },
    { name: 'Bank', value: 'bank' },
    { name: 'Actions', value: 'action' },
]

const body = [
    {
        collection: 'Offering',
        remittable: '10%',
        bank: '0123323 -Access Bank',
        Action: 'actions'
    },
    {
        collection: 'Offering',
        remittable: '10%',
        bank: '0123323 -Access Bank',
        action: 'actions'
    },
    {
        collection: 'Offering',
        remittable: '10%',
        bank: '0123323 -Access Bank',
        action: 'actions'
    },
    {
        collection: 'Offering',
        remittable: '10%',
        bank: '0123323 -Access Bank',
        action: 'actions'
    },
]
</script>

<template>
    <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="container-top">
            <section>
                <div class="text-head h2 font-weight-bold py-0 my-0 text-black">Remittance item setup</div>
                <div class="col-12 mt-1 px-0">
                    <div @click="router.go(-1)">
                        <span class="s-18 fw-400 cursor-pointer text-black">
                            <img src="../../../assets/goback.png" alt="" /> Go back</span>
                    </div>
                </div>
            </section>
            <section class="mt-4">
                <div class="col-12 col-md-6 offset-md-3 card">
                    <div>
                        <div class="text_label">Offering or collection items</div>
                        <el-input type="text" placeholder="Offering" />
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Remittance percentage</div>
                        <el-input type="text" placeholder="10%" />
                        <div class="small-text mt-1">10% of the total collection will be sent to the HQ, while the
                            branch manages 90%</div>
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Receiving Bank Account</div>
                        <el-input type="text" placeholder="Choose bank" />
                    </div>
                    <div class="d-flex align-items-center justify-content-center my-3 gap-5 c-pointer">
                        <el-icon :color="primarycolor">
                            <CirclePlus />
                        </el-icon> &nbsp;
                        <div class="font-weight-600" :style="`color: ${primarycolor}`">Add new bank account</div>
                    </div>
                    <div class="d-flex justify-content-center mt-4">
                        <el-button :color="primarycolor" class="px-5" size="large" round>Save</el-button>
                    </div>
                </div>
                <div class="col-12 col-md-6 offset-md-3 border px-0 mt-5">
                    <Table :data="body" :headers="header" :checkMultipleItem="false">
                        <template v-slot:collection="{ item }">
                            <div class="c-pointer fw-500 s-16">
                                {{ item.collection }}
                            </div>
                        </template>
                        <template v-slot:remittable="{ item }">
                            <div class="c-pointer transform_none fw-500 s-16">
                                {{ item.remittable }}
                            </div>
                        </template>
                        <template v-slot:bank="{ item }">
                            <div class="c-pointer transform_none fw-500 s-16">
                                {{ item.bank }}
                            </div>
                        </template>
                        <template v-slot:action>
                            <div class="c-pointer">
                                <div>
                                    <el-icon color="#6D6D6D" :size="20">
                                        <Edit />
                                    </el-icon> &nbsp;
                                    <el-icon color="#E44040" :size="20">
                                        <Delete />
                                    </el-icon>
                                </div>
                            </div>
                        </template>
                    </Table>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
.card {
    background-color: #EBEDFF;
    padding: 40px
}

.text_label {
    color: #1E1E1E;
    font-weight: 500;
    margin-bottom: 5px;
}
</style>