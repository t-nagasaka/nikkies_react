import TextField from "@mui/material/TextField";
import styled from "styled-components";

const SubTitle = () => {
  return (
    <>
      <StyledTextField
        // focused
        // color="primary"
        id="outlined-read-only-input"
        label="Title"
        defaultValue="Hello World"
        InputProps={{
          readOnly: true,
        }}
        //   幅調整
        style={{ width: 210 }}
      />
    </>
  );
};

const StyledTextField = styled(TextField)`
  /* label.Mui-focused {
    color: #b04cdf;
  } */
  fieldset {
    border-radius: 0px 40px 0px 0px;
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

export default SubTitle;
