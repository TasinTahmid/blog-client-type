import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setPageTypeLogin, setPageTypeRegister } from "../states/pageTypeSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema, loginSchema } from "../schemas/user.schema.ts";
import {
    useCreateUserMutation,
    useLoginUserMutation,
} from "../apis/userApi.ts";
import { useAppSelector, useAppDispatch } from "../states/hooks.ts";
import { PageTypeState } from "../states/pageTypeSlice";
import { UserFormData } from "../types/dataTypes.ts";
import { RootState } from "../states/store.ts";
import { ApiResponse, ApiError } from "../types/apiResponseTypes.ts";
import { setLogin } from "../states/authSlice.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [createUser] = useCreateUserMutation();
    const [loginUser] = useLoginUserMutation();

    const pageType = useAppSelector(
        (state: RootState) => state.pageType
    ) as PageTypeState;

    const { register, handleSubmit, formState } = useForm<UserFormData>({
        resolver: yupResolver(
            pageType.value == "register" ? registerSchema : loginSchema
        ),
    });

    const { errors } = formState;

    const handleRegister = async (data: UserFormData) => {
        try {
            const response: ApiResponse = await createUser({
                body: data,
            }).unwrap();
            console.log("response register", response);

            dispatch(setLogin(response));

            toast.success("Registration successfull.", {
                position: "bottom-right",
                autoClose: 700,
            });
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            console.log("register error", error);
            const apiError = error as ApiError;
            toast.error(apiError.data.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        }
    };

    const handleLogin = async (data: UserFormData) => {
        try {
            const response = await loginUser({ body: data }).unwrap();
            console.log("response login", response);

            dispatch(setLogin(response));
            toast.success("Login successfull.", {
                position: "bottom-right",
                autoClose: 700,
            });
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            console.log("error login", error);
            const apiError = error as ApiError;
            toast.error(apiError.data.message, {
                position: "bottom-right",
                autoClose: 1500,
            });
        }
    };

    const onSubmit = (data: UserFormData) => {
        if (pageType.value == "register") return handleRegister(data);
        return handleLogin(data);
    };

    return (
        <div className="h-full flex justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-20 w-2/3 h-fit bg-white p-16"
            >
                <h2 className="mx-4 mb-8 text-2xl font-semibold leading-10 text-gray-900">
                    {pageType.value == "register" ? "Register" : "Login"}
                </h2>

                {pageType.value == "register" && (
                    <div className="mb-2 p-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-600">
                            {errors.username?.message}
                        </p>
                    </div>
                )}
                <div className="mb-2 p-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-600">{errors.email?.message}</p>
                </div>
                <div className="mb-2 p-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password")}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-600">{errors.password?.message}</p>
                </div>
                {pageType.value == "register" && (
                    <div className="mb-2 p-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirmPassword")}
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-600">
                            {errors.confirmPassword?.message}
                        </p>
                    </div>
                )}

                <div className="border-t border-gray-90 pt-8  mx-4 mt-10 flex items-center justify-between gap-x-6">
                    <button
                        type="button"
                        className="rounded-md  py-2 text-sm font-semibold leading-6 text-gray-900 hover:underline hover:underline-offset-2"
                        onClick={() => {
                            dispatch(
                                pageType.value == "register"
                                    ? setPageTypeLogin()
                                    : setPageTypeRegister()
                            );
                        }}
                    >
                        {pageType.value == "register"
                            ? "Already have an account? Login here."
                            : "Don't have an account? Register here."}
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-500 active:bg-gray-600"
                        onClick={() => {}}
                    >
                        {pageType.value == "register" ? "Register" : "Login"}
                    </button>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default UserForm;
