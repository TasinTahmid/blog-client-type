import { useState } from "react";
import PopupConfirmation from "./PopupConfirmation";
import { useNavigate } from "react-router-dom";

const DeleteAccount: React.FC = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);

    const backToProfile = () => {
        navigate("/profile");
    };

    return (
        <div className="mx-auto mt-8 flex flex-col justify-between  w-1/2 h-auto bg-gray-50  shadow-xl">
            <div className="mt-12 px-14  ">
                <h2 className="py-4 text-red-600 font-semibold text-2xl border-b border-black-500">
                    Delete account
                </h2>
                <p className="py-4 text-sm mb-10">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                    onClick={togglePopup}
                    className="mt-10 p-4 bg-gray-100 text-red-600  text-sm rounded-lg border border-red-200 shadow-md hover:bg-gray-50 active:bg-gray-100"
                >
                    Delete your account
                </button>
                {showPopup && <PopupConfirmation togglePopup={togglePopup} />}
            </div>
            <button
                type="button"
                className="my-16 rounded-lg border border-gray-200 mx-14 w-fit rounded-md text-sm font-semibold px-4 py-3 text-gray-900 hover:bg-gray-100 active:bg-gray-50"
                onClick={backToProfile}
            >
                {"< Back to profile"}
            </button>
        </div>
    );
};

export default DeleteAccount;
