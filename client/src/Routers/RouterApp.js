import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Customer/Home";
import Introduce from "../Pages/Customer/Introduce";
import Help from "../Pages/Customer/Help";
import Hotel from "../Pages/Customer/Hotel";
import Destination from "../Pages/Customer/Destination";
import DestinationDetail from "../Pages/Customer/DestinationDetail";
import Cuisine from "../Pages/Customer/Cuisine";
// import NotFound404 from "../Pages/Customer/NotFound404";
import MapLocation from "../Pages/Customer/MapLocation";
import Dashboard from "../Pages/Admin/Dashboard";
import ManageDestination from "../Pages/Admin/ManageDestination";
import ManageRestaurant from "../Pages/Admin/ManageRestaurant";
import ManageAccount from "../Pages/Admin/ManageAccount";
import { getApi } from "../API/GetApi";
import useStore from "../Zustand/store";
import ManageCuisine from "../Pages/Admin/ManageCuisine";
import CuisineDetailFood from "../Pages/Customer/CuisineDetailFood";
import CuisineAll from "../Pages/Customer/CuisineAll";
import TravelItinerary from "../Pages/Customer/TravelItinerary";
import ManageTraveItinerary from "../Pages/Admin/ManageTraveItinerary";
import TravelItinerary_AI from "../Pages/Customer/TravelItinerary_AI";
import News from "../Pages/Customer/News";
import ManageNews from "../Pages/Admin/ManageNews";
import NewsDetail from "../Pages/Customer/NewsDetail";
import SearchResult from "../Pages/Customer/SearchResult";
import HotelDetails from "../Pages/Customer/HotelDetails";
import HotelInfoDetails from "../Layouts/Hotel/HotelInfoDetails";
import ManageHotel from "../Pages/Admin/ManageHotel";
import ChatbotAI from "../Pages/Customer/ChatbotAI";

const RouterApp = () => {
  const [dataUser, setDataUser] = useState();
  const { renderApp } = useStore();
  useEffect(() => {
    if(!dataUser) getApi.getApiUser(setDataUser);
  }, [renderApp]);

  return (
    <div>
      <Routes>
        {/* Router customer  */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/introduce" element={<Introduce></Introduce>}></Route>
        <Route path="/help" element={<Help></Help>}></Route>
        <Route path="/hotel" element={<Hotel></Hotel>}></Route>
        <Route
          path="/hotel/:slugProvince/:slug"
          element={<HotelInfoDetails></HotelInfoDetails>}
        ></Route>
        <Route
          path="/hotel/searchResults/:slug"
          element={<HotelDetails></HotelDetails>}
        ></Route>
        <Route
          path="/destination"
          element={<Destination></Destination>}
        ></Route>
        <Route
          path="/destination/detail/:slug"
          element={<DestinationDetail></DestinationDetail>}
        ></Route>
        <Route path="/cuisine" element={<Cuisine></Cuisine>}></Route>
        <Route
          path="/cuisine/all/:slug"
          element={<CuisineAll></CuisineAll>}
        ></Route>

        <Route
          path="/cuisine/detail/:provinceSlug/:foodId"
          element={<CuisineDetailFood></CuisineDetailFood>}
        />

        <Route
          path="/travelItinerary/AI"
          element={<TravelItinerary_AI></TravelItinerary_AI>}
        />
        <Route
          path="/travelItinerary/tham-khao"
          element={<TravelItinerary></TravelItinerary>}
        />
        <Route
          path="/map-location"
          element={<MapLocation></MapLocation>}
        ></Route>
        <Route path="/news" element={<News></News>}></Route>
        <Route path="/news/:slug" element={<NewsDetail></NewsDetail>}></Route>

        <Route
          path="/search/result/:slug"
          element={<SearchResult></SearchResult>}
        ></Route>

        <Route path="/chatbotAI" element={<ChatbotAI></ChatbotAI>}></Route>
      </Routes>
      {/* Router admin */}
      {dataUser?.role === "admin" && (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<Dashboard></Dashboard>}
          ></Route>
          <Route
            path="/admin/manage/destination"
            element={<ManageDestination></ManageDestination>}
          ></Route>
          <Route
            path="/admin/manage/restaurant"
            element={<ManageRestaurant></ManageRestaurant>}
          ></Route>
          <Route
            path="/admin/manage/account"
            element={<ManageAccount></ManageAccount>}
          ></Route>
          <Route
            path="/admin/manage/cuisine"
            element={<ManageCuisine></ManageCuisine>}
          ></Route>
          <Route
            path="/admin/manage/travelItinerary"
            element={<ManageTraveItinerary></ManageTraveItinerary>}
          ></Route>
          <Route
            path="/admin/manage/news"
            element={<ManageNews></ManageNews>}
          ></Route>
          <Route
            path="/admin/manage/hotels"
            element={<ManageHotel></ManageHotel>}
          ></Route>
        </Routes>
      )}
    </div>
  );
};

export default RouterApp;
