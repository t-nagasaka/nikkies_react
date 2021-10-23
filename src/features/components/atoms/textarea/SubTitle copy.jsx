import { useState, useRef, useStyles } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SubTitle = () => {
  const [value, setValue] = useState("Controlled");
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);

  const handleChange = () => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          variant="filled"
          onClick={() => {
            console.log("click");
          }}
          color="secondary"
        />
        <TextField
          id="filled-multiline-static"
          label="本文"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
          color="secondary"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          error={inputError}
          id="outlined-number"
          label="Number"
          type="number"
          inputProps={{
            min: 0,
            // max: 366,
            pattern: "[0-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|36[0-6]",
          }}
          inputRef={inputRef}
          helperText={inputRef?.current?.validationMessage}
          onChange={handleChange}
        />
      </div>
    </Box>
  );
};

export default SubTitle;
