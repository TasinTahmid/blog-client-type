/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateBlogMutation, useUpdateBlogMutation } from "../apis/blogApi";
import { yupResolver } from "@hookform/resolvers/yup";
import blogSchema from "../schemas/blog.schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogForm = ({
    isCreateBlog,
    blog,
    handleClick,
    toggleEditBlog,
    toggleProfileDetails,
    isUserBlogList,
    singleBlog,
}) => {
    const [createBlog] = useCreateBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();

    const { token } = useSelector((state) => state.auth);

    const title = blog?.title || "";
    const blogContent = blog?.blogContent || "";

    const { register, handleSubmit, control, formState } = useForm({
        defaultValues: {
            title,
            blogContent,
        },
        resolver: yupResolver(blogSchema),
    });

    const { errors } = formState;

    const handleCreate = async (body) => {
        const response = await createBlog({ body, token });
        if (response.data) {
            toast.success("Blog created successfully.", {
                position: "bottom-right",
                autoClose: 700,
            });

            setTimeout(() => {
                handleClick();
            }, 1200);
        }
        if (response.error) {
            toast.error(response.error.data.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        }
    };

    const handleUpdate = async (body) => {
        const response = await updateBlog({ id: blog.id, body, token });
        if (response.data) {
            toast.success("Blog updated successfully.", {
                position: "bottom-right",
                autoClose: 700,
            });

            setTimeout(() => {
                toggleEditBlog(response.data.title, response.data.blogContent);
            }, 1200);
        }
        if (response.error) {
            toast.error(response.error.data.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        }
    };

    const onSubmit = async (data) => {
        if (isCreateBlog) return await handleCreate(data);
        return await handleUpdate(data);
    };

    const handleCancel = () => {
        if (!singleBlog && isUserBlogList) {
            toggleProfileDetails();
        }

        if (isCreateBlog) {
            handleClick();
            return;
        }

        toggleEditBlog(title, blogContent);
        return;
    };
    return (
        <div className=" bg-gray-50 w-full flex justify-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="rounded-sm my-16 w-1/2 bg-white shadow-2xl p-14"
            >
                <div className="space-y-12 border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-10 text-gray-900">
                        {isCreateBlog ? "Create New Blogs" : "Update Your Blog"}
                    </h2>

                    <div className="mt-7 w-full">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            title
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="title"
                                {...register("title")}
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <p className="text-red-600">{errors.title?.message}</p>
                    </div>

                    <div className="mt-7 w-full">
                        <label
                            htmlFor="blogContent"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Blog Content
                        </label>
                        <div className="mt-2">
                            <textarea
                                type="text-area"
                                id="blogContent"
                                {...register("blogContent")}
                                className={` ${
                                    isCreateBlog ? "" : "h-64"
                                } block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6`}
                            />
                        </div>
                        <p className="text-red-600">
                            {errors.blogContent?.message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="rounded-md text-sm font-semibold px-4 py-2 text-gray-900 hover:bg-gray-100 active:bg-gray-50"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-500 active:bg-gray-600"
                    >
                        {isCreateBlog ? "Create  Blog" : "Update Blog"}
                    </button>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default BlogForm;
