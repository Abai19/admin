import axios, { AxiosRequestConfig } from 'axios'
import { MAIN_ROUTERS } from '~/shared/lib'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    validateStatus: status => status < 499,
})

export const api = async (axiosConfig: AxiosRequestConfig) => {
    try {
        return await axiosInstance(axiosConfig)
    } catch (e) {
        console.log(e)
    }
}

axiosInstance.interceptors.response.use(response => {
    if (response.status === 401) {
        window.location.href = MAIN_ROUTERS.auth
        localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY)
    } else {
        return response
    }
})
