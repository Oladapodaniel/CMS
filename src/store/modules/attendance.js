import attendanceservice from '../../services/attendance/attendanceservice';

const defaultState = (() => ({
    attendanceService: [],
    totalItems:  "",
    attendanceItemData: { },
    eventRegItemData: { }
}))

export default {
    namespaced: true,
    state: defaultState(),

    // state: {
        
    // },

    mutations: {
        setItemData(state, payload) {
            state.attendanceItemData = payload;
        },
        SET_ATTENDANCEDATA (state, payload) {
            state.attendanceService = payload
        },
        
        SET_TOTALITEM (state, payload) {
            state.totalItems = payload
        },
        
        setEventReg(state, payload) {
            state.eventRegItemData = payload;
        },
        removeAttendance(state, payload) {
            state.attendanceService = state.attendanceService.filter(
              (item) => item.id !== payload
            );
          },
          addAttendanceCheckin(state, payload) {
            state.attendanceService.push(payload);
          },

        // clearState(state) {
        //     for (var prop in state) delete state[prop];
        // }
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },

    actions: {
        setItemData({ commit }, payload) {
          commit("setItemData", payload)
        },
        
        setEventReg({ commit }, payload) {
          commit("setEventReg", payload)
        },
        setAttendanceItemData ({ commit }) {
            return attendanceservice.getItems().then(response => {  
                commit('SET_ATTENDANCEDATA', response.items)
                return response.items
            })
        },
        setTotalItems ({ commit }) {
            return attendanceservice.getItems().then(response => {  
                commit('SET_TOTALITEM', response.totalItems)
                return response.totalItems
            })
        },
        removeAttendanceFromStore({ commit }, payload) {
            commit("removeAttendance", payload)
        },
        addAttendanceCheckin({ commit }, payload) {
            commit("addAttendanceCheckin", payload);
          },

        clearState({ commit }) {
            commit("clearState")
        },
    },

    getters: {
        attendanceserviceitem: (state) => {
            return state.attendanceService
        },
        settotalitems: (state) => {
            return state.totalItems
        },
        attendanceItemData: state => state.attendanceItemData,
        eventRegItemData: state => state.eventRegItemData
    },
}