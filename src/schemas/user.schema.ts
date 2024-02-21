import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .matches(/^\S*$/, "Username cannot contain spaces"),
    email: Yup.string().required("Email is required").email("Invalid email address"),

    password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters"),

    confirmPassword: Yup.string()
        .required("Please re-enter your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email address"),

    password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters"),
});

const passwordUpdateSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required("Old Password is required")
        .min(4, "Password must be at least 4 characters"),

    newPassword: Yup.string()
        .required("New Password is required")
        .min(4, "Password must be at least 4 characters"),

    confirmNewPassword: Yup.string()
        .required("Please re-enter your password")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export { registerSchema, loginSchema, passwordUpdateSchema };
