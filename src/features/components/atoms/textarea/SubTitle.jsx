import TextField from "@mui/material/TextField";
import styled from "styled-components";

const SubTitle = ({ title, clickHandle }) => {
  return (
    <>
      <StyledTextField
        value={title}
        id="outlined-read-only-input"
        label="Title"
        InputProps={{
          readOnly: true,
        }}
        //   幅調整
        style={{ width: 210 }}
        onClick={clickHandle}
      ></StyledTextField>
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
      padding: 0;
      margin: 0;
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
