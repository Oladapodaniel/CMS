<template>
    <div class="">
        <div class="row d-md-flex align-items-center mt-3 mb-4">
            <div class="col-md-6 col-sm-12">
                <div class="search-div d-flex  align-items-center">
                    <span class="mr-2"><el-icon>
                            <Search />
                        </el-icon></span>
                    <input type="text" class="w-100" placeholder="Search here..." v-model="searchVoiceText" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 " v-if="searchScheduleVoiceList && searchScheduleVoiceList.length > 0">

                <Table :data="searchScheduleVoiceList" :headers="voiceHeaders" :checkMultipleItem="false"
                    v-loading="voiceLoading">
                    <template #subject="{ item }">
                        <div>
                            <div class="font-weight-600">{{ item.subject }}</div>
                        </div>
                    </template>
                    <template #voiceMessageUrl="{ item }">
                        <div>
                            <div class="font-weight-600"><el-button type="success" @click="copyToClipBoard(item)" plain
                                    round>Copy
                                    URL</el-button></div>
                        </div>
                    </template>
                    <template #user="{ item }">
                        <div>
                            <div class="font-weight-600">{{ item.user }}</div>
                        </div>
                    </template>
                    <template #isExecuted="{ item }">
                        <div>
                            <div class="font-weight-600">{{ item.isExecuted === false ? "No" : "Yes" }}</div>
                        </div>
                    </template>
                    <template #executionDate="{ item }">
                        <div>
                            <div class="font-weight-600">{{ date(item.executionDate) }}</div>
                        </div>
                    </template>

                    <!-- <template #smsUnitsUsed="{ item }">
                        <div>
                            <div class="font-weight-600">{{ item.smsUnitsUsed }}</div>
                        </div>
                    </template> -->
                    <!-- <template #report="{ item }">
                        <div>
                            <div class="font-weight-600 primary--text c-pointer"
                                @click="$router.push(`/tenant/voice/report/${item.id}`)">View_report</div>
                        </div>
                    </template> -->
                </Table>
            </div>
            <div class="col-md-12 mt-5 text-center" v-else>
                No Data
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from "vue"
import Table from "@/components/table/Table"
// import store from "../../../store/store"
import { ElMessage } from 'element-plus'
import monthDayYear from "../../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
export default {
    components: {
        Table
    },
    setup() {
        const scheduleVocieList = ref([]);
        const searchVoiceText = ref("");
        const voiceLoading = ref(false);

        const voiceHeaders = ref([
            { name: 'Subject', value: 'subject' },
            { name: 'Audio URL', value: 'voiceMessageUrl' },
            { name: 'is Executed', value: 'isExecuted' },
            { name: 'Execution Date', value: 'executionDate' },
            { name: 'Sent By', value: 'user' },
            // { name: 'Unit used', value: 'smsUnitsUsed' },
            // { name: 'Report', value: 'report' }
        ])

        const getScheduleVoice = async () => {
            voiceLoading.value = true
            try {
                const { data } = await axios.get('/api/Messaging/getVoiceSchedules')
                scheduleVocieList.value = data
                voiceLoading.value = false
            }
            catch (err) {
                console.log(err);
                voiceLoading.value = false
            }
        }
        getScheduleVoice()

        const date = (offDate) => {
            return monthDayYear.monthDayTime(offDate);
        };

        const copyToClipBoard = async (item) => {
            await navigator.clipboard.writeText(item.voiceMessageUrl).then(() => {
                ElMessage({
                    type: 'success',
                    message: "Copied to clipboard",
                    duration: 5000
                })
            })
        }

        const searchScheduleVoiceList = computed(() => {
            if (searchVoiceText.value !== "" && scheduleVocieList.value.length > 0) {
                return scheduleVocieList.value.filter((i) => {
                    if (i.subject)
                        return i.subject
                            .toLowerCase()
                            .includes(searchVoiceText.value.toLowerCase());
                });
            } else {
                return scheduleVocieList.value;
            }

        });

        return {
            scheduleVocieList,
            searchScheduleVoiceList,
            searchVoiceText,
            voiceHeaders,
            copyToClipBoard,
            voiceLoading,
            date
        }

    },
}
</script>

<style scoped>
.search-div {
    /* width: fit-content; */
    padding: 10px;
    background: #f5f8f9;
    border-radius: 200px;
}

.search-div input {
    background: none;
    border: none;
    outline: transparent;
}

@media (max-width: 767px) {
    .search-div {
        width: 100%;
    }
}
</style>