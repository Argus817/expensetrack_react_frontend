import axios from "axios";

const baseurl = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: baseurl,
    withCredentials: true,
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest._noInterceptor) {
            return Promise.reject(error);
        }

        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${baseurl}/auth/token/refresh/`,
                    {},
                    { withCredentials: true } 
                );

                const newAccess = res.data.access;
                localStorage.setItem("access_token", newAccess);

                
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return api(originalRequest);

            } catch (err) {
                localStorage.removeItem("access_token");
                localStorage.removeItem('username')
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;