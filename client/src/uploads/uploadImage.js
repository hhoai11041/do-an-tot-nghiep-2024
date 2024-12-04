import React, { useEffect, useState } from "react";

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
const UploadImage = ({ click, setImageValue, className, children }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (click) {
      setImage("");
      setProgressPercent(0);
    }
  }, [click]);

  useEffect(() => {
    setImageValue(image);
  }, [image, setImageValue]);

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const extension = file.name.split(".").pop();
    const uniqueFilename = `${uuIdv4()}.${extension}`;
    const storageRef = ref(imageDb, "khoaLuan/" + uniqueFilename);
    setFileName(uniqueFilename);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          setImage(downloadURL);
        });
      }
    );
  };

  const handleDeleteImageUpload = () => {
    const desertRef = ref(imageDb, `khoaLuan/${fileName}`);
    deleteObject(desertRef).then(() => {
      toast.success("Xóa hình ảnh thành công", {
        pauseOnHover: false,
      });
      setImage("");
      setProgressPercent(0);
    });
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-slate-500 w-full group ${className}`}
    >
      {!image && (
        <>
          <div className="">{children}</div>
          <input
            type="file"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleUploadFile}
          />
          <div
            className={`w-[${progressPercent}%] h-[4px] bg-green-500 absolute bottom-0 transition-all duration-1000`}
          ></div>
        </>
      )}
      {!image && progressPercent !== 0 && (
        <>
          <div className="absolute inset-0 bg-black opacity-[0.6]"></div>
          {loadingApp.loadingCircle(
            "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10"
          )}
        </>
      )}

      {image && (
        <>
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div
            onClick={handleDeleteImageUpload}
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-2xl bg-white p-4 text-red-500 rounded-full hover:text-red-700 hover:bg-gray-200 transition-all"
            />
          </div>
          <div className="absolute inset-0  group-hover:bg-black opacity-[0.6] transition-all"></div>
        </>
      )}
    </div>
  );
};

export default UploadImage;
