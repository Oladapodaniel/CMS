<script setup>


const { title, breadcrumbs } = defineProps(['title', 'breadcrumbs']);
const emit = defineEmits(['handleClick'])
</script>

<template>
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
            <div class="text-head font-weight-bold text-black h2">{{ title }}</div>
            <div class="grey-backg py-2 border-radius-8 px-2" v-if="breadcrumbs">
                <router-link :to="breadcrumbs.route" class="text-decoration-none s-18 text-dak">
                    <span class="linear-gradient">{{ breadcrumbs.name }}</span>
                </router-link>
            </div>
        </div>
        <slot name="rightbutton" />
    </div>
</template>