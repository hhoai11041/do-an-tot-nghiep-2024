import React, { useState } from "react";
import QuillComponents from "../../Components/QuillComponents";

import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import UploadImage from "../../uploads/uploadImage";
import UploadMultipleImages from "../../uploads/UploadMultipleImages";
import { toast } from "react-toastify";
import { postApi } from "../../API/PostApi";
import slugify from "react-slugify";
import { UpdateApi } from "../../API/UpdateApi";
const UpdateCuisine = ({
  province,
  regional,
  accessToken,
  closeModal,
  renderUI,
  setRenderUI,
  dataFood,
}) => {
  const [urlImagePrimary, setUrlImagePrimary] = useState("");
  const [urlImagesDetail, setUrlImagesDetail] = useState([]);
  const [descFood, setDescFood] = useState(dataFood?.foodDesc ?? "");
  const [foodName, setFoodName] = useState(dataFood?.foodName ?? "");

  const submitUpdateCuisine = (e) => {
    e.preventDefault();
    if (!foodName) toast.error("Vui lòng nhập đầy đủ tên món ăn");
    else if (!descFood) toast.error("Vui lòng nhập mô tả");
    else {
      const dataUpdate = {
        foodName: foodName,
        imgFood: !urlImagePrimary ? dataFood?.imgFood : urlImagePrimary,
        listImg:
          urlImagesDetail.length === 0 ? dataFood?.listImage : urlImagesDetail,
        descFood: descFood,
      };

      UpdateApi.updateCuisineByFoodId(
        accessToken,
        slugify(province),
        dataFood?.foodId,
        dataUpdate.foodName,
        dataUpdate.imgFood,
        dataUpdate.descFood,
        dataUpdate.listImg,
        renderUI,
        setRenderUI
      );
    }
    closeModal(false);
    setRenderUI(() => !renderUI);
  };

  return (
    <form action="" onSubmit={submitUpdateCuisine}>
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
        <label className="font-semibold mb-2 block">Tên món ăn: </label>
        <TextField
          value={foodName || dataFood?.foodName}
          color="success"
          fullWidth
          variant="outlined"
          placeholder="Vui lòng nhập tên món ăn..."
          onChange={(e) => setFoodName(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <div className="w-[40%]">
          <UploadImage
            setImageValue={setUrlImagePrimary}
            className="w-full h-[250px]"
            children={
              <div>
                <div className="w-full h-[250px] flex flex-col justify-center items-center ">
                  <img
                    src="https://icon-library.com/images/add-image-icon-png/add-image-icon-png-14.jpg"
                    alt=""
                    className="w-[170px]"
                  />
                  <strong className="text-white mt-2">Vui lòng chọn ảnh</strong>
                </div>
                <div className="">
                  <img
                    src={dataFood?.imgFood}
                    alt=""
                    className="w-full h-full absolute inset-0"
                  />
                </div>
              </div>
            }
          ></UploadImage>
        </div>
        <div className="w-[60%]">
          <UploadMultipleImages
            setUrl={setUrlImagesDetail}
            listImgFood={dataFood?.listImage}
          ></UploadMultipleImages>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4">
          <label className="font-semibold mb-2 block">Nội dung: </label>
          {/* <QuillComponents value={descFood} setValue={setDescFood} /> */}
          <textarea
            id="message"
            rows="7"
            class="block p-2.5 w-full text-lg text-gray-900 rounded-md focus:outline-none  focus:ring-green-800 focus:border-green-800 shadow-sm border border-gray-400"
            placeholder="Viết mô tả cho món ăn..."
            value={descFood || dataFood?.foodDesc}
            onChange={(e) => setDescFood(e.target.value)}
          ></textarea>
        </div>
      </div>
      <Button
        type="submit"
        className="bg-bgPrimary w-[50%] mx-auto mt-6 h-[50px] rounded-lg font-semibold text-white leading-[50px]"
      >
        Cập nhật
      </Button>
    </form>
  );
};

export default UpdateCuisine;
