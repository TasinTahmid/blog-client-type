/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { setPageNumberForAllBlogs, setPageNumberForUserBlogs } from "../states/blogSlice";
import NoBlogsYet from "./NoBlogsYet";
// import { useGetAllBlogsQuery, useGetUserBlogsQuery } from "../api/blogApi";

const Pagination = ({ isUserBlogList }) => {
    const dispatch = useDispatch();

    const pageNumber = useSelector((state) =>
        isUserBlogList ? state.blog.pageNumberForUserBlogs : state.blog.pageNumberForAllBlogs
    );
    const blogCount = useSelector((state) =>
        isUserBlogList ? state.blog.userBlogCount : state.blog.allBlogCount
    );
    const setPageNumber = isUserBlogList ? setPageNumberForUserBlogs : setPageNumberForAllBlogs;

    const pageCount = Math.ceil(blogCount / 4);

    const handlePageChange = ({ selected }) => {
        dispatch(setPageNumber(selected + 1));
    };

    return (
        <div
            className={`${
                blogCount == 0 ? "" : "mt-6 items-center"
            } flex justify-center rounded-md h-full w-full xl:col-span-2`}
        >
            {blogCount == 0 ? (
                <NoBlogsYet />
            ) : (
                <ReactPaginate
                    forcePage={pageNumber - 1}
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="flex  justify-between items-center"
                    pageLinkClassName="p-4"
                    previousClassName="mr-4 bg-gray-600 w-28 rounded-md text-white px-4 py-2"
                    nextClassName="ml-4 bg-gray-600 w-28 rounded-md text-white px-4 py-2 flex justify-center "
                    activeClassName="bg-gray-600 rounded-full text-white py-2"
                    disabledClassName="bg-gray-300 cursor-not-allowed"
                    disabledLinkClassName="bg-gray-300 cursor-not-allowed"
                />
            )}
        </div>
    );
};

export default Pagination;
