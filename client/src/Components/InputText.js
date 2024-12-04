import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { getApi } from "../API/GetApi";
import slugify from "react-slugify";

const dataAllSuggestions = [
  {
    id: 1,
    title:
      "Hà nội được bình chọn là thành phố ẩm thực hàng đầu thế giới năm 2024",
    img: "https://dulichvn.org.vn/nhaptin/uploads/images/2024/Thang10/1010Ha-Noi1.jpg",
    path: "/news/670fd62d2444b449940e3d92",
  },
];

const dataSuggest = [
  {
    id: 1,
    title: "Khách sạn Hà Nội",
    path: "/search/result/khách sạn Hà Nội",
  },
  {
    id: 2,
    title: "Bình Định",
    path: "/search/result/bình định",
  },
  {
    id: 3,
    title: "Nha Trang",
    path: "/search/result/Nha Trang",
  },
  {
    id: 4,
    title: "Đặc sản Bình Dương",
    path: "/search/result/Đặc sản Bình Dương",
  },
  {
    id: 5,
    title: "Du lịch Phan Thiết",
    path: "",
  },
  {
    id: 6,
    title: "Khách sạn Đà Nẵng",
    path: "/search/result/Khách sạn Đà Nẵng",
  },
];

const dataTopSearch = [
  {
    id: 1,
    img: "https://cdn1.ivivu.com/images/2023/06/02/15/vinpearl-nghe-an-resort-___58g6vu____horizontal-374x280.webp?o=png",
    title: "Melia Vinpearl Cửa Hội Beach Resort Nghệ An",
    desc: "Nghệ An",
    path: `/hotel/nghe-an/Melia Vinpearl Cửa Hội Beach Resort Nghệ An`,
  },
  {
    id: 2,
    img: "https://cdn1.ivivu.com/images/2023/10/30/14/478296776_vq41bm_t9nibj_-374x280.webp",
    title: "Khách sạn MerPerle",
    desc: "Đà Lạt",
    path: `/hotel/da-lat/Khách sạn MerPerle`,
  },
  {
    id: 3,
    img: "https://cdn1.ivivu.com/images/2023/05/08/17/5919770420817235071-n-cr___0hwqlo____horizontal-374x280.webp?o=png",
    title: "Khu Nghỉ Dưỡng An Lâm Retreats Saigon River",
    desc: "Hà Nội",
    path: `/hotel/ho-chi-minh/Khu Nghỉ Dưỡng An Lâm Retreats Saigon River`,
  },
  {
    id: 4,
    img: "https://firebasestorage.googleapis.com/v0/b/nodejsreactjsstoreimage.appspot.com/o/khoaLuan%2F8d77bab8-37ac-4d6a-b632-a224c6e08f6f.jpg?alt=media&token=3efc540a-310f-4f33-8280-570cc3eb9a74",
    title: "Trà sen Tây Hồ",
    desc: "Hà Nội",
    path: `/cuisine/detail/ha-noi/f5901420-d1bc-4120-b566-d966f777556f`,
  },
  {
    id: 5,
    img: "https://tse1.mm.bing.net/th?id=OIP.bOontVi_7WT-L90hAibm5QHaGI&pid=Api",
    title: "Ẩm thực miền Trung",
    desc: "Việt Nam",
    path: `/cuisine/all/trung-bo`,
  },
];

const convertToSlug = (name) => {
  return name.replace(/\s+/g, "-").toLowerCase();
};

