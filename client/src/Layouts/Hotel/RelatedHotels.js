import { faCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getApi } from "../../API/GetApi";
import Button from "../../Components/Button";
import { Pagination, Rating, Stack } from "@mui/material";
import { loadingApp } from "../../Components/Loading";
import { NavLink } from "react-router-dom";
import NotFoundData from "../../Components/NotFoundData";

const RelatedHotels = ({ slugProvince, className }) => {
  const [data, setData] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();

  const handlePageChange = (event, value) => {
    setNumberPage(value);
  };

  useEffect(() => {
    getApi.getApiHotelsByProvince(
      setData,
      slugProvince,
      setLoading,
      numberPage,
      "",
      setTotalPages
    );
  }, [slugProvince, numberPage]);

  return (
    <div>
      <div>
        {loading ? (
          loadingApp.skeletonHotel()
        ) : (
          <div>
            {data.length > 0 ? (
              <div className={`${className}`}>
                {data.map((item) => (
                  <div
                    className="flex flex-col border dark:border dark:border-gray-700 shadow-lg rounded-md mb-4 pb-5 overflow-hidden"
                    key={item.id}
                  >
                    <div className="w-full">
                      <img
                        src={item.image.replace("url('", "").replace("')", "")}
                        alt=""
                        className="w-full h-[200px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-full px-4">
                      <h2 className="text-lg font-semibold mt-2 h-[70px]">
                        {item.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <Rating name="read-only" value={item.stars} readOnly />
                        <div className="bg-green-600 w-16 text-center rounded-lg py-1 text-white font-bold">
                          {item.stars?.toFixed(1)}
                        </div>
                        <p>({item?.numberOfReview} lượt đánh giá)</p>
                      </div>
                      <div className="flex gap-2 mt-2 ">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p className="line-clamp-2">{item.location?.address}</p>
                      </div>
                      <div className="flex items-center flex-wrap gap-4 mt-4">
                        {item.listIntroduce.slice(0, 1).map((list, index) => (
                          <div
                            className="flex items-center gap-2 px-2 py-1 rounded-lg border bg-blue-100 dark:text-black"
                            key={index}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                            <p className="font-semibold">{list}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <NavLink
                          to={{
                            pathname: "/map-location",
                          }}
                          state={{ selectedMarker: item }}
                          className="bg-blue-600 py-2 rounded-lg text-white text-center hover:bg-blue-700 transition-all"
                        >
                          Xem bản đồ
                        </NavLink>

                        <Button
                          to={`/hotel/${slugProvince}/${item.name}`}
                          className=" bg-bgPrimary py-2 rounded-lg text-white"
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NotFoundData></NotFoundData>
            )}
          </div>
        )}
      </div>

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
  );
};

export default RelatedHotels;
