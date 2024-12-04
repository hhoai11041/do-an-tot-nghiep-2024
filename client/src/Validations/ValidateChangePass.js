import * as yup from "yup";
export const ValidateChangePass = yup.object({
  passwordOld: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  passwordNew: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(8, "Mật khẩu có ít nhất 8 kí tự"),
  confirmPasswordNew: yup
    .string()
    .required("Vui lòng xác nhận lại mật khẩu mới")
    .oneOf([yup.ref("passwordNew"), null], "Mật khẩu chưa đúng")
});
