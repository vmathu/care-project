import { styled } from "@mui/material/styles";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "..";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  marginLeft: 0,
  width: "100%",
  display: "flex",
  backgroundColor: colors.black25,
  maxWidth: "352px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    height: "1.5rem",
    background: "none",
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
  [theme.breakpoints.down("sm")]: {
    height: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: colors.black300,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

type Props = {
  placeholder?: string;
};

export const CustomSearch = ({ placeholder }: Props) => {
  return (
    <>
      <Search sx={{ display: { xs: "none", sm: "flex" } }}>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: colors.black200 }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeholder ?? "Search..."}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <IconButton
        href="/Search"
        sx={{
          display: { sm: "none", xs: "flex" },
          width: "fit-content",
          padding: "0",
        }}
      >
        <SearchIcon sx={{ color: colors.black200 }} />
      </IconButton>
    </>
  );
};
