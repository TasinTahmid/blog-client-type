import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateBlogMutation, useUpdateBlogMutation } from "../apis/blogApi";
import { yupResolver } from "@hookform/resolvers/yup";
import blogSchema from "../schemas/blog.schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../states/store";
import { BlogFormProps } from "../types/componentTypes";
import { Blog, BlogFormData } from "../types/dataTypes";
import { ApiError } from "../types/apiResponseTypes";

const BlogForm: React.FC<BlogFormProps> = ({
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

    const { token } = useSelector((state: RootState) => state.auth);

    const title = blog?.title || "";
    const blogContent = blog?.blogContent || "";

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            title,
            blogContent,
        },
        resolver: yupResolver(blogSchema),
    });

    const { errors } = formState;

    const handleCreate = async (body: BlogFormData) => {
        try {
            await createBlog({ body, token }).unwrap();
            toast.success("Blog created successfully.", {
                position: "bottom-right",
                autoClose: 700,
            });

            setTimeout(() => {
                handleClick?.();
            }, 1200);
        } catch (error) {
            const blogCreateError = error as ApiError;
            toast.error(blogCreateError.data.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        }
    };

    const handleUpdate = async (body: BlogFormData) => {
        try {
            const response: Blog = await updateBlog({ id: blog?.id, body, token }).unwrap();
            console.log("update response,", response);
            toast.success("Blog updated successfully.", {
                position: "bottom-right",
                autoClose: 700,
            });

            setTimeout(() => {
                const blogToEdit: BlogFormData = {
                    title: response.title,
                    blogContent: response.blogContent,
                };
                toggleEditBlog?.(blogToEdit);
            }, 1200);
        } catch (error) {
            const blogCreateError = error as ApiError;
            toast.error(blogCreateError.data.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        }
    };

    const onSubmit = async (data: BlogFormData) => {
        if (isCreateBlog) return await handleCreate(data);
        return await handleUpdate(data);
    };

    const handleCancel = () => {
        if (!singleBlog && isUserBlogList) {
            toggleProfileDetails?.();
        }

        if (isCreateBlog) {
            handleClick?.();
            return;
        }

        const blogToEdit: BlogFormData = {
            title,
            blogContent,
        };
        toggleEditBlog?.(blogToEdit);
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
                                id="blogContent"
                                {...register("blogContent")}
                                className={` ${
                                    isCreateBlog ? "" : "h-64"
                                } block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6`}
                            />
                        </div>
                        <p className="text-red-600">{errors.blogContent?.message}</p>
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
