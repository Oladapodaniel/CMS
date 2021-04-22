import axios from "@/gateway/backendapi";
import communicationService from "../../services/communication/communicationservice"

export default {
    namespaced: true,

    state: {
        allSentSMS: [],
        smsReplies: [],
        smsDrafts: [],
        emailDrafts: [],
        sentEmails: [],
        addSmsToSentList: {},
        addToSentEmail: {},
    },

    mutations: {
        setAllSentSMS(state, payload) {
            state.allSentSMS = payload;
        },

        setSMSReplies(state, payload) {
            state.smsReplies = payload;
        },

        setSMSDrafts(state, payload) {
            state.smsDrafts = payload;
        },

        addDraft(state, payload) {
            state.smsDrafts.push(payload);
        },

        setSentEmails(state, payload) {
            state.sentEmails.push(payload);
        },

        setEmailDrafts(state, payload) {
            state.emailDrafts = payload;
        },
        addSmsToSentList(state, payload) {
            // state.addSmsToSentList = payload
            state.allSentSMS.unshift(payload)
        },
        addToSentEmail(state, payload) {
            // state.sentEmails.pop()
            state.sentEmails.push(payload)
            // state.addToSentEmail = payload
        },
        removeSentSMS(state, payload) {
            const x = state.allSentSMS.findIndex(i => i.id === payload);
            if (x >= 0) {
                state.allSentSMS.splice(x, 1);
            }
        },
        removeSentReplies(state, payload) {
            const b = state.smsReplies.findIndex(i => i.id === payload);
            if (b >= 0) {
                state.smsReplies.splice(b, 1)
            }
        },
        removeSmsDrafts(state, payload) {
            const d = state.smsDrafts.findIndex(i => i.id === payload);
            if (d >= 0) {
                state.smsDrafts.splice(d, 1)
            }
        },
        removeEmailDrafts(state, payload) {
            const m = state.emailDrafts.findIndex(i => i.id === payload);
            if (m >= 0) {
                state.emailDrafts.splice(m, 1)
            }
        },

        removeSentEmails(state, payload) {
            const s = state.sentEmails.findIndex(i => i.id === payload);
            if (s >= 0) {
                state.sentEmails.splice(s, 1)
            }
        }
    },

    actions: {
        setAllSentSMS({ commit }, payload) {
            commit("setAllSentSMS", payload)
        },

        setSMSReplies({ commit }, payload) {
            commit("setAllSentSMS", payload)
        },

        setSMSDrafts({ commit }, payload) {
            commit("setSMSDrafts", payload)
        },

        addDraft({ commit }, payload) {
            commit("addDraft", payload)
        },
        addSmsToSentList({ commit }, payload) {
            commit("addSmsToSentList", payload)
        },
        addToSentEmail({ commit }, payload) {
            commit("addToSentEmail", payload)
            // console.log(payload)
        },

        async getAllSentSMS({ commit }) {
            try {
                const { data } = await axios.get("/api/Messaging/getAllSentSms?page=0");
                commit("setAllSentSMS", data);
            } catch (error) {
                console.log(error);
            }
        },

        async getSMSReplies({ commit }) {
            try {
                const data = await communicationService.getSMSReplies(0);
                if (data) commit("setSMSReplies", data);
            } catch (error) {
                console.log(error);
            }
        },

        async getSMSDrafts({ commit }) {
            try {
                const data = await communicationService.getDrafts();
                if (data) commit("setSMSDrafts", data);
            } catch (error) {
                console.log(error);
            }
        },

        async getSentEmails({ commit }) {
            try {
                const data = await communicationService.getSentEmails(0);
                if (data) commit("setSentEmails", data);
            } catch (error) {
                console.log(error);
            }
        },

        async getEmailDrafts({ commit }) {
            try {
                const data = await communicationService.getEmailDrafts(0);
                if (data) commit("setEmailDrafts", data);
            } catch (error) {
                console.log(error);
            }
        },

        removeSentSMS({ commit }, payload) {
            commit("removeSentSMS", payload);
        },

        removeSentReplies({ commit }, payload) {
            commit("removeSentReplies", payload)
        },

        removeSmsDrafts({ commit }, payload) {
            commit("removeSmsDrafts", payload)
        },
        removeEmailDrafts({ commit }, payload) {
            commit("removeEmailDrafts", payload)
        },
        removeSentEmails({ commit }, payload) {
            commit("removeSentEmails", payload)
        }
    },

    getters: {
        allSentSMS: state => state.allSentSMS,
        getById: (state) => (id) => state.allSentSMS.find(i => i && i.id === id),
        smsReplies: state => state.smsReplies,
        smsDrafts: state => state.smsDrafts,
        emailDrafts: state => state.emailDrafts,
        sentEmails: state => state.sentEmails,
        getEmailDraftById: state => id => state.emailDrafts.find(i => i.id === id),
        addSmsToSentList: state => state.addSmsToSentList,
        addToSentEmail: state => state.addToSentEmail
    },
}