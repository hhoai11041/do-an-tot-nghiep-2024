import React, { useEffect, useState } from "react";
import logoUpload from "../Assets/Images/logoUpload.png";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { v4 as uuIdv4 } from "uuid";
import { imageDb } from "../Configs/firebaseConfig";
import { loadingApp } from "../Components/Loading";

const UploadMultipleImages = ({ setUrl, click, listImgFood }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (click) {
      setImageUrls([]);
      setProgressPercent(0);
    }
  }, [click]);

  useEffect(() => {
    setUrl(imageUrls);
  }, [imageUrls, setUrl]);

  const handleUploadFile = (e) => {
    const fileImages = Array.from(e.target.files);
    if (!fileImages) return;
    setArrayImages(fileImages);
    if (fileImages) {
      fileImages.forEach((item) => {
        const extension = item.name.split(".").pop();
        const uniqueFilename = `${uuIdv4()}.${extension}`;
        const storageRef = ref(imageDb, "khoaLuan/" + uniqueFilename);
        const uploadTask = uploadBytesResumable(storageRef, item);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressPercent(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrls((prevDownloadURLs) => [
                ...prevDownloadURLs,
                downloadURL,
              ]);
            });
          }
        );
      });
    }
  };

  const handleDeleteImageUpload = (e) => {
    const imageUrl = e.currentTarget.getAttribute("data-url");
    const folderFirebase = decodeURIComponent(
      imageUrl.split("/").pop().split("?")[0]
    );
    const fileName = folderFirebase.substring(
      folderFirebase.lastIndexOf("/") + 1
    );
    const desertRef = ref(imageDb, `khoaLuan/${fileName}`);
    deleteObject(desertRef).then(() => {
      toast.success("Delete file success", {
        pauseOnHover: false,
      });
      setImageUrls((prevImageUrls) =>
        prevImageUrls.filter((url) => url !== imageUrl)
      );
      setProgressPercent(0);
    });
  };

  return (
    <div className="relative shadow-md h-[250px] rounded-md overflow-hidden">
      <div className=" bg-orange-500 hover:bg-orange-700 transition-all rounded-t-md rounded-tr-md  w-full h-[70px] flex items-center justify-center group mb-1">
        <div>
          <div className="flex justify-between items-center gap-40 text-center text-xl font-semibold text-white">
            <div className="flex items-center gap-3">
              <img src={logoUpload} alt="" className="w-[50px]" />
              <h2 className="text-[14px]">Hình ảnh chi tiết</h2>
            </div>
            <span className="block text-[14px]">
              {imageUrls.length} hình ảnh
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
        {imageUrls.length > 0
          ? imageUrls.map((item, index) => (
              <div
                key={index}
                className="relative w-[100px] h-[70px] group rounded-lg overflow-hidden shadow-lg cursor-pointer"
              >
                <img src={item} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={handleDeleteImageUpload}
                    data-url={item}
                    className="text-lg bg-white p-2 text-red-500 rounded-full hover:text-red-700 hover:bg-gray-200 transition-all"
                  />
                </div>
                <div className="absolute inset-0 group-hover:bg-black opacity-[0.6] transition-all z-10"></div>
              </div>
            ))
          : listImgFood.length > 0 &&
            listImgFood.map((item, index) => (
              <div
                key={index}
                className="w-[100px] h-[70px] group rounded-lg overflow-hidden shadow-lg cursor-pointer"
              >
                <img src={item} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
      </div>

      {arrayImages.length !== 0 &&
        progressPercent !== 0 &&
        progressPercent !== 100 && (
          <>
            <div className="absolute inset-0 bg-black opacity-[0.6]"></div>
            {loadingApp.loadingCircle(
              "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20"
            )}
          </>
        )}
    </div>
  );
};

export default UploadMultipleImages;
