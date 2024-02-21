import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1/users",
    }),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        getUserBlogs: builder.query({
            query: ({ id, pageNumber, pageSize }) => ({
                url: `/${id}/blogs?page=${pageNumber}&size=${pageSize}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        createUser: builder.mutation({
            query: ({ body }) => ({
                url: `/register`,
                method: "POST",
                body,
            }),
        }),
        loginUser: builder.mutation({
            query: ({ body }) => ({
                url: `/login`,
                method: "POST",
                body,
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ id, body, token }) => ({
                url: `/${id}`,
                method: "PATCH",
                body,
                headers: { authorization: `Bearer ${token}` },
            }),
        }),
        deleteAccount: builder.mutation({
            query: ({ id, token }) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: { authorization: `Bearer ${token}` },
            }),
        }),
    }),
});

export const {
    useGetUserBlogsQuery,
    useCreateUserMutation,
    useLoginUserMutation,
    useUpdatePasswordMutation,
    useDeleteAccountMutation,
} = userApi;
