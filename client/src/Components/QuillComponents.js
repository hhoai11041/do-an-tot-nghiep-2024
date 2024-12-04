import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { imageDb } from "../Configs/firebaseConfig";

const QuillComponents = ({ value, setValue }) => {
  const quillRef = useRef();
  const handleUploadImageContent = (fileImage) => {
    const storageRef = ref(imageDb, "khoaLuan/" + fileImage.name);
    const uploadTask = uploadBytesResumable(storageRef, fileImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const range = quillRef.current.getEditor().getSelection(true);
          quillRef.current
            .getEditor()
            .insertEmbed(range.index, "image", downloadURL);
        });
      }
    );
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        handleUploadImageContent(file);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "color",
    "background",
    "code-block",
    "align",
    "indent",
  ];
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["image", "video"],
        [{ color: [] }, { background: [] }],
        ["code-block"],
      ],

      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        className="react_quill addTravelItinerary"
      />

      {/* <div className="w-1/2">
        <h2>Nội dung hiện tại:</h2>
        {value ? (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <p>Chưa có nội dung.</p>
        )}
      </div> */}
    </div>
  );
};

export default QuillComponents;
