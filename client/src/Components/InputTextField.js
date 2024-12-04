import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
const InputTextField = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
  });
  return (
    <div className="">
      <TextField {...props} {...field} />
    </div>
  );
};

export default InputTextField;