const InputText = ({ placeholder, className }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

  // lọc dữ liệu và put vào mảng để tìm kiếm ẩm thực
  const [dataSearchCuisine, setDataSearchCuisine] = useState();
  const [dataCuisineFood, setDataCuisineFood] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApi.getApiAllCuisineByProvince(setDataSearchCuisine, setLoading);
  }, []);

  useEffect(() => {
    getApi.getApiAllCuisineSearch(setDataCuisineFood, setLoading);
  }, []);

  // lọc dữ liệu và tìm kiếm khách sạn
  const [dataSearchHotel, setDataSearchHotel] = useState();

  useEffect(() => {
    setLoading(true);
    getApi.getApiSearchHotel(setDataSearchHotel);
  }, []);

  // lọc dữ liệu và tìm kiếm địa điểm
  const [dataDestinations, setDataDestination] = useState();
  const [TotalDestination, setTotalDestination] = useState();

  useEffect(() => {
    setLoading(true);
    getApi.apiGetDestinationsV2(
      setDataDestination,
      setTotalDestination,
      setLoading
    );
  }, []);

  const mergedSuggestions = useMemo(() => {
    if (dataSearchCuisine && dataSearchHotel && dataDestinations) {
      // Tạo mảng với ẩm thực và khách sạn và địa điểm
      return [
        ...dataAllSuggestions,
        ...dataSearchCuisine.map((item, index) => ({
          img: item.imgRepresentative,
          title: `Ẩm thực ${item.provinceName}`,
          path: `/cuisine/all/${item.provinceSlug}`,
        })),
        ...dataCuisineFood.map((item, index) => ({
          img: item.imgFood,
          title: item.foodName,
          path: `/cuisine/detail/${item.provinceSlug}/${item.foodId}`,
        })),
        ...dataSearchHotel.hotels.map((item, index) => ({
          img: item.image.replace("url('", "").replace("')", ""),
          title: `Khách sạn ${item.name}`,
          path: `/hotel/${slugify(item.hotel)}/${item.name}`,
        })),
        ...dataDestinations.map((item, index) => ({
          img: item.images[0],
          title: `Địa điểm ${item.name}`,
          path: `/destination/detail/${convertToSlug(item.name)}`,
        })),
      ];
    }
  }, [dataSearchCuisine, dataSearchHotel, dataDestinations, dataCuisineFood]);

  // -------------------------------

  const handleSearch = (e) => {
    e.preventDefault();
    setFocus(false);
    navigate(`/search/result/${valueSearch}`);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setFocus(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (value.trim()) {
          const lowerCaseValue = value.toLowerCase();
          // Nếu người dùng nhập từ khóa "món ngon", luôn hiển thị các mục "ẩm thực"
          const suggestions = mergedSuggestions.filter(
            (item) =>
              lowerCaseValue.includes("món ngon") ||
              lowerCaseValue.includes("đặc sản") ||
              item.title.toLowerCase().includes(lowerCaseValue)
          );

          setFilteredSuggestions(suggestions);
        } else {
          setFilteredSuggestions([]);
        }
      }, 300),
    [mergedSuggestions]
  );

  useEffect(() => {
    debouncedSearch(valueSearch);
  }, [valueSearch]);

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-textPrimary">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`screenLarge:w-[60%] desktop:w-[60%] laptop:w-[60%] tablet:w-[45%] mobile:w-[95%] h-[40px] text-[16px] tablet:block screenLarge:block laptop:hidden desktop:block relative ${className}`}
      onBlur={handleBlur}
    >
      <form action="" onSubmit={handleSearch} className="w-full h-full">
        <input
          type="text"
          className="w-full h-full px-5 outline-none border rounded-xl focus:border-red-500 dark:bg-black dark:border-gray-700 dark:border"
          placeholder={placeholder}
          onFocus={handleFocus}
          onChange={(e) => setValueSearch(e.target.value)}
        />
      </form>

      {focus && !valueSearch && (
        <div
          className="screenLarge:w-[200%] screenLarge:h-[67vh] desktop:w-[300%] desktop:h-[69vh] laptop:w-[300%] laptop:h-[70vh] mobile:w-[100%] mobile:h-[100vh] tablet:w-[180%] tablet:h-[70vh] absolute screenLarge:left-0 desktop:left-0 laptop:left-0 tablet:left-[-45%] z-[50] top-12 rounded-lg shadow-lg bg-white dark:bg-bgThemeUI dark:border-gray-700 dark:border border p-4 screenLarge:pb-4 desktop:pb-4 laptop:pb-4 tablet:p-4  mobile:pb-40 overflow-y-scroll overflow-hidden search"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div>
            <h2 className="font-semibold">Phổ biến nhất</h2>
            <div className="grid screenLarge:grid-cols-4 desktop:grid-cols-4 laptop:grid-cols-4 mobile:grid-cols-2  w-full gap-x-6 gap-y-3 mt-4">
              {dataSuggest &&
                dataSuggest.map((item, index) => (
                  <div
                    onClick={() => navigate(item.path)}
                    key={index}
                    className="p-2 bg-slate-100 rounded-md cursor-pointer text-center hover:bg-bgPrimary hover:text-white transition-all dark:text-black dark:hover:text-white"
                  >
                    {item.title}
                  </div>
                ))}
            </div>
            <div className="grid screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 mobile:grid-cols-1 mt-6 gap-4">
              <div className="shadow-lg border dark:border-gray-700 dark:border rounded-lg p-4">
                <h2 className="topSearch">Top tìm kiếm</h2>
                <div>
                  {dataTopSearch &&
                    dataTopSearch.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => navigate(item.path, { replace: true })}
                        className="flex items-center gap-4 mt-4 hover:bg-slate-100 hover:text-black transition-all p-2 rounded-lg cursor-pointer"
                      >
                        <div className="relative overflow-hidden w-[80px] h-[50px] rounded-lg">
                          <img
                            src={item.img}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div
                            className={`absolute size-5 text-center leading-[20px] top-0 text-white text-[12px] font-semibold rounded-sm ${
                              index < 3 ? "bg-bgPrimary" : "bg-gray-400"
                            }`}
                          >
                            {item.id}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-[14px] font-semibold">
                            {item.title}
                          </h2>
                          <p className="text-gray-400 text-[12px] mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="shadow-lg border dark:border-gray-700 dark:border rounded-lg p-4">
                <h2 className="topSearch">Địa điểm xu hướng</h2>
                <div>
                  {dataDestinations &&
                    dataDestinations
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((item, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            navigate(
                              `/destination/detail/${convertToSlug(item.name)}`,
                              { replace: true }
                            )
                          }
                          className="flex items-center gap-4 mt-4 hover:bg-slate-100 hover:text-black transition-all p-2 rounded-lg cursor-pointer"
                        >
                          <div className="relative overflow-hidden w-[80px] h-[50px] rounded-lg">
                            <img
                              src={item.images[0]}
                              alt=""
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div
                              className={`absolute size-5 text-center leading-[20px] top-0 text-white text-[12px] font-semibold rounded-sm ${
                                index < 3 ? "bg-bgPrimary" : "bg-gray-400"
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <h2 className="text-[14px] font-semibold">
                              {item.name}
                            </h2>
                            <p className="text-gray-400 text-[12px] mt-1">
                              {item.location.address
                                .split(",")
                                [
                                  item.location.address.split(",").length - 1
                                ].trim()}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {focus && valueSearch && (
        <div
          className={`transition-all duration-300 ease-in-out search ${
            focus ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } screenLarge:w-[200%] screenLarge:h-[67vh] desktop:w-[300%] desktop:h-[69vh]  laptop:w-[300%] laptop:h-[70vh] absolute z-50 top-12 rounded-lg shadow-lg bg-white dark:bg-bgThemeUI dark:border-gray-700 dark:border border p-4 overflow-y-scroll`}
          onMouseDown={(e) => e.preventDefault()}
        >
          {focus && filteredSuggestions.length > 0 && (
            <div className="">
              {filteredSuggestions?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="p-2 hover:bg-gray-200 dark:hover:text-black dark:hover:bg-slate-300 rounded cursor-pointer"
                >
                  <div className="flex gap-4 items-center">
                    <div className="rounded-lg overflow-hidden w-[50px] h-[50px]">
                      <img
                        src={item.img}
                        alt=""
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) =>
                          (e.target.src =
                            "https://as1.ftcdn.net/v2/jpg/05/63/24/74/1000_F_563247400_sJXl2C1U1zPfNlCRy09bGRuTbibuCYUg.jpg")
                        }
                      />
                    </div>
                    <p>{highlightText(item.title, valueSearch)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputText;
