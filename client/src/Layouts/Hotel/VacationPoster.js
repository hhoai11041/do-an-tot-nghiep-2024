import React from "react";
import { NavLink } from "react-router-dom";
import slugify from "react-slugify";
const listVacation = [
  {
    id: 1,
    image:
      "https://cf2.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=",
    provinceName: "TP. Hồ Chí Minh",
  },
  {
    id: 2,
    image:
      "https://cf2.bstatic.com/xdata/images/city/600x600/688956.jpg?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=",
    provinceName: "Vũng Tàu",
  },
  {
    id: 3,
    image:
      "https://cf2.bstatic.com/xdata/images/city/600x600/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o=",
    provinceName: "Đà Lạt",
  },
  {
    id: 4,
    image:
      "https://ezcloud.vn/wp-content/uploads/2019/08/Gioi-thieu-doi-net-ve-lich-su-chua-mot-cot-ha-noi-01.jpg",
    provinceName: "Hà Nội",
  },
  {
    id: 5,
    image:
      "https://cf2.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=",
    provinceName: "Đà Nẵng",
  },
];

const VacationPoster = ({ title, desc }) => {
  return (
    <div className="mb-[64px] mt-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-xl">{desc}</p>
      <div>
        <div className="screenLarge:grid screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 mobile:grid mobile:grid-cols-1 screenLarge:gap-x-8 desktop:gap-x-8 laptop:gap-x-8 mobile:gap-8 mt-8">
          {listVacation.slice(0, 2).map((item) => (
            <NavLink
              key={item.id}
              to={`/hotel/searchResults/${slugify(item.provinceName)}`}
            >
              <div className="rounded-lg overflow-hidden relative screenLarge:hover:scale-105 desktop:hover:scale-105 laptop:hover:scale-105 transition-all h-[35vh] cursor-pointer">
                <img src={item.image} alt="" className="w-full h-full" />
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute w-full top-5 px-6 flex items-center gap-3">
                  <h2 className="text-[25px] font-bold text-white">
                    {item.provinceName}
                  </h2>
                  <img
                    src="https://cdn.pixabay.com/photo/2012/04/10/23/04/vietnam-26834_640.png"
                    alt=""
                    className="w-[50px] h-[30px]"
                  />
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="col-span-2 screenLarge:grid screenLarge:grid-cols-3 desktop:grid-cols-3 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid mobile:grid-cols-1 gap-8 mt-6">
          {listVacation.slice(2).map((item) => (
            <NavLink
              key={item.id}
              to={`/hotel/searchResults/${slugify(item.provinceName)}`}
            >
              <div className="rounded-lg overflow-hidden relative screenLarge:hover:scale-105 desktop:hover:scale-105 laptop:hover:scale-105 transition-all h-[35vh] cursor-pointer">
                <img src={item.image} alt="" className="w-full h-full" />
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute w-full top-5 px-6 flex items-center gap-3">
                  <h2 className="text-[25px] font-bold text-white">
                    {item.provinceName}
                  </h2>
                  <img
                    src="https://cdn.pixabay.com/photo/2012/04/10/23/04/vietnam-26834_640.png"
                    alt=""
                    className="w-[50px] h-[30px]"
                  />
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VacationPoster;
