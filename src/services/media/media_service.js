import axios from "@/gateway/backendapi";

const uploadMedia = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/Media/UploadMedia`, body)
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

export default {
    uploadMedia,
}