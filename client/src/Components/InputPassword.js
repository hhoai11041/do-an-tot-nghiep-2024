import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const InputPassword = ({
  control,
  showPassword,
  setShowPassword,
  ...props
}) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <div>
      <div className="w-full relative">
        <TextField {...props} {...field} />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-6 translate-y-[-50%]"
        >
          {showPassword ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="text-xl cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon icon={faEye} className="text-xl cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputPassword;
