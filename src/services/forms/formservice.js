import axios from "@/gateway/backendapi";

const formsService = {

    formdataProcessed(item) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/Forms/IsFormProcessedToggle?id=${item.id}&isprocessed=${item.isprocessed}`,)
                .then(res => {
                    resolve( res.data );
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
}

export default formsService;