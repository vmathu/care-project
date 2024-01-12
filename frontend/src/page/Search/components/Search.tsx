import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { colors, constants } from "libs/ui";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  marginLeft: 0,
  width: "100%",
  display: "flex",
  background: colors.white,
  maxWidth: "632px",
  marginTop: "-1.5rem",
  boxShadow: constants.BOX_SHADOW,
  alignSelf: "center",
  [theme.breakpoints.down("md")]: {
    maxWidth: "358px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: colors.black300,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));

type Props = {
  placeholder?: string;
  value?: string;
};

export const Search = ({ placeholder, value }: Props) => {
  const navigate = useNavigate();
  const [changeVal, setChangeVal] = useState(value);
  const handleChange = (val: string) => {
    setChangeVal(val);
  };

  useEffect(() => {
    setChangeVal(value);
  }, [value]);
  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <Link to="/Search" style={{ display: "contents" }}>
          <SearchIcon sx={{ color: colors.black100 }} />
        </Link>
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder ?? "Search..."}
        inputProps={{ "aria-label": "search", id: "customSearch" }}
        value={changeVal}
        onChange={(e) => handleChange(e.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter")
            navigate(`/Search?q=${event.currentTarget.value}`);
        }}
      />
    </SearchWrapper>
  );
};
