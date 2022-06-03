import axios from "@/gateway/backendapi";

export default {
    namespaced: true,
    state: {
        contributionList: [],
        contributionItems: [],
        paymentData: {}
    },
    getters: {
        contributionList: state => state.contributionList, 
        contributionItems: state => state.contributionItems,
        paymentData: state => state.paymentData
    },
    mutations: {
        saveList(state, payload) {
            state.contributionList = payload.returnObject.contribution
        },
        contributionItems(state, payload) {
            state.contributionItems = payload
        },
        paymentData(state, payload) {
            state.paymentData = payload
        },
        newlyAddedContribution(state, payload) {
            // state.contributionList.unshift(payload)
            payload.forEach(i => state.contributionList.unshift(i))
            console.log(state.contributionList)
            console.log(payload)
        },

        clearState(state) {
            state.contributionList = []
            state.contributionItems = []
            state.paymentData = {}
        }
    },
    actions: {
        async contributionList({ commit }) {
                try {
                    const { data } = await axios.get("/api/Financials/Contributions/Transactions");
                    commit("saveList", data);
                    console.log(data)
                } catch (error) {
                    console.log(error);
                }
        },
        async contributionItems({ commit }) {
            try {
                const { data } = await axios.get("/api/financials/contributions/items");
                commit("contributionItems", data)
            } catch (error) {
                console.log(error)
            }
        },
         paymentData({ commit }, payload) {
            commit("paymentData", payload)
        },
         newlyAddedContribution({ commit }, payload) {
            commit("newlyAddedContribution", payload)
        },
        clearState({ commit }) {
            commit("clearState")
        },
    }
}