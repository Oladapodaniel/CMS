import grousService from "../../services/groups/groupsservice";

export default {
    namespaced: true,
    
    state: {
        groups: [],
        selectedTreeGroup: {},
        selectedTreeGroupList: {},
        checkedTreeGroup: [],
        checkedGroupChildren: []
    },
    getters: {
        groups: state => state.groups,
        selectedTreeGroup: state => state.selectedTreeGroup,
        selectedTreeGroupList: state => state.selectedTreeGroupList,
        checkedTreeGroup: state => state.checkedTreeGroup,
        checkedGroupChildren: state => state.checkedGroupChildren,
    },

    mutations: {
        setGroups(state, payload) {
            state.groups = payload;
        },
        updateGroupPeopleCount(state, payload) {
            if (payload.operation === "add") {
                const group = state.groups.findIndex(i => i.id === payload.groupId)
                state.groups[group].peopleInGroupsCount += payload.count
            } else {
                const group = state.groups.findIndex(i => i.id === payload.groupId)
                state.groups[group].peopleInGroupsCount -= payload.count
            }

        },
        updateGroupPeopleCopy(state, payload) {
            const group = state.groups.findIndex(i => i.id === payload.groupId)
            state.groups[group].peopleInGroupsCount += payload.count

        },

        updateGroup(state, payload) {
            const targetGroupsIndex = state.groups.findIndex(i => i.id === payload.id);
            state.groups[targetGroupsIndex] = payload;
        },

        addGroup(state, payload) {
            state.groups.unshift(payload);
        },

        removeGroup(state, payload) {
            state.groups.slice(payload, 1);
        },
        clearGroup (state) {
            state.groups = []
        },
        setSelectedTreeGroup (state, payload) {
            state.selectedTreeGroup = payload
        },
        setSelectedTreeGroupList (state, payload) {
            state.selectedTreeGroupList = payload
        },
        setCheckedTreeGroup (state, payload) {
            state.checkedTreeGroup = payload
        },
        setCheckedGroupChildren (state, payload) {
            state.checkedGroupChildren = payload
        }
    },

    actions: {
        removeGroup({ commit }, payload) {
            commit("removeGroup", payload)
        },

        addGroup({ commit }, payload) {
            commit("addGroup", payload)
        },
        updateGroupPeopleCount({ commit }, payload) {
            commit("updateGroupPeopleCount", payload)
        },
        updateGroupPeopleCopy({ commit }, payload) {
            commit("updateGroupPeopleCopy", payload)
        },

        setGroups({ commit }) {
            return grousService.getGroups().then(response => {
                commit("setGroups", response.response.groupResonseDTO)
                return response
            })
        },

        updateGroup({ commit }, payload) {
            commit("updateGroup", payload)
        },
        clearGroup ({ commit }) {
            commit('clearGroup')
        },
        setSelectedTreeGroup ({ commit }, payload) {
            commit("setSelectedTreeGroup", payload)
        },
        setSelectedTreeGroupList ({ commit }, payload) {
            commit("setSelectedTreeGroupList", payload)
        },
        setCheckedTreeGroup ({ commit }, payload) {
            commit("setCheckedTreeGroup", payload)
        },
        setCheckedGroupChildren ({ commit }, payload) {
            commit("setCheckedGroupChildren", payload)
        }
    }
}