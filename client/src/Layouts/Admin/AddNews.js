import React, { useState } from "react";
import QuillComponents from "../../Components/QuillComponents";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import Button from "../../Components/Button";
import slugify from "react-slugify";
import { postApi } from "../../API/PostApi";
import UploadImage from "../../uploads/uploadImage";

const AddNews = ({ categoryNews, closeModal, renderUI, setRenderUI }) => {
  const [titleNews, setTitleNews] = useState("");
  const [valueContent, setValueContent] = useState("");
  const [urlImagePrimary, setUrlImagePrimary] = useState("");

  const submitAddNews = (e) => {
    e.preventDefault();
    if (!titleNews) toast.error("Vui lòng nhập chủ đề bài viết");
    else if (!valueContent) toast.error("Vui lòng nhập nội dung bài viết");
    else {
      postApi.createNews(
        slugify(categoryNews),
        titleNews,
        urlImagePrimary,
        valueContent
      );
      closeModal(false);
      setRenderUI(() => !renderUI);
    }
  };

  return (
    <div>
      <form action="" onSubmit={submitAddNews}>
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
                value={categoryNews}
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
              setImageValue={setUrlImagePrimary}
              className="w-full"
              children={
                <div className="w-full flex flex-col justify-center items-center">
                  <img
                    src="https://icon-library.com/images/add-image-icon-png/add-image-icon-png-14.jpg"
                    alt=""
                    className="w-[160px]"
                  />
                  <strong className="text-white py-2 text-sm">
                    Vui lòng chọn ảnh
                  </strong>
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
          Thêm bài viết
        </Button>
      </form>
    </div>
  );
};

export default AddNews;
