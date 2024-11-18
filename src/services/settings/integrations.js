import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress";

export const GetAllProviders = () => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/ThirdpartyIntegration/ListProviders`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}


export const ConnectWithPaymentProvider = (payload) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/ThirdpartyIntegration/Payments/Paystack/Accounts/LinkAccount`, payload)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}


export const ConfirmPaystackTransaction = (payload) => {
    return new Promise((resolve, reject) => {
        axios.post(`/PaystackTransactionCheck?reference=${payload}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}