import React, { useEffect, useState } from "react";
import NavAdmin from "../../Layouts/Admin/NavAdmin";
import HeaderAdmin from "../../Layouts/Admin/HeaderAdmin";
import AccountStatistics from "../../Layouts/Admin/dashboard/AccountStatistics";
import NewsStatistics from "../../Layouts/Admin/dashboard/NewsStatistics";
import DashboardStatistics from "../../Layouts/Admin/dashboard/DashboardStatistics";
import CuisineStatistics from "../../Layouts/Admin/dashboard/CuisineStatistics";
import DestinationStatistics from "../../Layouts/Admin/dashboard/DestinationStatistics";
import Cookies from "js-cookie";
import { getApi } from "../../API/GetApi";
import slugify from "react-slugify";
import HotelStatistics from "../../Layouts/Admin/dashboard/HotelStatistics";
const Dashboard = () => {
  // data account
  const [loading, setLoading] = useState(false);
  const [dataUsers, setDataUsers] = useState();
  const [dataNewsEvent, setDatNewsEvent] = useState();
  const [dataNewsTravelImg, setDataTravelImag] = useState();
  const [totalFood, setTotalFood] = useState();
  const [totalItinerary, setTotalItinerary] = useState();
  const [dataDestination, setDataDestination] = useState();
  const [totalDestination, setTotalDestination] = useState();
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (accessToken)
      getApi.getApiAllUser(accessToken, setDataUsers, setLoading);
  }, [accessToken]);

  const adminCount = dataUsers?.filter((user) => user.role === "admin").length;
  const customerCount = dataUsers?.filter(
    (user) => user.role === "customer"
  ).length;

  // data news
  const categoryNews1 = "Tin tức và sự kiện";
  const categoryNews2 = "Du lịch qua hình ảnh";
  useEffect(() => {
    if (accessToken) {
      getApi.getApiNewsByCategoryNews(
        setDatNewsEvent,
        slugify(categoryNews1),
        setLoading
      );
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      getApi.getApiNewsByCategoryNews(
        setDataTravelImag,
        slugify(categoryNews2),
        setLoading
      );
    }
  }, [accessToken]);
  const newsEventCount = dataNewsEvent?.length;
  const newsTravelImageCount = dataNewsTravelImg?.length;

  // data cuisine
  useEffect(() => {
    if (accessToken) {
      getApi.getApiTotalFood(setTotalFood);
    }
  }, [accessToken]);

  // data itinerary
  useEffect(() => {
    if (accessToken) {
      getApi.getApiTotalItinerary(setTotalItinerary);
    }
  }, [accessToken]);

  // data destination
  useEffect(() => {
    if (accessToken) {
      getApi.apiGetDestinationsV2(
        setDataDestination,
        setTotalDestination,
        setLoading
      );
    }
  }, [totalDestination, accessToken]);

  // hotels

  const [totalHotelItems, setTotalHotelItems] = useState();
  const [totalHotel, setTotalHotel] = useState();
  const [hotelStats, setHotelStats] = useState();
  useEffect(() => {
    getApi.getApiStatisticHotels(
      setTotalHotelItems,
      setTotalHotel,
      setHotelStats,
      setLoading
    );
  }, []);

  return (
    <div className="w-full h-[100vh] dark:bg-[#222437] overflow-y-scroll">
      <HeaderAdmin title="Dashboard"></HeaderAdmin>
      <NavAdmin></NavAdmin>
      <div className="w-full screenLarge:pl-[18%] desktop:pl-[21%] laptop:pl-[21%] mt-4 pr-4">
        <DashboardStatistics
          adminCount={adminCount}
          customerCount={customerCount}
          newsEventCount={newsEventCount}
          newsTravelImageCount={newsTravelImageCount}
          totalFood={totalFood}
          totalItinerary={totalItinerary}
          totalHotelItems={totalHotelItems}
          totalDestination={totalDestination}
        ></DashboardStatistics>
        <div className="flex gap-4">
          <AccountStatistics
            adminCount={adminCount}
            customerCount={customerCount}
          ></AccountStatistics>
          <NewsStatistics
            newsEventCount={newsEventCount}
            newsTravelImageCount={newsTravelImageCount}
          ></NewsStatistics>
        </div>
        <CuisineStatistics></CuisineStatistics>
        <DestinationStatistics
          data={dataDestination}
          count={totalDestination}
        ></DestinationStatistics>
        <HotelStatistics
          totalHotel={totalHotel}
          hotelStats={hotelStats}
        ></HotelStatistics>
      </div>
    </div>
  );
};

export default Dashboard;
