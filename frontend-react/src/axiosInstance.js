import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_API,
    headers : {
        'Content-Type': 'application/json',
    }
})


// Request Interceptor to add Authorization header
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)




export default axiosInstance;