/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { deleteBlogById, decreaseBlogCount } from "../states/blogSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteBlogMutation } from "../apis/blogApi";

const BlogCard = ({
    blog,
    toggleEditBlog,
    toggleProfileDetails,
    isUserBlogList,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.auth);
    const [deleteBlog, data] = useDeleteBlogMutation();

    const time = blog.createdAt.split("T")[0];
    const text =
        blog.blogContent.length > 150
            ? blog.blogContent.substring(0, 150).concat("...")
            : blog.blogContent.concat("...");

    const handleDelete = () => {
        deleteBlog({ id: blog.id, token });
        console.log("deleted Data", data);
        dispatch(deleteBlogById(blog.id));
        dispatch(decreaseBlogCount());
    };

    const handleReadMore = () => {
        isUserBlogList && toggleProfileDetails();
        navigate(`/blogs/${blog.id}`, { state: { isUserBlogList } });
    };

    const handleEdit = () => {
        toggleEditBlog(blog);
        isUserBlogList && toggleProfileDetails();
    };
    return (
        <div className="bg-white rounded-sm shadow-xl deleteBlogById w-full py-10 px-14">
            <h2 className="text-5xl mb-8 font-semibold">{blog.title}</h2>
            <div className="flex justify-between items-baseline">
                <div>
                    <h2 className="font-semibold text-xl  ">
                        {blog.User?.username}
                    </h2>
                    <p className="my-6">{time}</p>
                </div>
                {user?.id === blog.userId && (
                    <div>
                        <button
                            className=" rounded-md px-1 h-8 text-sm font-semibold  text-gray-900 hover:underline hover:underline-offset-2 active:bg-gray-50"
                            onClick={handleEdit}
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

            <p className="my-6 inline">{text}</p>
            <button
                onClick={handleReadMore}
                className="rounded-md px-3 py-2 text-sm font-semibold cursor-pointer hover:underline hover:underline-offset-2"
            >
                Read more
            </button>
        </div>
    );
};

export default BlogCard;
