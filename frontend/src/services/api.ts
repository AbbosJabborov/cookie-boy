import axios from "axios";
import { getAccessToken } from "@/lib/auth";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
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
