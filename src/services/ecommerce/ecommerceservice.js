import axios from "@/gateway/backendapi";


export const getProductCategories = async() => {
    try {
        let { data } = await axios.get("/api/Ecommerce/getAllCategories");
        return data
    } catch (error) {
        return error
    }
}