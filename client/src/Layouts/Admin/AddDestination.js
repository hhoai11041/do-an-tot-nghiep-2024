import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import UploadDesResImages from "../../uploads/UploadDesResImages";
import { toast } from "react-toastify";
import { postApi } from "../../API/PostApi";

const AddDestination = ({ closeModal, renderUI, setRenderUI }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Điểm du lịch");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [type, setType] = useState("Point");
  const [coordinates, setCoordinates] = useState([]);
  const [opening_hours, setOpening_hours] = useState({ open: "", close: "" });
  const [entryFee, setEntryFee] = useState("");
  const [activities, setActivities] = useState("");

  function normalizeData(input) {
    return {
      name: input.name || "",
      category: input.category || "Điểm du lịch",
      description: input.description || "",
      images: input.images || [],
      location: {
        type: input.location?.type || "Point",
        coordinates: [
          parseFloat(input.location.coordinates[0]),
          parseFloat(input.location.coordinates[1]),
        ] || [0, 0],
        address: input.location?.address || "Không rõ",
      },
      opening_hours: {
        open: input.opening_hours?.open || "00:00",
        close: input.opening_hours?.close || "23:59",
      },
      entryFee: input.entryFee || "Miễn phí",
      activities: input.activities || [],
    };
  }

  const handleAddDestination = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Vui lòng nhập tên điểm đến");
      return;
    }

    const coordinatesArray =
      typeof coordinates === "string"
        ? coordinates.split(",").map((val) => parseFloat(val.trim()))
        : coordinates;

    // Kiểm tra tính hợp lệ của tọa độ
    if (
      !address ||
      !Array.isArray(coordinatesArray) ||
      coordinatesArray.length !== 2 ||
      coordinatesArray.some((coord) => isNaN(coord))
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin vị trí");
      return;
    }

    if (coordinates[0] < -180 || coordinates[0] > 180) {
      toast.error("Kinh độ phải nằm trong khoảng từ -180 đến 180");
      return;
    }
    if (coordinates[1] < -90 || coordinates[1] > 90) {
      toast.error("Vĩ độ phải nằm trong khoảng từ -90 đến 90");
      return;
    }

    // Kiểm tra xem images có phải là mảng và có ít nhất 1 tệp không
    if (!images || images.length === 0) {
      toast.error("Vui lòng chọn hình ảnh để tải lên.");
      return;
    }

    try {
      // Create the destination data with the uploaded image URLs
      const data = {
        name,
        category,
        description,
        images,
        location: {
          type,
          coordinates: coordinatesArray,
          address,
        },
        opening_hours,
        entryFee,
        activities: activities.split(",").map((activity) => activity.trim()),
      };

      console.log("Data sent to backend:", normalizeData(data));

      await postApi.apiAddDestination(normalizeData(data));
      closeModal(false);
      setRenderUI((prev) => !prev);
    } catch (error) {
      toast.error("Lỗi khi thêm địa điểm");
      console.error("Error adding destination:", error);
    }
  };

  return (
    <form onSubmit={handleAddDestination}>
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
        <label className="font-semibold mb-2 block">Tọa độ:</label>
        <TextField
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Nhập tọa độ...(Kinh độ, vĩ độ)"
        />
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
        Thêm Địa điểm
      </Button>
    </form>
  );
};

export default AddDestination;
