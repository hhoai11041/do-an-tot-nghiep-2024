import React from "react";

const NotFoundData = ({ className }) => {
  return (
    <div
      className={`relative text-gray-500 w-full h-[65vh] ${className} shadow-lg rounded-lg dark:border-gray-700 dark:border`}
    >
      <div className="absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png"
          alt=""
          className="h-[40vh]"
        />
        <strong className="mt-2 block text-center text-xl">
          Chúng tôi không tìm thấy dữ liệu
        </strong>
      </div>
    </div>
  );
};

export default NotFoundData;
