import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress"

export default {
    namespaced: true,

    state: {
        groups: [ ],
    },

    mutations: {
        setGroups(state, payload) {
            state.groups = payload;
        },

        updateGroup(state, payload) {
            console.log(payload, "id");
            const targetGroupsIndex = state.groups.findIndex(i => i.id === payload.id);
            console.log(targetGroupsIndex, "index");
            state.groups[targetGroupsIndex] = payload;
        },
    
        addGroup(state, payload) {
            state.groups.push(payload);
        },
    
        removeGroup(state, payload) {
            state.groups.slice(payload, 1);
        },
    },

    actions: {
        removeGroup({ commit }, payload) {
          commit("removeGroup", payload)
        },

        addGroup({ commit }, payload) {
          commit("addGroup", payload)
        },

        setGroups({ commit }, payload) {
          commit("setGroups", payload)
        },

        updateGroup({ commit }, payload) {
          commit("updateGroup", payload)
        },

        async getGroups({ commit }) {
            try {
                const { data } = await axios.get("/api/GetAllGroupBasicInformation");
                commit("setGroups", data);
            } catch (error) {
                stopProgressBar();
                console.log(error);
            }
        }
      },

      getters: {
        groups: state => state.groups,
      },
}