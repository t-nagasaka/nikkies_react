import TextField from "@mui/material/TextField";
import styled from "styled-components";

const IntText = () => {
  return (
    <>
      <StyledTextField
        id="outlined-number"
        label="Day"
        defaultValue="0"
        type="number"
        // variant="filled"
        inputProps={{
          min: 0,
          max: 366,
          pattern: "[0-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-6]",
        }}
      />
    </>
  );
};

const StyledTextField = styled(TextField)`
  /* label.Mui-focused {
    color: #b04cdf;
  } */
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
