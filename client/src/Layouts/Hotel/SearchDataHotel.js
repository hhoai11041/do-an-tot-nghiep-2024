import React, { useEffect, useRef, useState } from "react";
import InputTextField from "../../Components/InputTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import { toast } from "react-toastify";
import { ValidateSearchHotel } from "../../Validations/ValidateSearchHotel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";

const SearchDataHotel = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ValidateSearchHotel),
    mode: "onChange",
  });
  const handleSearch = (value) => {
    if (!isValid) return;
    navigate(`/hotel/searchResults/${slugify(value.location)}`);
  };
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      document.getElementsByName(firstErrorKey)[0].focus();
      toast.error(errors[firstErrorKey].message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  return (
    <div>
      <div className="w-full flex items-center">
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="w-full flex items-center justify-between gap-1"
        >
          <div className="w-[80%] dark:border-gray-700 dark:border rounded-md">
            <InputTextField
              className="w-full"
              placeholder="Điểm đến, tên khách sạn,..."
              type="text"
              name="location"
              color={errors.location ? "error" : "success"}
              control={control}
            ></InputTextField>
          </div>

          <Button
            type="submit"
            className="w-[20%] h-[57px] bg-bgPrimary rounded-md text-center leading-[57px] text-white text-lg font-bold hover:bg-orange-600 transition-all"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchDataHotel;
