<template>
    <div class="container max-height px-0 scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :header="'Form Submission'" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600 mb-0">When the following form is submitted</label>
            </div>
            <div class="col-md-12 mb-2 mt-3">
                <el-select-v2 v-model="data.forms" size="large" :options="allForms.map(i => ({ label: i.name, value: i.id }))" placeholder="Please select" style="width: 100%"
                    @change="formSelected"
                    multiple />
            </div>
        </div>

    </div>
</template>

<script>
import Dropdown from "primevue/dropdown"
import MultiSelect from "primevue/multiselect"
import TriggerDescription from "../TriggerDescription.vue"
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import { watchEffect } from "vue";
export default {
    components: { Dropdown, TriggerDescription, MultiSelect },
    props: [
    "selectedTriggerIndex",
    "condition",
  ],
  emits: ["updatetrigger", "removetrigger"],
    setup(props, { emit }) {
        const data = ref({ });
        const allForms = ref([]);
        const parsedData = ref({});

        const getAllForms = async () => {
            try {
                let { data } = await axios.get("api/Forms/getallforms");
                console.log(data)
                allForms.value = data
            }
            catch(err) {
                console.error(err)
            }
        }
        getAllForms();

        const formSelected = () => {
            console.log(data.value, props.selectedTriggerIndex)
            emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
        }


        watchEffect(() => {
            if (props.condition.jsonCondition) {
                parsedData.value = JSON.parse(props.condition.jsonCondition);
                data.value.forms = parsedData.value.forms ? parsedData.value.forms.split(",") : [];
            }
        })

        return {
            data,
            allForms,
            formSelected,
            parsedData
        }
    }
}
</script>

<style scoped>
.dotted-border-bottom {
    border-bottom: dotted 2px #ddd;
}

.max-height {
    max-height: calc(100vh - 300px);
}
</style>