import axios from 'axios'

export default axios.create({
    // baseURL: 'https://ecofaith.azurewebsites.net/', //local
    baseURL: 'https://churchplusv3coreapi.azurewebsites.net/',
    // baseURL: 'https://churchplusapi3v.azurewebsites.net/',
    // baseURL: 'https://14b8-129-56-60-247.ngrok.io',
    
    // baseURL: 'https://unionfaith.azurewebsites.net/',
    timeout: 500000,
    headers: {
        'Content-Type': 'application/json',
    }
})


export const apii = axios.create({
    baseURL: 'http://localhost:3333/',
    // baseURL: 'http://192.168.8.107:3000/',
    timeout: 500000,
    headers: {
        'Content-Type': 'application/json',
    }
})