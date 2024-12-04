import React, { useEffect, useRef, useState } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

const OptionsSelect = ({
  selectedValue,
  setSelectedValue,
  data,
  className,
  label,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedValue);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (option) => {
    setSelectedValue(option);
    setSearchTerm(option);
    setOpen(false);
  };

  const filteredOptions = data.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClickAway = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickAway);
    } else {
      document.removeEventListener("mousedown", handleClickAway);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [open]);

  useEffect(() => {
    setSearchTerm(selectedValue || "");
  }, [selectedValue]);

  return (
    <div className={`${className} mb-4 relative`}>
      <FormControl fullWidth>
        <div>
          <TextField
            color="success"
            fullWidth
            variant="outlined"
            value={searchTerm}
            id="outlined-basic"
            label={label}
            placeholder={placeholder}
            onClick={handleToggleDropdown}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true);
            }}
          />
        </div>
        {open && (
          <div
            ref={dropdownRef}
            className="absolute bg-white  dark:bg-black shadow-lg dark:border-gray-700 dark:border rounded-md z-10 top-[60px] left-0 right-0"
          >
            <div className="select-options max-h-[320px] overflow-y-scroll">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <MenuItem key={option} onClick={() => handleChange(option)}>
                    {option}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Không tìm thấy dữ liệu</MenuItem>
              )}
            </div>
          </div>
        )}
      </FormControl>
    </div>
  );
};

export default OptionsSelect;
