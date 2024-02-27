import BlogContainer from "../components/BlogContainer";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs, setAllBlogCount } from "../states/blogSlice";
import DotLoader from "react-spinners/DotLoader";
import { useGetAllBlogsQuery } from "../apis/blogApi";
import { RootState } from "../states/store";

const Home = () => {
    const dispatch = useDispatch();
    const [pageSize] = useState(4);
    const pageNumber = useSelector((state: RootState) => state.blog.pageNumberForAllBlogs);

    const { data, isLoading } = useGetAllBlogsQuery({
        pageNumber,
        pageSize,
    });

    const [loading, setLoading] = useState<boolean>(isLoading);

    useEffect(() => {
        if (data) {
            dispatch(setBlogs(data.blogList));
            dispatch(setAllBlogCount(data.count));
        }
        if (!isLoading) {
            setTimeout(() => {
                setLoading(false);
            }, 600);
        }
    }, [data, isLoading, pageNumber, dispatch]);

    return (
        <div className="bg-gray-50 h-5/6 overflow-auto">
            {loading ? (
                <div
                    className="bg-gray-50 w-full h-full py-10 px-auto  
                flex justify-center items-center"
                >
                    <DotLoader color="#bcaeae" size={80} />
                </div>
            ) : (
                <>
                    <BlogContainer />
                </>
            )}
        </div>
    );
};

export default Home;
