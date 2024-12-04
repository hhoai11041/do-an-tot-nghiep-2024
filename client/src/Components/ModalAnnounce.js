import Swal from "sweetalert2";

export const announce = {
  showDeleteConfirmation: async (title) => {
    return await Swal.fire({
      title: title,
      html: "<p style='color: gray; font-size: 16px;'>Hành động này không thể hoàn tác! Hãy cẩn thận.</p>",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Hủy bỏ",
      confirmButtonText: "Xóa ngay",
      customClass: {
        title: "text-2xl font-bold text-red-600 mt-2",
        text: "text-sm",
        confirmButton:
          "bg-red-600 w-[150px] text-white px-5 py-2 rounded-md mt-5",
        cancelButton:
          "bg-gray-300 w-[150px] text-black px-5 py-2 rounded-md mt-5",
      },
    });
  },

  showSuccessModal: (title, message) => {
    return Swal.fire({
      title: title,
      text: message,
      icon: "success",
      customClass: {
        title: "text-2xl font-bold text-green-600",
        text: "text-sm",
        confirmButton:
          "bg-green-600 w-[150px] text-white px-5 py-2 rounded-md mt-3",
      },
    });
  },

  showErrorModal: (title, message) => {
    return Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      customClass: {
        title: "text-2xl font-bold text-red-600",
        text: "text-sm",
        confirmButton:
          "bg-red-600 w-[150px] text-white px-5 py-2 rounded-md mt-3",
      },
    });
  },

  showAutoLoginMessage: async (title) => {
    return await Swal.fire({
      title: title,
      html: "<p style='color: gray; font-size: 16px;'>Hệ thống sẽ tự động đăng nhập tài khoản của bạn</p>",
      icon: "success",
      customClass: {
        title: "text-2xl font-bold text-green-600",
        text: "text-sm",
        confirmButton:
          "bg-green-600 w-[150px] text-white px-5 py-2 rounded-md mt-3",
      },
    });
  },
};
