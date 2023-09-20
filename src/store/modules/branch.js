

const defaultState = (() => ({
    currentBranch: {},
}))

export default {
    // state: {
    //     currentBranch: {},
    // },
    namespaced: true,
    state: defaultState(),

    mutations: {
        setCurrentBranch(state, payload) {
            state.currentBranch = payload;
        },

        clearState(state) {
            Object.assign(state, defaultState())
          }
    },

    actions: {
        setCurrentBranch({ commit }, payload) {
            commit("setCurrentBranch", payload)
        },

        clearState({ commit }) {
            commit("clearState")
        },
    },

    getters: {
        currentBranch: state => state.currentBranch,
    },
}