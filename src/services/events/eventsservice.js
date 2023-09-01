import axios from "@/gateway/backendapi";

const eventsService = {
    getEvents() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Events/EventActivity")
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
    },
    getEventsByActivity(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/events/${id}`)
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
    },

    createNewEventCategory(name) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/EventCategory?name=${name}`)
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
    },

    getEventCategories() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/EventCategory`)
                .then(res => {
                    const data = res.data.map(i => {
                        return { id: i.id, name: i.name }
                    })
                    resolve( data );
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
    },

    createNewActivity(body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/Events/CreateActivity`, body)
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
    },
    getEventItems(body) {
        return new Promise((resolve, reject) => {
            axios.get('/api/eventreports/eventReports', body)
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
    },
    approveServiceReport(body) {
        return new Promise((resolve, reject) => {
            axios.put('/api/Events/approveservicetoggle', body)
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

export default eventsService;