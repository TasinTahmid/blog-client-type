import * as Yup from "yup";

const blogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").min(2, "Title must be at least 2 characters"),

    blogContent: Yup.string()
        .required("Blog Content is required")
        .min(4, "Blog Content must be at least 4 characters"),
});

export default blogSchema;
