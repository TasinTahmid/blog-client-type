import React from "react";
import UserForm from "../components/UserForm";

const Auth: React.FC = () => {
    return (
        <div className="flex flex-col h-full w-full overflow-y-scroll">
            <div className="flex-1">
                <UserForm />
            </div>
        </div>
    );
};

export default Auth;
