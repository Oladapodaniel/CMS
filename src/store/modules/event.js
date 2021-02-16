
export default {
    state: {
        eventData: { },
    },

    mutations: {
        setEventData(state, payload) {
            state.eventData = payload;
        }
    },

    actions: {
        setEventData({ commit }, payload) {
          commit("setEventData", payload)
        }
      },

      getters: {
        eventData: state => state.currentUser
      },
}