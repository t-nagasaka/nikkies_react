import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useState, useEffect } from "react";

const IntText = ({ onChange, defaultValue }) => {
  const [day, setDay] = useState(0);
  const getDay = (e) => {
    setDay(e.target.value);
  };

  useEffect(() => {
    if (day !== 0 && day !== undefined) {
      onChange(day);
    }
  }, [day]);

  useEffect(() => {
    if (defaultValue !== day && defaultValue !== undefined) {
      setDay(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <StyledTextField
        id="outlined-number"
        label="Day"
        type="number"
        inputProps={{
          min: 0,
          max: 366,
          pattern: "[0-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-6]",
        }}
        value={day}
        onChange={getDay}
      />
    </>
  );
};

const StyledTextField = styled(TextField)`
  fieldset {
    border-radius: 40px 0px 0px 0px;
  }
  .MuiOutlinedInput-input {
    cursor: pointer;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #0568c5;
    }
    &:hover fieldset {
      border-color: blue;
      cursor: pointer;
    }
    &.Mui-focused fieldset {
      color: #b04cdf;
    }
  }
`;
export default IntText;
