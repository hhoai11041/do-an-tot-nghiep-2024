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
    // Khởi tạo cấu hình AWS S3
    AWS.config.update({
      region: "ap-southeast-2",
      credentials: new AWS.Credentials({
        accessKeyId: "AKIATCKATFVRI567AFY4",
        secretAccessKey: "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",
      }),
    });

    const s3 = new AWS.S3();

    // Tạo các promises để upload các tệp lên S3
    const uploadPromises = files.map(async (file) => {
      try {
        // Sử dụng folderName làm phần đầu của Key để phân loại tệp theo thư mục
        const key = `${folderName}/${file.name}`;

        const params = {
          Bucket: "doantotnghiep-2024",
          Key: key,
          Body: file,
          ContentType: file.type,
        };

        // Upload tệp lên S3
        const uploadResult = await s3.upload(params).promise();
        // console.log("File uploaded successfully:", uploadResult.Location);

        // Trả về URL của tệp đã upload
        return uploadResult.Location;
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
