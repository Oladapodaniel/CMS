import axios from "@/gateway/backendapi";
import contributionservice from  "../../services/financials/contributionservice"

const defaultState = (() => ({
    contributionList: [],
    contributionsList: {},
    contributionItems: [],
    paymentData: {}
}))

export default {
    namespaced: true,
    state: defaultState(),
    // state: {
    //     contributionList: [],
    //     contributionItems: [],
    //     paymentData: {}
    // }
    mutations: {
        SET_CONTRIBUTION (state, payload) {
            state.contributionsList = payload
        },
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
            payload.forEach(i => state.contributionList.unshift(i))
        },
        removeContribution(state, payload) {
            state.contributionsList = state.contributionsList.filter(
              (item) => item.id !== payload
            );
          },
          addContribution(state, payload) {
            state.contributionsList.push(payload);
          },

        // clearState(state) {
        //     state.contributionList = []
        //     state.contributionItems = []
        //     state.paymentData = {}
        // }
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },
    actions: {
        setContributionList ({ commit }) {
            return contributionservice.getContributionList().then(response => {  
                commit('SET_CONTRIBUTION', response.returnObject)
                return response.returnObject
            })
        },

        removeContributionFromStore({ commit }, payload) {
            commit("removeContribution", payload)
        },
        addContribution({ commit }, payload) {
            commit("addContribution", payload);
          },

        async contributionList({ commit }) {
                try {
                    const { data } = await axios.get("/api/Financials/Contributions/Transactions");
                    commit("saveList", data);
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
    },
    getters: {
        contributionList: state => state.contributionList, 
        contributionItems: state => state.contributionItems,
        paymentData: state => state.paymentData,
        contributionsItem: (state) => {
            return state.contributionsList
        },
    },
}