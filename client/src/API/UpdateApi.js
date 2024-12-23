import axios from "axios";
import { EndpointAPI } from "./EndpointApi";
import { announce } from "../Components/ModalAnnounce";
import slugify from "react-slugify";

export const UpdateApi = {
  authorizedAccount: async (userId, role, setOpenModal, render, setRender) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiAuthorizeAccount}/${userId}`,
        { role },
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        setOpenModal(false);
        setRender(() => !render);
        announce.showSuccessModal("Thành công", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        }
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server"
        );
      }
    }
  },

  // cập nhật thông tin, hình ảnh tài khoản người dùng
  updateAccountByUserId: async (userId, dataUpdate, setRenderUI, renderUI) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateUser}/${userId}`,
        dataUpdate,
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        announce.showSuccessModal("Thành công", response.data.message);
        setRenderUI(!renderUI);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        }
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server"
        );
      }
    }
  },

  // cập nhật thông tin lịch trình theo tỉnh thành và id
  updateItineraryDetailByID: async (
    provinceSlug,
    itineraryId,
    timeTrip,
    content,
    renderUI,
    setRenderUI
  ) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateItineraryById}/${provinceSlug}/${itineraryId}`,
        {
          timeTrip: timeTrip,
          content: content,
        },
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        announce.showSuccessModal("Thành công", response.data.message);
        setRenderUI(!renderUI);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        }
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server"
        );
      }
    }
  },

  // cập nhật thông tin ẩm thực
  updateCuisineByFoodId: async (
    provinceSlug,
    foodId,
    foodName,
    imgFood,
    foodDesc,
    listImage,
    renderUI,
    setRenderUI
  ) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateCuisineByFoodId}/${provinceSlug}/${foodId}`,
        {
          foodName: foodName,
          imgFood: imgFood,
          foodDesc: foodDesc,
          listImage: listImage,
        },
        { withCredentials: true }
      );
      if (response.data.status === "Success") {
        announce.showSuccessModal("Thành công", response.data.message);
        setRenderUI(!renderUI);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        }
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server"
        );
      }
    }
  },

  // cập nhật bài viết theo id (news)
  updateNewsById: async (
    newsId,
    categoryNews,
    titleNews,
    imageNews,
    content,
    renderUI,
    setRenderUI
  ) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateNews}/${newsId}`,
        {
          categoryNews: categoryNews,
          titleNews: titleNews,
          imageNews: imageNews,
          content: content,
        },
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        announce.showSuccessModal("Thành công", response.data.message);
        setRenderUI(!renderUI);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        }
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server"
        );
      }
    }
  },

  //api cập nhật thông tin địa điểm
  apiUpdateDestination: async (_id, data, renderUI, setRenderUI) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateDestination}/${_id}`,
        data,
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        announce.showSuccessModal("Thành công", response.data.message);
        // setRenderUI(!renderUI);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        } else {
          announce.showErrorModal(
            "Lỗi hệ thống !!!",
            "Đã xảy ra lỗi trong quá trình xử lý."
          );
        }
      } else if (error.request) {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server. Vui lòng kiểm tra mạng."
        );
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          `Lỗi không xác định: ${error.message}`
        );
      }
    }
  },

  //api cập nhật thông tin nhà hàng
  apiUpdateRestaurant: async (_id, data, renderUI, setRenderUI) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateRestaurant}/${_id}`,
        data,
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        announce.showSuccessModal("Thành công", response.data.message);
        // setRenderUI(!renderUI);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        } else {
          announce.showErrorModal(
            "Lỗi hệ thống !!!",
            "Đã xảy ra lỗi trong quá trình xử lý."
          );
        }
      } else if (error.request) {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server. Vui lòng kiểm tra mạng."
        );
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          `Lỗi không xác định: ${error.message}`
        );
      }
    }
  },

  //api cập nhật thông tin khách sạn
  apiUpdateHotel: async (province, id, data, renderUI, setRenderUI) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateHotel}/${slugify(province)}/${id}`,
        data,
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        announce.showSuccessModal("Thành công", response.data.message);
        // setRenderUI(!renderUI);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === "Error") {
          announce.showErrorModal("Lỗi rồi !!!", message);
        } else {
          announce.showErrorModal(
            "Lỗi hệ thống !!!",
            "Đã xảy ra lỗi trong quá trình xử lý."
          );
        }
      } else if (error.request) {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          "Không thể kết nối đến server. Vui lòng kiểm tra mạng."
        );
      } else {
        announce.showErrorModal(
          "Lỗi hệ thống !!!",
          `Lỗi không xác định: ${error.message}`
        );
      }
    }
  },

  // cập nhật khách sạn theo name cho phần đánh giá (số sao, reviewScore, reviewText)
  updateHotelByReviewHotel: async (
    provinceSlug,
    name,
    stars,
    numberOfReview
  ) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateHotelByNameAndProvince}/${provinceSlug}`,
        {
          name: name,
          stars: stars,
          numberOfReview: numberOfReview,
        }
      );
      // console.log(response);
      if (response.data.status === "Success") {
      }
    } catch {}
  },

  // cập nhật địa điểm du lịch theo id cho phần đánh giá (số sao, số lượt đánh giá)
  updateDestinationReviewById: async (id, rating, rating_count) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateDestinationReview}/${id}`,
        {
          rating: rating,
          rating_count: rating_count,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.status === "Success") {
      }
    } catch {}
  },

  // cập nhật nhà hàng tho id cho phần đánh giá (số sao, lượt đánh giá)
  updateRestaurantReviewById: async (id, rating, rating_count) => {
    try {
      const response = await axios.put(
        `${EndpointAPI.apiUpdateRestaurantReview}/${id}`,
        {
          rating: rating,
          rating_count: rating_count,
        },
        { withCredentials: true }
      );
      if (response.data.status === "Success") {
      }
    } catch {}
  },
};
