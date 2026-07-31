import { api } from "./api";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post("auth/login/", data);
  return response.data;
}

export async function register(data: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await api.post("auth/register/", data);
  return response.data;
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>("auth/me/");
  return response.data;
}
