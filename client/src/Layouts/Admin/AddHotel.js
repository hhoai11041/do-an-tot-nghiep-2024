import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import UploadDesResImages from "../../uploads/UploadDesResImages";
import { toast } from "react-toastify";
import slugify from "react-slugify";
import { postApi } from "../../API/PostApi";

const AddHotel = ({ province, closeModal, renderUI, setRenderUI }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Khách sạn");
  const [image, setImage] = useState("");
  const [stars, setStars] = useState(0);
  const [reviewScore, setReviewScore] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [numberOfReview, setNumberOfReview] = useState(0);
  const [facilities, setFacilities] = useState("");
  const [infoHotel, setInfoHotel] = useState("");
  const [listIntroduce, setListIntroduce] = useState("");
  const [urlMap, setUrlMap] = useState("");
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [],
    address: "",
  });
  const [imageDetails, setImageDetails] = useState([]);

  const handleAddHotel = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Vui lòng nhập tên khách sạn");
      return;
    }

    if (!imageDetails) {
      toast.error("Vui lòng tải lên hình ảnh");
      return;
    }

    const coordinatesArray =
      typeof location.coordinates === "string"
        ? location.coordinates.split(",").map((val) => parseFloat(val.trim()))
        : location.coordinates;

    // Kiểm tra tính hợp lệ của tọa độ
    if (
      !location.address ||
      !Array.isArray(coordinatesArray) ||
      coordinatesArray.length !== 2 ||
      coordinatesArray.some((coord) => isNaN(coord))
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin vị trí");
      return;
    }

    const data = {
      provinceName: province,
      provinceSlug: slugify(province),
      name,
      category,
      image: `url('${imageDetails[0]}')`,
      stars,
      reviewScore,
      reviewText,
      numberOfReview,
      facilities: facilities.split(",").map((facility) => facility.trim()),
      infoHotel: infoHotel.split("\n").map((info) => info.trim()),
      listIntroduce: listIntroduce.split("\n").map((intro) => intro.trim()),
      urlMap,
      location: {
        ...location,
        coordinates: coordinatesArray,
      },
      imageDetails,
    };

    try {
      // Gọi API để thêm khách sạn
      await postApi.apiAddHotel(data);
      closeModal(false);
      setRenderUI((prev) => !prev);
    } catch (error) {
      toast.error("Lỗi khi thêm khách sạn");
      console.error("Error adding hotel:", error);
    }
  };

  return (
    <form onSubmit={handleAddHotel}>
      <div className="mb-4">
        <label className="font-semibold mb-2 block">Tên khách sạn:</label>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập tên khách sạn..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Hình ảnh :</label>
        <UploadDesResImages
          setUrls={setImageDetails}
          folderName="HotelImages"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Địa chỉ:</label>
        <TextField
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
          fullWidth
          variant="outlined"
          placeholder="Nhập địa chỉ..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Tọa độ:</label>
        <TextField
          value={location.coordinates}
          onChange={(e) =>
            setLocation({ ...location, coordinates: e.target.value })
          }
          fullWidth
          variant="outlined"
          placeholder="Nhập tọa độ (Kinh độ, vĩ độ)..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Các tiện nghi:</label>
        <TextField
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập tiện nghi (ngăn cách bằng dấu phẩy)..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Thông tin khách sạn:</label>
        <textarea
          value={infoHotel}
          onChange={(e) => setInfoHotel(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded"
          placeholder="Nhập thông tin khách sạn"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Thông tin khách sạn:</label>
        <textarea
          value={listIntroduce}
          onChange={(e) => setListIntroduce(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded"
          placeholder="Nhập giới thiệu khách sạn (mỗi dòng một thông tin)..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">URL Bản đồ:</label>
        <TextField
          value={urlMap}
          onChange={(e) => setUrlMap(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập URL bản đồ..."
        />
      </div>

      <Button
        type="submit"
        className="bg-bgPrimary w-[50%] mx-auto mt-6 h-[50px] rounded-lg font-semibold text-white leading-[50px]"
      >
        Thêm Khách sạn
      </Button>
    </form>
  );
};

export default AddHotel;
