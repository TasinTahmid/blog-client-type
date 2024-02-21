import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlogInputButton = ({ handleClick }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const showCreateBlogForm = () => {
        if (!user) {
            navigate("/auth");
            return;
        }
        handleClick();
    };
    return (
        <div className="rounded-md bg-white xl:col-span-2  w-full shadow-md flex justify-center bg-gray-50 px-auto">
            <form className="w-full m-10">
                <div className="space-y-12 border-b border-gray-900/10 pb-10">
                    <input
                        id="createInputButton"
                        name="createInputButton"
                        type="createInputButton"
                        placeholder=" What's on your mind? Create your blogs."
                        onClick={showCreateBlogForm}
                        className="block w-full h-10 rounded-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 hover:pointer-events-auto hover:cursor-pointer hover:bg-gray-50"
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateBlogInputButton;
