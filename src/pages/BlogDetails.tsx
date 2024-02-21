import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleBlog from "../components/SingleBlog";
import { useLocation } from "react-router-dom";
import { useGetBlogByIdQuery } from "../apis/blogApi";

const BlogDetails = () => {
    const { state } = useLocation();
    const { id } = useParams();

    const { data, error, isLoading } = useGetBlogByIdQuery(id);

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (data) {
            console.log("blog data", data);
            setBlog(data);
        }
        // if (error) {
        // }
        // if (isLoading) {
        // }
    }, [data]);

    return (
        <div className="overflow-y-scroll h-full">
            {blog && <SingleBlog blog={blog} isUserBlogList={state.isUserBlogList} />}
        </div>
    );
};

export default BlogDetails;
