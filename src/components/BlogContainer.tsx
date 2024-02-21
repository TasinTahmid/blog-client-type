import { useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import CreateBlogInputButton from "./CreateBlogInputButton";
import BlogForm from "./BlogForm";
import Paginate from "./Pagination";
import { BlogContainerProps } from "../types/componentTypes";
import { RootState } from "../states/store";
import { Blog } from "../types/dataTypes";

const BlogContainer:React.FC<BlogContainerProps> = ({ isUserBlogList, toggleProfileDetails }) => {
    const [isCreateBlogActive, setIsCreateBlogActive] = useState<boolean>(false);
    const [blogToEdit, setBlogToEdit] = useState<Blog|null>(null);
    const [isEditOn, setIsEditOn] = useState(false);

    const blogs = useSelector((state: RootState) =>
        isUserBlogList ? state.blog.userBlogList : state.blog.blogList
    );

    const handleClick = () => {
        setIsCreateBlogActive(!isCreateBlogActive);
        isUserBlogList && toggleProfileDetails?.();
    };
    const toggleEditBlog = (blog:Blog) => {
        setBlogToEdit(blog);
        setIsEditOn(!isEditOn);
    };

    return (
        <div
            className={`bg-gray-50 overflow-y-scroll  ${
                isCreateBlogActive || isEditOn ? "h-auto w-full" : "h-full"
            } py-6  ${isUserBlogList ? "pr-20" : "px-48"}  
            flex justify-center mb-4`}
        >
            {(isCreateBlogActive || isEditOn) && (
                <BlogForm
                    isCreateBlog={isCreateBlogActive}
                    blog={blogToEdit}
                    handleClick={handleClick}
                    toggleEditBlog={toggleEditBlog}
                    toggleProfileDetails={toggleProfileDetails}
                    isUserBlogList={isUserBlogList}
                />
            )}

            {!isEditOn && !isCreateBlogActive && (
                <>
                    <div
                        className={`${
                            !blogs?.length ? "w-full" : "w-fit"
                        } grid xl:grid-cols-2 grid-cols-1 gap-y-12 gap-x-14 justify-items-center`}
                    >
                        <CreateBlogInputButton handleClick={handleClick} />
                        {blogs.map((blog: Blog) => {
                            return (
                                <BlogCard
                                    blog={blog}
                                    key={blog.id}
                                    toggleEditBlog={toggleEditBlog}
                                    toggleProfileDetails={toggleProfileDetails}
                                    isUserBlogList={isUserBlogList}
                                />
                            );
                        })}
                        <Paginate isUserBlogList={isUserBlogList} />
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogContainer;
