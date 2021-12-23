import { memo } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const SubText = memo(({ text, clickHandle }) => {
  return (
    <>
      <StyledTextField
        id="filled-multiline-static"
        multiline
        rows={7}
        value={text}
        color="primary"
        InputProps={{
          readOnly: true,
        }}
        //   幅調整
        style={{ width: 282 }}
        onClick={clickHandle}
      />
    </>
  );
});

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-input {
    line-height: 2;
  }
  fieldset {
    border-radius: 0px 0px 40px 40px;
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

export default SubText;
