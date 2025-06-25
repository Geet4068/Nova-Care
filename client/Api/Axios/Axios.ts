import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const adminUrl = "http://localhost:2018/api";

export const baseURL = adminUrl;
const cookie = new Cookies();
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// axiosInstance.interceptors.request.use(
//     function (config: any) {
//         const token = cookie.get("token");
//         // console.log(token, "token"); // Debugging log
//         if (token) {
//             config.headers = config.headers || {};
//             config.headers["Authorization"] = `Bearer ${token}`;

//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

// Request interceptor to add token
axiosInstance.interceptors.request.use((config) => {
    const token = cookie.get("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;

    }
    return config;
},
    function (error) {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear tokens and redirect to login
            // cookie.remove("token");
            // cookie.remove("first_name");
            // window.location.href = "/user-login";
            return Promise.reject(new Error("Session expired. Please login again."));
        }
        return Promise.reject(error);
    }
);

export const profile_pic = (media: File | null) => {
    return `http://localhost:2018${media}`;
};

export default axiosInstance;
