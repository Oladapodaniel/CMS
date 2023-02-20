
import membershipService from "../../services/membership/membershipservice"

export default {
    namespaced: true,
    state: () => ({
        members: []
    }),
    getters: {
        members: (state) => state.members
    },
    mutations: {
        SET_MEMBERS (state, payload) {
            state.members = payload
            console.log(state)
        }
    },
    actions: {
        getMembers ({ commit }) {
            return membershipService.getMembers().then(res => {  
                console.log(res)
                commit('SET_MEMBERS', res)
            })
        }
    }
}