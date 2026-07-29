import axios from "axios";
import { getAccessToken } from "@/lib/auth";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();

    console.log("TOKEN:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("HEADER SET");
    }

    return config;
});
