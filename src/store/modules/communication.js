import axios from "@/gateway/backendapi";
import communicationService from "../../services/communication/communicationservice"

export default {
    namespaced: true,

    state: {
        allSentSMS: [ ],
        smsReplies: [ ],
        smsDrafts: [ ],
        emailDrafts: [ ],
        sentEmails: [ ],
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
            state.emailDrafts =  payload;
        },
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

        async getAllSentSMS({ commit }) {
            try {
                const { data } = await axios.get("/api/Messaging/getAllSentSms?page=1");
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
        }
      },

      getters: {
        allSentSMS: state => state.allSentSMS,
        getById: (state) => (id) => state.allSentSMS.find(i => i.id === id),
        smsReplies: state => state.smsReplies,
        smsDrafts: state => state.smsDrafts,
        emailDrafts: state => state.emailDrafts,
        sentEmails: state => state.sentEmails,
        getEmailDraftById: state => id => state.emailDrafts.find(i => i.id === id),
      },
}