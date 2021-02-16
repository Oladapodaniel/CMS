import axios from 'axios'
export default axios.create({
  baseURL: 'https://churchplusv3coreapi.azurewebsites.net/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': localStorage.getItem("token")
  }
})