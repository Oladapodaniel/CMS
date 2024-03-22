<template>
    <div class="container-fluid container-top">
        <div class="row">
            <div class="col-md-12 " v-if="scheduleVocieList && scheduleVocieList.length > 0"></div>
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
// import { ElMessage } from 'element-plus'
import axios from "@/gateway/backendapi";
export default {
    components : {
        Table
    },
    setup() {
        const scheduleVocieList = ref([]);

        const getScheduleVoice = async () => {
            try{
                 const { data } = await axios.get('/api/Messaging/getVoiceSchedules')
                 scheduleVocieList.value = data
                 console.log(scheduleVocieList.value, 'hhjjhj');
            }
            catch(err){
                console.log(err);
            }
        }
        getScheduleVoice()

        return{
            scheduleVocieList,
        }
        
    },
}
</script>

<style scoped>

</style>./ScheduledVoice.vue