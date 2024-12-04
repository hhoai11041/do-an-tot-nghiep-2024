import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import UploadDesResImages from "../../uploads/UploadDesResImages";
import { toast } from "react-toastify";
import { UpdateApi } from "../../API/UpdateApi";
import slugify from "react-slugify";

const UpdateHotel = ({
  province,
  accessToken,
  dataHotel,
  closeModal,
  renderUI,
  setRenderUI,
}) => {
  const [name, setName] = useState(dataHotel.name || "");
  const [image, setImage] = useState(dataHotel.image || "");

  const [facilities, setFacilities] = useState(
    (dataHotel.facilities || []).join(", ")
  );
  const [infoHotel, setInfoHotel] = useState(
    (dataHotel.infoHotel || []).join("\n")
  );
  const [listIntroduce, setListIntroduce] = useState(
    (dataHotel.listIntroduce || []).join("\n")
  );
  const [urlMap, setUrlMap] = useState(dataHotel.urlMap || "");
  const [location, setLocation] = useState({
    type: dataHotel.location?.type || "Point",
    coordinates: dataHotel.location?.coordinates?.join(", ") || "",
    address: dataHotel.location?.address || "",
  });
  const [imageDetails, setImageDetails] = useState(
    dataHotel.imageDetails || []
  );

  useEffect(() => {
    if (dataHotel) {
      setName(dataHotel.name || "");
      setImage(dataHotel.image || "");
      setFacilities((dataHotel.facilities || []).join(", "));
      setInfoHotel((dataHotel.infoHotel || []).join("\n"));
      setListIntroduce((dataHotel.listIntroduce || []).join("\n"));
      setUrlMap(dataHotel.urlMap || "");
      setLocation({
        type: dataHotel.location?.type || "Point",
        coordinates: dataHotel.location?.coordinates?.join(", ") || "",
        address: dataHotel.location?.address || "",
      });
      setImageDetails(dataHotel.imageDetails || []);
    }
  }, [dataHotel]);

  const handleUpdateHotel = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Vui lòng nhập tên khách sạn");
      return;
    }

    if (!imageDetails) {
      toast.error("Vui lòng tải lên hình ảnh");
      return;
    }

    const coordinatesArray = location.coordinates
      .split(",")
      .map((val) => parseFloat(val.trim()));

    if (
      !location.address ||
      coordinatesArray.length !== 2 ||
      coordinatesArray.some((coord) => isNaN(coord))
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin vị trí");
      return;
    }

    const data = {
      name,
      image: `url('${imageDetails[0]}')`,
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
      await UpdateApi.apiUpdateHotel(accessToken, province, dataHotel.id, data);
      closeModal(false);
      setRenderUI((prev) => !prev);
    } catch (error) {
      toast.error("Lỗi khi cập nhật khách sạn");
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateHotel}>
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
          images={imageDetails}
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
        <label className="font-semibold mb-2 block">Giới thiệu:</label>
        <textarea
          value={listIntroduce}
          onChange={(e) => setListIntroduce(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded"
          placeholder="Nhập giới thiệu (mỗi dòng một thông tin)..."
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
        Cập Nhật Khách sạn
      </Button>
    </form>
  );
};

export default UpdateHotel;
