import { createSlice } from "@reduxjs/toolkit";
import { blogApi } from "../apis/blogApi";

const initialState = {
    blogList: [],
    userBlogList: [],
    pageNumberForAllBlogs: 1,
    pageNumberForUserBlogs: 1,
    allBlogCount: 0,
    userBlogCount: 0,
};

export const blogSlice = createSlice({
    name: "blogListTypes",
    initialState,
    reducers: {
        setPageNumberForAllBlogs: (state, action) => {
            state.pageNumberForAllBlogs = action.payload;
        },
        setPageNumberForUserBlogs: (state, action) => {
            state.pageNumberForUserBlogs = action.payload;
        },
        increaseBlogCount: (state) => {
            state.allBlogCount = state.allBlogCount + 1;
            state.userBlogCount = state.userBlogCount + 1;
        },
        decreaseBlogCount: (state) => {
            state.allBlogCount = state.allBlogCount - 1;
            state.userBlogCount = state.userBlogCount - 1;
        },
        setUserBlogCount: (state, action) => {
            state.userBlogCount = action.payload;
        },
        setAllBlogCount: (state, action) => {
            state.allBlogCount = action.payload;
        },
        setBlogs: (state, action) => {
            state.blogList = action.payload;
        },
        setUserBlogs: (state, action) => {
            state.userBlogList = action.payload;
        },
        addNewBlog: (state, action) => {
            state.blogList.splice(0, 0, action.payload);
            state.userBlogList.splice(0, 0, action.payload);
            console.log("In add new blog", state.blogList);
        },
        updateBlogById: (state, action) => {
            state.blogList = state.blogList.map((blog) => {
                if (action.payload.id != blog.id) return blog;
                return action.payload;
            });
            state.userBlogList = state.userBlogList.map((blog) => {
                if (action.payload.id != blog.id) return blog;
                return action.payload;
            });
        },
        deleteBlogById: (state, action) => {
            state.blogList = state.blogList.filter((blog) => action.payload != blog.id);
            state.userBlogList = state.userBlogList.filter((blog) => action.payload != blog.id);
        },
    },
});

export const {
    setPageNumberForAllBlogs,
    setPageNumberForUserBlogs,
    setAllBlogCount,
    setUserBlogCount,
    increaseBlogCount,
    decreaseBlogCount,
    setBlogs,
    setUserBlogs,
    addNewBlog,
    updateBlogById,
    deleteBlogById,
} = blogSlice.actions;

export default blogSlice.reducer;
