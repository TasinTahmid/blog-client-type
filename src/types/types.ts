export interface FormData {
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface AuthState {
    user: UserState | null;
    token: string | null;
}

export interface UserState {
    id: string;
    username: string;
    email: string
}
