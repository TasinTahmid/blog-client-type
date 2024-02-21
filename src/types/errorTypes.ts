export interface ApiResponse {
    data?: object;
    error?: ApiError;
}

export interface ApiError {
    data: {message: string};
    status: number; 
}

