import axios from "axios";
import { EndpointAPI } from "./EndpointApi";
import { announce } from "../Components/ModalAnnounce";


export const postApi = {
  createAccount: async (
    username,
    email,
    password,
    avatar,
    setResetData,
    resetData,
    setOpenModal
  ) => {
    try {
      const response = await axios.post(EndpointAPI.apiCrateUser, {
        username: username,
        email: email,
        password: password,
        avatar: avatar,
      });
      if (response.data.status === "Success") {
        setResetData(() => !resetData);
        setOpenModal(false);
        announce.showAutoLoginMessage("Thành công");
      }
    } catch (error) {
      setResetData(() => !resetData);
      announce.showErrorModal("Lỗi rồi !!!", "Tài khoản với email tồn tịa");
    }
  },
  loginAccount: async (
    email,
    password,
    setResetData,
    resetData,
    setOpenModal,
    setRenderHeader
  ) => {
    try {
      const response = await axios.post(EndpointAPI.apiLogin, {
        email: email,
        password: password,
      }, { withCredentials: true });

      if (response.data.status === "Success") {
        setResetData(() => !resetData);
        setOpenModal(false);
        setRenderHeader(true);
        announce.showSuccessModal(
          "Thành công",
          "Bạn đã đăng nhập tài khoản thành công"
        );
      }
    } catch (error) {
      announce.showErrorModal(
        "Thất bại",
        "Thông tin tài khoản không chính xác"
      );
    }
  },

  logoutAccount: async (setResetData, resetData, setRenderHeader) => {
  try {
    
    const response = await axios.post(EndpointAPI.apiLogout, {}, { withCredentials: true });

    if (response.data.message === "Logged out successfully") {
      setResetData(prev => !prev);  
      setOpenModal(false);          
      setRenderHeader(false);       

      announce.showSuccessModal(
        "Thành công",
        "Bạn đã đăng xuất thành công"
      );

    }
  } catch (error) {
    console.error('Logout error:', error);
    announce.showErrorModal(
      "Thất bại",
      "Đã xảy ra lỗi khi đăng xuất, vui lòng thử lại!"
    );
  }
},

  // tạo mới ăn mới
  createNewFood: async (
    accessToken,
    provinceName,
    provinceSlug,
    regional,
    foodName,
    imgFood,
    foodDesc,
    listImage
  ) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${EndpointAPI.apiCreateCuisine}`,
        {
          provinceName: provinceName,
          provinceSlug: provinceSlug,
          regional: regional,
          foodName: foodName,
          imgFood: imgFood,
          foodDesc: foodDesc,
          listImage: listImage,
        },
        { headers }
      );
      if (response.data.status === "Success") {
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
  // tạo lộ trình chi tiết
  createTravelItinerary: async (
    accessToken,
    provinceName,
    provinceSlug,
    timeTrip,
    content,
    userCreate
  ) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${EndpointAPI.apiCreateTravelItinerary}`,
        {
          provinceName: provinceName,
          provinceSlug: provinceSlug,
          timeTrip: timeTrip,
          content: content,
          userCreate: userCreate,
        },
        { headers }
      );
      if (response.data.status === "Success") {
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

  // tạo bài viết mới (tin tức)
  createNews: async (
    accessToken,
    categoryNews,
    titleNews,
    imageNews,
    content
  ) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${EndpointAPI.apiCreateNews}`,
        {
          categoryNews: categoryNews,
          titleNews: titleNews,
          imageNews: imageNews,
          content: content,
        },
        { headers }
      );
      if (response.data.status === "Success") {
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

  // chatbot Ai
  createMessageChatAI: async (
    accessToken,
    userId,
    conversationId,
    role,
    message,
    renderUI,
    setRenderUI
  ) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${EndpointAPI.apiCreateChats}`,
        {
          userId: userId,
          conversationId: conversationId,
          role: role,
          message: message,
        },
        { headers }
      );
      if (response.data.status === "Success") {
        setRenderUI(() => !renderUI);
      }
    } catch (error) {}
  },

  //thêm mới địa điểm
  apiAddDestination: async (accessToken, data) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };

      const response = await axios.post(EndpointAPI.apiAddDestination, data, {
        headers,
      });

      if (response.data.status === "Success") {
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

  //api thêm nhà hàng
  apiAddRestaurant: async (accessToken, data) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };

      const response = await axios.post(EndpointAPI.apiAddRestaurant, data, {
        headers,
      });

      if (response.data.status === "Success") {
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

  // api thêm đánh giá
  apiAddReview: async (
    accessToken,
    nameplate,
    nameplateSlug,
    userId,
    star,
    evaluate,
    reviewContent,
    reviewImages,
    setRenderUI,
    renderUI
  ) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${EndpointAPI.apiPostReview}`,
        {
          nameplate: nameplate,
          nameplateSlug: nameplateSlug,
          userId: userId,
          star: star,
          evaluate: evaluate,
          reviewContent: reviewContent,
          reviewImages: reviewImages,
        },
        { headers }
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

  //thêm khách sạn
  apiAddHotel: async (accessToken, data) => {
    try {
      const token = accessToken;
      const headers = {
        token: `Bearer ${token}`,
      };
      const response = await axios.post(`${EndpointAPI.apiAddHotel}`, data, {
        headers,
      });

      if (response.data.status === "Success") {
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
};
