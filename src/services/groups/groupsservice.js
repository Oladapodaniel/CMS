import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress"
import store from '../../store/store';

const grousService = {
    async getGroups() {
        try {
            const { data } = await axios.get("/api/GetAllGroupBasicInformation");
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
        }
    },

    async removeFromGroup(id, body) {
        try {
            const { data } = await axios.put(`/api/RemovePeopleFromGroup/${id}`, body);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async deleteGroup(id) {
        try {
            const { data } = await axios.delete(`/api/DeleteGroup/${id}`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async editGroupInStore(data, peopleCount) {
        try {
            const group = {
                id: data.id,
                name: data.name,
                peopleInGroupsCount: peopleCount,
            }
            store.dispatch("groups/updateGroup", group);
        } catch (error) {
            console.log(error);
        }
    },

    async removeGroupFromStore(id) {
        try {
            store.dispatch("groups/removeGroup", id);
        } catch (error) {
            console.log(error);
        }
    },

    async addGroupToStore(data, peopleCount) {
        try {
            const group = {
                id: data.id,
                name: data.name,
                peopleInGroupsCount: peopleCount,
            }
            store.dispatch("groups/addGroup", group);
        } catch (error) {
            console.log(error);
        }
    }
}

export default grousService;