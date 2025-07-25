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

// Response Interceptor to check for 401 Unauthorized errors and handle token refresh
axiosInstance.interceptors.response.use(
    function(response){  //if response is successful
        return response;
    },
    //Handle failed responses    
    async function(error){  
        const originalRequest = error.config; 
        if(error.response.status === 401 && !originalRequest.retry){  
            originalRequest.retry = true;        
            const refreshToken = localStorage.getItem('refreshToken'); 
            try{     
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})    
                localStorage.setItem('accessToken', response,data.access) 
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;      
                return axiosInstance(originalRequest); // Retry the original request with new access token
   
            }catch(error){     
                localStorage.removeItem('accessToken');  
                localStorage.removeItem('refreshToken');     
            }       
        }         
        return Promise.reject(error);
    }
)    


export default axiosInstance;