export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: "admin";
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
