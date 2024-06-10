import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://songslibrary-songslibrary.azuremicroservices.io/api/',
    headers : {
        'Access-Control-Allow-Origin': '*',
    }
})

export default axiosInstance;