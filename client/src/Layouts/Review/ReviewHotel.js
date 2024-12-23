import React, { useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Avatar, Rating } from "@mui/material";

import { toast } from "react-toastify";

import slugify from "react-slugify";
import { getApi } from "../../API/GetApi";
import { postApi } from "../../API/PostApi";
import UploadDesResImages from "../../uploads/UploadDesResImages";
import { convertDateTime } from "../../Components/ConvertDateTime";
import Button from "../../Components/Button";
import ModalAdmin from "../../Configs/ModalAdmin";
import Star from "../../Components/Star";
import { UpdateApi } from "../../API/UpdateApi";


const dataSelectStar = [
  {
    id: 1,
    label: "Tất cả",
    value: "All",
  },
  {
    id: 2,
    label: (
      <span>
        1 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: "1",
  },

  {
    id: 3,
    label: (
      <span>
        2 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: "2",
  },
  {
    id: 4,
    label: (
      <span>
        3 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: "3",
  },
  {
    id: 5,
    label: (
      <span>
        4 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: "4",
  },

  {
    id: 6,
    label: (
      <span>
        5 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: "5",
  },
];

const ReviewHotel = ({ slug, slugProvince, setRender, render }) => {
  const [dataReviews, setDataReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("All");
  const [star, setStar] = useState(NaN);
  const [modalReview, setModalReview] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [renderUI, setRenderUI] = useState(false);
  const [dataUser, setDataUser] = useState(false);

  useEffect(() => {
    getApi.getApiUser(setDataUser);
  }, []);


  const handleChange = (event) => {
    setStar(Number(event.target.value));
    setSelected(event.target.value);
  };

  useEffect(() => {
    getApi.getApiReviewByNameplateSlug(
      setDataReview,
      slugify(slug),
      setLoading
    );
  }, [slug, renderUI]);

  const dataReviewsFilterStar = dataReviews?.filter((item) => {
    const starMatch = !isNaN(star) ? item.star === star : true;
    return starMatch;
  });

  useEffect(() => {
    if (dataReviews?.length > 0) {
      dataReviews.forEach((review) => {
        if (review.userId) {
          getApi.getApiUserById(review.userId, (userData) => {
            setUserDetails((prev) => ({
              ...prev,
              [review.userId]: userData,
            }));
          });
        }
      });
    }
  }, [dataReviews]);

  const updatedReviews = dataReviewsFilterStar?.map((item) => {
    const user = userDetails[item.userId] || {}; // Lấy thông tin người dùng từ userDetailsMap
    return {
      ...item,
      username: user.username,
      avatar: user.avatar,
    };
  });
  const totalStars =
    dataReviews?.length > 0
      ? dataReviews.reduce((sum, review) => sum + review.star, 0) /
        dataReviews.length
      : 0;

  // Phần đánh giá của du khách
  const [starReview, setStarReview] = useState(0);
  const [imageKeys, setImageKeys] = useState([]);
  const [comment, setComment] = useState("");

  const reviewText = React.useMemo(() => {
    switch (starReview) {
      case 0:
        return "Chưa có đánh giá";
      case 1:
        return "Rất tệ";
      case 2:
        return "Trung bình";
      case 3:
        return "Khá";
      case 4:
        return "Rất tốt";
      case 5:
        return "Tuyệt vời";
      default:
        return "Không xác định";
    }
  }, [starReview]);

  const handleSubmitReview = async () => {
    if (comment.trim() === "") {
      toast.error("Vui lòng nhập nội dung chia sẻ");
    }
    await postApi.apiAddReview(
      slug,
      slugify(slug),
      dataUser?._id,
      starReview,
      reviewText,
      comment,
      imageKeys,
      setRenderUI,
      renderUI
    );
    const newTotalStars =
      (totalStars * dataReviews.length + starReview) / (dataReviews.length + 1);

    UpdateApi.updateHotelByReviewHotel(
      slugProvince,
      slug,
      newTotalStars,
      dataReviews.length + 1
    );
    setRender(!render);
    setModalReview(false);
  };

  
  return (
    <div className="w-full mx-auto">
      <h1 className="text-center text-2xl font-bold uppercase text-textPrimary">
        Đánh giá gần đây
      </h1>

      <div className="bg-[#fef0ed] rounded-lg py-4 my-4 screenLarge:flex desktop:flex laptop:flex">
        <div className="screenLarge:w-[25%] desktop:w-[25%] laptop:w-[25%] tablet:w-[25%] flex flex-col justify-center text-center text-[22px] font-bold text-red-600 mb-4">
          <span className="">
            <span className="text-[35px]">{totalStars?.toFixed(1)}</span> trên
            5.0
          </span>
          <div className="w-full flex items-center justify-center mx-auto">
            <Star value={totalStars}></Star>
          </div>
        </div>
        <div className="select_reviews flex items-center justify-center flex-wrap gap-4 screenLarge:w-[75%] desktop:w-[75%] laptop:w-[75%] tablet:w-[75%]">
          {dataSelectStar &&
            dataSelectStar?.map((item, index) => (
              <div className="select_group" key={index}>
                <input
                  type="radio"
                  name="size"
                  id={item.id}
                  hidden
                  value={item.value}
                  onChange={handleChange}
                />
                <label
                  htmlFor={item.id}
                  className={`w-[100px] inline-block text-center py-1 px-2 leading-[30px] border screenLarge:text-[20px] desktop:text-[20px] laptop:text-[20px] tablet:text-[20px] mobile:text-[16px] font-medium cursor-pointer rounded-md ${
                    selected === item.value
                      ? "bg-bgPrimary border-orange-600 text-white"
                      : "border-green-600 dark:text-black"
                  }`}
                >
                  <span>{item.label}</span>
                </label>
              </div>
            ))}
        </div>
      </div>

      <div>
        {updatedReviews?.length === 0 && (
          <h1 className="text-gray-700 font-bold text-[20px] text-center mt-10 dark:text-textThemeUI">
            Không tìm thấy thông tin cho bài đánh giá chi tiết
          </h1>
        )}
      </div>

      {updatedReviews &&
        updatedReviews?.map((item, index) => (
          <div className="py-2" key={index}>
            <div className=" border-b-2 dark:border-b-gray-700">
              <div className="flex justify-start gap-3">
                <div className="">
                  <Avatar
                    alt={item.username}
                    src={item.avatar || "/static/images/avatar/1.jpg"}
                    sx={{ width: 60, height: 60 }}
                  />
                </div>
                <div className="text-gray-700 font-semibold dark:text-textThemeUI">
                  <h2 className="text-[18px] pb-1">{item.username}</h2>
                  <Star value={item.star}></Star>
                  <p className="pt-1">{item.evaluate}</p>
                  <p className="pt-1">{convertDateTime(item.createdAt)}</p>
                </div>
              </div>

              <div className="pt-3 pb-5 ml-[72px]">
                <p className="leading-7">{item.reviewContent}</p>

                <div className="flex items-center gap-3 mt-3">
                  {item.reviewImages?.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt=""
                      className="w-[100px] h-[100px] rounded-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

      {dataUser && (
        <div className="mt-10">
          <Button
            className="bg-bgPrimary h-[50px] leading-[50px] w-[50%] mx-auto rounded-md text-white font-semibold uppercase text-xl"
            onClick={() => setModalReview(true)}
          >
            Đánh giá của bạn
          </Button>
        </div>
      )}

      {/* modal đánh giá  */}
      <ModalAdmin
        openModal={modalReview}
        setOpenModal={setModalReview}
        children={
          <div>
            <h2 className="text-center text-textPrimary text-2xl font-bold uppercase border-b-2 pb-4">
              Đánh giá
            </h2>
            <div className="mt-10">
              <div className="flex gap-4 items-center ">
                <strong className="text-lg">Đánh giá: </strong>
                <div>
                  <Rating
                    name="simple-uncontrolled"
                    size="large"
                    onChange={(event, newValue) => {
                      setStarReview(newValue);
                    }}
                  />
                </div>
              </div>
              <div className="mb-4 mt-6">
                <UploadDesResImages
                  setUrls={setImageKeys}
                  folderName="ReviewImages"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  rows="7"
                  class="block p-2.5 w-full text-lg text-gray-900 rounded-md focus:outline-none  focus:ring-green-800 focus:border-green-800 shadow-sm border border-gray-400"
                  placeholder="Hãy chia sẻ những trải nghiệm của bạn..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-6">
                <Button
                  className="bg-bgPrimary h-[50px] leading-[50px] w-[50%] mx-auto rounded-md text-white font-semibold uppercase text-xl"
                  onClick={handleSubmitReview}
                >
                  CHIA SẺ
                </Button>
              </div>
            </div>
          </div>
        }
        overlayOpacity="bg-opacity-70"
        className="screenLarge:w-[50%] desktop:w-[60%] desktop:h-[90vh] overflow-y-scroll laptop:w-[60%] tablet:w-[80%] tablet:h-[80vh] mobile:w-[95%] mobile:h-[80vh] bg-white px-7 py-10 rounded-sm reviewModal"
      />
    </div>
  );
};

export default ReviewHotel;
