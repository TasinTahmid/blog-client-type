import BlogContainer from "../components/BlogContainer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import ProfileDetails from "../components/ProfileDetails";
import { setUserBlogs, setUserBlogCount } from "../states/blogSlice";
import { useGetUserBlogsQuery } from "../apis/blogApi";
import { RootState } from "../states/store";

const Profile = () => {
    const dispatch = useDispatch();
    const [showProfileDetails, setShowProfileDetails] = useState(true);
    const [pageSize] = useState(4);

    const pageNumber = useSelector((state: RootState) => state.blog.pageNumberForUserBlogs);
    const user = useSelector((state: RootState) => state.auth.user);

    const { data, isLoading } = useGetUserBlogsQuery({
        id: user?.id,
        pageNumber,
        pageSize,
    });

    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        dispatch(setUserBlogs(data?.blogList));
        dispatch(setUserBlogCount(data?.count));
        if (!isLoading) {
            setTimeout(() => {
                setLoading(false);
            }, 600);
        }
    }, [data, pageNumber, isLoading, dispatch]);

    const toggleProfileDetails = () => {
        setShowProfileDetails(!showProfileDetails);
    };
    return (
        <div className="pl-8 bg-gray-50 h-5/6  grid grid-cols-10 gap-10 overflow-auto ">
            {showProfileDetails && <ProfileDetails />}
            <div
                className={`col-span-7 h-full ${
                    !showProfileDetails ? "w-screen" : "w-full"
                } overflow-auto `}
            >
                {loading ? (
                    <div
                        className="bg-gray-50 relative size-full py-10 px-auto  
                flex justify-center items-center"
                    >
                        <DotLoader color="#bcaeae" size={80} />
                    </div>
                ) : (
                    <BlogContainer
                        isUserBlogList={true}
                        toggleProfileDetails={toggleProfileDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default Profile;
