import axios from "@/gateway/backendapi";
// import router from "@/router/index"
import lookupService from '../../services/membership/membershipservice'


export default {
  namespaced: true,
  state: {
    members: [ ],
    firstTimers: [ ],
  },

  mutations: {
    setMembers(state, payload) {
      state.members = payload;
    },

    setFirstTimers(state, payload) {
      state.firstTimers = payload;
    },

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
  },

  actions: {
    setMembers({ commit }, payload) {
        commit("setMembers", payload)
    },

    setFirstTimers({ commit }, payload) {
        commit("setFirstTimers", payload)
    },

    async getMembers({ commit }) {
        console.log("getting");
      try {
        const { data } = await axios.get("/api/People/GetPeopleBasicInfo");
        console.log(data, "members");
        commit("setMembers", data)
      } catch (err) {
        /*eslint no-undef: "warn"*/
        NProgress.done();
        console.log(err, "in store");
      }
    },

    async getFirstTimers({ commit }) {
      try {
        const { data } = await axios.get("/api/People/FirstTimer");
        commit("setFirstTimers", data)
      } catch (err) {
        /*eslint no-undef: "warn"*/
        NProgress.done();
        console.log(err, "in store");
      }
    },

    setup({ commit }) {
        
        // lookupService.lookupsSetUp();
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

  },

  getters: {
    members: state => state.members,
    
    getMemberById: (state) => (id) => {
        return state.members.find(i => i.id === id)
    },
  },
}