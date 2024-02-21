import { useDeleteBlogMutation } from "../apis/blogApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { SingleBlogProps } from "../types/componentTypes";
import { RootState } from "../states/store";
import { BlogFormData } from "../types/dataTypes";

const SingleBlog: React.FC<SingleBlogProps> = ({ blog, isUserBlogList }) => {
    const navigate = useNavigate();
    const [isEditOn, setIsEditOn] = useState(false);
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [time, setTime] = useState(blog.createdAt);
    const [title, setTitle] = useState(blog.title);
    const [blogContent, setBlogContent] = useState(blog.blogContent);

    useEffect(() => {
        if (blog.createdAt) setTime(blog.createdAt.split(".")[0]);
        if (blog.title) setTitle(blog.title);
        if (blog.createdAt) setBlogContent(blog.blogContent);
    }, [blog]);

    const [deleteBlog] = useDeleteBlogMutation();

    const handleDelete = () => {
        deleteBlog({ id: blog.id, token });
        isUserBlogList ? navigate("/profile") : navigate("/");
    };

    const handleBack = () => {
        isUserBlogList ? navigate("/profile") : navigate("/");
    };
    const toggleEditBlog = (editedBlog: BlogFormData) => {
        setIsEditOn(!isEditOn);
        setTitle(editedBlog.title);
        setBlogContent(editedBlog.blogContent);
    };

    return (
        <div className={`w-full${isEditOn ? "" : " h-full bg-white"}`}>
            {isEditOn ? (
                <BlogForm blog={blog} toggleEditBlog={toggleEditBlog} />
            ) : (
                <div className="p-10">
                    <button
                        type="button"
                        className="flex justify-between rounded-md text-sm p-2 font-semibold mb-4 text-gray-900 hover:bg-gray-100 active:bg-gray-50"
                        onClick={handleBack}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                            />
                        </svg>
                        back
                    </button>
                    <h2 className="p-2 text-6xl mb-8 font-semibold">{title}</h2>

                    <div className="p-2 flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl  ">{blog?.User?.username}</h2>
                            <p className="my-6">{time}</p>
                        </div>
                        {user?.id === blog.userId && (
                            <div>
                                <button
                                    className=" rounded-md px-1 h-8 text-sm font-semibold  text-gray-900 hover:underline hover:underline-offset-2 active:bg-gray-50"
                                    onClick={() => {
                                        toggleEditBlog(blog);
                                    }}
                                >
                                    Update
                                </button>
                                <span>|</span>
                                <button
                                    className="text-red-600 rounded-md px-1 h-8 text-sm font-semibold  text-gray-900 hover:underline hover:underline-offset-2 active:bg-gray-50"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-2">
                        <p className="my-6 inline">{blogContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleBlog;
