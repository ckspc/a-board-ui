import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const axiosService = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

interface ErrorResponse {
    message?: string;
}

axiosService.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
        return Promise.reject({
            status: error.response?.status ?? 500,
            message: error.response?.data?.message ?? "An unknown error occurred",
        });
    }
);

export default axiosService;