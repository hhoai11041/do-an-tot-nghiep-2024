import { faCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { Pagination, Rating, Stack } from "@mui/material";
import { getApi } from "../../API/GetApi";
import { loadingApp } from "../../Components/Loading";
import NotFoundData from "../../Components/NotFoundData";
import { NavLink } from "react-router-dom";

const HotelItem = ({ province, numberStars }) => {
  const [data, setData] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    getApi.getApiHotelsByProvince(
      setData,
      province,
      setLoading,
      numberPage,
      numberStars,
      setTotalPages
    );
  }, [province, numberPage, numberStars]);

  const handlePageChange = (event, value) => {
    setNumberPage(value);
  };

  return (
    <div>
      <div>
        {loading ? (
          loadingApp.skeletonHotel()
        ) : data.length > 0 ? (
          data.map((item) => (
            <div
              className="dark:border-gray-700 dark:border screenLarge:flex desktop:flex laptop:flex tablet:flex gap-6 border shadow-lg rounded-md mb-6"
              key={item.id}
            >
              <div className="screenLarge:w-[40%] desktop:w-[40%] laptop:w-[40%] tablet:w-[40%]">
                <img
                  src={item.image.replace("url('", "").replace("')", "")}
                  alt=""
                  className="screenLarge:w-full screenLarge:h-[250px] desktop:w-full desktop:h-[250px] laptop:w-full laptop:h-[250px] tablet:w-full tablet:h-[250px] mobile:w-full mobile:h-[200px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className=" screenLarge:w-[60%] desktop:w-[60%] laptop:w-[60%] tablet:w-[60%] screenLarge:mx-0 desktop:mx-0 laptop:mx-0 tablet:mx-0 mobile:mx-6 py-4">
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Rating name="read-only" value={item.stars} readOnly />
                  <div className="bg-green-600 w-16 text-center rounded-lg py-1 text-white font-bold">
                    {item.stars?.toFixed(1)}
                  </div>
                  <p className="text-green-600 font-semibold">
                    ({item.numberOfReview} lượt đánh giá)
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <p>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </p>
                  <p className="line-clamp-1">{item.location.address}</p>
                </div>
                <div className="flex items-center flex-wrap gap-4 mt-4">
                  {item.listIntroduce.slice(0, 3).map((list, index) => (
                    <div
                      className="flex items-center gap-2 px-2 py-1 rounded-lg border bg-blue-100 dark:text-black"
                      key={index}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                      <p className="font-semibold">{list}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <NavLink
                    to={{
                      pathname: "/map-location",
                    }}
                    state={{ selectedMarker: item }}
                    className="screenLarge:w-[100px] desktop:w-[100px] laptop:w-[100px] tablet:w-[100px] mobile:w-[150px] bg-blue-600 py-2 rounded-lg text-white text-center hover:bg-blue-700 transition-all"
                  >
                    Xem bản đồ
                  </NavLink>
                  <Button
                    to={`/hotel/${province}/${item.name}`}
                    className="screenLarge:w-[100px] desktop:w-[100px] laptop:w-[100px] tablet:w-[100px] mobile:w-[150px] bg-bgPrimary py-2 rounded-lg text-white"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFoundData className="screenLarge:h-[65vh] desktop:h-[70vh]"></NotFoundData>
        )}

        {data.length > 0 && totalPages > 0 && (
          <div className="w-full flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                color="secondary"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelItem;
