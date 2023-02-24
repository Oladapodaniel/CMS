import membershipService from "../../services/membership/membershipservice";
import lookupService from '../../services/membership/membershipservice'


const defaultState = (() => ({
  members: [],
  membershipSummary: {}
}))

export default {
  namespaced: true,
  state: defaultState(),

  mutations: {
    setMembers(state, payload) {
      state.members = payload;
    },

    // setFirstTimers(state, payload) {
    //   state.firstTimers = payload;
    // },

    updateMember(state, payload) {
      const targetMembersIndex = state.members.findIndex(i => i.id === payload.id);
      state.members[targetMembersIndex] = payload;
    },

    addMember(state, payload) {
      state.members.push(payload);
    },

    removeMember(state, payload) {
      state.members = state.members.filter(i => i.id !== payload);
    },
    showImportedPeople(state, payload) {
      payload.forEach(i => state.members.push(i))
    },
    clearMember(state) {
      Object.assign(state, defaultState())
    },
    setMembershipSummary(state, payload) {
      state.membershipSummary = payload
    }
  },

  actions: {
    setMembers({ commit }) {
      return membershipService.getMembers().then(response => {
        commit("setMembers", response)
        return response
      })
    },

    setMembershipSummary({ commit }) {
      return membershipService.getMembershipSummary().then((response) => {
        commit("setMembershipSummary", response)
        return response

      })
    },

    setup({ commit }) {
      lookupService.getLookUps()
        .then(res => {
          commit("setGenders", res.genders);
          commit("setMaritalStatus", res.maritalStatus);
        })
        .catch(err => {
          NProgrss.done();
          console.log(err);
        })
    },

    updateMember({ commit }, payload) {
      commit("updateMember", payload);
    },

    addMember({ commit }, payload) {
      commit("addMember", payload);
    },

    removeMember({ commit }, payload) {
      commit("removeMember", payload);
    },
    showImportedPeople({ commit }, payload) {
      commit("showImportedPeople", payload)
    },
    clearMember({ commit }) {
      commit("clearMember")
    }

  },

  getters: {
    members: state => state.members,

    getMemberById: (state) => (id) => {
      return state.members.find(i => i.id === id)
    },
    membershipSummary: state => state.membershipSummary
  },
}