import "./App.css";
import { Button, MenuItem } from "@mui/material";
import { CustomSelect, CustomTextField } from "libs/ui";

function App() {
  return (
    <>
      <div>
        <Button variant="contained" size="medium">
          Label
        </Button>
        <Button variant="contained" size="large">
          Label
        </Button>
        <Button variant="outlined" size="medium">
          Label
        </Button>
        <Button variant="outlined" size="large">
          Label
        </Button>
        <Button variant="text" size="medium">
          Label
        </Button>
        <Button variant="text" size="large">
          Label
        </Button>
      </div>
      <div>
        <Button variant="contained" color="inherit" size="medium">
          Label
        </Button>
        <Button variant="contained" color="inherit" size="large">
          Label
        </Button>
        <Button variant="outlined" color="inherit" size="medium">
          Label
        </Button>
        <Button variant="outlined" color="inherit" size="large">
          Label
        </Button>
        <Button size="medium" disabled>
          Label
        </Button>
        <Button size="large" disabled>
          Label
        </Button>
      </div>
      <div>
        <CustomTextField
          label="Họ và tên"
          textFieldProps={{ required: true, helperText: "Helper text" }}
        ></CustomTextField>
      </div>
      <div>
        <CustomSelect
          label="Thành phố"
          selectProps={{
            required: true,
            defaultValue: "",
            displayEmpty: true,
          }}
          helperText="Helper text"
        >
          <MenuItem value="" disabled style={{ display: "none" }}>
            Thành phố
          </MenuItem>
          <MenuItem value="hcm">Hồ Chí Minh</MenuItem>
          <MenuItem value="hn">Hà Nội</MenuItem>
        </CustomSelect>
      </div>
    </>
  );
}

export default App;
