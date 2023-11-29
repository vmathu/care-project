import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LetterAvatars() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Avatar
      style={{
        height: isMobile ? "40px" : "48px",
        width: isMobile ? "40px" : "48px",
      }}
    >
      demo
    </Avatar>
  );
}
