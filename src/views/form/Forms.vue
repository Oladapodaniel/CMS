<template>
    <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <router-view></router-view>
    </div>
</template>

<script>
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
export default {
    setup() {
        const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

        return {
            mdAndUp, lgAndUp, xlAndUp, xsOnly,
        }
    },
}
</script>

<style scoped>

</style>