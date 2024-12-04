import React, { useEffect, useState } from "react";
import { getApi } from "../../API/GetApi";
import { Pagination, Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink } from "react-router-dom";
import Button from "../../Components/Button";
import Star from "../../Components/Star";
import NotFoundData from "../../Components/NotFoundData";

const provinceMap = {
  "ha-noi": "Hà Nội",
  "ho-chi-minh": "Hồ Chí Minh",
  "da-nang": "Đà Nẵng",
  "hai-phong": "Hải Phòng",
  "can-tho": "Cần Thơ",
  "bac-ninh": "Bắc Ninh",
  "bac-giang": "Bắc Giang",
  "bac-kan": "Bắc Kạn",
  "bac-lieu": "Bạc Liêu",
  "ben-tre": "Bến Tre",
  "binh-duong": "Bình Dương",
  "binh-dinh": "Bình Định",
  "binh-phuoc": "Bình Phước",
  "binh-thuan": "Bình Thuận",
  "ca-mau": "Cà Mau",
  "cao-bang": "Cao Bằng",
  "dak-lak": "Đắk Lắk",
  "dak-nong": "Đắk Nông",
  "dien-bien": "Điện Biên",
  "dong-nai": "Đồng Nai",
  "dong-thap": "Đồng Tháp",
  "gia-lai": "Gia Lai",
  "ha-giang": "Hà Giang",
  "ha-nam": "Hà Nam",
  "ha-tinh": "Hà Tĩnh",
  "hai-duong": "Hải Dương",
  "hau-giang": "Hậu Giang",
  "hoa-binh": "Hòa Bình",
  "hung-yen": "Hưng Yên",
  "khanh-hoa": "Khánh Hòa",
  "kien-giang": "Kiên Giang",
  "kon-tum": "Kon Tum",
  "lai-chau": "Lai Châu",
  "lang-son": "Lạng Sơn",
  "lao-cai": "Lào Cai",
  "lam-dong": "Lâm Đồng",
  "long-an": "Long An",
  "nam-dinh": "Nam Định",
  "nghe-an": "Nghệ An",
  "ninh-binh": "Ninh Bình",
  "ninh-thuan": "Ninh Thuận",
  "phu-tho": "Phú Thọ",
  "phu-yen": "Phú Yên",
  "quang-binh": "Quảng Bình",
  "quang-nam": "Quảng Nam",
  "quang-ngai": "Quảng Ngãi",
  "quang-ninh": "Quảng Ninh",
  "quang-tri": "Quảng Trị",
  "soc-trang": "Sóc Trăng",
  "son-la": "Sơn La",
  "tay-ninh": "Tây Ninh",
  "thai-binh": "Thái Bình",
  "thai-nguyen": "Thái Nguyên",
  "thanh-hoa": "Thanh Hóa",
  "thua-thien-hue": "Thừa Thiên Huế",
  "tien-giang": "Tiền Giang",
  "tra-vinh": "Trà Vinh",
  "tuyen-quang": "Tuyên Quang",
  "vinh-long": "Vĩnh Long",
  "vinh-phuc": "Vĩnh Phúc",
  "yen-bai": "Yên Bái",
  "an-giang": "An Giang",
  "nha-trang": "Nha Trang",
};

const SearchDestination = ({ slugProvince }) => {
  const [destinations, setDestinations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const convertToSlug = (name) => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

  const fullProvinceName = provinceMap[slugProvince] || slugProvince;

  const fetchDestinations = () => {
    setLoading(true);
    getApi.apiGetDestinations(
      setDestinations,
      setLoading,
      currentPage,
      setTotalPages,
      fullProvinceName,
      "",
      9
    );
  };

  useEffect(() => {
    fetchDestinations();
  }, [fullProvinceName, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [fullProvinceName]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from(new Array(9)).map((_, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg bg-gray-100 shadow-lg"
            >
              <Skeleton
                variant="rectangular"
                height={150}
                className="rounded-t-lg"
              />
              <div className="px-4 py-2 h-[50%] flex flex-col justify-between">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="90%" />
              </div>
            </div>
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <p className="text-center text-lg font-semibold">
          <NotFoundData></NotFoundData>
        </p>
      ) : (
        <div>
          <div className="grid screenLarge:grid-cols-3 desktop:grid-cols-3 laptop:grid-cols-3 tablet:grid-cols-2 gap-4">
            {destinations.map((destination, index) => (
              <div
                key={destination._id}
                className="flex flex-col rounded-lg bg-gray-100 shadow-lg"
              >
                <img
                  src={destination.images[0]}
                  alt={destination.name}
                  className="h-[50%] w-full object-cover object-center rounded-t-lg"
                  loading="lazy"
                />
                <div className="px-4 py-2 h-[50%] flex flex-col justify-between dark:text-black dark:border-gay-700 dark:border dark:rounded-md">
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star value={destination?.rating.toFixed(1)}></Star>
                    <div className="bg-green-600 w-16 text-center rounded-lg py-1 text-white font-bold">
                      {destination?.rating.toFixed(1)}
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      ({destination?.rating_count} lượt đánh giá)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <LocationOnIcon />
                    <p>{destination.location.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <NavLink
                      to={{
                        pathname: "/map-location",
                      }}
                      state={{ selectedMarker: destination }}
                      className="bg-blue-600 py-2 rounded-lg text-white text-center hover:opacity-80 transition-alls"
                    >
                      Xem bản đồ
                    </NavLink>
                    <Button
                      to={`/destination/detail/${convertToSlug(
                        destination.name
                      )}`}
                      className=" bg-bgPrimary py-2 rounded-lg text-white"
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Stack spacing={2} className="mb-4">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="secondary"
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDestination;
