import { useSelector, useDispatch } from "react-redux";
import { useDeleteAccountMutation } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../states/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../states/store";
import { PopupConfirmationProps } from "../types/componentTypes";
import { ApiError } from "../types/apiResponseTypes";

const PopupConfirmation: React.FC<PopupConfirmationProps> = ({ togglePopup }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deleteAccount] = useDeleteAccountMutation();

    const { user, token } = useSelector((state: RootState) => state.auth);

    const handleDeleteAccount = async (id: string, token: string) => {
        try {
            await deleteAccount({ id, token });
            toast.success("Account deleted successfully.", {
                position: "bottom-right",
                autoClose: 700,
            });

            setTimeout(() => {
                navigate("/");
                dispatch(setLogout());
            }, 1200);
        } catch (error) {
            const blogCreateError = error as ApiError;
            toast.error(blogCreateError.data.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        }
    };

    return (
        <div
            id="popup-modal"
            className="m-auto fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center overflow-y-auto overflow-x-hidden  z-50 w-96"
        >
            <div className=" p-4 w-full max-w-md max-h-full">
                <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                    >
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete your account?
                        </h3>
                        <div className="flex justify-evenly">
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                onClick={togglePopup}
                                className="text-gray-500 bg-white hover:bg-gray-100  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                            >
                                No, cancel
                            </button>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (user?.id && token) handleDeleteAccount(user.id, token);
                                }}
                                className="text-white bg-red-500 hover:bg-red-800  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PopupConfirmation;
