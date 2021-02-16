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
        store.dispatch("membership/getFirstTimers");
        store.dispatch("groups/getGroups");
    }
}

export default setupService;