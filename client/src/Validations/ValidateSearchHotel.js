import * as yup from "yup";
export const ValidateSearchHotel = yup.object({
  location: yup.string().required("Nhập địa điểm cần tìm"),
});
