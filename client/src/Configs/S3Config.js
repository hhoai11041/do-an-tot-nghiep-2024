import AWS from "aws-sdk";
import { toast } from "react-toastify";

const uploadFilesToS3 = async (files, folderName = "") => {
  if (!Array.isArray(files)) {
    files = [files];
  }

  // Kiểm tra xem các tệp có hợp lệ không
  if (files.length === 0) {
    toast.error("Không có tệp nào để tải lên.");
    return [];
  }

  if (!folderName) {
    toast.error("Không có folder");
    return [];
  }

  try {
    const uploadPromises = files.map(async (file) => {
      try {
        const bucketName = "doantotnghiep-2024";
        const region = "ap-southeast-2";
        const key = `${folderName}/${file.name}`;
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

        const response = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
            Referer: "https://vietnamtrip.online",
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`Failed to upload file ${file.name}: ${errorText}`);
      }

        return url; 
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        toast.error(`Không thể upload file ${file.name}`);
        return null;
      }
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

    return uploadedUrls; 
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    toast.error("Lỗi khi tải lên hình ảnh");
    return [];
  }
};

export { uploadFilesToS3 };
