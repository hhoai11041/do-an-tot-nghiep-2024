const url =
  "https://khamphavietnam.online";
export const EndpointAPI = {
  apiCrateUser: `${url}/api/users`,
  apiLogin: `${url}/api/login`,
  apiUser: `${url}/api/users/me`,
  apiUserReview: `${url}/api/users/review`,
  apiAllUser: `${url}/api/users`,
  apiDeleteUser: `${url}/api/users`,
  apiUpdateUser: `${url}/api/users`,
  apiAuthorizeAccount: `${url}/api/admin/users`,

  // tạo danh sách ẩm thực theo tỉnh thành
  apiCreateCuisine: `${url}/api/cuisine`,
  apiGetCuisineDetail: `${url}/api/cuisine`,
  aipGetAllCuisinePage: `${url}/api/cuisine`,
  apiGetAllCuisine: `${url}/api/cuisine/all`,
  apiGetFoodByRegion: `${url}/api/cuisine`,
  apiGetFoodById: `${url}/api/cuisine/food`,
  apiDeleteCuisineByFoodId: `${url}/api/cuisine`,
  apiUpdateCuisineByFoodId: `${url}/api/cuisine`,
  apiGetCuisineSearch: `${url}/api/cuisine/search`,

  // api lộ trình du lịch
  apiCreateTravelItinerary: `${url}/api/itineraries`,
  apiGetTotalItinerary: `${url}/api/itineraries`,
  apiGetTravelItineraryByProvinceName: `${url}/api/itineraries`,
  apiDeleteItineraryById: `${url}/api/itineraries`,
  apiUpdateItineraryById: `${url}/api/itineraries`,

  // api tin tức (news)
  apiGetNewsByCategoryNews: `${url}/api/news`,
  apiGetNewsById: `${url}/api/news/detail`,
  apiCreateNews: `${url}/api/news`,
  apiDeleteNews: `${url}/api/news`,
  apiUpdateNews: `${url}/api/news`,

  // api hotels
  apiGetHotelByProvince: `${url}/api/hotels`,
  apiGetHotelDetailByName: `${url}/api/hotels/detail`,
  apiGetStatisticHotel: `${url}/api/admin/hotels`,
  apiGetProvinceHotel: `${url}/api/hotel-provinces`,
  apiGetSearchHotel: `${url}/api/search/hotels`,
  apiUpdateHotelByNameAndProvince: `${url}/api/hotels`,
  apiDeleteHotel: `${url}/api/hotels`,
  apiAddHotel: `${url}/api/hotel`,
  apiUpdateHotel: `${url}/api/hotel`,

  // chatbot Ai
  apiCreateChats: `${url}/api/chats`,
  apiGetChats: `${url}/api/chats`,
  apiDeleteChats: `${url}/api/chats`,

  // api destination
  apiGetDestinations: `${url}/api/destinations`,
  apiGetDestinationsV2: `${url}/api/v2/destinations`,
  apiGetDestinationByName: `${url}/api/destinations`,
  apiAddDestination: `${url}/api/destination`,
  apiUpdateDestination: `${url}/api/destination`,
  apiDeleteDestination: `${url}/api/destination`,
  apiUpdateDestinationReview: `${url}/api/destination/review`,

  // api restaurant
  apiGetRestaurants: `${url}/api/restaurants`,
  apiGetRestaurantById: `${url}/api/restaurant`,
  apiAddRestaurant: `${url}/api/restaurant`,
  apiUpdateRestaurant: `${url}/api/Restaurant`,
  apiDeleteRestaurant: `${url}/api/Restaurant`,
  apiUpdateRestaurantReview: `${url}/api/restaurant/review`,

  //api map
  apiGetLocationViewport: `${url}/api/map/viewport`,
  apiGetLocationNearby: `${url}/api/map/nearby`,

  // api review
  apiGetReviewByNameplateSlug: `${url}/api/review`,
  apiPostReview: `${url}/api/review`,
};
