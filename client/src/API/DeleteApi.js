import axios from "axios";
import { EndpointAPI } from "./EndpointApi";
import { announce } from "../Components/ModalAnnounce";
export const deleteApi = {
  deleteApiUser: async (userId, renderDelete, setRenderDelete) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn xóa tài khoản?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteUser}/${userId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderDelete(() => !renderDelete);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },
  deleteApiCuisineByFoodId: async (
    provinceSlug,
    foodId,
    renderUI,
    setRenderUI
  ) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn xóa tài món ăn?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteCuisineByFoodId}/${provinceSlug}/${foodId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderUI(!renderUI);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },

  // xóa lịch trình theo tỉnh thành và id lịch trình
  deleteApiItineraryById: async (
    provinceSlug,
    itineraryId,
    renderUI,
    setRenderUI
  ) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn xóa lịch trình?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteItineraryById}/${provinceSlug}/${itineraryId}`,
          { withCredentials: true }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderUI(!renderUI);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },

  // xóa bài viết theo id (news)
  deleteApiNewsById: async (newsId, renderUI, setRenderUI) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn xóa bài viết?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteNews}/${newsId}`,
          { withCredentials: true }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderUI(!renderUI);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },

  // xóa chat AI
  deleteApiChatAI: async (userId, conversation, renderUI, setRenderUI) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn cuộc trò chuyện?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteChats}/${userId}/conversations/${conversation}`,
          { withCredentials: true }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderUI(!renderUI);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },

  //api xóa địa điểm theo id
  apiDeleteDestination: async (_id, renderUI, setRenderUI) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn xóa địa điểm?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteDestination}/${_id}`,
          { withCredentials: true }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderUI(!renderUI);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },

  //api xóa nhà hàng theo id
  apiDeleteRestaurant: async (_id, renderUI, setRenderUI) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn xóa nhà hàng?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteRestaurant}/${_id}`,
          { withCredentials: true }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderUI(!renderUI);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },

  //api xóa khách sạn theo id
  apiDeleteHotel: async (id, renderUI, setRenderUI) => {
    try {
      const result = await announce.showDeleteConfirmation(
        "Bạn muốn xóa khách sạn này?"
      );
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${EndpointAPI.apiDeleteHotel}/${id}`,
          { withCredentials: true }
        );
        if (response.data.status === "Success") {
          announce.showSuccessModal("Thành công", response.data.message);
          setRenderUI(!renderUI);
        }
      }
    } catch (error) {
      announce.showErrorModal("Lỗi rồi !!!", error.response?.data?.message);
    }
  },
};
