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
    // Tạo các promises để upload các tệp lên S3
    const uploadPromises = files.map(async (file) => {
      try {
        // Sử dụng folderName làm phần đầu của Key để phân loại tệp theo thư mục
        const bucketName = "doantotnghiep-2024";
        const region = "ap-southeast-2";
        const key = `${folderName}/${file.name}`;
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

        const response = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to upload file ${file.name}`);
        }

        return url; 
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        toast.error(`Không thể upload file ${file.name}`);
        return null;
      }
    });

    // Chờ tất cả các tệp upload và lọc bỏ các giá trị null (nếu có lỗi)
    const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

    return uploadedUrls; // Trả về danh sách các URL của tệp đã upload
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    toast.error("Lỗi khi tải lên hình ảnh");
    return [];
  }
};

export { uploadFilesToS3 };
