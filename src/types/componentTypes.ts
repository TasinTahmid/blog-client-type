import { Blog, BlogFormData } from "./dataTypes";

export interface BlogContainerProps {
    isUserBlogList?: boolean;
    toggleProfileDetails?: () => void;
}

export interface BlogCardProps {
    blog: Blog;
    toggleEditBlog: (blog: BlogFormData) => void;
    toggleProfileDetails?: () => void;
    isUserBlogList?: boolean;
}

export interface BlogFormProps {
    isCreateBlog?: boolean;
    blog: BlogFormData | null;
    handleClick?: () => void;
    toggleEditBlog?: (blog: BlogFormData) => void;
    toggleProfileDetails?: (() => void) | undefined;
    isUserBlogList?: boolean | undefined;
    singleBlog?: boolean;
}

export interface PaginationProps {
    isUserBlogList?: boolean;
}

export interface CreateBlogInputButtonProps {
    handleClick: () => void;
}

export interface PopupConfirmationProps {
    togglePopup: () => void;
}

export interface SingleBlogProps {
    blog: Blog;
    isUserBlogList: boolean;
}
