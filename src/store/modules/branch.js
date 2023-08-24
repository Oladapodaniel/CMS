

export default {
    state: {
        currentBranch: {},
    },

    mutations: {
        setCurrentBranch(state, payload) {
            state.currentBranch = payload;
        },


        clearState(state) {
            for (var prop in state) delete state[prop];
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