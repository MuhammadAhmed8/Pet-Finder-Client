import * as Yup from "yup";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be greater than or equal to 6 characters.")
    .max(25, "Password should be less than or equal to 25 characters.")
    .required("Password is required"),
});

export default LoginFormSchema;
