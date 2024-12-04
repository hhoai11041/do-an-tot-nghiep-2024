import React from "react";
import { NavLink } from "react-router-dom";
const dataFavoriteHotels = [
  {
    id: 1,
    provinceName: "Cần Thơ",
    path: "/hotel/searchResults/can-tho",
    img: "https://hotel84.com/hotel84-images/product/img1/muong-thanh-luxury-can-tho-.jpg",
  },
  {
    id: 2,
    provinceName: "Đà Nẵng",
    path: "/hotel/searchResults/da-nang",
    img: "https://cdn1.ivivu.com/iVivu/2024/05/09/16/da-nang.png",
  },
  {
    id: 3,
    provinceName: "Nha Trang",
    path: "/hotel/searchResults/nha-trang",
    img: "http://diamondbayhotel.com/FileStorage/Media/Video/Thumbnail/nha-trang.jpg",
  },
  {
    id: 4,
    provinceName: "Bình Định",
    path: "/hotel/searchResults/binh-dinh",
    img: "https://thiennhienmoitruong.vn/upload/images/btv/btv6.1/btv6.1.3/btv6.1b/thap-banh-it13200.jpg",
  },
  {
    id: 5,
    provinceName: "Lào cai",
    path: "/hotel/searchResults/lao-cai",
    img: "https://mediaim.expedia.com/destination/1/dcf9107c3efab0b84cc9a4014f4b7ae8.jpg?impolicy=fcrop&w=1040&h=580&q=mediumHigh",
  },
  {
    id: 6,
    provinceName: "Sơn La",
    path: "/hotel/searchResults/son-la",
    img: "https://ipc.sonla.gov.vn/DataFiles/2021/09/Files/20210920-110849-4iTqiRjp.jpg",
  },
  {
    id: 7,
    provinceName: "Nghệ An",
    path: "/hotel/searchResults/nghe-an",
    img: "https://statics.vinpearl.com/nghe-an-vietnam-4_1649076716.jpg",
  },
  {
    id: 8,
    provinceName: "Hà Tĩnh",
    path: "/hotel/searchResults/ha-tinh",
    img: "https://xdcs.cdnchinhphu.vn/446259493575335936/2022/11/10/hatinh-16680650547391780075228.jpg",
  },
];

const FavoriteHotel = () => {
  return (
    <div>
      <div className="h-full mb-10">
        <div className="">
          <div className=" flex items-center justify-between gap-8 mb-8">
            <div className="">
              <h1 className="text-2xl font-bold">
                Điểm đến yêu thích trong nước
              </h1>
              <p className="mt-2 text-xl">
                Lên rừng xuống biển trọn vẹn Việt Nam
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 screenLarge:grid-cols-4 laptop:grid-cols-3 desktop:grid-cols-3 desktop:gap-6 screenLarge:gap-8">
            {dataFavoriteHotels.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
              >
                <img
                  src={item.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                <span className="relative ml-5 mb-4 inline-block text-white  text-[25px] font-bold ">
                  {item.provinceName}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteHotel;
