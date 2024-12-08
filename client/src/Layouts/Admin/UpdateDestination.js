import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import UploadDesResImages from "../../uploads/UploadDesResImages";
import { toast } from "react-toastify";
import { UpdateApi } from "../../API/UpdateApi";

const UpdateDestination = ({
  dataDestination,
  closeModal,
  renderUI,
  setRenderUI,
}) => {
  const [name, setName] = useState(dataDestination.name || "");
  const [category, setCategory] = useState(
    dataDestination.category || "Điểm du lịch"
  );
  const [description, setDescription] = useState(
    dataDestination.description || ""
  );

  const [images, setImages] = useState(dataDestination.images || []);
  const [address, setAddress] = useState(
    dataDestination.location?.address || ""
  );
  const [type, setType] = useState(dataDestination.location?.type || "Point");
  const [coordinates, setCoordinates] = useState(
    dataDestination.location?.coordinates.join(", ") || ""
  );
  const [opening_hours, setOpening_hours] = useState(
    dataDestination.opening_hours || { open: "", close: "" }
  );
  const [entryFee, setEntryFee] = useState(dataDestination.entryFee || "");
  const [activities, setActivities] = useState(
    dataDestination.activities?.join(", ") || ""
  );

  useEffect(() => {
    // Pre-fill the form if dataDestination changes
    if (dataDestination) {
      setName(dataDestination.name || "");
      setCategory(dataDestination.category || "Điểm du lịch");
      setDescription(dataDestination.description || "");
      setImages(dataDestination.images || []);
      setAddress(dataDestination.location?.address || "");
      setType(dataDestination.location?.type || "Point");
      setCoordinates(dataDestination.location?.coordinates.join(", ") || "");
      setOpening_hours(
        dataDestination.opening_hours || { open: "00:00", close: "23:59" }
      );
      setEntryFee(dataDestination.entryFee || "");
      setActivities(dataDestination.activities?.join(", ") || "");
    }
  }, [dataDestination]);

  const handleUpdateDestination = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Vui lòng nhập tên điểm đến");
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
        entryFee,
        activities: activities.split(",").map((activity) => activity.trim()),
      };

      console.log("Data sent to backend:", data);

      //
      await UpdateApi.apiUpdateDestination(
        dataDestination._id,
        data,
        renderUI,
        setRenderUI
      );
      closeModal(false);
      setRenderUI((prev) => !prev);
    } catch (error) {
      toast.error("Lỗi khi cập nhật địa điểm");
      console.error("Error updating destination:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateDestination}>
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
          folderName="DestinationImages"
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
        <label className="font-semibold mb-2 block">Phí vào cổng:</label>
        <TextField
          value={entryFee}
          onChange={(e) => setEntryFee(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập phí vào cổng..."
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Hoạt động:</label>
        <TextField
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập các hoạt động (ngăn cách bằng dấu phẩy)..."
        />
      </div>

      <Button
        type="submit"
        className="bg-bgPrimary w-[50%] mx-auto mt-6 h-[50px] rounded-lg font-semibold text-white leading-[50px]"
      >
        Cập Nhật Địa điểm
      </Button>
    </form>
  );
};

export default UpdateDestination;
