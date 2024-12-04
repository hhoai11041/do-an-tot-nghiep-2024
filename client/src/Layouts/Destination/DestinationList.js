import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink } from "react-router-dom";
import Button from "../../Components/Button";
import Star from "../../Components/Star";
import { Skeleton } from "@mui/material";

const DestinationList = ({ destinations, loading }) => {
  const convertToSlug = (name) => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 screenLarge:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg bg-gray-100 shadow-lg"
          >
            <Skeleton variant="rectangular" height="50%" />
            <div className="px-4 py-2 h-[300px] flex flex-col justify-between">
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={20} width="50%" />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="rectangular" height={40} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="text-center text-gray-500 font-semibold screenLarge:text-2xl desktop:text-2xl laptop:text-2xl tablet:text-xl mobile:text-lg">
        Không tìm thấy dữ liệu
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 screenLarge:grid-cols-4 gap-6 dark:text-black">
      {destinations.map((destination, index) => {
        return (
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
            <div className="px-2 py-2 h-[50%] flex flex-col justify-between">
              <h3 className="text-lg font-semibold">{destination.name}</h3>
              <div className="flex items-center gap-2">
                <Star value={destination?.rating.toFixed(1)}></Star>
                <div className="bg-green-600 w-[50px] text-center rounded-lg py-1 text-white font-bold">
                  {destination?.rating.toFixed(1)}
                </div>
                <p className="ml-1 text-sm text-gray-500">
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
                  to={`/destination/detail/${convertToSlug(destination.name)}`}
                  className=" bg-bgPrimary py-2 rounded-lg text-white"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DestinationList;
