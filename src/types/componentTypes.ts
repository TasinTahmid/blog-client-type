import { Blog } from "./dataTypes";

export interface BlogContainerProps {
    isUserBlogList?: boolean;
    toggleProfileDetails?: () => void;
}

export interface BlogCardProps {
    blog: Blog;
    toggleEditBlog: (blog: Blog | string, blogContent?: string | undefined) => void;
    toggleProfileDetails?: () => void;
    isUserBlogList?: boolean;
}

export interface BlogFormProps {
    isCreateBlog: boolean;
    blog: Blog | null;
    handleClick: () => void;
    toggleEditBlog: (blog: Blog | string, blogContent?: string | undefined) => void;
    toggleProfileDetails: (() => void) | undefined;
    isUserBlogList: boolean | undefined;
    singleBlog?: boolean;
}

export interface PaginationProps {
    isUserBlogList?: boolean;
}

export interface CreateBlogInputButtonProps {
    handleClick: () => void;
}
