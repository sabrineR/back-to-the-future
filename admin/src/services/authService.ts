import { axiosInstance, handleAxiosError } from "../config/httpCommon";
import type { AuthUser, LoginRequest, LoginResponse } from "../types/auth";

const TOKEN_KEY = "adminToken";
const USER_KEY = "adminUser";

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      credentials,
    );

    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getCurrentUser = (): AuthUser | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return Boolean(getToken());
};
