import React, { useState } from "react";
import QuillComponents from "../../Components/QuillComponents";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import slugify from "react-slugify";
import { postApi } from "../../API/PostApi";

const AddTraveItinerary = ({
  province,
  regional,
  userCreate,
  accessToken,
  closeModal,
  renderUI,
  setRenderUI,
}) => {
  const [valueContent, setValueContent] = useState("");
  const [valueTimeTrip, setValueTimeTrip] = useState("");

  const submitAddCuisine = (e) => {
    e.preventDefault();
    if (!valueContent) toast.error("Vui lòng nhập nội dung");
    else {
      postApi.createTravelItinerary(
        accessToken,
        province,
        slugify(province),
        valueTimeTrip,
        valueContent,
        userCreate
      );
      closeModal(false);
      setRenderUI(() => !renderUI);
    }
  };

  return (
    <div>
      <form action="" onSubmit={submitAddCuisine}>
        <div className="mb-4">
          <label className="font-semibold mb-2 block">Tỉnh thành: </label>
          <TextField
            color="success"
            fullWidth
            variant="outlined"
            placeholder="Tỉnh thành"
            value={province}
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-2 block">Khu vực: </label>
          <TextField
            color="success"
            fullWidth
            variant="outlined"
            placeholder="Khu vực"
            value={regional}
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold mb-2 block">
            Thời gian du lịch:{" "}
          </label>
          <TextField
            color="success"
            fullWidth
            variant="outlined"
            placeholder="Vui lòng nhập: trong ngày hoặc 2 ngày 1 đêm,..."
            onChange={(e) => setValueTimeTrip(e.target.value)}
            value={valueTimeTrip}
          />
        </div>
        <div className="mb-4 ">
          <label className="font-semibold mb-2 block">Tên món ăn: </label>
          <QuillComponents
            value={valueContent}
            setValue={setValueContent}
          ></QuillComponents>
        </div>
        <Button
          type="submit"
          className="bg-bgPrimary w-[50%] mx-auto mt-6 h-[50px] rounded-lg font-semibold text-white leading-[50px]"
        >
          Thêm lịch trình
        </Button>
      </form>
    </div>
  );
};

export default AddTraveItinerary;
