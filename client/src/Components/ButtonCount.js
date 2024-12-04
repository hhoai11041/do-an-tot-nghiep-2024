import React, { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
const ButtonCount = ({
  initValue = 0,
  valueChange,
  minValue,
  messageError,
}) => {
  const [valueCount, setValueCount] = useState(initValue);
  const inCrement = () => {
    const valueIncrement = valueCount + 1;
    setValueCount(valueIncrement);
    if (valueChange) valueChange(valueIncrement);
  };
  const deCrement = () => {
    const valueDecrement = valueCount - 1;
    if (valueDecrement < minValue) {
      toast.error(messageError, {
        pauseOnHover: false,
      });
      return;
    }
    setValueCount(valueDecrement);
    if (valueChange) valueChange(valueDecrement);
  };

  return (
    <div className="flex items-center ">
      <Button
        className="size-9 border border-orange-600 rounded-lg flex items-center "
        type="button"
        onClick={deCrement}
      >
        <FontAwesomeIcon icon={faMinus} className="text-orange-700" />
      </Button>
      <strong className="w-[40px] text-center">{valueCount}</strong>
      <Button
        className="size-9 border border-orange-600 rounded-lg flex items-center"
        type="button"
        onClick={inCrement}
      >
        <FontAwesomeIcon icon={faPlus} className="text-orange-700" />
      </Button>
    </div>
  );
};

export default ButtonCount;
