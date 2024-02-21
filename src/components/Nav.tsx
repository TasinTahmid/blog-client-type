import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../states/authSlice";
import { setPageTypeLogin, setPageTypeRegister } from "../states/pageTypeSlice";
import { RootState } from "../states/store";

const Nav = () => {
    const navigate = useNavigate();
    const [isMenuActive, setIsMenuActive] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogOut = () => {
        setIsMenuActive(false);
        dispatch(setLogout());
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/auth");
        dispatch(setPageTypeLogin());
    };
    const handleRegister = () => {
        navigate("/auth");
        dispatch(setPageTypeRegister());
    };

    const closeUserOptions = () => {
        setIsMenuActive(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            closeUserOptions();
        }
    };
    useEffect(() => {
        document.addEventListener("click", closeUserOptions);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("click", closeUserOptions);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="sticky mt-5 top-0 text-xl text-gray-600 z-20 flex justify-between items-center w-full bg-white border-b shadow-inner p-6  rounded-t-lg">
            <NavLink to="/" className="text-4xl">
                Blog App
            </NavLink>
            <div className="flex justify-between gap-x-14">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "underline underline-offset-2 font-semibold"
                            : ""
                    }
                >
                    Home
                </NavLink>
                {user && (
                    <>
                        <NavLink
                            to="/profile"
                            state={{ id: user.id }}
                            className={({ isActive }) =>
                                isActive
                                    ? "underline underline-offset-2 font-semibold"
                                    : ""
                            }
                        >
                            Profile
                        </NavLink>
                    </>
                )}
            </div>
            <div className="flex justify-between gap-x-14">
                <div className="flex justify-between  gap-x-14 relative ml-3">
                    {!user ? (
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleLogin}
                                className="rounded-md  px-4 py-2 text-sm font-semibold  hover:bg-gray-50 active:bg-gray-100"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleRegister}
                                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-500 active:bg-gray-600"
                            >
                                Register
                            </button>
                        </div>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuActive(!isMenuActive);
                            }}
                            className="w-10 h-10 hover:cursor-pointer"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                    {user && isMenuActive && (
                        <div className="absolute border-gray-100 top-8 right-3 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                            <NavLink
                                to="/profile"
                                state={{ id: user.id }}
                                className="block px-4 py-2 text-sm active:bg-gray-50 hover:bg-gray-100"
                            >
                                {user.username}
                            </NavLink>
                            <NavLink
                                to="/settings/update-password"
                                className="block px-4 py-2 text-sm active:bg-gray-50 hover:bg-gray-100"
                            >
                                Profile settings
                            </NavLink>

                            <div
                                onClick={handleLogOut}
                                className="flex justify-start align-center active:bg-gray-50 hover:bg-gray-100 hover:cursor-pointer"
                            >
                                <button className="rounded-md  px-4 py-2 text-sm font-semibold   ">
                                    Log out
                                </button>
                                <div className="pt-2 flex justify-start align-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        data-slot="icon"
                                        className="w-6 h-6 "
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nav;
