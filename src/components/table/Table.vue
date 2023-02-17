<template>
    <div class="table-parent">
        <table class="table-border w-100">
            <thead class="table-head mobile">
                <tr>
                    <th v-if="checkMultipleItem">
                        <el-checkbox v-model="checked" @change="checkAllRows" :indeterminate="isIndeterminate"
                            :checked="data.length > 0 && (data.length === checkedRow.length)" size="large" />
                    </th>
                </tr>
            </thead>
            <thead class="table-head desktop">
                <tr>
                    <th v-if="checkMultipleItem">
                        <el-checkbox v-model="checked" @change="checkAllRows" :indeterminate="isIndeterminate"
                            :checked="data.length > 0 && (data.length === checkedRow.length)" size="large" />
                    </th>
                    <th v-for="(head, index) in headers" :key="index" :class="{ 'py-3': !checkMultipleItem }">
                        <h2>{{ head.name }}</h2>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <td v-if="checkMultipleItem">
                        <el-checkbox v-model="item.check" @change="checkSingleRow(index)" size="large" />
                    </td>
                    <td v-for="(head, index) in headers" :key="index" :class="{ 'py-2': !checkMultipleItem }">
                        <span>
                            <h2>{{ head.name }}</h2>
                        </span>
                        <slot :name="head.value" v-bind:item="item">-</slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    emits: ['checkedrow'],
    props: {
        data: {
            type: Array,
            required: true,
            default: () => ({})
        },
        headers: {
            type: Array,
            required: true,
            default: () => ({})
        },
        checkMultipleItem: {
            type: Boolean,
            required: false,
            default: () => ({})
        }
    },
    setup(props, { emit }) {
        const table = ref('tbale')
        const checked = ref(false)
        const checkedRow = ref([])
        const isIndeterminate = ref(false)

        const checkSingleRow = (index) => {
            const currentRow = props.data[index]
            if (currentRow.check) {
                checkedRow.value.push(currentRow)
            } else {
                const findRow = checkedRow.value.findIndex(i => i.id === currentRow.id)
                if (findRow >= 0) {
                    checkedRow.value = checkedRow.value.filter(i => i.id !== currentRow.id)
                }
            }
            isIndeterminate.value = checkedRow.value.length > 0 && checkedRow.value.length < props.data.length
            emit('checkedrow', checkedRow.value)
        }

        const checkAllRows = () => {
            isIndeterminate.value = false
            if (checked.value) {
                checkedRow.value = props.data
                props.data.map(i => {
                    i.check = true
                    return i
                })
            } else {
                checkedRow.value = new Array();
                props.data.map(i => {
                    i.check = false
                    return i
                })
            }
            emit('checkedrow', checkedRow.value)
        }
        return {
            table,
            checked,
            checkedRow,
            checkSingleRow,
            checkAllRows,
            isIndeterminate
        }
    }
}
</script>

<style scoped>
.table-parent {
    max-width: 100%;
    overflow-x: scroll
}

.table-border {
    border: 1px solid rgb(212, 221, 227);
    color: #47545c;
    box-sizing: border-box;
}

/* .table-head {
    background: #ecf0f3;
    height: 56px;
} */

.table-head h2 {
    font-weight: 800;
    font-size: 16px;
    margin: 0;
    color: #646464;
}

tbody h2 {
    font-weight: 800;
    font-size: 16px;
    margin: 0;
    color: #646464;
}

table td,
table th {
    padding: 0px 10px;
}

table tbody tr,
table thead tr {
    /* height: 60px; */
    border-bottom: 1px solid #d4dde3;
}

table tbody tr:hover {
    background-color: #FAFAFA;
}

table tbody tr:nth-child(even) {
    background-color: #FAFAFA;
}

table tbody tr td:first-child input {
    width: 20px;
}

tbody td span {
    display: none;
}

thead.mobile {
    display: none;
}

@media (max-width: 996px) {
    thead.desktop {
        display: none;
    }

    thead.mobile {
        display: flex;
    }

    tbody tr,
    thead tr {
        display: flex;
        flex-direction: column;
    }

    tbody td {
        display: flex;
        justify-content: space-between;
    }

    tbody td span {
        display: block;
    }

    table tbody tr {
        padding-bottom: 5px;
        padding-top: 5px;
    }

    table td {
        padding: 7px 10px
    }
}
</style>