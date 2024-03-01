import * as yup from "yup";

export const validationSchemaCreateuser = yup.object({
  email: yup
    .string()
    .required("Email address is required.")
    .email("Please enter a valid email address."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password."),
});
