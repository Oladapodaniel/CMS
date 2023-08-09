import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress"


const communicationService = {
    async getAllSentSMS(page) {
        try {
            const { data } = await axios.get(`/api/Messaging/getAllSentSms?page=${page}`);
            return data;
        } catch (error) {
            
            stopProgressBar();
            console.log(error);
            console.log(error.response, "ERROR");
            return false;
        }
    },

    async getMessageReport(messageId) {
        try {
            const { data } = await axios.get(`/api/Messaging/GetSentMessageDetails?CommReportId=${messageId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    async getDrafts() {
        try {
            const { data } = await axios.get(`/api/Messaging/getSMSDrafts`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    deleteSMS(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/Messaging/DeleteSentSMS?SentSMSIdList=${id}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    stopProgressBar();
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    },

    async getEmailDrafts() {
        try {
            const { data } = await axios.get(`/api/Messaging/getEmailDrafts`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async getDraftsById(id) {
        try {
            const { data } = await axios.get(`/api/Messaging/getSMSDraftByID?id=${id}`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async getEmailDraftById(id) {
        try {
            const { data } = await axios.get(`/api/Messaging/getEmailDraftByID?id=${id}`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async getSentEmails(page) {
        try {
            const { data } = await axios.get(`/api/Messaging/getAllSentEmails`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async getSMSReplies(page) {
        try {
            const { data } = await axios.get(`/api/Messaging/GetAllSmsReplies?page=${page}`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async getDefaultMessage(messageId) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/Settings/GetDefaultMessage/${messageId}`)
                .then(res => {
                    console.log(res);
                    resolve(res.data);
                })
                .catch(error => {
                    stopProgressBar();
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    },

    getSchedules(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    console.log(res);
                    resolve(res.data);
                })
                .catch(error => {
                    stopProgressBar();
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    },
    getOnePhoneGroup(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    console.log(res);
                    resolve(res.data);
                })
                .catch(error => {
                    stopProgressBar();
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    },
    getAllUploadedVoiceAudio() {
        return new Promise((resolve, reject) => {
            axios.get('api/Messaging/getAllUploadAudioVoice')
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    stopProgressBar();
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    },
    getAllSentVoice() {
        return new Promise((resolve, reject) => {
            axios.get('api/Messaging/getAllSentVoice')
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    stopProgressBar();
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    },
    getAllScheduledWhatsappMessage() {
        return new Promise((resolve, reject) => {
            axios.get('/api/Messaging/getWhatAppSchedules?page=1')
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    stopProgressBar();
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    }
}

export default communicationService;