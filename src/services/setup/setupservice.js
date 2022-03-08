// import { useStore } from "vuex";
import store from "../../store/store"
// const store = useStore();

const setupService = {
    setup() {
        store.dispatch("communication/getAllSentSMS");
        store.dispatch("communication/getSMSReplies");
        store.dispatch("communication/getSentEmails");
        store.dispatch("communication/getEmailDrafts");
        store.dispatch("communication/getSMSDrafts");
        store.dispatch("lookups/setup");
        store.dispatch("lookups/getPeopleClassifications");
        store.dispatch("lookups/getUserSources");
        store.dispatch("membership/getMembers");
        // store.dispatch("membership/getFirstTimers");
        store.dispatch("groups/getGroups");
        store.dispatch('contributions/contributionList')
        store.dispatch("communication/addSmsToSentList");
        // store.dispatch("communication/addToSentEmail");
    },

    clearStore() {
        store.dispatch("clearState");
        store.dispatch("attendance/clearState");
        store.dispatch("communication/clearState");
        store.dispatch("contributions/clearState");
        store.dispatch("clearPeopleInStore");
    }
}

export default setupService;