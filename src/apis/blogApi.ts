import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
    }),
    tagTypes: ["Blog", "User"],

    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: ({ pageNumber, pageSize }) => ({
                url: `/blogs?page=${pageNumber}&size=${pageSize}`,
                method: "GET",
            }),
            providesTags: ["Blog"],
        }),
        getBlogById: builder.query({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "GET",
            }),
            providesTags: ["Blog"],
        }),
        getUserBlogs: builder.query({
            query: ({ id, pageNumber, pageSize }) => ({
                url: `/users/${id}/blogs?page=${pageNumber}&size=${pageSize}`,
                method: "GET",
            }),
            providesTags: ["Blog"],
        }),
        deleteBlog: builder.mutation({
            query: ({ id, token }) => ({
                url: `/blogs/${id}`,
                method: "DELETE",
                headers: { authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["Blog"],
        }),
        createBlog: builder.mutation({
            query: ({ body, token }) => ({
                url: "/blogs",
                method: "POST",
                body,
                headers: { authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: builder.mutation({
            query: ({ id, body, token }) => ({
                url: `/blogs/${id}`,
                method: "PUT",
                body,
                headers: { authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

export const {
    useGetAllBlogsQuery,
    useGetUserBlogsQuery,
    useDeleteBlogMutation,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useGetBlogByIdQuery,
} = blogApi;
