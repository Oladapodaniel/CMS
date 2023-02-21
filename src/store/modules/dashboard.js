import dashboard from "../../services/dashboard/dashboard"

const defaultState = (() => ({
    dashboard: {},
    hasMobileApp: false,
    hasOnlineGiving: false,
    hasWebsite: false,
    celebrations: [],
}))

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        SET_DASHBOARD (state, payload) {
            state.dashboard = payload
            state.hasMobileApp = payload.hasMobileApp
            state.hasOnlineGiving = payload.hasOnlineGiving
            state.hasWebsite = payload.hasWebsite
            console.log(state.dashboard)
        },
        SET_CELEBRATION (state, payload) {
            state.celebrations = payload
        },
        clearState(state) {
            console.log('dashboard sotre cleared')
            Object.assign(state, defaultState())
          }
    },
    actions: {
        getDashboard ({ commit }) {
            return dashboard.getDashboard().then(response => {  
                commit('SET_DASHBOARD', response.returnObject)
                return response.returnObject
            })
        },
        getCelebration ({ commit }) {
            return dashboard.getCelebrations().then(response => {  
                commit('SET_CELEBRATION', response.returnObject.celebrations)
                console.log(response)
                return response.returnObject.celebrations
            })
        },
        clearState ({ commit }) {
            commit('clearState')
        }
    },
    getters: {
        getdashboard: (state) => {
            return state.dashboard
        },
        getcelebration: (state) => {
            return state.celebrations
        },
        hasMobileApp: (state) => {
            return state.hasMobileApp
        },
        hasOnlineGiving: (state) => {
            return state.hasOnlineGiving
        },
        hasWebsite: (state) => {
            return state.hasWebsite
        },
    }
}