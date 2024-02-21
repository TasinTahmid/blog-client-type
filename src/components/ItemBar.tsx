import { NavLink } from "react-router-dom";

const ItemBar: React.FC = () => {
    return (
        <div className="pl-8 h-16 w-full border-b border-black-500 text-lg flex justify-start items-center">
            <NavLink
                to="update-password"
                className={({ isActive }) =>
                    isActive ? "underline underline-offset-2 font-semibold mr-16" : "mr-16"
                }
            >
                Update Password
            </NavLink>
            <NavLink
                to="delete-account"
                className={({ isActive }) =>
                    isActive ? "underline underline-offset-2 font-semibold mr-16" : "mr-16"
                }
            >
                Delete Account
            </NavLink>
        </div>
    );
};

export default ItemBar;
