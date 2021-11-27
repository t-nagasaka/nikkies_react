import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectSubModal, toggleSubDiaryModal } from "../../slices/DiarySlice";

const SubText = ({ text }) => {
  const dispatch = useDispatch();

  const clickHandle = () => {
    dispatch(toggleSubDiaryModal());
  };
  return (
    <>
      <StyledTextField
        id="filled-multiline-static"
        multiline
        rows={7}
        value={text}
        // variant="filled"
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
};

const StyledTextField = styled(TextField)`
  /* label.Mui-focused {
    color: #b04cdf;
  } */
  .MuiOutlinedInput-input {
    line-height: 2;
  }
  .MuiInputLabel-root {
    /* line-height: 3; */
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
      /* border-top: 0; */
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
