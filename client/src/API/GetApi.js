import axios from "axios";
import { EndpointAPI } from "./EndpointApi";
const timeDuration = 250;
let abortController = null;

export const getApi = {
  // Lấy thông tin user từ google
  getDataGoogle: async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  },

  // lấy tất cả user page admin
  getApiAllUser: async (setDataUser, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();

      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.get(EndpointAPI.apiAllUser, {
        withCredentials: true,
        signal: abortController.signal,
      });
      setDataUser(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  },

  // lấy thông tin user theo token
  getApiUser: async (setDataUser) => {
    
    const abortControllerUser = new AbortController();

    try {
      const response = await axios.get(EndpointAPI.apiUser, {
        withCredentials: true,
        signal: abortControllerUser.signal,
      });
      setDataUser(response.data.data);
    } catch (error) {
      console.log(error);
    }

    return () => {
      abortControllerUser.abort();
    };
  },

  // lấy thông tin user theo userid
  getApiUserById: async (userId, setDataUserReview) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      const response = await axios.get(
        `${EndpointAPI.apiUserReview}/${userId}`,
        {
          headers,
        }
      );
      setDataUserReview(response.data.data);
    } catch (error) {
      console.log(error);
    }
  },

  // lấy tất cả mớn ăn theo tỉnh thành page admin
  getApiCuisineDetail: async (
    setDataCuisineDetail,
    province_name,
    setLoading
  ) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.get(
        `${EndpointAPI.apiGetCuisineDetail}/${province_name}`,
        { withCredentials: true, signal: abortController.signal }
      );
      if (response.status === 200 && response.data?.data) {
        setDataCuisineDetail(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setDataCuisineDetail([]);
    } finally {
      setLoading(false);
    }
  },

  // lấy tất cả món ăn và phân trang
  getApiAllCuisinePage: async (
    setData,
    setLoading,
    pageNumber,
    setTotalPage
  ) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.aipGetAllCuisinePage}?page=${pageNumber}`,
        { headers }
      );
      setTotalPage(response.data.totalPages);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  },

  // lấy tất cả món ăn cho phần search
  getApiAllCuisineSearch: async (setData, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(`${EndpointAPI.apiGetCuisineSearch}`, {
        headers,
      });

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  },

  // lấy tổng sơ tất cả các món ăn
  getApiTotalFood: async (setTotalFood) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.aipGetAllCuisinePage}?page=${1}`,
        { headers }
      );
      setTotalFood(response.data.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
    }
  },

  // tìm kiếm món ăn theo tỉnh thành
  getApiFoodByProvince: async (
    setDataCuisineDetail,
    province_name,
    setProvince,
    setLoading
  ) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetCuisineDetail}/${province_name}`,
        { headers }
      );
      if (response.status === 200 && response.data?.data) {
        setDataCuisineDetail(response.data.data[0].cuisineDetail);
        setProvince(response.data.data[0].provinceName);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setDataCuisineDetail([]);
    } finally {
      setLoading(false);
    }
  },

  // tìm kiếm món ăn theo khu vực
  getApiFoodByRegion: async (
    setData,
    regional,
    setLoading,
    pageNumber,
    setTotalPage
  ) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.get(
        `${EndpointAPI.apiGetFoodByRegion}/region/${regional}?page=${pageNumber}`,
        { headers }
      );
      if (response.status === 200 && response.data?.data) {
        setData(response.data.data);
        setTotalPage(response.data.totalPages);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // lấy món ăn theo foodId
  getApiFoodById: async (setData, foodId, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetFoodById}/${foodId}`,
        { headers }
      );
      if (response.status === 200 && response.data?.data) {
        setData(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // lấy tất cả ẩm thực theo tỉnh thành, hình đại diện, countFood
  getApiAllCuisineByProvince: async (setData, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(`${EndpointAPI.apiGetAllCuisine}`, {
        headers,
      });
      if (response.status === 200 && response.data?.data) {
        setData(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // lấy số lượng lịch trình
  getApiTotalItinerary: async (setData) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(`${EndpointAPI.apiGetTotalItinerary}`, {
        headers,
      });
      if (response.status === 200) {
        setData(response.data.totalItineraries);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      setData([]);
    } finally {
    }
  },

  // lấy lịch trình du lịch theo tên tỉnh thành
  getApiTravelItineraryByProvince: async (
    setData,
    provinceName,
    setLoading
  ) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetTravelItineraryByProvinceName}/${provinceName}`,
        { headers }
      );
      if (response.status === 200 && response.data?.data) {
        setData(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // Lấy bài viết theo danh mục bài viết (news)
  getApiNewsByCategoryNews: async (setData, categoryNews, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetNewsByCategoryNews}/${categoryNews}`,
        { headers }
      );
      if (response.status === 200 && response.data?.data) {
        setData(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu cho bài viết này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // lấy news theo id news
  getApiNewsById: async (setData, newsId, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetNewsById}/${newsId}`,
        { headers }
      );
      if (response.status === 200 && response.data?.data) {
        setData(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu cho bài viết này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // api hotel

  // api lấy tất cả hotel theo tỉnh thành và số sao nếu có
  getApiHotelsByProvince: async (
    setData,
    provinceName,
    setLoading,
    numberPage,
    numberStars,
    setTotalPage
  ) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetHotelByProvince}/${provinceName}?page=${numberPage}&stars=${numberStars}`,
        { headers }
      );

      if (response.status === 200) {
        setData(response.data.hotelItems);
        setTotalPage(response.data.totalPages);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // api search hotel
  getApiSearchHotel: async (setData) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };

      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(`${EndpointAPI.apiGetSearchHotel}`, {
        headers,
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu.");
      }
    } catch (error) {
      setData([]);
    }
  },

  // api hotel chi tiết theo tên
  getApiHotelDetail: async (setData, hotelName, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetHotelDetailByName}/${hotelName}`,
        { headers }
      );
      if (response.status === 200) {
        setData(response.data.hotelItem);
      } else {
        throw new Error("Không tìm thấy dữ liệu món ăn cho tỉnh này.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // thống kê hotel
  getApiStatisticHotels: async (
    setTotalHotelItems,
    setTotalHotel,
    setHotelStats,
    setLoading
  ) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(`${EndpointAPI.apiGetStatisticHotel}`, {
        headers,
      });
      if (response.status === 200) {
        setTotalHotelItems(response.data.totalHotelItems);
        setTotalHotel(response.data.totalHotels);
        setHotelStats(response.data.hotelStats);
      } else {
        throw new Error("Không tìm thấy dữ liệu.");
      }
    } catch (error) {
      setTotalHotelItems([]);
      setHotelStats([]);
      setTotalHotel([]);
    } finally {
      setLoading(false);
    }
  },

  // lấy tất cả tỉnh thành hotle
  getApiProvinceHotel: async (setData) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };

      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(`${EndpointAPI.apiGetProvinceHotel}`, {
        headers,
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu.");
      }
    } catch (error) {
      setData([]);
    }
  },

  // api quản lý admin
  getApiHotelsByProvinceAdmin: async (setData, provinceName, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetStatisticHotel}/${provinceName}`,
        { withCredentials: true, signal: abortController.signal }
      );
      if (response.status === 200) {
        setData(response.data.hotelItems);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // api get chat
  getApiChats: async (setData, userId) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();

      const response = await axios.get(`${EndpointAPI.apiGetChats}/${userId}`, {
        withCredentials: true,
        signal: abortController.signal,
      });
      if (response.status === 200) {
        setData(response.data.data.conversation);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      setData([]);
    }
  },

  // api get Destination
  apiGetDestinations: async (
    setData,
    setLoading,
    currentPage,
    setTotalPages,
    selectedProvince,
    excludeId,
    limit
  ) => {
    try {
      const query = new URLSearchParams({
        page: currentPage,
        limit,
        ...(selectedProvince && { province: selectedProvince }),
        ...(excludeId && { excludeId }),
      });

      setLoading(true);

      const response = await axios.get(
        `${EndpointAPI.apiGetDestinations}?${query.toString()}`
      );

      if (response.status === 200) {
        setData(response.data.destinationItems);
        setTotalPages(response.data.totalPages);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // api get destination for admin
  apiGetDestinationsV2: async (setData, setTotalDestination, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };

      setLoading(true);

      const response = await axios.get(`${EndpointAPI.apiGetDestinationsV2}`, {
        headers,
      });

      if (response.status === 200) {
        setData(response.data.destinationItems);
        setTotalDestination(response.data.totalItems);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  // api get destination by name
  apiGetDestinationByName: async (name, setData, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));

      const response = await axios.get(
        `${EndpointAPI.apiGetDestinationByName}/${encodeURIComponent(name)}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        setData(response.data); // Gán dữ liệu của địa điểm vào state
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      console.error(error);
      setData(null); // Nếu lỗi, set dữ liệu về null
    } finally {
      setLoading(false); // Kết thúc loading
    }
  },

  //api get restaurant
  apiGetRestaurants: async (setData, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };

      setLoading(true);

      const response = await axios.get(`${EndpointAPI.apiGetRestaurants}`, {
        headers,
      });

      if (response.status === 200) {
        setData(response.data.restaurantItems);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  //api get restaurant by id
  apiGetRestaurantById: async (setData, id, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };

      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, timeDuration));

      const response = await axios.get(
        `${EndpointAPI.apiGetRestaurantById}/${id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        setData(response.data.restaurantItem);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },

  //get data cho map theo viewport
  apiGetLocationViewport: async (setData, sw_lat, sw_lng, ne_lat, ne_lng) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };

      const response = await axios.get(
        `${EndpointAPI.apiGetLocationViewport}`,
        {
          headers,
          params: {
            sw_lat: sw_lat,
            sw_lng: sw_lng,
            ne_lat: ne_lat,
            ne_lng: ne_lng,
          },
        }
      );
      // console.log("Request URL:", response);

      if (response.status === 200) {
        setData(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu");
      }
    } catch (error) {
      setData([]);
    }
  },

  //get data cho map theo bán kính
  // apiGetLocationNearby: async (setData) => {
  //   try {
  //     if (abortController) {
  //       abortController.abort();
  //     }
  //     abortController = new AbortController();
  //     const headers = {
  //       signal: abortController.signal,
  //     };

  //     const response = await axios.get(`${EndpointAPI.apiGetLocationNearby}`, {
  //       headers,
  //     });

  //     if (response.status === 200) {
  //       setData(response.data.data);
  //     } else {
  //       throw new Error("Không tìm thấy dữ liệu");
  //     }
  //   } catch (error) {
  //     setData([]);
  //   }
  // },

  // api review chi tiết theo tên tên nơi
  getApiReviewByNameplateSlug: async (setData, nameplateSlug, setLoading) => {
    try {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const headers = {
        signal: abortController.signal,
      };
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, timeDuration));
      const response = await axios.get(
        `${EndpointAPI.apiGetReviewByNameplateSlug}/${nameplateSlug}`,
        { headers }
      );
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        throw new Error("Không tìm thấy dữ liệu.");
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  },
};
