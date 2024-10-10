<script setup>
import moment from 'moment';
import { ref } from 'vue';


const value = ref("")

defineProps({
    label: {
        type: String,
        required: false
    },
    class: {
        type: String,
        required: false
    },
    // value: {
    //     type: String,
    //     required: true
    // },
    size: {
        type: String,
        required: false
    },
})

const emit = defineEmits(["date"])

const onSelect = () => {
    const isoString = value.value ? new Date(value.value).toISOString() : value.value;
    const converted = moment(isoString).format('YYYY-MM-DD');
    emit("date", converted)
}
</script>


<template>
    <el-date-picker  
        v-model="value" 
        :class="class" 
        type="date"
        :placeholder="label" 
        :size="size" 
        :change="onSelect()"
    />
</template>
