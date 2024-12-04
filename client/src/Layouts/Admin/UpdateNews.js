import React, { useState } from "react";
import QuillComponents from "../../Components/QuillComponents";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import slugify from "react-slugify";
import { UpdateApi } from "../../API/UpdateApi";
import UploadImage from "../../uploads/uploadImage";

const UpdateNews = ({
  category,
  dataNews,
  accessToken,
  closeModal,
  renderUI,
  setRenderUI,
}) => {
  const [titleNews, setTitleNews] = useState(dataNews.titleNews || "");
  const [imageNews, setImageNews] = useState("");
  const [valueContent, setValueContent] = useState(dataNews.content || "");

  const submitUpdateNews = (e) => {
    e.preventDefault();
    if (!titleNews) toast.error("Vui lòng nhập thời gian");
    else if (!valueContent) toast.error("Vui lòng nhập nội dung");
    else {
      UpdateApi.updateNewsById(
        accessToken,
        dataNews._id,
        slugify(category),
        titleNews,
        !imageNews ? dataNews.imageNews : imageNews,
        valueContent,
        renderUI,
        setRenderUI
      );
      closeModal(false);
      setRenderUI(() => !renderUI);
    }
  };

  return (
    <div>
      <form action="" onSubmit={submitUpdateNews}>
        <div className="flex justify-between gap-6">
          <div className="w-[60%]">
            <div className="mb-4">
              <label className="font-semibold mb-2 block">
                Danh mục bài viết:
              </label>
              <TextField
                color="success"
                fullWidth
                variant="outlined"
                placeholder="Danh mục"
                value={category}
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold mb-2 block">
                Chủ đề bài viết:
              </label>
              <TextField
                color="success"
                fullWidth
                variant="outlined"
                placeholder="Nhập chủ đề bài viết..."
                onChange={(e) => setTitleNews(e.target.value)}
                value={titleNews}
              />
            </div>
          </div>

          <div className="w-[40%]">
            <UploadImage
              setImageValue={setImageNews}
              className="w-full h-[250px]"
              children={
                <div>
                  <div className="w-full h-[250px] flex flex-col justify-center items-center ">
                    <img
                      src="https://icon-library.com/images/add-image-icon-png/add-image-icon-png-14.jpg"
                      alt=""
                      className="w-[170px]"
                    />
                    <strong className="text-white mt-2">
                      Vui lòng chọn ảnh
                    </strong>
                  </div>
                  <div className="">
                    <img
                      src={dataNews.imageNews}
                      alt=""
                      className="w-full h-full absolute inset-0"
                    />
                  </div>
                </div>
              }
            ></UploadImage>
          </div>
        </div>

        <div className="mb-4 ">
          <label className="font-semibold mb-2 block">Nội dung bài viết:</label>
          <QuillComponents
            value={valueContent}
            setValue={setValueContent}
          ></QuillComponents>
        </div>
        <Button
          type="submit"
          className="bg-bgPrimary w-[50%] mx-auto mt-6 h-[50px] rounded-lg font-semibold text-white leading-[50px]"
        >
          Cập nhật bài viết
        </Button>
      </form>
    </div>
  );
};

export default UpdateNews;
