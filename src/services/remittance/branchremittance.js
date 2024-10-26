import axios from "@/gateway/backendapi";

export const SaveRemittableItem = (payload) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/Remittance/SaveRemittableItem`, payload)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}


export const GetRemittableItem = () => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/Remittance/GetAllRemittableItem`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

export const UpdateRemittableItem = (payload) => {
    return new Promise((resolve, reject) => {
        axios.put(`/api/Remittance/UpdateRemittableItem`, payload)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

export const DeleteRemittableItem = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/Remittance/DeleteRemittableItem/${id}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}