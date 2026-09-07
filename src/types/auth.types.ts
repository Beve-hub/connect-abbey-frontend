export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  profile?: Profile | null;
}

export interface Profile {
  id?: string;
  userId?: string;
  bio?: string | null;
  jobTitle?: string | null;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
