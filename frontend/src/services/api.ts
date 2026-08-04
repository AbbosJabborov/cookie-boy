import axios from "axios";
import { getAccessToken } from "@/lib/auth";

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";
const baseURL = rawBaseUrl.endsWith("/") ? rawBaseUrl : `${rawBaseUrl}/`;

export const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
