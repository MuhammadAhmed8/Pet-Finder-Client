import * as Yup from "yup";

export const SingupFormUserSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be greater than or equal to 6 characters.")
    .max(25, "Password should be less than or equal to 25 characters.")
    .required("Password is required"),
  name: Yup.string().required("Name is required"),
});

export const SingupFormEmpSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be greater than or equal to 6 characters.")
    .max(25, "Password should be less than or equal to 25 characters.")
    .required("Password is required"),
  code: Yup.string()
    .min(3, "Signup code should be greater.")
    .required("Signup code is required"),
  name: Yup.string().required("Name is required"),
});
