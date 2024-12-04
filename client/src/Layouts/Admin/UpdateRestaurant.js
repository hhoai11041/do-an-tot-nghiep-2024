import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import UploadDesResImages from "../../uploads/UploadDesResImages";
import { toast } from "react-toastify";
import { UpdateApi } from "../../API/UpdateApi";

const UpdateRestaurant = ({
  accessToken,
  dataRestaurant,
  closeModal,
  renderUI,
  setRenderUI,
}) => {
  const [name, setName] = useState(dataRestaurant.name || "");
  const [category, setCategory] = useState(
    dataRestaurant.category || "Nhà hàng"
  );
  const [description, setDescription] = useState(
    dataRestaurant.description || ""
  );

  const [images, setImages] = useState(dataRestaurant.images || []);
  const [address, setAddress] = useState(
    dataRestaurant.location?.address || ""
  );
  const [type, setType] = useState(dataRestaurant.location?.type || "Point");
  const [coordinates, setCoordinates] = useState(
    dataRestaurant.location?.coordinates.join(", ") || ""
  );
  const [opening_hours, setOpening_hours] = useState(
    dataRestaurant.opening_hours || { open: "", close: "" }
  );
  const [utilities, setUtilities] = useState(
    dataRestaurant.utilities?.join(", ") || ""
  );

  useEffect(() => {
    // Pre-fill the form if dataRestaurant changes
    if (dataRestaurant) {
      setName(dataRestaurant.name || "");
      setCategory(dataRestaurant.category || "Nhà hàng");
      setDescription(dataRestaurant.description || "");
      setImages(dataRestaurant.images || []);
      setAddress(dataRestaurant.location?.address || "");
      setType(dataRestaurant.location?.type || "Point");
      setCoordinates(dataRestaurant.location?.coordinates.join(", ") || "");
      setOpening_hours(
        dataRestaurant.opening_hours || { open: "00:00", close: "23:59" }
      );
      setUtilities(dataRestaurant.utilities?.join(", ") || "");
    }
  }, [dataRestaurant]);

  const handleUpdateRestaurant = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Vui lòng nhập tên nhà hàng");
      return;
    }
    if (!address || !coordinates) {
      toast.error("Vui lòng nhập đầy đủ thông tin vị trí");
      return;
    }

    if (coordinates[1] < -90 || coordinates[1] > 90) {
      toast.error("Vĩ độ phải nằm trong khoảng từ -90 đến 90");
      return;
    }
    if (coordinates[0] < -180 || coordinates[0] > 180) {
      toast.error("Kinh độ phải nằm trong khoảng từ -180 đến 180");
      return;
    }

    // Kiểm tra xem images có phải là mảng và có ít nhất 1 tệp không
    if (!images || images.length === 0) {
      toast.error("Vui lòng chọn hình ảnh để tải lên.");
      return;
    }

    try {
      //
      const data = {
        name,
        category,
        description,
        images,
        location: {
          type,
          address,
          coordinates: coordinates
            .split(",")
            .map((val) => parseFloat(val.trim())),
        },
        opening_hours: opening_hours,
        utilities: utilities.split(",").map((activity) => activity.trim()),
      };

      //   console.log("Data sent to backend:", data);

      //
      await UpdateApi.apiUpdateRestaurant(
        accessToken,
        dataRestaurant._id,
        data,
        renderUI,
        setRenderUI
      );
      closeModal(false);
      setRenderUI((prev) => !prev);
    } catch (error) {
      toast.error("Lỗi khi cập nhật nhà hàng");
      console.error("Error updating Restaurant:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateRestaurant}>
      <div className="mb-4">
        <label className="font-semibold mb-2 block">Tên điểm đến:</label>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập tên điểm đến..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Mô tả:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded"
          placeholder="Nhập mô tả..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Hình ảnh:</label>
        <UploadDesResImages
          setUrls={setImages}
          images={images}
          folderName="RestaurantImages"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Địa chỉ:</label>
        <TextField
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập địa chỉ..."
        />
      </div>

      <div className="mb-4">
        <div>
          <label className="font-semibold mb-2 block">Tọa độ:</label>
          <TextField
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Nhập tọa độ...(Kinh độ, vĩ độ)"
          />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold mb-2 block">Giờ mở cửa:</label>
          <TextField
            value={opening_hours.open}
            onChange={(e) =>
              setOpening_hours({ ...opening_hours, open: e.target.value })
            }
            fullWidth
            variant="outlined"
            placeholder="Nhập giờ mở cửa..."
          />
        </div>
        <div>
          <label className="font-semibold mb-2 block">Giờ đóng cửa:</label>
          <TextField
            value={opening_hours.close}
            onChange={(e) =>
              setOpening_hours({ ...opening_hours, close: e.target.value })
            }
            fullWidth
            variant="outlined"
            placeholder="Nhập giờ đóng cửa..."
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Tiện ích:</label>
        <TextField
          value={utilities}
          onChange={(e) => setUtilities(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập các tiện ích (ngăn cách bằng dấu phẩy)..."
        />
      </div>

      <Button
        type="submit"
        className="bg-bgPrimary w-[50%] mx-auto mt-6 h-[50px] rounded-lg font-semibold text-white leading-[50px]"
      >
        Cập Nhật Nhà hàng
      </Button>
    </form>
  );
};

export default UpdateRestaurant;
