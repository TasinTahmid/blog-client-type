export interface UserFormData {
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
    email: string;
}

export interface Blog {
    User: { username: string };
    id: string;
    title: string;
    userId: string;
    blogContent: string;
    createdAt: string;
    updatedAt?: string;
}

export interface BlogFormData {
    title: string;
    blogContent: string;
}

export interface PaginateSelecteTypes {
    selected: number;
}

export interface PasswordUpdateData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
