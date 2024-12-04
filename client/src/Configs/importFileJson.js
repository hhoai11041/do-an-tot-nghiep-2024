import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { loadingApp } from "../Components/Loading";
import { announce } from "../Components/ModalAnnounce";

const ImportFileJson = ({ renderUI, setRenderUI }) => {
  const accessToken = Cookies.get("accessToken");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage("Vui lòng chọn file JSON.");
      return;
    }
    if (file.type !== "application/json") {
      setMessage("Chỉ chấp nhận file JSON.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        setMessage("File JSON đã được tải thành công.");
        handleSubmit(parsedData);
      } catch (error) {
        setMessage("Có lỗi xảy ra khi đọc file JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      for (const cuisine of data) {
        const {
          provinceName,
          provinceSlug,
          regional,
          imgRepresentative,
          cuisineDetail,
        } = cuisine;

        for (const food of cuisineDetail) {
          const {
            foodName,
            imgFood,
            foodDesc,
            listImage,
            content,
            address,
            linkVideo,
            star,
          } = food;

          await axios.post(
            "http://localhost:3333/api/cuisine",
            {
              provinceName,
              provinceSlug,
              regional,
              imgRepresentative,
              foodName,
              imgFood,
              foodDesc,
              listImage,
              content,
              address,
              linkVideo,
              star,
            },
            {
              headers: {
                token: `Bearer ${accessToken}`,
              },
            }
          );
        }
      }
      setMessage("Đã gửi dữ liệu thành công.");
      announce.showSuccessModal("Thành công", "Dữ liệu đã được thêm vào hệ thống");
      setRenderUI((prev) => !prev);
    } catch (error) {
      setMessage("Có lỗi xảy ra khi gửi dữ liệu.");
      const errorMessage = error.response
        ? error.response.data.message
        : "File json không hợp hệ.";
      announce.showErrorModal("Lỗi rồi", errorMessage);
      setRenderUI((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-cuisine relative rounded-lg overflow-hidden">
      <div className="relative bg-green-700 h-[50px] cursor-pointer hover:bg-green-800 transition-all">
        <div className="flex justify-center items-center gap-2">
          <strong className="text-white">Import</strong>
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/049/964/original/3d-file-json-format-icon-png.png"
            alt="Import Icon"
            className="size-12"
          />
        </div>
        <input
          key={renderUI ? "show" : "hide"}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      {loading && (
        <div className="">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          {loadingApp.loadingCircle(
            "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20"
          )}
        </div>
      )}
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default ImportFileJson;
