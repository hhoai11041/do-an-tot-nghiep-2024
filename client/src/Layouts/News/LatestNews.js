import React from "react";
import { NavLink } from "react-router-dom";
import { convertDateTime } from "../../Components/ConvertDateTime";
import { loadingApp } from "../../Components/Loading";

const LatestNews = ({ dataThroughPicture, dataNewsEvent }) => {
  const dataLatestNews =
    dataThroughPicture && dataThroughPicture[dataThroughPicture.length - 1];

  return (
    <div>
      {!dataLatestNews ? (
        loadingApp.skeletonLatestNews()
      ) : (
        <div className="screenLarge:flex desktop:flex laptop:flex justify-between gap-6">
          <div className="screenLarge:w-[40%] desktop:w-[40%] laptop:w-[40%] shadow-lg dark:border-gray-700 dark:border p-4 rounded-md screenLarge:h-[75vh] desktop:h-[75vh] laptop:h-[75vh] mb-4 overflow-hidden">
            <NavLink to={`/news/${dataLatestNews?._id}`}>
              <img
                src={dataLatestNews?.imageNews}
                alt=""
                className="w-full screenLarge:h-[57vh] desktop:h-[57vh] laptop:h-[57vh] rounded-lg"
                loading="lazy"
              />
              <h2 className="mt-2 font-bold text-lg">
                {dataLatestNews?.titleNews}
              </h2>
              <em className="mt-2 block">
                Ngày đăng: {convertDateTime(dataLatestNews?.createdAt)}
              </em>
            </NavLink>
          </div>
          <div className="screenLarge:w-[60%] desktop:w-[60%] laptop:w-[60%] screenLarge:h-[75vh] desktop:h-[75vh] laptop:h-[75vh] tablet:h-[75vh] grid screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 mobile:grid-cols-1 gap-4">
            {dataNewsEvent?.slice(-4).map((item, index) => (
              <div
                key={index}
                className="shadow-lg px-4 py-2 border dark:border-gray-700 rounded-md overflow-hidden pb-10 hover:scale-105 transition-all"
              >
                <NavLink to={`/news/${item._id}`}>
                  <img
                    src={item.imageNews}
                    alt=""
                    className="w-full screenLarge:h-[60%] desktop:h-[60%] laptop:h-[60%] tablet:h-[60%] rounded-md object-cover"
                    loading="lazy"
                  />
                  <h2 className="mt-3 font-semibold h-[50px] flex items-center">
                    {item.titleNews}
                  </h2>
                  <em className="my-1 block text-sm">
                    <span className="font-semibold">Ngày đăng: </span>
                    {convertDateTime(item.createdAt)}
                  </em>
                  <p
                    className="line-clamp-1 mt-1 overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  ></p>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestNews;
