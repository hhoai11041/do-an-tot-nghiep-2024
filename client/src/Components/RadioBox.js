import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  margin: "0px 0",
  padding: "8px 0px",
  transition: "0.25s",
  "&:hover": {
    backgroundColor: "#d5d5d5",
    borderRadius: "4px",
  },
  ".MuiFormControlLabel-label": {
    color: "black",
  },
  variants: [
    {
      props: { checked: true },
      style: {
        ".MuiFormControlLabel-label": {
          color: "orange",
        },
      },
    },
  ],
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  value: PropTypes.any,
};

export default function RadioBox({ options, setValueRadioBox, valueRadioBox }) {
  const handleChange = (event) => {
    setValueRadioBox(event.target.value);
  };

  return (
    <RadioGroup
      name="use-radio-group"
      value={valueRadioBox}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MyFormControlLabel
          key={option.value}
          value={option.value}
          label={option.label}
          control={<Radio color="warning" />}
        />
      ))}
    </RadioGroup>
  );
}

RadioBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
