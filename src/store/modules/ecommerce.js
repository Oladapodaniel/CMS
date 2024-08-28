import axios from "@/gateway/backendapi"
import { getAllProduct, getProductCategories } from "../../services/ecommerce/ecommerceservice"


const defaultState = (() => ({
    allProducts: [],
    allCategories: []
}))

export default {
    namespaced: true,
    state: defaultState(),
    getters: {
        getproducts: (state) => {
            return state.allProducts
        },
        getCategories: (state) => {
            return state.allCategories
        }
    },
    mutations: {
        SET_PRODUCTS(state, payload) {
            state.allProducts = payload
        },
        SET_CATEGORIES(state, payload) {
            state.allCategories = payload
        }
    },
    actions: {
        async getAllProducts({ commit }) {
            return getAllProduct().then(response => {
                commit('SET_PRODUCTS', response)
                return response
            })
        },
        async getProductCategory({ commit }) {
            return getProductCategories().then(response => {
                commit('SET_CATEGORIES', response)
                return response
            })
        },
    }
}