import axios from "@/gateway/backendapi";
import eventitems from '../../services/events/eventsservice';


const defaultState = (() => ({
          eventData: {},
          eventList: [],
          reportData: {},
          eventItems : {}
      }))

export default {
  namespaced: true,
  state: defaultState(),
  
  mutations: {
    setEventData(state, payload) {
      state.eventData = payload;
    },
    SET_EVENTITEMS (state, payload) {
      state.eventItems = payload
    },
    eventList(state, payload) {
      state.eventList = payload
    },
    addEventItem(state, payload) {
      state.eventItems.push(payload);
    },
    removeEventItem(state, payload) {
      state.eventItems.activities = state.eventItems.activities.filter(
        (item) => item.id !== payload
      );
    },
    clearState(state) {
      Object.assign(state, defaultState())
    },
    // clearState(state) {
    //   state.eventData = {}
    //   state.eventList = []
    //   state.reportData = {}
    //   state.geteventitems = {}
    // },

    setReportData(state, payload) {
      state.reportData = payload;
    }
  },

  actions: {
    setEventData({ commit }, payload) {
      commit("setEventData", payload)
    },
    setEventItems ({ commit }) {
      return eventitems.getEventItems().then(response => {  
          commit('SET_EVENTITEMS', response)
          return response
      })
    },
    removeEventItemFromStore({ commit }, payload) {
      commit("removeEventItem", payload)
  },
  addEventItem({ commit }, payload) {
      commit("addEventItem", payload);
    },
    async eventList({ commit }) {
      try {
        const { data } = await axios.get("/api/eventreports/eventReports");
        commit("eventList", data);
      } catch (error) {
        console.log(error);
      }
    },
    clearState({ commit }) {
      commit("clearState")
    },

    setReportData({ commit }, payload) {
      commit("setReportData", payload);
    }
  },

  getters: {
    geteventitems: (state) => {
      return state.eventItems
  },
    eventData: state => state.currentUser,
    eventList: state => state.eventList,
    reportData: state => state.reportData,
  },

}