import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { uploadFilesToS3 } from "../Configs/S3Config";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { loadingApp } from "../Components/Loading";

const UploadDesResImages = ({ setUrls, images, click, folderName }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      setUploadedImages(images);
    }
  }, [images]);

  useEffect(() => {
    if (click) {
      setUploadedImages([]);
      setProgressPercent(0);
    }
  }, [click]);

  useEffect(() => {
    setUrls(uploadedImages);
  }, [uploadedImages, setUrls]);

  const handleUploadFile = async (e) => {
    const fileImages = Array.from(e.target.files);
    setFiles(fileImages);

    if (fileImages.length === 0) {
      toast.error("Vui lòng chọn ít nhất một file để tải lên.");
      return;
    }

    setLoading(true);
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      toast.error("Lỗi: Không tìm thấy accessToken.");
      setLoading(false);
      return;
    }

    try {
      // Upload file lên S3
      const uploadedUrls = await uploadFilesToS3(
        fileImages,
        accessToken,
        folderName
      );

      if (uploadedUrls.length > 0) {
        setUploadedImages((prevUrls) => [...prevUrls, ...uploadedUrls]);
        toast.success("Tải ảnh lên thành công!");
      } else {
        toast.error("Tải ảnh lên thất bại.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      toast.error("Lỗi khi tải ảnh lên.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (url) => {
    setUploadedImages((prevUrls) =>
      prevUrls.filter((prevUrl) => prevUrl !== url)
    );
    toast.success("Đã xóa ảnh.");
  };

  return (
    <div className="relative shadow-md h-[250px] rounded-md overflow-hidden">
      <div className="bg-orange-500 hover:bg-orange-700 transition-all rounded-t-md rounded-tr-md w-full h-[70px] flex items-center justify-center group mb-1">
        <div>
          <div className="flex justify-between items-center gap-40 text-center text-xl font-semibold text-white">
            <div className="flex items-center gap-3">
              <h2 className="text-[14px]">Hình ảnh chi tiết</h2>
            </div>
            <span className="block text-[14px]">
              {uploadedImages.length} hình ảnh
            </span>
          </div>
          <input
            type="file"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleUploadFile}
          />
        </div>
      </div>

      <div className="uiImagesUpload flex items-center justify-center gap-5 flex-wrap h-[176px] overflow-y-scroll">
        {uploadedImages.map((url, index) => (
          <div
            key={index}
            className="relative w-[100px] h-[70px] group rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={url}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => handleDeleteImage(url)}
                className="text-lg bg-white p-2 text-red-500 rounded-full hover:text-red-700 hover:bg-gray-200 transition-all"
              />
            </div>
            <div className="absolute inset-0 group-hover:bg-black opacity-[0.6] transition-all z-10"></div>
          </div>
        ))}
      </div>

      {loading && (
        <>
          <div className="absolute inset-0 bg-black opacity-[0.6]"></div>
          {loadingApp.loadingCircle(
            "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20"
          )}
        </>
      )}

      {progressPercent > 0 && progressPercent < 100 && (
        <div className="absolute bottom-0 w-full bg-gray-300 h-2">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default UploadDesResImages;
