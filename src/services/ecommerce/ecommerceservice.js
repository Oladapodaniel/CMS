import axios from "@/gateway/backendapi";

export const productType = ["Ebook", "AudioBook", "Video", "Music", "HardCopy", "PhysicalItem", "Others"]

export const getProductCategories = async () => {
    try {
        let { data } = await axios.get("/api/Ecommerce/getAllCategories");
        return data
    } catch (error) {
        return error
    }
}

export const addProductCategory = async (payload) => {
    try {
        let { data } = await axios.post("/api/Ecommerce/AddCategory", payload);
        return data
    } catch (error) {
        return error
    }
}

export const addProduct = async (payload) => {
    try {
        let { data } = await axios.post("/api/Ecommerce/AddProduct", payload);
        return data
    } catch (error) {
        return error
    }
}

export const getAllProduct = async () => {
    try {
        let { data } = await axios.get("/api/Ecommerce/GetAllProducts");
        return data
    } catch (error) {
        return error
    }
}
export const deleteSingleProduct = async (id) => {
    try {
        let { data } = await axios.delete(`/api/Ecommerce/DeleteProduct?productId=${id}`);
        return data
    } catch (error) {
        return error
    }
}

export const updateProductCategory = async (payload) => {
    try {
        let { data } = await axios.put(`/api/Ecommerce/UpdateCategory`, payload);
        return data
    } catch (error) {
        return error
    }
}

export const deleteProductCategory = async (id) => {
    try {
        let { data } = await axios.delete(`/api/Ecommerce/DeleteCategory?categoryId=${id}`);
        return data
    } catch (error) {
        return error
    }
}

export const getProductById = async (id) => {
    try {
        let { data } = await axios.get(`/api/Ecommerce/GetSingleProductById?productId=${id}`);
        return data
    } catch (error) {
        return error
    }
}

export const updateProduct = async (payload) => {
    try {
        let { data } = await axios.put(`/api/Ecommerce/UpdateProduct`, payload);
        return data
    } catch (error) {
        return error
    }
}

export const createEcommerceSetup = async (payload) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/Ecommerce/AddSetup", payload)
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

export const getEcommerceSetup = async () => {
    return new Promise((resolve, reject) => {
        axios.delete("/api/Ecommerce/GetSetup")
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

    export const UpdateEcommerceSetup = async (payload) => {
        return new Promise((resolve, reject) => {
            axios.put("/api/Ecommerce/UpdateSetup", payload)
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