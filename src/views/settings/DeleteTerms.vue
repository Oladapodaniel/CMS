<script>
import { ref, inject } from "vue";
export default {
    setup() {
        const primarycolor = inject('primarycolor')
        const terms = ref([
            'Data Deletion: By deleting your account, all your data associated with the account will be permanently removed from our system. This includes your profile information, preferences, and any content you\'ve created or shared.',
            'Irreversible Action: Deleting your account is irreversible. Once you confirm the deletion, there\'s no way to recover your account or any associated data. ',
            'Subscriptions and Purchases: Please note that deleting your account does not automatically cancel any active subscriptions or delete purchase history. If you have any subscriptions or outstanding purchases, you\'ll need to manage them separately.',
            'Feedback: We value your feedback. If there\'s anything specific that led you to delete your account, we\'d appreciate hearing about it. Your input helps us improve our service for others.'
        ])
        return {
            terms,
            primarycolor
        }
    }
}
</script>

<template>
    <div>
        <div class="container">
            <div class="row d-md-flex justify-content-between mt-3 mb-5">
                <div class="col-md-12">
                    <h2 class="attend">Delete Account</h2>
                </div>
            </div>

            <div>
                We're sorry to see you go. If you're sure about deleting your account, we want to make the process as
                simple as
                possible for you. Please take a moment to review the following information before proceeding.
            </div>
            <div class="font-weight-bold mt-5">
                Important Points to Consider:
            </div>
            <ol class="mt-4">
                <li v-for="(item, index) in terms" :keys="index" class="mt-3">{{ item }}</li>
            </ol>
            <el-button size="large" round class="w-100 mt-5" :color="primarycolor">
                <span class="text-white">Verify Account</span>
            </el-button>
        </div>
    </div>
    <div>
    </div>
</template>

<style scoped>
.attend {
    font: var(--unnamed-font-style-normal) normal 800 34px/46px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 34px/46px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
}
</style>