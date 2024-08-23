import axios from "@/gateway/backendapi";

export const productType = ["Ebook", "AudioBook", "Video", "Music", "HardCopy", "PhysicalItem", "Others"]

export const getProductCategories = async() => {
    try {
        let { data } = await axios.get("/api/Ecommerce/getAllCategories");
        return data
    } catch (error) {
        return error
    }
}

export const addProductCategory = async(payload) => {
    try {
        let { data } = await axios.post("/api/Ecommerce/AddCategory", payload);
        return data
    } catch (error) {
        return error
    }
}

export const addProduct = async(payload) => {
    try {
        let { data } = await axios.post("/api/Ecommerce/AddProduct", payload);
        return data
    } catch (error) {
        return error
    }
}