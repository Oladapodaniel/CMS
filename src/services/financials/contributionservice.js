import axios from "@/gateway/backendapi";
// import stopProgressBar from "../../services/progressbar/progress"

const getContributionList = async () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Contributions/Transactions")
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                 /*eslint no-undef: "warn"*/
                 NProgress.done();
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
    })
}
export default { getContributionList };
