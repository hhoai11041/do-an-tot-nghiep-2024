import * as yup from "yup";
export const ValidateSignIn = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập đúng địa chỉ email")
    .required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhâp mật khẩu"),
});
